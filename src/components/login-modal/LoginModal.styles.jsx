import styled from "styled-components";

export const ModalWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.2);
  @media screen  and (max-width: 400px) {
    background-color: #ffffff;
`;
export const ModalForm = styled.form`
    padding: 30px;
    background: #ffffff;
    position: fixed;
    top: calc(50% - 200px);
    left: calc(50% - 200px);
    width: 100%;
    max-width: 450px;
    height: 300px;
    box-sizing: border-box;
    box-shadow: 2px 2px 5px 0px rgba(0, 0, 0, 0.1);
  
    @media screen  and (max-width: 400px) {
      left: 0;
    }  
`;
export const ModalHead = styled.h3`
    margin-top:0;
    margin-bottom: 20px; 
    font-size: 24px;
    text-align: center;
    color: #117CA6;
`;
export const ModalSpan = styled.span`
    font-size: 40px;
    position: absolute;
    top: 10px;
    right: 20px;
    cursor: pointer;
    @media screen  and (max-width: 400px) {
      position: fixed;
    }  
`;
export const AlertDanger = styled.div`

`;
export const ModalBody = styled.div`
margin-bottom: 25px;
    .mdrow {
      margin-bottom: 20px;
      input {
        width: 100%;
        padding: 5px 10px;
        min-height: 40px;
        box-sizing: border-box;
        border-radius: 0;
        border: 1px solid #cccccc;
      }
    }
`;
export const ModalInput = styled.input`

`;
export const ModalActions = styled.div`
text-align: center;
.btnui {
  font-size: 14px;
  padding: 12px 20px;
  color: #fff;
  background-color: #117CA6;
  border: unset;
  cursor: pointer;
  text-transform: uppercase;
  margin-left: 5px;
}
`;
export const ModalButton = styled.button`
width: 60px;
height: 40px;
background: #1a73e8;
cursor: pointer;
color: white;
border-radius: 20%;
border: #1a73e8 1px solid;
`;
export const AlertSent = styled.div`
color: hsl(110, 92%, 25%);
    background-color: hsl(109, 41%, 90%);
  }
`;