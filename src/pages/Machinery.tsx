import React, { useState, useEffect, useCallback } from 'react';
import { Search, ShieldCheck, Banknote, X, Calendar } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useApp } from '../context/AppContext';
import styles from './Machinery.module.css';

interface MachineryItem {
  id: number;
  name: string;
  type: 'Buy' | 'Rent';
  price: string;
  numericPrice: number;
  condition: string;
  location: string;
  emoji: string;
  desc: string;
}

const MOCK_MACHINERY: MachineryItem[] = [
  { id: 1, name: 'Mahindra 275 DI TU Tractor', type: 'Buy', price: '₹4,50,000', numericPrice: 450000, condition: 'Used - Good', location: 'Pune', emoji: '🚜', desc: '35 HP 2WD tractor with power steering. Ideal for medium farms.' },
  { id: 2, name: 'Heavy Duty Rotavator', type: 'Rent', price: '₹500 / day', numericPrice: 500, condition: 'Well Maintained', location: 'Nashik', emoji: '⚙️', desc: 'Heavy-duty rotavator for soil preparation. Fits most standard tractors.' },
  { id: 3, name: 'Honda Water Pump 5HP', type: 'Buy', price: '₹12,500', numericPrice: 12500, condition: 'New', location: 'Mumbai', emoji: '💧', desc: 'High-flow centrifugal pump for irrigation and drainage. 5HP petrol engine.' },
  { id: 4, name: 'Seed Drill Machine', type: 'Rent', price: '₹800 / day', numericPrice: 800, condition: 'Used - Excellent', location: 'Satara', emoji: '🌱', desc: 'Multi-crop seed drill for precise sowing. Covers 3 acres per day.' },
  { id: 5, name: 'Mini Power Tiller', type: 'Rent', price: '₹350 / day', numericPrice: 350, condition: 'Good', location: 'Kolhapur', emoji: '🔧', desc: 'Compact 7HP tiller for small farms and kitchen gardens. Easy to maneuver.' },
  { id: 6, name: 'Sprayer Pump (Battery)', type: 'Buy', price: '₹3,200', numericPrice: 3200, condition: 'New', location: 'Nagpur', emoji: '🪣', desc: '16L battery-powered backpack sprayer with adjustable nozzle. Lasts 6 hours per charge.' },
];

interface BookingModalProps {
  item: MachineryItem | null;
  mode: 'book' | 'contact';
  onClose: () => void;
}

const MachineryModal: React.FC<BookingModalProps> = ({ item, mode, onClose }) => {
  const { showToast } = useApp();
  const [form, setForm] = useState({ startDate: '', endDate: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (item) {
      setForm({ startDate: '', endDate: '', phone: '', message: '' });
      setErrors({});
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [item, handleEscape]);

  if (!item) return null;

  const today = new Date().toISOString().split('T')[0];

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (mode === 'book') {
      if (!form.startDate) errs.startDate = 'Start date is required';
      if (!form.endDate) errs.endDate = 'End date is required';
      else if (form.startDate && form.endDate < form.startDate) {
        errs.endDate = 'End date must be after start date';
      }
    }
    if (!form.phone.trim()) {
      errs.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      errs.phone = 'Phone must be 10 digits';
    }
    if (mode === 'contact' && !form.message.trim()) {
      errs.message = 'Message is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onClose();
      if (mode === 'book') {
        showToast(`${item.name} booked successfully!`, 'success');
      } else {
        showToast(`Message sent to the seller of ${item.name}!`, 'success');
      }
    }, 1500);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalTitle}>
            <span className={styles.modalEmoji}>{item.emoji}</span>
            <div>
              <h3>{mode === 'book' ? 'Book Dates' : 'Contact Seller'}</h3>
              <p className="text-muted text-sm">{item.name}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.modalForm} noValidate>
          {mode === 'book' && (
            <>
              <div className={styles.formGroup}>
                <label>Start Date</label>
                <div className={styles.inputWithIcon}>
                  <Calendar size={16} className={styles.inputIcon} />
                  <input
                    type="date"
                    className={`${styles.dateInput} ${errors.startDate ? styles.inputError : ''}`}
                    value={form.startDate}
                    min={today}
                    onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                  />
                </div>
                {errors.startDate && <span className={styles.errorText}>{errors.startDate}</span>}
              </div>
              <div className={styles.formGroup}>
                <label>End Date</label>
                <div className={styles.inputWithIcon}>
                  <Calendar size={16} className={styles.inputIcon} />
                  <input
                    type="date"
                    className={`${styles.dateInput} ${errors.endDate ? styles.inputError : ''}`}
                    value={form.endDate}
                    min={form.startDate || today}
                    onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                  />
                </div>
                {errors.endDate && <span className={styles.errorText}>{errors.endDate}</span>}
              </div>
            </>
          )}

          <Input
            label="Your Phone Number"
            type="tel"
            placeholder="10-digit mobile number"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            error={errors.phone}
            maxLength={10}
          />

          {mode === 'contact' && (
            <div className={styles.formGroup}>
              <label>Message</label>
              <textarea
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                rows={4}
                placeholder="Ask about the equipment, availability, or pricing..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>
          )}

          <Button type="submit" fullWidth disabled={loading}>
            {loading ? 'Submitting...' : mode === 'book' ? 'Confirm Booking' : 'Send Message'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export const Machinery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [modalItem, setModalItem] = useState<MachineryItem | null>(null);
  const [modalMode, setModalMode] = useState<'book' | 'contact'>('book');

  const openModal = (item: MachineryItem, mode: 'book' | 'contact') => {
    setModalItem(item);
    setModalMode(mode);
  };

  const filteredItems = MOCK_MACHINERY.filter((item) => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    const matchesMin = isNaN(min) || item.numericPrice >= min;
    const matchesMax = isNaN(max) || item.numericPrice <= max;
    return matchesTab && matchesSearch && matchesMin && matchesMax;
  });

  return (
    <div className={`container ${styles.machinery}`}>
      <div className={styles.header}>
        <h1 className="font-serif">Agricultural Machinery Store</h1>
        <p className="text-muted">Buy, sell, or rent high-quality farm equipment and machinery.</p>
      </div>

      {/* Value Props */}
      <div className={styles.valueProps}>
        <div className={styles.valueProp}>
          <ShieldCheck className={styles.valueIcon} size={24} />
          <div>
            <h4>Verified Sellers</h4>
            <p className="text-muted text-sm">All equipment condition is vetted.</p>
          </div>
        </div>
        <div className={styles.valueProp}>
          <Banknote className={styles.valueIcon} size={24} />
          <div>
            <h4>Fair Pricing</h4>
            <p className="text-muted text-sm">Transparent daily rental rates.</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.tabs}>
          {(['All', 'Rent', 'Buy'] as const).map((tab) => (
            <button
              key={tab}
              className={`${styles.tabBtn} ${activeTab === tab ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'All' ? 'All Equipment' : `For ${tab}`}
            </button>
          ))}
        </div>

        <div className={styles.rightControls}>
          <div className={styles.searchBar}>
            <Input
              placeholder="Search tractors, pumps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
            <Search className={styles.searchIcon} size={20} />
          </div>
          <div className={styles.priceFilters}>
            <Input
              placeholder="Min ₹"
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: '100px' }}
            />
            <span className={styles.priceSep}>–</span>
            <Input
              placeholder="Max ₹"
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: '100px' }}
            />
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {filteredItems.map((item) => (
          <Card key={item.id} className={styles.machineCard}>
            <div className={styles.imagePlaceholder}>
              <span className={styles.machineEmoji}>{item.emoji}</span>
              <span className={`${styles.typeBadge} ${item.type === 'Rent' ? styles.badgeRent : styles.badgeBuy}`}>
                For {item.type}
              </span>
            </div>

            <div className={styles.machineInfo}>
              <h3 className={styles.machineName}>{item.name}</h3>
              <p className={styles.machineDesc}>{item.desc}</p>

              <div className={styles.machineMeta}>
                <div className={styles.metaRow}>
                  <span className="text-muted text-sm">Condition:</span>
                  <span className="text-sm font-medium">{item.condition}</span>
                </div>
                <div className={styles.metaRow}>
                  <span className="text-muted text-sm">Location:</span>
                  <span className="text-sm font-medium">{item.location}</span>
                </div>
              </div>

              <div className={styles.machineFooter}>
                <span className={styles.price}>{item.price}</span>
                <div className={styles.machineActions}>
                  {item.type === 'Rent' ? (
                    <Button size="sm" variant="secondary" onClick={() => openModal(item, 'book')}>
                      Book Dates
                    </Button>
                  ) : (
                    <Button size="sm" onClick={() => openModal(item, 'contact')}>
                      Contact Seller
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>🔍</div>
          <h3>No equipment found</h3>
          <p className="text-muted">Try adjusting your search or filters.</p>
        </div>
      )}

      <MachineryModal
        item={modalItem}
        mode={modalMode}
        onClose={() => setModalItem(null)}
      />
    </div>
  );
};
