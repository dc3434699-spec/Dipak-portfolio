import React, { useState } from 'react';
import { Pickaxe, MapPin, Users } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import styles from './Workers.module.css';

const MOCK_WORKERS = [
  { id: 1, name: 'Suresh Kumar', skills: ['Harvesting', 'Sowing'], location: 'Pune District', experience: '5 years', available: true },
  { id: 2, name: 'Anita Devi', skills: ['Weeding', 'Packaging'], location: 'Nashik Area', experience: '3 years', available: true },
  { id: 3, name: 'Raju Bhai', skills: ['Tractor Driving', 'Heavy Lifting'], location: 'Mumbai Outskirts', experience: '8 years', available: false },
];

export const Workers: React.FC = () => {
  const [formState, setFormState] = useState({ name: '', phone: '', location: '', needs: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // In a real app, send to backend
  };

  return (
    <div className={`container ${styles.workers}`}>
      <div className={styles.header}>
        <h1 className="font-serif">Agricultural Workers</h1>
        <p className="text-muted">Hire skilled farm laborers or submit a request for workers in your area.</p>
      </div>

      <div className={styles.contentLayout}>
        {/* Available Workers List */}
        <div className={styles.workersListSection}>
          <h2>Available Now</h2>
          <div className={styles.workersGrid}>
            {MOCK_WORKERS.map(worker => (
              <Card key={worker.id} className={styles.workerCard}>
                <div className={styles.workerHeader}>
                  <div className={styles.workerAvatar}>
                    <Users size={24} />
                  </div>
                  <div>
                    <h3 className={styles.workerName}>{worker.name}</h3>
                    <div className={styles.workerLocation}>
                      <MapPin size={14} /> {worker.location}
                    </div>
                  </div>
                </div>
                
                <div className={styles.workerDetails}>
                  <div className={styles.detailRow}>
                    <span className="text-muted text-sm">Experience:</span>
                    <span className="text-sm font-medium">{worker.experience}</span>
                  </div>
                  <div className={styles.detailRow}>
                    <span className="text-muted text-sm">Skills:</span>
                    <div className={styles.skillsTags}>
                      {worker.skills.map(skill => (
                        <span key={skill} className={styles.skillBadge}>{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <Button 
                  fullWidth 
                  variant={worker.available ? 'primary' : 'ghost'} 
                  disabled={!worker.available}
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
                <h3>Request Submitted!</h3>
                <p>We will contact you shortly with available workers in your area.</p>
                <Button variant="outline" onClick={() => setSubmitted(false)} style={{marginTop: '1rem'}}>Submit Another</Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className={styles.form}>
                <Input 
                  label="Your Name / Farm Name" 
                  placeholder="Enter name" 
                  required 
                  value={formState.name}
                  onChange={e => setFormState({...formState, name: e.target.value})}
                />
                
                <Input 
                  label="Phone Number" 
                  type="tel" 
                  placeholder="Enter 10-digit number" 
                  required 
                  value={formState.phone}
                  onChange={e => setFormState({...formState, phone: e.target.value})}
                />
                
                <Input 
                  label="Location (Village/District)" 
                  placeholder="Enter location" 
                  required 
                  value={formState.location}
                  onChange={e => setFormState({...formState, location: e.target.value})}
                />
                
                <div className={styles.textareaGroup}>
                  <label>Specific Requirements (Number of workers, skills needed, duration)</label>
                  <textarea 
                    className={styles.textarea} 
                    rows={4} 
                    placeholder="E.g., Need 5 workers for mango harvesting for 3 days starting next week."
                    required
                    value={formState.needs}
                    onChange={e => setFormState({...formState, needs: e.target.value})}
                  />
                </div>
                
                <Button type="submit" fullWidth>Submit Request</Button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
