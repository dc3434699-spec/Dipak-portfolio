import React, { useState } from 'react';
import { Search, Wrench, ShieldCheck, Banknote } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import styles from './Machinery.module.css';

const MOCK_MACHINERY = [
  { id: 1, name: 'Mahindra 275 DI TU Tractor', type: 'Buy', price: '₹4,50,000', condition: 'Used - Good', location: 'Pune', imageIcon: 'Tractor' },
  { id: 2, name: 'Heavy Duty Rotavator', type: 'Rent', price: '₹500 / day', condition: 'Well Maintained', location: 'Nashik', imageIcon: 'Wrench' },
  { id: 3, name: 'Honda Water Pump 5HP', type: 'Buy', price: '₹12,500', condition: 'New', location: 'Mumbai', imageIcon: 'Wrench' },
  { id: 4, name: 'Seed Drill Machine', type: 'Rent', price: '₹800 / day', condition: 'Used - Excellent', location: 'Satara', imageIcon: 'Wrench' },
];

export const Machinery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'All' | 'Buy' | 'Rent'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = MOCK_MACHINERY.filter(item => {
    const matchesTab = activeTab === 'All' || item.type === activeTab;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
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

      <div className={styles.controls}>
        <div className={styles.tabs}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'All' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('All')}
          >
            All Equipment
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'Rent' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('Rent')}
          >
            For Rent
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'Buy' ? styles.activeTab : ''}`}
            onClick={() => setActiveTab('Buy')}
          >
            For Sale
          </button>
        </div>
        
        <div className={styles.searchBar}>
          <Input 
            placeholder="Search tractors, pumps..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <Search className={styles.searchIcon} size={20} />
        </div>
      </div>

      <div className={styles.grid}>
        {filteredItems.map(item => (
          <Card key={item.id} className={styles.machineCard}>
            <div className={styles.imagePlaceholder}>
              <Wrench size={48} className={styles.placeholderIcon} />
              <span className={`${styles.typeBadge} ${item.type === 'Rent' ? styles.badgeRent : styles.badgeBuy}`}>
                For {item.type}
              </span>
            </div>
            
            <div className={styles.machineInfo}>
              <h3 className={styles.machineName}>{item.name}</h3>
              
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
                <Button size="sm" variant={item.type === 'Rent' ? 'secondary' : 'primary'}>
                  {item.type === 'Rent' ? 'Book Dates' : 'Contact Seller'}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
      
      {filteredItems.length === 0 && (
        <div className={styles.emptyState}>
          <p className="text-muted">No equipment found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
