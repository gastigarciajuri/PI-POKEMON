import {
    GET_POKEMONS,
    GET_TYPES,
    FILTER_CREATED,
    FILTER_TYPE,
    ORDER_BY_NAME,
} from "../actions"


const initialState = {
    pokemones: [],
    allPokemons: [], //copia del estado que siempre tenga todos los pokemones
    types: [],
}
//quilombo con states de redux....REVISAR
const  rootReducer = ( state = initialState, action) => {
    switch (action.type) {
        case GET_POKEMONS:
            return{
            ...state,
            pokemones: action.payload,
            allPokemons: action.payload
            }
        case GET_TYPES:
            return{
                ...state,
                types: action.payload
            }
        case FILTER_CREATED:
            const allPokes = state.allPokemons;
            const filtered = action.payload === 'created' ? allPokes.filter(e => e.createdInBd) : allPokes.filter (e => !e.createdInBd)           
            return{
                ...state,
                pokemones: action.payload === 'all' ? state.allPokemons : filtered
            }
        case FILTER_TYPE:
            const allPokesTypes = state.allPokemons
            let filteredType = action.payload === 'all' ? 
                allPokesTypes :
                allPokesTypes.filter(e => e.types.some(e => e.name === action.payload))//!!!!
            return {
                ...state,
                pokemones: filteredType
            };
        case ORDER_BY_NAME:
            let pokesOrder = state.pokemones;
            let sorted = action.payload === 'asc' ?
                pokesOrder.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                }) :
                pokesOrder.sort((a, b) => {
                    return b.name.toLowerCase().localeCompare(a.name.toLowerCase())
                })
            return {
                ...state,
                pokemones: sorted
            }
        //     let arrSort = action.payload === 'asc' ?
        //     state.pokemones.sort( (a, b) => {
        //         if (a.name > b.name){
        //             return 1;
        //         }
        //         if (b.name > a.name){
        //             return -1;
        //         }
        //         return 0
        //         }) 
        //     : state.pokemones.sort( (a,b) =>{
        //         if (a.name > b.name){
        //             return -1;
        //         }
        //         if (b.name > a.name) {
        //             return 1
        //         }
        //         return 0;
        //     })
        //     return {
        //         ...state,
        //         pokemones: arrSort
        //     }
        default:
            return {...state}
    }
}

export default rootReducer;