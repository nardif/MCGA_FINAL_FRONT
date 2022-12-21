import React, {useContext} from "react";
import styles from "./Header.module.css";
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from "react-router-dom";
import Login from "../../screens/login";
import { logout } from "../../redux/actions";
import { HeaderContext } from "../../context/header-context";

const Header = () => {
  const { user } = useSelector(state => state.login);
  const headerCtx = useContext(HeaderContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  function onLogout() {
    dispatch(logout());
    navigate('/');
  }

  return (
    <header className={styles.header}>
      <h2 className={styles.h2_header}>CRUD Products App</h2>
      <p className={styles.p_header}>
        En algún lugar de la mancha cuyo nombre no quiero recordar -
        Con la Scaloneta hasta el final
      </p>
      
      <nav className={styles.navbar}>
        <div className={styles.navbar_container}>
          <ul className={styles.navbar_items}>
            <li className={styles.nav_buttons}>
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            {!user && <li>
              <button onClick={headerCtx.showLoginModal}>Login</button>
            </li>}
            { user && <li>
                <div>
                  <button className={styles.button} onClick={onLogout}>Logout</button>
                </div>
            </li>
            }
            {user && <li>
                {user.name}
              </li>}
            </ul>
        </div>
      </nav>
      <Login visible={headerCtx.isLoginModalVisible} onHide={headerCtx.onHideLoginModal} />
    </header>
  );
};

export default Header;