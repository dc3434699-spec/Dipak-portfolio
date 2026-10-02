import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import styles from './ToastContainer.module.css';

const ICONS = {
  success: <CheckCircle size={18} />,
  error: <XCircle size={18} />,
  info: <Info size={18} />,
};

const TYPE_CLASS = {
  success: styles.toastSuccess,
  error: styles.toastError,
  info: styles.toastInfo,
};

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useApp();

  return (
    <div className={styles.container} aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
      ))}
    </div>
  );
};

interface ToastItemProps {
  toast: { id: string; message: string; type: 'success' | 'error' | 'info' };
  onDismiss: (id: string) => void;
}

const ToastItem: React.FC<ToastItemProps> = ({ toast, onDismiss }) => {
  const [dismissing, setDismissing] = useState(false);

  const handleDismiss = () => {
    setDismissing(true);
    setTimeout(() => onDismiss(toast.id), 240);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDismissing(true);
    }, 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`${styles.toast} ${TYPE_CLASS[toast.type]} ${dismissing ? styles.dismissing : ''}`}
      role="alert"
    >
      <span className={styles.icon}>{ICONS[toast.type]}</span>
      <span className={styles.message}>{toast.message}</span>
      <button className={styles.closeBtn} onClick={handleDismiss} aria-label="Dismiss notification">
        <X size={14} />
      </button>
      <div className={styles.progress} />
    </div>
  );
};
