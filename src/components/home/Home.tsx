import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import FloatingButton from '../sharedComponents/FloatingButton';
import Drawer from '../sharedComponents/Drawer';
import LoginRegisterPopup from '../sharedComponents/LoginRegisterPopup';
import buildingsInfo from '../../storage/buildingsInfo.json';

export default function Home() {
    const [isTabOpen, setIsTabOpen] = useState(false);
    const [isAccountOpen, setIsAccountOpen] = useState(false);

    const toggleTab = () => {
        setIsTabOpen(!isTabOpen);
    };

    const toggleAccount = () => {
        setIsAccountOpen(!isAccountOpen);
    };

    return (
        <div className={"containerStyle"}>
            <div>
                <FloatingButton onClick={toggleTab} type={"filters"} />
                <FloatingButton onClick={toggleAccount} type={"account"} />
                <Drawer isOpen={isTabOpen} onClose={toggleTab}>
                    <div style={{ padding: '20px' }}>
                        <h2>Sliding Tab Content</h2>
                        <p>Put any content you want here, like settings, notifications, etc.</p>
                    </div>
                </Drawer>
                <LoginRegisterPopup isOpen={isAccountOpen} onClose={toggleAccount} />
            </div>
            <div className={"headerStyle"}>
                <p style={{ textAlign: 'center' }}>Hello World!</p>
            </div>
            <div className="buildings-list">
                {Object.keys(buildingsInfo).map((buildingKey) => {
                    const building = buildingsInfo[buildingKey];
                    return (
                        <Link to={`/building/${buildingKey}`} key={buildingKey} className="building-card">
                            <img src={building.image} alt={`${buildingKey} building`} />
                            <h3>{buildingKey.toUpperCase()}</h3>
                            <p>Number of Floors: {building.numberOfFloors}</p>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}