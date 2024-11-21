import React, { useState } from 'react';
import './LoginRegisterPopup.css';

type LoginRegisterPopupProps = {
    isOpen: boolean;
    onClose: () => void;
};

const LoginRegisterPopup: React.FC<LoginRegisterPopupProps> = ({ isOpen, onClose }) => {
    const [isLogin, setIsLogin] = useState(true);

    if (!isOpen) return null;

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <form className="form-login-register">
                    <h1 className="form-title-login-register">{isLogin ? 'Sign in to your account' : 'Create a new account'}</h1>
                    {
                        isLogin ? (
                            <div className="input-container-login-register">
                                <input placeholder="Enter username or email" type="email"/>
                            </div>
                        ) : (
                            <>
                                <div className="input-container-login-register">
                                    <input placeholder="Enter Username" type="text"/>
                                </div>
                                <div className="input-container-login-register">
                                    <input placeholder="Enter Email" type="text"/>
                                </div>
                                <div className="input-container-login-register">
                                    <input placeholder="Enter Display Name" type="text"/>
                                </div>
                            </>
                        )
                    }
                    <div className="input-container-login-register">
                        <input placeholder="Enter password" type="password" />
                    </div>
                    {
                        !isLogin && (
                            <div className="input-container-login-register">
                                <input placeholder="Confirm password" type="password" />
                            </div>
                        )
                    }
                    <button className="submit-login-register" type="submit">
                        {isLogin ? 'Sign in' : 'Register'}
                    </button>
                    <p className="signup-link-login-register">
                        {isLogin ? 'No account?' : 'Already have an account?'}
                        <a href="#" onClick={toggleForm}>{isLogin ? 'Sign up' : 'Sign in'}</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default LoginRegisterPopup;