import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/thunks';
import { useForm } from "react-hook-form";
import styles from '../products/Products.module.css';


const Home = () => {
    const dispatch = useDispatch();
    // busca el store
    const products = useSelector((store) => store.products.list);
    const error = useSelector((store) => store.products.error);
    const isLoading = useSelector((store) => store.products.isFetching);

    useEffect(() => {
        // trae la lista de produts cuando el store esta vacío
        if (!products.length) {
            // el dispatch ejecuta la acción asíncrona de redux para traer la lista de productos
            dispatch(getProducts());
        }
    }, [products]);

    if (error) {
        return <p>Error </p>
    }
  
    if (isLoading) {
        return <p>Loading... </p>
    }

    return (
        <section className={styles.body}>
        
            <table className={styles.table}>
                    <thead>
                        <tr>
                        <th className={styles.thead}>Name</th>
                        <th className={styles.thead}>Price</th>
                        <th className={styles.thead}>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {return (
                            <tr key={product._id}>
                            <td className={styles.tbody}>{product.name}</td>
                            <td className={styles.tbody}>$ {product.price}</td>
                            <td className={styles.tbody}>{product.stock}</td>
                            </tr>
                        );
                        })}
                    </tbody>
            </table>
      </section>
    )
}
export default Home

