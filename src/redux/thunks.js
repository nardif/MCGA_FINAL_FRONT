import {
    getProductsPending,
    getProductsSuccess,
    getProductsError,
    createProductPending,
    createProductSuccess,
    createProductError,
    updateProductPending,
    updateProductSuccess,
    updateProductError,
    getProductByIdPending,
    getProductByIdSuccess,
    getProductByIdError,
    deleteProductPending,
    deleteProductSuccess,
    deleteProductError,
    getLoginPending,
    getLoginSuccess,
    getLoginError,
    setUser,
    setToken,
    logout
  } from './actions';
  
  // define las funciones

    export const login = (credentials) => {
      return async (dispatch) => {
        dispatch(getLoginPending());
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials)
        };
        return await fetch(`${process.env.REACT_APP_API}/auth/login`, options)
          .then(async (response) => {
            if (response.status !== 200) {
              return response.json().then(({ message }) => {
                throw new Error(message);
              });
            }
            return response.json();
          })
          .then((response) => {
            dispatch(getLoginSuccess(response.data));
            // seteamos el token y usario
            dispatch(setUser(response.data));
            dispatch(setToken(response.data.token));
            return response.data;
          })
          .catch((error) => {
            dispatch(getLoginError(error.toString()));
            throw error
          });
      };
    };

  export const getUserData = () => async(dispatch, getState) => {
    try {
      const token = getState().login.token;
      if (!token) {
        return;
      }
      dispatch(getLoginPending());
      const response = await fetch(`${process.env.REACT_APP_API}/auth/me`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token
        },
        body: JSON.stringify({
          token
        })
      })
      if (!response.ok) {
        throw new Error('No se pudo autorizar :c');
      }
      const user = await response.json();
      dispatch(setUser(user.data));
    } catch (error) {
      dispatch(logout());
      dispatch(getLoginError(error.toString()));
    }
  }

  export const getProducts = () => {
    return (dispatch, getState) => {
      dispatch(getProductsPending());
      const token = getState().login.token;
      // request a backend
      return fetch(`${process.env.REACT_APP_API}/products`, {
        headers: {
          token: token
        }
      })
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          // guarda la respuesta en redux
          dispatch(getProductsSuccess(response.data));
        })
        .catch((error) => {
          // ejecuta la accion para guardar el error en redux, recordar que los objetos se pasan como strings
          dispatch(getProductsError(error.toString()));
        });
    };
  };
  
  // usamos el parametro id para mandarselo al backend
  export const getProductById = (id) => {
    return (dispatch) => {
      dispatch(getProductByIdPending());
      return fetch(`${process.env.REACT_APP_API}/products?_id=${id}`)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          dispatch(getProductByIdSuccess(response.data[0]));
          return response.data[0];
        })
        .catch((error) => {
          dispatch(getProductByIdError(error.toString()));
        });
    };
  };
  
  export const createProduct = (values) => {
    return (dispatch, getState) => {
      dispatch(createProductPending());
      const token = getState().login.token
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          token: token
        },
        body: JSON.stringify(values)
      };
      return fetch(`${process.env.REACT_APP_API}/products`, options)
        .then((response) => {
          if (response.status !== 201) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          dispatch(createProductSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(createProductError(error.toString()));
        });
    };
  };
  
  export const updateProduct = (id, values) => {
    return (dispatch) => {
      dispatch(updateProductPending());
      const options = {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(values)
      };
      return fetch(`${process.env.REACT_APP_API}/products/${id}`, options)
        .then((response) => {
          if (response.status !== 200) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          return response.json();
        })
        .then((response) => {
          dispatch(updateProductSuccess(response.data));
          return response.data;
        })
        .catch((error) => {
          dispatch(updateProductError(error.toString()));
        });
    };
  };
  
  export const deleteProduct = (id) => {
    return (dispatch) => {
      dispatch(deleteProductPending());
      return fetch(`${process.env.REACT_APP_API}/products/${id}`, { method: 'DELETE' })
        .then((response) => {
          if (response.status !== 204) {
            return response.json().then(({ message }) => {
              throw new Error(message);
            });
          }
          dispatch(deleteProductSuccess(id));
        })
        .catch((error) => {
          dispatch(deleteProductError(error.toString()));
        });
    };
  };
  