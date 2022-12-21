import { useState, createContext } from "react";

export const HeaderContext = createContext()

const HeaderContextProvider = ({ children }) => {
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false)
  function showLoginModal() {
    setIsLoginModalVisible(true)
  }

  function onHideLoginModal() {
    setIsLoginModalVisible(false)
  }

  const value = {
    isLoginModalVisible,
    showLoginModal,
    onHideLoginModal
  }

  return <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
}

export default HeaderContextProvider