const axios = require('axios');
const { Pokemon, Type } = require('../db');


//TRAIGO DATOS DE LA API⬇️
const getApiInfo = async ()=>{
    try {
        let link = 'https://pokeapi.co/api/v2/pokemon/';
        let pokes = [];
        do {
            let response = await axios.get(link);
            let pokeApi = response.data;
            let auxPoke = pokeApi.results.map(e=>{
                return {
                    name: e.name,
                    url: e.url,
                }
            }) 
            pokes.push(...auxPoke);
            link = pokeApi.next
        } while (link != null && pokes.length < 80);//(<-- SE LIMITA LA CANTIDAD DE POKEMONES TRAIDOS DE LA API)
        let pokeData = await Promise.all(pokes.map(async e =>{
            let pokemon = await axios.get(e.url);
            return {
                id: pokemon.data.id,
                name: pokemon.data.name ,
                img: pokemon.data.sprites.other.home.front_default,
                types: pokemon.data.types.map( e => {
                    return ({
                        name: e.type.name,
                        img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`
                    })
                }),
                hp: pokemon.data.stats[0].base_stat,
                attack: pokemon.data.stats[1].base_stat,
                defense: pokemon.data.stats[2].base_stat,
                speed: pokemon.data.stats[5].base_stat,
                height: pokemon.data.height,
                weight: pokemon.data.weight,
            }
        }));
        return pokeData;
    } catch (error) {
        console.log(error);
    };
};

//POKEMON ESPECIFICADO POR ID O POR NAME⬇️
async function getDetail(params) {
    try {
        const apiData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${params}`);
        const data = await apiData.data;
        const pokemon = {
            id: data.id,
            name: data.name,
            img: data.sprites.other.home.front_default,
            types: data.types.map(e => {
                return ({
                    name: e.type.name,
                    img: `https://typedex.app/images/ui/types/dark/${e.type.name}.svg`,
                })
            }),
            hp: data.stats[0].base_stat,
            attack: data.stats[1].base_stat,
            defense: data.stats[2].base_stat,
            speed: data.stats[5].base_stat,
            height: data.height,
            weight: data.weight,
        };
        return pokemon;
    } catch (error) {
        console.log(error);
    };
};

//TRAER POKEMONES DE LA DB ⬇️
const getDbInfo = async () =>{
    return await Pokemon.findAll({
        include: {
            model: Type,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    });
};

//TRAER TODOS LOS POKEMONES, DB Y API...⬇️
const getAllPokes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const allPokes = apiInfo.concat(dbInfo);
    return allPokes;
};


module.exports = {
    getApiInfo,
    getDbInfo,
    getAllPokes,
    getDetail
};