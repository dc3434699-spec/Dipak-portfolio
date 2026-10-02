import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { MapPin, Calendar, Clock, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './FarmVisits.module.css';
import 'leaflet/dist/leaflet.css';

// Fix for default Leaflet marker icons in React
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

const MOCK_FARMS = [
  { id: 1, name: "Green Acres Farm", lat: 19.0760, lng: 72.8777, location: "Mumbai Outskirts", rating: 4.8, type: "Organic Vegetables" },
  { id: 2, name: "Sunrise Orchards", lat: 18.5204, lng: 73.8567, location: "Pune District", rating: 4.9, type: "Mangoes & Citrus" },
  { id: 3, name: "Valley Dairy", lat: 19.2183, lng: 72.9781, location: "Thane Rural", rating: 4.7, type: "Dairy & Livestock" }
];

export const FarmVisits: React.FC = () => {
  const [selectedFarm, setSelectedFarm] = useState(MOCK_FARMS[0]);

  return (
    <div className={`container ${styles.farmVisits}`}>
      <div className={styles.header}>
        <h1 className="font-serif">Farm Visits & Agri-Tourism</h1>
        <p className="text-muted">Book a visit to experience farming firsthand, learn about agriculture, and enjoy nature.</p>
      </div>

      <div className={styles.contentLayout}>
        <div className={styles.sidebar}>
          <div className={styles.farmList}>
            {MOCK_FARMS.map(farm => (
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
                    <span className={styles.metaItem}>
                      <MapPin size={14} /> {farm.location}
                    </span>
                    <span className={styles.metaItem}>
                      <Star size={14} className={styles.starIcon} /> {farm.rating}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className={styles.bookingCard}>
            <h3>Book a Slot</h3>
            <p className="text-muted text-sm" style={{marginBottom: '1rem'}}>
              Booking visit for: <strong>{selectedFarm.name}</strong>
            </p>
            
            <form className={styles.bookingForm} onSubmit={(e) => e.preventDefault()}>
              <div className={styles.inputGroup}>
                <label>Date</label>
                <div className={styles.inputWithIcon}>
                  <Calendar size={18} className={styles.inputIcon} />
                  <input type="date" className={styles.dateInput} required />
                </div>
              </div>
              
              <div className={styles.inputGroup}>
                <label>Time Slot</label>
                <div className={styles.inputWithIcon}>
                  <Clock size={18} className={styles.inputIcon} />
                  <select className={styles.selectInput} required>
                    <option value="">Select a slot</option>
                    <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                    <option value="afternoon">Afternoon (1:00 PM - 4:00 PM)</option>
                  </select>
                </div>
              </div>
              
              <Button fullWidth type="submit">Confirm Booking</Button>
            </form>
          </Card>
        </div>

        <div className={styles.mapContainer}>
          <MapContainer 
            center={[18.9, 73.4]} 
            zoom={8} 
            scrollWheelZoom={false}
            className={styles.map}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url={import.meta.env.VITE_MAP_TILE_URL || "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"}
            />
            {MOCK_FARMS.map(farm => (
              <Marker 
                key={farm.id} 
                position={[farm.lat, farm.lng]}
                eventHandlers={{
                  click: () => setSelectedFarm(farm)
                }}
              >
                <Popup>
                  <strong>{farm.name}</strong><br/>
                  {farm.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
};
