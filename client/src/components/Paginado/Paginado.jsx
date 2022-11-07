import React from 'react'; 
import styles from './paginado.module.css'

export default function Paginado({pokesPerPage, allPokes, paginado}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allPokes/pokesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className={styles.paginado}>
                {
                    pageNumbers && pageNumbers.map(number =>(
                    <li className={styles.number} key={number}>
                        <a className={styles.a} onClick={() => paginado(number)}>{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}