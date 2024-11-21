import React from 'react';
import './LeftSideFloatingButton.css';
import './RightSideFloatingButton.css';
// @ts-ignore
import searchIcon from "../../../media/searchIcon.png";
// @ts-ignore
import accountIcon from "../../../media/user.png";

type FloatingButtonProps = {
    onClick: () => void;
    type: 'filters' | 'account';
};

const floatingButtonTypes = [
    "filters",
    "account",
    "back",
]

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, type }) => {
    if (type !in floatingButtonTypes) {
        return null;
    }

    let className;
    let icon;

    switch (type) {
        case 'filters':
            className = 'left-side-floating-button';
            icon = searchIcon;
            break;
        case 'account':
            className = 'right-side-floating-button';
            icon = accountIcon;
            break;
        default:
            className = '';
            icon = '';
    }

    return (
        <button className={className} onClick={onClick}>
            <img src={icon} alt={`${icon} Icon`} className="floating-button-icon"/>
        </button>
    );
};

export default FloatingButton;