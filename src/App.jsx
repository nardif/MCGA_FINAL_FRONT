import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { getUserData } from './redux/thunks';
import Routes from './Routes';


const App = () =>{
  const dispatch = useDispatch();
  const { token } = useSelector(state => state.login);
  useEffect(() => {
    if (token) {
      dispatch(getUserData());
    }
  }, [])

return(
  <Routes/>
)
}

export default App;
