import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';
import styles from './NotFound.module.css';

export const NotFound: React.FC = () => {
  return (
    <div className={`container ${styles.notFound}`}>
      <h1 className={styles.errorCode}>404</h1>
      <h2 className="font-serif">Page Not Found</h2>
      <p className="text-muted">We couldn't find the page you're looking for.</p>
      <Link to="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
};
