import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/thunks';
import { useForm } from "react-hook-form";
import Button from '../../components/Sharedbuttons/buttons';
import Input from '../../components/SharedImputs/inputs';
import styles from '../products/Products.module.css';
import Modal from '../../components/Sharedmodals';


const Login = ({ visible, onHide }) => {    //hace un get del dispatcher
    const dispatch = useDispatch();

    //modal
    const[userToLogin, setUserToLogin] = useState();


    const {
        register, //Hook para tomar los inputs del form
        handleSubmit, //ejecuta el onSubmit
        formState: { errors },
        setError
      } = useForm({
        defaultValues: {
          email: 'florencia@gmail.com',
          password: ''
        }
      });

      
      const submitLoggin = async (user) => {
        try {      
          setUserToLogin(user)
          await dispatch(login({
              email: user.email,
              password: user.password
          }));
          onHide()
          setUserToLogin({});
        } catch(err) {
          setError('email', { type: 'custom', message: 'Credenciales erróneas' });
          setError('password', { type: 'custom', message: 'Credenciales erróneas' });
        }
      }

      const handleClose = () => {
        onHide()
        setUserToLogin({});
      }

    return (
      <section className={styles.body}>
                {/* Modal LOGIN */}
                <Modal  isOpen={visible} title={"Please log in"}
                    handleClose={handleClose}>
                    <form onSubmit={handleSubmit(submitLoggin)}>
                        <Input
                            type="text"
                            name={"email"}
                            register={register}
                            label="Email:"
                            required={true}
                            errors={errors.email}
                        />
                        <Input
                            type="password"
                            name={"password"}
                            register={register}
                            label="Password:"
                            required={true}
                            errors={errors.password}
                        />
                        <Button value='Login' type='submit'></Button>
                    </form>
                </Modal>
      </section>
    );
};
  export default Login;