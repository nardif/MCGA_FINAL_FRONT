import {useContext} from "react";
import { useSelector } from "react-redux";
import { HeaderContext } from "../context/header-context";


const AuthGuard = ({ children }) => {
  const {user} = useSelector(state => state.login)
  const headerCtx = useContext(HeaderContext);

  if (!user) {
    headerCtx.showLoginModal()
    return
  }

  return children
}

export default AuthGuard;