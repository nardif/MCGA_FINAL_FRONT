import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../../redux/thunks';
import { useForm } from "react-hook-form";
import Button from '../../components/Sharedbuttons/buttons';
import Input from '../../components/SharedImputs/inputs';
import styles from './Products.module.css';
import Modal from '../../components/Sharedmodals';

const Products = () => {    //hace un get del dispatcher
    const dispatch = useDispatch();
    // busca el store
    const products = useSelector((store) => store.products.list);
    const error = useSelector((store) => store.products.error);
    const isLoading = useSelector((store) => store.products.isFetching);

    //modal
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [productToEdit, setProductToEdit] = useState();

    const {
        register, //Hook para tomar los inputs del form
        handleSubmit, //ejecuta el onSubmit
        formState: { errors },
        reset
      } = useForm({
        defaultValues: productToEdit || null,
      });

      useEffect(() => { // reset de hookforms para resetar con los valores del objeto
        reset(productToEdit)
      }, [reset,productToEdit])

      //AGREAGAR
      const onSubmit = (data) => {
        dispatch(createProduct(data));
        setIsAdding(false);
      };

      //UPDATE
      const handleUpdateProduct = (product) => {
        setIsEditing(true);
        setProductToEdit(product)
      };

      const submitEdit = (product) => {
        dispatch(updateProduct(productToEdit._id, {
            name: product.name,
            stock: product.stock,
            price: product.price
        }));
        setIsEditing(false);
        setProductToEdit({});
      }
      //DELETE
      const handleDeleteProduct = (id) => {
       dispatch(deleteProduct(id));
        
      };

    useEffect(() => {
        // trae la lista de produts cuando el store esta vacío
        if (!products.length) {
            // el dispatch ejecuta la acción asíncrona de redux para traer la lista de productos
            dispatch(getProducts());
        }
    }, [products, dispatch]);

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
                        <th className={styles.thead}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => {return (
                            <tr key={product._id}>
                            <td className={styles.tbody}>{product.name}</td>
                            <td className={styles.tbody}>$ {product.price}</td>
                            <td className={styles.tbody}>{product.stock}</td>
                            <td >
                            <Button value="Update" onClick={()=>handleUpdateProduct(product)}/>
                            <Button value="Delete" onClick={()=>handleDeleteProduct(product._id)}/>
                            </td>
                            </tr>
                        );
                        })}
                    </tbody>
                </table>
                
                <h3>Add a Product:</h3>
                <Button value='Add a product' onClick={() => {
                        setIsAdding(true)
                    }}
                />
                
                {/* Modal Add */}
                <Modal isOpen={isAdding} title={"Add a Product"} 
                    handleClose={() => {
                            setIsAdding(false)
                        }}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Input
                            type="text"
                            name={"name"}
                            register={register}
                            label="Name:"
                            required={true}
                            errors={errors.name}
                        />
                        <Input
                            type="number"
                            name={"price"}
                            register={register}
                            label="Price:"
                            required={true}
                            errors={errors.price}
                        />
                        <Input 
                            type="text"
                            name={"stock"}
                            register={register}
                            label="Stock:"
                            required={true}
                            errors={errors.stock} 
                        />
                        <Button value='send' type='submit'></Button>
                    </form>
                </Modal>

                {/* Modal Update */}
                <Modal isOpen={isEditing} title={"Update a Product"} 
                    handleClose={() => {
                        setIsEditing(false);
                        setProductToEdit({});
                        }}>
                    <form onSubmit={handleSubmit(submitEdit)}>
                        <Input
                            type="text"
                            name={"name"}
                            register={register}
                            label="Name:"
                            required={true}
                            errors={errors.name}
                        />
                        <Input
                            type="number"
                            name={"price"}
                            register={register}
                            label="Price:"
                            required={true}
                            errors={errors.price}
                        />
                        <Input 
                            type="text"
                            name={"stock"}
                            register={register}
                            label="Stock:"
                            required={true}
                            errors={errors.stock} 
                        />
                        <Button value='save' type='submit'></Button>
                    </form>
                </Modal>
      </section>
    );
};
  export default Products;