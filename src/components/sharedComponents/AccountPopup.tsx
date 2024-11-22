// src/components/AccountPopup.tsx
import React from 'react';
import { clearUserSession, isLoggedIn, getUser } from '../../session/session';

const AccountPopup = ({ onLoginRegister, onLogout, onMyAccount }) => {
    return (
        <div className="account-popup">
            {isLoggedIn() ? (
                <>
                    <p>Welcome, {getUser().username}</p>
                    <button onClick={onMyAccount}>My Account</button>
                    <button onClick={onLogout}>Logout</button>
                </>
            ) : (
                <button onClick={onLoginRegister}>Login or Register</button>
            )}
        </div>
    );
};

export default AccountPopup;