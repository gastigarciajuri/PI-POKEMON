import React from 'react';
import { useEffect } from 'react'; // useState,
import { useDispatch, useSelector } from 'react-redux';
import { getAllPokemons, getAllTypes } from '../redux/actions';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Card from './Card';

export default function Home() {
    const dispatch = useDispatch();
    const allPokes = useSelector((state) => state.pokemones)
    const allTypes = useSelector((state) => state.types)


    useEffect(()=>{
        dispatch(getAllPokemons())
    }, [dispatch]);
    console.log("Get all pokes", getAllPokemons())
    useEffect(()=>{
        dispatch(getAllTypes())
    }, [dispatch]);
    
    
    function handleClick(e){
        e.preventDefault();
        dispatch(getAllPokemons());
    }
    return (
        <div>
            <Link to = '/pokemon'> Crear personaje </Link>
            <h1> PokeA'P.I' </h1>
            <button onClick={e=> {handleClick(e)}}>
                Reload
            </button>
            <div>
                <h4>FILTROS</h4>
                <label> CREADOS - API</label>
                <select>
                    <option value="all">TODOS</option>
                    <option value="api">TRAIDOS DE API</option>
                    <option value="created">CREADOS</option>
                </select>

                <label>TIPOS</label>
                <select>
                    <option value="all">TODOS</option>
                    {
                        allTypes?.map(e => {
                            return (
                                <option key={e.id} value={e.name}>{e.name.toUpperCase()}</option>
                            )
                        })
                    }
                </select>
            </div>
            
            <div>
                <h4>ORDENES</h4>
                <select>
                    <option>ATAQUE</option>
                    <option value="asc"> ASC </option>
                    <option value= "desc"> DESC </option>
                    <option>ALFABETICAMENTE</option>
                    <option value="asc"> A - Z </option>
                    <option value="desc"> Z - A </option>
                </select>
            {
                allPokes?.map( e =>{
                    return (
                        <Fragment>
                            <Link to={"/home/" + e.id}>
                            <Card name={e.name} image={e.img} types={e.types} id={e.id}/>
                            </Link>
                        </Fragment>
                    )
                })
            }
            </div>
        </div>
    )
}
