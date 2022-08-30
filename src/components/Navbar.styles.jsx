import styled from "styled-components";

export const Container = styled.div`
margin: 0;
padding: 0;
font-family: 'Montserrat', sans-serif;
`;
export const NavbarWrap = styled.div`
height: 88px;
background: #0F3460;
`;
export const NavLogo = styled.div`
width: 80px;
height: 50px;
background: #E94560;
margin: 10px 0 0 30px;
`;
export const NavFlex = styled.div`
display: flex;
display: flex;
    justify-content: end;
    margin-right: 100px;
    padding-top: 15px
`;
export const Login = styled.div`
width: 86px;
height: 60px;
background: #1a73e8;;
cursor: pointer;
margin-right: 30px;
border-radius: 20%;
&:hover {
    color: #0F3460;
    transition: all 0.5s ease-out;
  }
`;
export const LoginText = styled.div`
display: flex;
justify-content: center;
text-align: center;
color: white;
padding-top: 20px;
`;