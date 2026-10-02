import React, { useState } from 'react';
import { Search, Filter, ShoppingCart } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import styles from './Marketplace.module.css';

const MOCK_PRODUCTS = [
  { id: 1, name: 'Alphonso Mango', price: 450, unit: 'per dozen', category: 'Fruits', farmer: 'Ramesh Patil' },
  { id: 2, name: 'Organic Tomatoes', price: 60, unit: 'per kg', category: 'Vegetables', farmer: 'Sunita Farms' },
  { id: 3, name: 'Basmati Rice', price: 120, unit: 'per kg', category: 'Grains', farmer: 'Kisan Organics' },
  { id: 4, name: 'Fresh Spinach', price: 30, unit: 'per bunch', category: 'Vegetables', farmer: 'Green Valley' },
  { id: 5, name: 'Gir Cow Ghee', price: 1200, unit: 'per liter', category: 'Dairy', farmer: 'Ramesh Patil' },
  { id: 6, name: 'Raw Honey', price: 400, unit: 'per 500g', category: 'Other', farmer: 'Bee Farms' },
];

export const Marketplace: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`container ${styles.marketplace}`}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className="font-serif">Fresh Produce Market</h1>
          <p className="text-muted">Buy directly from verified local farmers.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline">
            <ShoppingCart size={18} />
            Cart (0)
          </Button>
        </div>
      </div>

      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Input 
            placeholder="Search fruits, vegetables, grains..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
          />
          <Search className={styles.searchIcon} size={20} />
        </div>
        <Button variant="secondary" className={styles.filterBtn}>
          <Filter size={18} />
          Filters
        </Button>
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map(product => (
          <Card key={product.id} className={styles.productCard}>
            <div className={styles.productImagePlaceholder}>
               <span>{product.name.charAt(0)}</span>
            </div>
            <div className={styles.productInfo}>
              <span className={styles.categoryBadge}>{product.category}</span>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.farmerName}>By {product.farmer}</p>
              <div className={styles.productFooter}>
                <div className={styles.priceContainer}>
                  <span className={styles.price}>₹{product.price}</span>
                  <span className={styles.unit}>{product.unit}</span>
                </div>
                <Button size="sm">Add</Button>
              </div>
            </div>
          </Card>
        ))}
        {filteredProducts.length === 0 && (
          <div className={styles.emptyState}>
            <p className="text-muted">No products found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
