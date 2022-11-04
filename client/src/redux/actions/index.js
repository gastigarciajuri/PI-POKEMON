import axios from "axios";

export const getAllPokemons = () => {
    return async function(dispatch){
            return await axios.get('http://localhost:3001/pokemon')
            .then(response =>{
                dispatch ({
                    type: 'GET_POKEMONS',
                    payload: response.data
                })               
            })
        }
}


export const getAllTypes = () => {
    return async function(dispatch){
            return await axios.get('http://localhost:3001/types')
            .then(response =>{
                dispatch ({
                    type: 'GET_TYPES',
                    payload: response.data
                })               
            })
    }
}
