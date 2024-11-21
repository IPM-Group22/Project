import React, { useState } from "react";
import './Account.css';

const Account = () => {
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const renderContent = () => {
        console.log(selectedOption);
        switch (selectedOption) {
            case 'About User':
                return <div>About User</div>;
            case 'Change Password':
                return <div>Change Password</div>;
            default:
                return <div>Select an option from the sidebar</div>;
        }
    }

    return (
        <div className="account-container">
            <div className="account-sidebar">
                <h1>Account Page</h1>
                <ul>
                    <li><button onClick={() => setSelectedOption('About User')}>About User</button></li>
                    <li><button onClick={() => setSelectedOption('Change Password')}>Change Password</button></li>
                    <li><button onClick={() => setSelectedOption('See Reservations')}>See Reservations</button></li>
                    <li><button onClick={() => setSelectedOption('Logout')}>Logout</button></li>
                </ul>
            </div>
            <div className="account-content">
                {renderContent()}
            </div>
        </div>
    );
}

export default Account;