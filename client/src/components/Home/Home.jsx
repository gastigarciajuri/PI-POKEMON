import React, { useState } from 'react';
import { useEffect } from 'react'; // useState,
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons} from '../../redux/actions';
import Filters from '../Filters/Filters';
import Card from '../Card/Card';
import Paginado from '../Paginado/Paginado';

export default function Home() {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemones);
    const [ currentPage, setCurrentPage ] = useState(1); //pagina actual
    const [ pokesPerPage, setPokesPerPage ] = useState(12); //pokemones por pagina
    const indexLastPoke = currentPage * pokesPerPage; //indice del ultimo pokemon = 12
    const indexFirstPoke = indexLastPoke - pokesPerPage; //indice del primer pokemon = 0
    const currentPokes = allPokes.slice(indexFirstPoke, indexLastPoke); //devuelve el array de los pokes por pag?
    

    const paginado = (pageNumber) =>{ 
        setCurrentPage(pageNumber)
    }
    
    useEffect(()=>{
        dispatch(getAllPokemons())
    }, [dispatch]);

    function handleClick(e){
        e.preventDefault();
        dispatch(getAllPokemons());
    }
    return (
        <div>
            <button onClick={e=> {handleClick(e)}}>
                Reload
            </button>
            <div>
                <div>
                    <Filters setCurrentPage={setCurrentPage} />
                </div>
            </div>
            <div>
                <Paginado 
                pokesPerPage={pokesPerPage}
                allPokes = {allPokes.length}
                paginado = {paginado}
                />
            </div>
            <div>
            {
                currentPokes?.map( ( e, k ) =>{
                    return (
                        <div key={k}>
                            <Card 
                            key={e.id}
                            name={e.name}
                            image={e.img}
                            types={e.types} 
                            id={e.id}/>
                        </div>
                    )
                })
            }
                </div>
        </div>
    )
}
