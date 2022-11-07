import {
    GET_POKEMONS,
    GET_TYPES,
    FILTER_CREATED,
    FILTER_TYPE,
} from "../actions"


const initialState = {
    pokemones: [],
    allPokemons: [],
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
            let filtered;
            if(action.payload === 'created'){
                filtered = allPokes.filter( x => x.createdInBd === !null) 
            } else if( action.payload === 'api' ){
                filtered = allPokes.filter( x => !x.createdInBd) 
            } else {
                filtered = allPokes;
            }
            return{
                ...state,
                pokemones: filtered
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
        default:
            return {...state}
    }
}

export default rootReducer;