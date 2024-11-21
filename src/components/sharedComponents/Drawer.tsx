import React from 'react';
import './FiltersDrawer.css';

type Drawer = {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
};

const Drawer: React.FC<Drawer> = ({ isOpen, onClose }) => (
    <div className={`sliding-tab ${isOpen ? 'open' : ''}`}>
        <button className="sliding-tab-close-btn" onClick={onClose}>
            Close
        </button>
    </div>
);

export default Drawer;