import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sprout } from 'lucide-react';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={styles.navbar}>
      <div className={`container ${styles.navContainer}`}>
        <NavLink to="/" className={styles.logo}>
          <Sprout className={styles.logoIcon} />
          <span>KisanSetu</span>
        </NavLink>

        {/* Desktop Menu */}
        <div className={styles.desktopMenu}>
          <NavLink to="/marketplace" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Marketplace</NavLink>
          <NavLink to="/visits" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Farm Visits</NavLink>
          <NavLink to="/workers" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Workers</NavLink>
          <NavLink to="/machinery" className={({isActive}) => isActive ? `${styles.navLink} ${styles.active}` : styles.navLink}>Machinery</NavLink>
        </div>

        {/* Mobile Toggle */}
        <button className={styles.mobileToggle} onClick={toggleMenu} aria-label="Toggle Menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className={styles.mobileMenu}>
          <NavLink to="/marketplace" className={styles.mobileNavLink} onClick={toggleMenu}>Marketplace</NavLink>
          <NavLink to="/visits" className={styles.mobileNavLink} onClick={toggleMenu}>Farm Visits</NavLink>
          <NavLink to="/workers" className={styles.mobileNavLink} onClick={toggleMenu}>Workers</NavLink>
          <NavLink to="/machinery" className={styles.mobileNavLink} onClick={toggleMenu}>Machinery</NavLink>
        </div>
      )}
    </nav>
  );
};
