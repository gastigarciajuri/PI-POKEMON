import axios from "axios";

export const GET_POKEMONS = 'GET_POKEMONS';
export const GET_TYPES = 'GET_TYPES';
export const FILTER_CREATED = 'FILTER_CREATED';
export const FILTER_TYPE = 'FILTER_TYPE';
export const ORDER_BY_NAME = 'ORDER_BY_NAME';

export const getAllPokemons = () => {
    return async function(dispatch){
            return await axios.get('http://localhost:3001/pokemon')
            .then(response =>{
                dispatch ({
                    type: GET_POKEMONS,
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
                    type: GET_TYPES,
                    payload: response.data
                })               
            })
    }
}
export function filterCreated(payload){
    return {
        type: FILTER_CREATED,
        payload
    }
}

export function filterType(payload) {
    return {
        type: FILTER_TYPE,
        payload
    }
}

export function orderByName(payload) {
    return {
        type: ORDER_BY_NAME,
        payload
    }
}

export function getPokeName (name){
return async function (dispatch) {
try {
    var json = await axios.get("http://localhost:3001/pokemon?name=" + name)
} catch (error) {
    
}
}
}

