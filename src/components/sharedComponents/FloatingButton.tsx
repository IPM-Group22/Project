import React from 'react';
import './LeftSideFloatingButton.css';
import './RightSideFloatingButton.css';
import './LeftSideSearchButton.css';
// @ts-ignore
import searchIcon from "../../../media/searchIcon.png";
// @ts-ignore
import accountIcon from "../../../media/user.png";
// @ts-ignore
import home from "../../../media/home.png";
// @ts-ignore
import back from "../../../media/back.png";
// @ts-ignore
import filter from "../../../media/filter.png";

type FloatingButtonProps = {
    onClick: () => void;
    type: 'filters' | 'account' | 'back' | 'home' | 'search';
};

const floatingButtonTypes = [
    "filters",
    "account",
    "back",
    "home",
    "search"
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
            icon = filter;
            break;
        case 'account':
            className = 'right-side-floating-button';
            icon = accountIcon;
            break;
        case 'back':
            className = 'left-side-floating-button';
            icon = back;
            break;
        case 'home':
            className = 'left-side-floating-button';
            icon = home;
            break;
        case 'search':
            className = 'left-side-search-button';
            icon = searchIcon;
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