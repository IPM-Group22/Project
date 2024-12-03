import React from 'react';
import './LeftSideFloatingButton.css';
import './RightSideFloatingButton.css';
import './LeftSideSearchButton.css';
import './RighSideLanguageButton.css';
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
// @ts-ignore
import languageIcon from "../../../media/language.png";

import { getUserLanguage, setUserLanguage } from "../../session/session.js";

import translations from '../../storage/translations.json';
let language = getUserLanguage();
let translation = translations[language].floatingButton;

interface FloatingButtonProps {
    onClick: () => void;
    type: string;
}

const floatingButtonTypes = [
    "filters",
    "account",
    "back",
    "home",
    "search",
    "language"
];

const FloatingButton: React.FC<FloatingButtonProps> = ({ onClick, type }) => {
    if (!floatingButtonTypes.includes(type)) {
        return null;
    }

    let className;
    let icon;
    let title;

    switch (type) {
        case 'filters':
            className = 'left-side-floating-button';
            icon = filter;
            title = translation.filters;
            break;
        case 'account':
            className = 'right-side-floating-button';
            icon = accountIcon;
            title = translation.account;
            break;
        case 'back':
            className = 'left-side-floating-button';
            icon = back;
            title = translation.back;
            break;
        case 'home':
            className = 'left-side-floating-button';
            icon = home;
            title = translation.home;
            break;
        case 'search':
            className = 'left-side-search-button';
            icon = searchIcon;
            title = translation.search;
            break;
        case 'language':
            className = 'right-side-language-button';
            icon = languageIcon;
            title = translation.language;
            break;
        default:
            return null;
    }

    return (
        <button className={className} onClick={onClick} title={title}>
            <img src={icon} alt={`${type} icon`} className="floating-button-icon" />
        </button>
    );
};

export default FloatingButton;