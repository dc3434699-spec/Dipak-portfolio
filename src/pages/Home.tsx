import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBasket, Calendar, Users, Tractor } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import styles from './Home.module.css';

export const Home: React.FC = () => {
  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <h1 className={`font-serif ${styles.heroTitle}`}>
              Direct from Farm to Your Home
            </h1>
            <p className={styles.heroDescription}>
              Experience the freshest produce, book farm visits, hire skilled workers, 
              and rent top-quality machinery all in one place.
            </p>
            <div className={styles.heroActions}>
              <Link to="/marketplace">
                <Button size="lg">
                  Shop Fresh Produce
                  <ArrowRight size={20} />
                </Button>
              </Link>
              <Link to="/visits">
                <Button variant="outline" size="lg">Book a Farm Visit</Button>
              </Link>
            </div>
          </div>
          <div className={styles.heroImageContainer}>
            <div className={styles.heroImagePlaceholder}>
              <ShoppingBasket size={64} className={styles.heroIcon} />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Everything you need for agriculture</h2>
            <p className="text-muted">Empowering farmers and connecting consumers to the source.</p>
          </div>
          
          <div className={styles.featureGrid}>
            <Card interactive className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <ShoppingBasket size={32} />
              </div>
              <h3>Marketplace</h3>
              <p className="text-muted">Buy fresh, organic fruits and vegetables directly from the people who grow them.</p>
              <Link to="/marketplace" className={styles.featureLink}>Browse Market &rarr;</Link>
            </Card>
            
            <Card interactive className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Calendar size={32} />
              </div>
              <h3>Farm Visits</h3>
              <p className="text-muted">Book a weekend getaway or educational tour to local farms.</p>
              <Link to="/visits" className={styles.featureLink}>Book a Visit &rarr;</Link>
            </Card>
            
            <Card interactive className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Users size={32} />
              </div>
              <h3>Worker Assistance</h3>
              <p className="text-muted">Find skilled agricultural laborers and farm workers for your daily needs.</p>
              <Link to="/workers" className={styles.featureLink}>Find Workers &rarr;</Link>
            </Card>
            
            <Card interactive className={styles.featureCard}>
              <div className={styles.featureIconWrapper}>
                <Tractor size={32} />
              </div>
              <h3>Machinery Store</h3>
              <p className="text-muted">Rent or buy tractors, tillers, and other heavy agricultural equipment.</p>
              <Link to="/machinery" className={styles.featureLink}>View Machinery &rarr;</Link>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};
