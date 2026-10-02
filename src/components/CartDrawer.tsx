import React, { useEffect, useCallback } from 'react';
import { X, ShoppingCart, Trash2, Plus, Minus, CreditCard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import styles from './CartDrawer.module.css';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQty, clearCart, showToast } = useApp();

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleEscape]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleCheckout = () => {
    clearCart();
    onClose();
    showToast("Order placed! We'll contact you shortly.", 'success');
  };

  const getEmoji = (id: number) => {
    const product = PRODUCTS.find((p) => p.id === id);
    return product?.emoji ?? '🛒';
  };

  return (
    <>
      <div className={styles.overlay} onClick={onClose} aria-hidden="true" />
      <aside className={styles.drawer} aria-label="Shopping Cart">
        <div className={styles.header}>
          <h2>
            <ShoppingCart size={20} />
            Your Cart
            {cart.length > 0 && <span className={styles.badge}>{cart.reduce((s, i) => s + i.qty, 0)}</span>}
          </h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        <div className={styles.body}>
          {cart.length === 0 ? (
            <div className={styles.empty}>
              <div className={styles.emptyIcon}>🛒</div>
              <p className={styles.emptyText}>Your cart is empty</p>
              <p className={styles.emptySub}>Add products from the marketplace to get started.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className={styles.cartItem}>
                <div className={styles.itemEmoji}>{getEmoji(item.id)}</div>
                <div className={styles.itemDetails}>
                  <div className={styles.itemName}>{item.name}</div>
                  <div className={styles.itemUnit}>{item.unit}</div>
                  <div className={styles.itemPrice}>₹{(item.price * item.qty).toLocaleString()}</div>
                </div>
                <div className={styles.qtyControls}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.qty - 1)}
                    aria-label="Decrease quantity"
                  >
                    <Minus size={14} />
                  </button>
                  <span className={styles.qtyNum}>{item.qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => updateQty(item.id, item.qty + 1)}
                    aria-label="Increase quantity"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <button
                  className={styles.removeBtn}
                  onClick={() => removeFromCart(item.id)}
                  aria-label={`Remove ${item.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotalRow}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalValue}>₹{subtotal.toLocaleString()}</span>
            </div>
            <button className={styles.checkoutBtn} onClick={handleCheckout}>
              <CreditCard size={18} />
              Checkout
            </button>
            <button className={styles.clearBtn} onClick={clearCart}>
              Clear Cart
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
