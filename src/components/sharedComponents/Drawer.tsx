import React from 'react';
import './FiltersDrawer.css';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, children }) => (
  <div className={`sliding-tab ${isOpen ? 'open' : ''}`}>
    <div className="sliding-tab-content">
      <button className="sliding-tab-close-btn" onClick={onClose}>
        Close
      </button>
      {/* Render children passed to the Drawer */}
      {children}
    </div>
  </div>
);

export default Drawer;
