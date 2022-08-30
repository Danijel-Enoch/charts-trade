import React, { useState } from "react";
import './LoginModal.styles';
import { ModalWrapper, AlertDanger, ModalForm, ModalHead, ModalSpan, AlertSent, ModalBody, ModalInput, ModalActions, ModalButton } from "./LoginModal.styles";

const LoginModal = props => {
    const {show, close } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showErrors, setShowErrors] = useState(false);
    const [errorMsgs, setErrorMsgs] = useState([]);
    const [mailSent, setMailSent] = useState(false);

    if (!show) {
        return null;
      }
      const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsgs([]);
        setMailSent(false);   

        let isValidEmail = false;   
        if ( !email && !password) {
            setErrorMsgs(errorMsgs => [...errorMsgs, 'Email and Password is a required field.']);
            setShowErrors(true);
            return false;
          }
          if (!email) {
            setErrorMsgs(errorMsgs => [...errorMsgs, 'Email is a required field.']);
          } else {
            if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
              setErrorMsgs(errorMsgs => [...errorMsgs, 'Invalid email address.']);
            } else {
              isValidEmail = true;
            }
          }  
          if (!password) {
            setErrorMsgs(errorMsgs => [...errorMsgs, 'Password is a required field.']);
            return false;
          }
          if (isValidEmail) {
            setShowErrors(false);
            setMailSent(true);
            setEmail('');
      setPassword('')

      // Close Modal after success.
      setTimeout(close,1000);
    }

  }

    return (
        <>
        <ModalWrapper>
        <ModalForm action="" method="post" onSubmit={handleSubmit} autoComplete="off">
          <ModalHead>Login</ModalHead>  
          <ModalSpan onClick={close} title="Close">&times;</ModalSpan>
          {
          showErrors ? errorMsgs.map((msg, index) => {
              return <AlertDanger key={index}>{msg}</AlertDanger>;
          }) 
          : 
          ''
          }
          {
            mailSent ? <AlertSent>You are Logged In!</AlertSent> : ''
          }
          <ModalBody>
              <div className="mdrow">
                <ModalInput 
                  type="email"
                  placeholder = "Enter your email."
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
                </div>
              <div className="mdrow">
                <ModalInput 
                  type="password"
                  placeholder = "Enter your password."
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
          </ModalBody> 
          <ModalActions>
            <ModalButton type="submit">Login</ModalButton>
          </ModalActions> 
        </ModalForm>
      </ModalWrapper>
    </>
  );
}

export default LoginModal