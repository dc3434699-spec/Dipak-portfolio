import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Mail, Globe, ExternalLink } from 'lucide-react';
import styles from './Footer.module.css';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <Sprout className={styles.logoIcon} size={28} />
            <span>KisanSetu</span>
          </div>
          <p className="text-muted">
            Connecting farmers directly to consumers for fresh produce, 
            farm visits, and agricultural support.
          </p>
          <div className={styles.socials}>
            <a href="mailto:contact@kisansetu.in" aria-label="Email us"><Mail size={20} /></a>
            <a href="https://kisansetu.in" target="_blank" rel="noopener noreferrer" aria-label="Visit website"><Globe size={20} /></a>
            <a href="https://github.com/kisansetu" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><ExternalLink size={20} /></a>
          </div>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Marketplace</h4>
          <Link to="/marketplace">Fresh Vegetables</Link>
          <Link to="/marketplace">Organic Fruits</Link>
          <Link to="/marketplace">Dairy Products</Link>
          <Link to="/marketplace">Grains &amp; Pulses</Link>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Services</h4>
          <Link to="/visits">Farm Visits</Link>
          <Link to="/workers">Hire Workers</Link>
          <Link to="/machinery">Machinery Store</Link>
          <Link to="/marketplace">Agri-Consulting</Link>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Company</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
      <div className={styles.copyright}>
        <div className="container">
          <p>&copy; {new Date().getFullYear()} KisanSetu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
