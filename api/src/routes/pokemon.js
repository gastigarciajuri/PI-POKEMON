const express = require("express");
const { Pokemon, Type } = require('../db');
const { getDetail, getAllPokes } = require('./fns');
const router = express.Router();


router.get("/", async (req, res)=>{
    const { name } = req.query;
    const pokeNames = await getAllPokes();
    try {
        if(name){
            let pokes = pokeNames.filter( e => e.name.toLowerCase() === name.toLowerCase())
            pokes.length ? 
            res.status(200).json(pokes) :
            res.status(404).send(" Couldn't find that Pokemon ")
        }else{
            let pokemones = await getAllPokes();
            res.status(200).json(pokemones)
        }
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const pokesWithId = await getAllPokes();
    try {
        if(id){
            let pokeId = pokesWithId.filter( e => e.id == id );
            pokeId.length ?
            res.status(200).json(pokeId) :
            res.status(404).send(" Couldn't find that Pokemon ")
        }
    } catch (error) {
        console.log(error)
    }
})


router.post('/', async (req, res) =>{
    const { name, hp, attack, defense, speed, height, wheight, img, types  } = req.body;
    try {
        if(name){
            const allPokes = await getAllPokes();
            const existPoke = allPokes.find( e => e.name === name.toLowerCase());
            if(!existPoke){
                const pokemon = await Pokemon.create({
                    name,
                    img,
                    types,
                    hp,
                    attack,
                    defense,
                    speed,
                    height,
                    wheight,
                });
                const typesInDb = await Type.findAll({
                    where: {
                        name: types,
                    }
                });
                pokemon.addType(typesInDb);
                return res.status(200).send("Pokemon created succesfully!");       
            }
            return res.status(404).send("Pokemon name already exists")
        } 
        if(!name) return res.status(404).send("Every pokemon must have a name!")
    } catch (error) {
        console.log(error)
    }
});
module.exports = router;