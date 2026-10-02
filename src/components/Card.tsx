import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, interactive = false, className = '', ...props }) => {
  const classes = `${styles.card} ${interactive ? styles.interactive : ''} ${className}`;
  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};
