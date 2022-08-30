import React, { useState } from "react";
// import styled from 'styled-components';!
import LoginModal from "./login-modal/LoginModal";
import "./Navbar.styles";
import { Container, NavbarWrap, NavFlex, Login, LoginText } from "./Navbar.styles";

export default function Navbar() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const handleShowLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  };
  return (
    <>
      <Container>
        <NavbarWrap>
    
            <NavFlex>

              <LoginModal show={showLoginModal} close={handleShowLoginModal} />

              <Login>
                <LoginText onClick={handleShowLoginModal}>Login</LoginText>
              </Login>
              <Login>
                <LoginText>Signup</LoginText>
              </Login>
            </NavFlex>
        </NavbarWrap>
      </Container>
    </>
  );
}
