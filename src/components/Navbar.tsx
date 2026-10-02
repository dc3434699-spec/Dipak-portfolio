import React, { useState, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Sprout, ShoppingCart } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CartDrawer } from './CartDrawer';
import styles from './Navbar.module.css';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const { cart } = useApp();

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const closeMenu = useCallback(() => setIsOpen(false), []);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    },
    [closeMenu]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleEscape]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? `${styles.navLink} ${styles.active}` : styles.navLink;

  return (
    <>
      <nav className={styles.navbar}>
        <div className={`container ${styles.navContainer}`}>
          <NavLink to="/" className={styles.logo}>
            <Sprout className={styles.logoIcon} />
            <span>KisanSetu</span>
          </NavLink>

          {/* Desktop Menu */}
          <div className={styles.desktopMenu}>
            <NavLink to="/marketplace" className={navLinkClass}>Marketplace</NavLink>
            <NavLink to="/visits" className={navLinkClass}>Farm Visits</NavLink>
            <NavLink to="/workers" className={navLinkClass}>Workers</NavLink>
            <NavLink to="/machinery" className={navLinkClass}>Machinery</NavLink>
          </div>

          <div className={styles.actions}>
            <button
              className={styles.cartBtn}
              onClick={() => setCartOpen(true)}
              aria-label={`Open cart (${cartCount} items)`}
            >
              <ShoppingCart size={22} />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>{cartCount}</span>
              )}
            </button>

            {/* Mobile Toggle */}
            <button
              className={styles.mobileToggle}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className={styles.mobileOverlay} onClick={closeMenu} aria-hidden="true" />
        )}

        {/* Mobile Menu */}
        {isOpen && (
          <div className={styles.mobileMenu}>
            <NavLink to="/marketplace" className={styles.mobileNavLink} onClick={closeMenu}>Marketplace</NavLink>
            <NavLink to="/visits" className={styles.mobileNavLink} onClick={closeMenu}>Farm Visits</NavLink>
            <NavLink to="/workers" className={styles.mobileNavLink} onClick={closeMenu}>Workers</NavLink>
            <NavLink to="/machinery" className={styles.mobileNavLink} onClick={closeMenu}>Machinery</NavLink>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
};
