import React, { useState, useEffect, useCallback } from 'react';
import { Pickaxe, MapPin, X, Send } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { useApp } from '../context/AppContext';
import styles from './Workers.module.css';

interface Worker {
  id: number;
  name: string;
  skills: string[];
  location: string;
  experience: string;
  available: boolean;
  emoji: string;
}

const MOCK_WORKERS: Worker[] = [
  { id: 1, name: 'Suresh Kumar', skills: ['Harvesting', 'Sowing'], location: 'Pune District', experience: '5 years', available: true, emoji: '👨‍🌾' },
  { id: 2, name: 'Anita Devi', skills: ['Weeding', 'Packaging'], location: 'Nashik Area', experience: '3 years', available: true, emoji: '👩‍🌾' },
  { id: 3, name: 'Raju Bhai', skills: ['Tractor Driving', 'Heavy Lifting'], location: 'Mumbai Outskirts', experience: '8 years', available: false, emoji: '🧑‍🔧' },
  { id: 4, name: 'Priya Nair', skills: ['Irrigation', 'Crop Care'], location: 'Satara District', experience: '4 years', available: true, emoji: '👩‍🌾' },
];

interface ContactModalProps {
  worker: Worker | null;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ worker, onClose }) => {
  const { showToast } = useApp();
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEscape = useCallback(
    (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (worker) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [worker, handleEscape]);

  if (!worker) return null;

  const handleSend = () => {
    if (!message.trim()) {
      setError('Please enter a message');
      return;
    }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast(`Message sent to ${worker.name}!`, 'success');
      onClose();
    }, 1000);
  };

  return (
    <div
      className={styles.modalOverlay}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
    >
      <div className={styles.contactModal}>
        <div className={styles.modalHeader}>
          <div className={styles.modalWorkerInfo}>
            <span className={styles.modalEmoji}>{worker.emoji}</span>
            <div>
              <h3>Contact {worker.name}</h3>
              <p className="text-muted text-sm">{worker.location}</p>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className={styles.modalBody}>
          <div className={styles.textareaGroup}>
            <label>Your Message</label>
            <textarea
              className={`${styles.textarea} ${error ? styles.textareaError : ''}`}
              rows={5}
              placeholder={`Tell ${worker.name} about your requirements...`}
              value={message}
              onChange={(e) => { setMessage(e.target.value); setError(''); }}
            />
            {error && <span className={styles.errorText}>{error}</span>}
          </div>
          <Button fullWidth onClick={handleSend} disabled={loading}>
            <Send size={16} />
            {loading ? 'Sending...' : 'Send Message'}
          </Button>
        </div>
      </div>
    </div>
  );
};

interface FormState { name: string; phone: string; location: string; needs: string; }
interface FormErrors { name?: string; phone?: string; location?: string; needs?: string; }

export const Workers: React.FC = () => {
  const { showToast } = useApp();
  const [formState, setFormState] = useState<FormState>({ name: '', phone: '', location: '', needs: '' });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contactWorker, setContactWorker] = useState<Worker | null>(null);

  const validateForm = (): boolean => {
    const errs: FormErrors = {};
    if (!formState.name.trim()) errs.name = 'Name is required';
    if (!formState.phone.trim()) {
      errs.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formState.phone.trim())) {
      errs.phone = 'Phone must be exactly 10 digits';
    }
    if (!formState.location.trim()) errs.location = 'Location is required';
    if (!formState.needs.trim()) errs.needs = 'Requirements are required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      showToast('Requirement posted! We will find workers for you.', 'success');
    }, 1000);
  };

  return (
    <div className={`container ${styles.workers}`}>
      <div className={styles.header}>
        <h1 className="font-serif">Agricultural Workers</h1>
        <p className="text-muted">Hire skilled farm laborers or submit a request for workers in your area.</p>
      </div>

      <div className={styles.contentLayout}>
        {/* Workers List */}
        <div className={styles.workersListSection}>
          <h2>Available Workers</h2>
          <div className={styles.workersGrid}>
            {MOCK_WORKERS.map((worker) => (
              <Card key={worker.id} className={styles.workerCard}>
                <div className={styles.workerHeader}>
                  <div className={styles.workerAvatar}>
                    <span className={styles.workerEmoji}>{worker.emoji}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h3 className={styles.workerName}>{worker.name}</h3>
                    <div className={styles.workerLocation}>
                      <MapPin size={14} /> {worker.location}
                    </div>
                  </div>
                  <span className={`${styles.availabilityBadge} ${worker.available ? styles.badgeAvailable : styles.badgeBooked}`}>
                    {worker.available ? 'Available' : 'Booked'}
                  </span>
                </div>

                <div className={styles.workerDetails}>
                  <div className={styles.detailRow}>
                    <span className="text-muted text-sm">Experience:</span>
                    <span className="text-sm font-medium">{worker.experience}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className="text-muted text-sm">Skills:</span>
                    <div className={styles.skillsTags}>
                      {worker.skills.map((skill) => (
                        <span key={skill} className={styles.skillBadge}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button
                  fullWidth
                  variant={worker.available ? 'primary' : 'ghost'}
                  disabled={!worker.available}
                  onClick={() => worker.available && setContactWorker(worker)}
                >
                  {worker.available ? 'Contact Worker' : 'Currently Booked'}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Request Form */}
        <div className={styles.requestSection}>
          <Card className={styles.requestCard}>
            <div className={styles.requestHeader}>
              <Pickaxe size={24} className={styles.requestIcon} />
              <h2>Post a Requirement</h2>
              <p className="text-muted text-sm">Need a team for harvest season? Let us know what you need.</p>
            </div>

            {submitted ? (
              <div className={styles.successMessage}>
                <div className={styles.successIcon}>✅</div>
                <h3>Request Submitted!</h3>
                <p>We will contact you shortly with available workers in your area.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => { setSubmitted(false); setFormState({ name: '', phone: '', location: '', needs: '' }); }}
                  style={{ marginTop: '1rem' }}
                >
                  Submit Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form} noValidate>
                <Input
                  label="Your Name / Farm Name"
                  placeholder="Enter name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  error={formErrors.name}
                />

                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter 10-digit number"
                  value={formState.phone}
                  onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  error={formErrors.phone}
                  maxLength={10}
                />

                <Input
                  label="Location (Village/District)"
                  placeholder="Enter location"
                  value={formState.location}
                  onChange={(e) => setFormState({ ...formState, location: e.target.value })}
                  error={formErrors.location}
                />

                <div className={styles.textareaGroup}>
                  <label>Specific Requirements</label>
                  <textarea
                    className={`${styles.textarea} ${formErrors.needs ? styles.textareaError : ''}`}
                    rows={4}
                    placeholder="E.g., Need 5 workers for mango harvesting for 3 days starting next week."
                    value={formState.needs}
                    onChange={(e) => setFormState({ ...formState, needs: e.target.value })}
                  />
                  {formErrors.needs && <span className={styles.errorText}>{formErrors.needs}</span>}
                </div>

                <Button type="submit" fullWidth disabled={loading}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </Button>
              </form>
            )}
          </Card>
        </div>
      </div>

      <ContactModal worker={contactWorker} onClose={() => setContactWorker(null)} />
    </div>
  );
};
