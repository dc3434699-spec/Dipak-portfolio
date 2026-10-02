import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Calendar, Clock, Star, X, TreePine, Milk, Leaf, Camera } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { useApp } from '../context/AppContext';
import styles from './FarmVisits.module.css';
import 'leaflet/dist/leaflet.css';

import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Farm {
  id: number;
  name: string;
  lat: number;
  lng: number;
  location: string;
  rating: number;
  type: string;
  description: string;
  amenities: string[];
  photoEmojis: string[];
}

const MOCK_FARMS: Farm[] = [
  {
    id: 1,
    name: 'Green Acres Farm',
    lat: 19.076,
    lng: 72.8777,
    location: 'Mumbai Outskirts',
    rating: 4.8,
    type: 'Organic Vegetables',
    description: 'A 50-acre certified organic farm producing over 30 varieties of vegetables. Perfect for families and school groups looking to learn sustainable agriculture.',
    amenities: ['Guided Tour', 'Organic Lunch', 'Kids Activities', 'Parking'],
    photoEmojis: ['🥦', '🥕', '🌱'],
  },
  {
    id: 2,
    name: 'Sunrise Orchards',
    lat: 18.5204,
    lng: 73.8567,
    location: 'Pune District',
    rating: 4.9,
    type: 'Mangoes & Citrus',
    description: 'Home to 800 Alphonso mango trees and citrus orchards. Visit during season (March–May) for a unique mango-picking experience.',
    amenities: ['Fruit Picking', 'Farm Stay', 'Cooking Class', 'Wi-Fi'],
    photoEmojis: ['🥭', '🍊', '🌿'],
  },
  {
    id: 3,
    name: 'Valley Dairy',
    lat: 19.2183,
    lng: 72.9781,
    location: 'Thane Rural',
    rating: 4.7,
    type: 'Dairy & Livestock',
    description: 'Experience traditional dairy farming with indigenous Gir cows. Learn the bilona ghee-making process and milk fresh produce on-site.',
    amenities: ['Milking Demo', 'Ghee Making', 'Fresh Dairy', 'Nature Walk'],
    photoEmojis: ['🐄', '🧈', '🥛'],
  },
];

interface BookingFormData {
  date: string;
  timeSlot: string;
}

interface FarmDetailModalProps {
  farm: Farm | null;
  onClose: () => void;
}

const FarmDetailModal: React.FC<FarmDetailModalProps> = ({ farm, onClose }) => {
  const { showToast } = useApp();
  const [form, setForm] = useState<BookingFormData>({ date: '', timeSlot: '' });
  const [errors, setErrors] = useState<Partial<BookingFormData>>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [lightboxPhoto, setLightboxPhoto] = useState<string | null>(null);

  const handleEscape = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxPhoto) setLightboxPhoto(null);
        else onClose();
      }
    },
    [onClose, lightboxPhoto]
  );

  useEffect(() => {
    if (farm) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [farm, handleEscape]);

  if (!farm) return null;

  const validate = (): boolean => {
    const errs: Partial<BookingFormData> = {};
    if (!form.date) {
      errs.date = 'Date is required';
    } else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) errs.date = 'Date must be today or in the future';
    }
    if (!form.timeSlot) errs.timeSlot = 'Please select a time slot';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      showToast(`Booking confirmed at ${farm.name}!`, 'success');
    }, 1500);
  };

  const today = new Date().toISOString().split('T')[0];

  const amenityIcons: Record<string, React.ReactNode> = {
    'Guided Tour': <TreePine size={14} />,
    'Organic Lunch': <Leaf size={14} />,
    'Kids Activities': '🎒',
    Parking: '🚗',
    'Fruit Picking': '🧺',
    'Farm Stay': '🏡',
    'Cooking Class': '👨‍🍳',
    'Wi-Fi': '📶',
    'Milking Demo': <Milk size={14} />,
    'Ghee Making': '🧈',
    'Fresh Dairy': '🥛',
    'Nature Walk': '🌿',
  };

  return (
    <>
      <div
        className={styles.modalOverlay}
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        aria-modal="true"
        role="dialog"
      >
        <div className={styles.modal}>
          <button className={styles.modalClose} onClick={onClose} aria-label="Close">
            <X size={18} />
          </button>

          {/* Photo Gallery */}
          <div className={styles.photoGallery}>
            {farm.photoEmojis.map((emoji, i) => (
              <button
                key={i}
                className={styles.photoCard}
                onClick={() => setLightboxPhoto(emoji)}
                aria-label={`View photo ${i + 1}`}
              >
                <span>{emoji}</span>
                <Camera size={14} className={styles.cameraIcon} />
              </button>
            ))}
          </div>

          <div className={styles.modalBody}>
            <div className={styles.modalHeader}>
              <div>
                <span className={styles.farmTypeBadge}>{farm.type}</span>
                <h2 className={styles.modalTitle}>{farm.name}</h2>
                <div className={styles.farmMeta}>
                  <span className={styles.metaItem}><MapPin size={14} /> {farm.location}</span>
                  <span className={styles.metaItem}><Star size={14} className={styles.starIcon} /> {farm.rating}</span>
                </div>
              </div>
            </div>

            <p className={styles.farmDescription}>{farm.description}</p>

            <div className={styles.amenitiesSection}>
              <h4>Amenities</h4>
              <div className={styles.amenitiesGrid}>
                {farm.amenities.map((a) => (
                  <span key={a} className={styles.amenityBadge}>
                    {amenityIcons[a] || '✓'} {a}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.bookingSection}>
              <h4>Book a Visit</h4>
              {success ? (
                <div className={styles.successState}>
                  <div className={styles.successIcon}>✅</div>
                  <h3>Booking Confirmed!</h3>
                  <p>Check your email for details about your visit to {farm.name}.</p>
                  <Button variant="outline" size="sm" onClick={() => { setSuccess(false); setForm({ date: '', timeSlot: '' }); }}>
                    Book Another
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.bookingForm}>
                  <div className={styles.inputGroup}>
                    <label>Date</label>
                    <div className={styles.inputWithIcon}>
                      <Calendar size={18} className={styles.inputIcon} />
                      <input
                        type="date"
                        className={`${styles.dateInput} ${errors.date ? styles.inputError : ''}`}
                        value={form.date}
                        min={today}
                        onChange={(e) => setForm({ ...form, date: e.target.value })}
                      />
                    </div>
                    {errors.date && <span className={styles.errorText}>{errors.date}</span>}
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Time Slot</label>
                    <div className={styles.inputWithIcon}>
                      <Clock size={18} className={styles.inputIcon} />
                      <select
                        className={`${styles.selectInput} ${errors.timeSlot ? styles.inputError : ''}`}
                        value={form.timeSlot}
                        onChange={(e) => setForm({ ...form, timeSlot: e.target.value })}
                      >
                        <option value="">Select a slot</option>
                        <option value="morning">Morning (9:00 AM – 12:00 PM)</option>
                        <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                      </select>
                    </div>
                    {errors.timeSlot && <span className={styles.errorText}>{errors.timeSlot}</span>}
                  </div>

                  <Button fullWidth type="submit" disabled={loading}>
                    {loading ? 'Confirming...' : 'Confirm Booking'}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxPhoto && (
        <div
          className={styles.lightbox}
          onClick={() => setLightboxPhoto(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className={styles.lightboxContent}>
            <span className={styles.lightboxEmoji}>{lightboxPhoto}</span>
          </div>
          <button className={styles.lightboxClose} onClick={() => setLightboxPhoto(null)} aria-label="Close photo">
            <X size={24} />
          </button>
        </div>
      )}
    </>
  );
};

export const FarmVisits: React.FC = () => {
  const [selectedFarm, setSelectedFarm] = useState<Farm>(MOCK_FARMS[0]);
  const [modalFarm, setModalFarm] = useState<Farm | null>(null);

  const mapRef = React.useRef<HTMLDivElement>(null);

  const scrollToMap = () => {
    mapRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className={`container ${styles.farmVisits}`}>
      <div className={styles.header}>
        <h1 className="font-serif">Farm Visits &amp; Agri-Tourism</h1>
        <p className="text-muted">Book a visit to experience farming firsthand, learn about agriculture, and enjoy nature.</p>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.sidebar}>
          <div className={styles.farmList}>
            {MOCK_FARMS.map((farm) => (
              <Card
                key={farm.id}
                interactive
                className={`${styles.farmCard} ${selectedFarm.id === farm.id ? styles.activeFarm : ''}`}
                onClick={() => setSelectedFarm(farm)}
              >
                <div className={styles.farmInfo}>
                  <h3>{farm.name}</h3>
                  <p className={styles.farmType}>{farm.type}</p>
                  <div className={styles.farmMetaRow}>
                    <span className={styles.metaItem}><MapPin size={14} /> {farm.location}</span>
                    <span className={styles.metaItem}><Star size={14} className={styles.starIcon} /> {farm.rating}</span>
                  </div>
                  <div className={styles.farmCardActions}>
                    <Button size="sm" onClick={(e) => { e.stopPropagation(); setModalFarm(farm); }}>
                      Book Visit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => { e.stopPropagation(); scrollToMap(); }}
                    >
                      View on Map
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className={styles.mapContainer} ref={mapRef}>
          <MapContainer
            center={[18.9, 73.4]}
            zoom={8}
            scrollWheelZoom={false}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={import.meta.env.VITE_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
            />
            {MOCK_FARMS.map((farm) => (
              <Marker
                key={farm.id}
                position={[farm.lat, farm.lng]}
                eventHandlers={{ click: () => setSelectedFarm(farm) }}
              >
                <Popup>
                  <strong>{farm.name}</strong>
                  <br />
                  {farm.type}
                  <br />
                  <button
                    style={{ color: '#166534', fontWeight: 600, marginTop: '4px', cursor: 'pointer', background: 'none', border: 'none', fontSize: '0.875rem' }}
                    onClick={() => setModalFarm(farm)}
                  >
                    Book Visit →
                  </button>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      <FarmDetailModal farm={modalFarm} onClose={() => setModalFarm(null)} />
    </div>
  );
};
