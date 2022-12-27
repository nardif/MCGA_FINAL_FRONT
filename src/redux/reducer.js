import {
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
    CLEAN_SELECTED_ITEM
  } from './types';
  
  const initialState = {
    isFetching: false,
    list: [],
    selectedItem: {},
    error: ''
  };
  
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_PRODUCTS_PENDING: {
        return {
          ...state,
          isFetching: true,
          error: initialState.error
        };
      }
      case GET_PRODUCTS_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          list: action.payload
        };
      }
      case GET_PRODUCTS_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      }
      case GET_PRODUCT_BY_ID_PENDING: {
        return {
          ...state,
          isFetching: true,
          error: initialState.error,
          selectedItem: initialState.selectedItem
        };
      }
      case GET_PRODUCT_BY_ID_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          selectedItem: action.payload
        };
      }
      case GET_PRODUCT_BY_ID_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      }
      case CREATE_PRODUCT_PENDING: {
        return {
          ...state,
          isFetching: true,
          error: initialState.error
        };
      }
  case CREATE_PRODUCT_SUCCESS: {  //agrega el nuevo producto a la lista
        return {
          ...state,
          isFetching: false,
          list: [...state.list, action.payload]
        };
      }
      case CREATE_PRODUCT_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      }
      case UPDATE_PRODUCT_PENDING: {
        return {
          ...state,
          isFetching: true,
          error: initialState.error
        };
      }
      case UPDATE_PRODUCT_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          list: state.list.map((item) => {
            if (item._id === action.payload._id) {
              return action.payload;
            }
            return item;
          })
        };
      }
      case UPDATE_PRODUCT_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      }
      case DELETE_PRODUCT_PENDING: {
        return {
          ...state,
          isFetching: true,
          error: initialState.error
        };
      }
      case DELETE_PRODUCT_SUCCESS: {
        return {
          ...state,
          isFetching: false,
          list: state.list.filter((item) => item._id !== action.payload)
        };
      }
      case DELETE_PRODUCT_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.payload
        };
      }
      case CLEAN_ERROR: {
        return {
          ...state,
          error: initialState.error
        };
      }
      case CLEAN_SELECTED_ITEM: {
        return {
          ...state,
          selectedItem: initialState.selectedItem
        };
      }
      default: {
        return state;
      }
    }
  };
  
  export default reducer;