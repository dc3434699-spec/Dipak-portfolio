import React, { useState, useEffect, useCallback } from 'react';
import { X, MapPin, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { type Product } from '../data/products';
import styles from './ProductDetailModal.module.css';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, showToast } = useApp();
  const [qty, setQty] = useState(1);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (product) {
      setQty(1);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [product, handleEscape]);

  if (!product) return null;

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      if (i === 0) {
        addToCart({ id: product.id, name: product.name, price: product.price, unit: product.unit });
      } else {
        addToCart({ id: product.id, name: product.name, price: product.price, unit: product.unit });
      }
    }
    showToast(`${product.name} added to cart`, 'success');
    onClose();
  };

  return (
    <div
      className={styles.overlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      aria-modal="true"
      role="dialog"
      aria-label={product.name}
    >
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose} aria-label="Close modal">
          <X size={18} />
        </button>

        <div className={styles.imageArea} role="img" aria-label={product.name}>
          {product.emoji}
        </div>

        <div className={styles.body}>
          <div>
            <span className={styles.categoryBadge}>{product.category}</span>
            <h2 className={styles.productName}>{product.name}</h2>
          </div>

          <div className={styles.farmerInfo}>
            <MapPin size={14} />
            <span>
              <strong>{product.farmer}</strong> · {product.location}
            </span>
          </div>

          <p className={styles.description}>{product.desc}</p>

          <div className={styles.priceRow}>
            <span className={styles.price}>₹{product.price.toLocaleString()}</span>
            <span className={styles.unit}>{product.unit}</span>
          </div>

          <div className={styles.qtySection}>
            <span className={styles.qtyLabel}>Quantity:</span>
            <div className={styles.qtyControls}>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                disabled={qty <= 1}
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className={styles.qtyNum}>{qty}</span>
              <button
                className={styles.qtyBtn}
                onClick={() => setQty((q) => Math.min(20, q + 1))}
                disabled={qty >= 20}
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.addBtn} onClick={handleAddToCart}>
              <ShoppingCart size={18} />
              Add to Cart
            </button>
            <p className={styles.totalLine}>
              Total: <strong>₹{(product.price * qty).toLocaleString()}</strong> for {qty} {qty === 1 ? product.unit : `× ${product.unit}`}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
