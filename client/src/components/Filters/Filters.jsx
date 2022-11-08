import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTypes, filterCreated, filterType, orderByName } from '../../redux/actions';


const Filters = ({setCurrentPage, setOrder}) => {
    const dispatch = useDispatch();
    const allTypes = useSelector( (state) => state.types );

    useEffect(()=>{
        dispatch(getAllTypes())
    }, [dispatch]);

    const handleFilterCreated = (e) => {
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }

    const handleFilterType = (e) =>{
        e.preventDefault();
        dispatch(filterType(e.target.value))
        setCurrentPage(1);
    };

    const handleOrderName = (e) => {
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`); //!!!ARREGLAR!!!!
    };

    return (
        <div>
            {/* <div>
                <SearchBar/>
            </div> */}
            <div>
                <h4>FILTROS</h4>
                <label>Creados - Api</label>
                <select onChange={ e => {handleFilterCreated(e)}}>
                    <option value="all">TODOS</option>
                    <option value="api">API</option>
                    <option value="created">CREADOS</option>
                </select> 

                <label>TIPOS</label>
                <select onChange={ e => {handleFilterType(e)}}>
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
                <h4>Order</h4>
                <select>
                    {/* <option>POR ATAQUE</option>
                    <option value="asc" onClick={e => {handleFilterAtt(e)}}>ASC</option>
                    <option value="desc"  onClick={e => {handleFilterAtt(e)}}>DESC</option> */}
                    <option>ALFABETICAMENTE</option>
                    <option value="asc" onClick={e => {handleOrderName(e)}}>A - Z</option>
                    <option value="desc" onClick={e => {handleOrderName(e)}}>Z - A</option>
                </select>
            </div>
        </div>
    )
}

export default Filters;