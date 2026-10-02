import React from 'react';
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
            <a href="#" aria-label="Email"><Mail size={20} /></a>
            <a href="#" aria-label="GitHub"><Globe size={20} /></a>
            <a href="#" aria-label="Website"><ExternalLink size={20} /></a>
          </div>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Marketplace</h4>
          <a href="#">Fresh Vegetables</a>
          <a href="#">Organic Fruits</a>
          <a href="#">Dairy Products</a>
          <a href="#">Grains & Pulses</a>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Services</h4>
          <a href="#">Farm Visits</a>
          <a href="#">Hire Workers</a>
          <a href="#">Machinery Store</a>
          <a href="#">Agri-Consulting</a>
        </div>
        
        <div className={styles.linksGroup}>
          <h4>Company</h4>
          <a href="#">About Us</a>
          <a href="#">Contact</a>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
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
