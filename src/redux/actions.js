import { GET_LOGIN_PENDING,
  GET_LOGIN_SUCCESS,
  GET_LOGIN_ERROR,
  GET_PRODUCTS_PENDING,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_PRODUCT_BY_ID_PENDING,
  GET_PRODUCT_BY_ID_SUCCESS,
  GET_PRODUCT_BY_ID_ERROR,
  CREATE_PRODUCT_PENDING,
  CREATE_PRODUCT_SUCCESS,
  CREATE_PRODUCT_ERROR,
  UPDATE_PRODUCT_PENDING,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_ERROR,
  DELETE_PRODUCT_PENDING,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_ERROR,
  CLEAN_ERROR,
  CLEAN_SELECTED_ITEM,
  SET_USER,
  SET_TOKEN,
  LOGOUT,
 } from "./types";

export const getLoginPending = () => {
  return {
    type: GET_LOGIN_PENDING
  };
};

export const getLoginSuccess = (data) => {
  return {
    type: GET_LOGIN_SUCCESS,
    payload: data
  };
};

export const getLoginError = (error) => {
  return {
    type: GET_LOGIN_ERROR,
    payload: error
  };
};

export const getProductsPending = () => {
  return {
    type: GET_PRODUCTS_PENDING
  };
};

export const getProductsSuccess = (data) => {
  return {
    type: GET_PRODUCTS_SUCCESS,
    payload: data
  };
};
export const getProductsError = (error) => {
  return {
    type: GET_PRODUCTS_ERROR,
    payload: error
  };
};

export const getProductByIdPending = () => {
  return {
    type: GET_PRODUCT_BY_ID_PENDING
  };
};

export const getProductByIdSuccess = (data) => {
  return {
    type: GET_PRODUCT_BY_ID_SUCCESS,
    payload: data
  };
};

export const getProductByIdError = (error) => {
  return {
    type: GET_PRODUCT_BY_ID_ERROR,
    payload: error
  };
};

export const createProductPending = () => {
  return {
    type: CREATE_PRODUCT_PENDING
  };
};

export const createProductSuccess = (data) => {
  return {
    type: CREATE_PRODUCT_SUCCESS,
    payload: data
  };
};

export const createProductError = (error) => {
  return {
    type: CREATE_PRODUCT_ERROR,
    payload: error
  };
};

export const updateProductPending = () => {
  return {
    type: UPDATE_PRODUCT_PENDING
  };
};

export const updateProductSuccess = (data) => {
  return {
    type: UPDATE_PRODUCT_SUCCESS,
    payload: data
  };
};

export const updateProductError = (error) => {
  return {
    type: UPDATE_PRODUCT_ERROR,
    payload: error
  };
};

export const deleteProductPending = () => {
  return {
    type: DELETE_PRODUCT_PENDING
  };
};

export const deleteProductSuccess = (id) => {
  return {
    type: DELETE_PRODUCT_SUCCESS,
    payload: id
  };
};

export const deleteProductError = (error) => {
  return {
    type: DELETE_PRODUCT_ERROR,
    payload: error
  };
};

export const cleanError = () => {
  return {
    type: CLEAN_ERROR
  };
};

export const cleanSelectedItem = () => {
  return {
    type: CLEAN_SELECTED_ITEM
  };
};

export const setUser = (user) => {
  localStorage.setItem(process.env.REACT_APP_USER_KEY, JSON.stringify(user));
  return {
    type: SET_USER,
    payload: user
  }
}

const TOKEN_KEY = process.env.REACT_APP_TOKEN_KEY
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
  return {
    type: SET_TOKEN,
    payload: token
  }
}

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(process.env.REACT_APP_USER_KEY);
  return{
    type:LOGOUT,
    payload: {
      user: null,
      token: null
    }
  }
}
