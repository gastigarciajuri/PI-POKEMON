const initialState = {
    pokemones: [],
    types: [],
}

function rootReducer( state = initialState, action){
    switch (action.type) {
        case 'GET_POKEMONS':
            return{
            ...state,
            pokemones: action.payload
            }
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            }
    
        default:
            return {
                ...state
            }
    }
}

export default rootReducer;