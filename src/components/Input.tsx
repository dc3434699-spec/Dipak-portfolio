import React from 'react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    const containerClasses = `${styles.container} ${fullWidth ? styles.fullWidth : ''} ${className}`;
    
    return (
      <div className={containerClasses}>
        {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
        <input 
          id={inputId}
          ref={ref} 
          className={`${styles.input} ${error ? styles.inputError : ''}`} 
          {...props} 
        />
        {error && <span className={styles.errorText}>{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';
