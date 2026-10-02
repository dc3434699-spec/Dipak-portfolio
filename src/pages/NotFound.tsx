import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBasket, Calendar, Users, Tractor, Home } from 'lucide-react';
import { Button } from '../components/Button';
import styles from './NotFound.module.css';

const SUGGESTIONS = [
  { label: 'Marketplace', to: '/marketplace', icon: <ShoppingBasket size={16} /> },
  { label: 'Farm Visits', to: '/visits', icon: <Calendar size={16} /> },
  { label: 'Workers', to: '/workers', icon: <Users size={16} /> },
  { label: 'Machinery', to: '/machinery', icon: <Tractor size={16} /> },
];

export const NotFound: React.FC = () => {
  return (
    <div className={`container ${styles.notFound}`}>
      <div className={styles.errorCode}>404</div>
      <div className={styles.illustration}>🌾</div>
      <h2 className={`font-serif ${styles.title}`}>Page Not Found</h2>
      <p className={styles.description}>
        Looks like this field hasn't been sown yet. The page you're looking for doesn't exist or was moved.
      </p>

      <div className={styles.suggestions}>
        <p>Explore our sections:</p>
        <div className={styles.suggestionLinks}>
          {SUGGESTIONS.map((s) => (
            <Link key={s.to} to={s.to} className={styles.suggestionLink}>
              {s.icon} {s.label}
            </Link>
          ))}
        </div>
      </div>

      <div className={styles.actions}>
        <Link to="/">
          <Button>
            <Home size={18} />
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
};
