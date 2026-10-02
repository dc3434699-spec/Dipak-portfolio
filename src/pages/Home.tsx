import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBasket, Calendar, Users, Tractor, Star } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { PRODUCTS, type Product } from '../data/products';
import styles from './Home.module.css';

const FEATURED_IDS = [1, 5, 3, 6];
const FEATURED = PRODUCTS.filter((p) => FEATURED_IDS.includes(p.id));

const STATS = [
  { value: '3,200+', label: 'Farmers' },
  { value: '48,000+', label: 'Orders' },
  { value: '120+', label: 'Farms' },
  { value: '4.8★', label: 'Rating' },
];

const FEATURES = [
  { icon: <ShoppingBasket size={32} />, title: 'Marketplace', desc: 'Buy fresh, organic fruits and vegetables directly from the people who grow them.', to: '/marketplace', cta: 'Browse Market →' },
  { icon: <Calendar size={32} />, title: 'Farm Visits', desc: 'Book a weekend getaway or educational tour to local farms.', to: '/visits', cta: 'Book a Visit →' },
  { icon: <Users size={32} />, title: 'Worker Assistance', desc: 'Find skilled agricultural laborers and farm workers for your daily needs.', to: '/workers', cta: 'Find Workers →' },
  { icon: <Tractor size={32} />, title: 'Machinery Store', desc: 'Rent or buy tractors, tillers, and other heavy agricultural equipment.', to: '/machinery', cta: 'View Machinery →' },
];

const STEPS = [
  { num: '01', title: 'Browse & Shop', desc: 'Explore our marketplace for fresh produce sourced directly from verified farmers.' },
  { num: '02', title: 'Farmer Packs It', desc: 'Your selected produce is packed fresh the morning of delivery by the farmer.' },
  { num: '03', title: 'Delivered in 24h', desc: 'Farm-fresh goods reach your doorstep within 24 hours of harvest.' },
];

export const Home: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <Star size={14} fill="currentColor" /> Trusted by 3,200+ farmers across India
            </div>
            <h1 className={`font-serif ${styles.heroTitle}`}>
              Direct from <span className={styles.heroAccent}>Farm</span> to Your Home
            </h1>
            <p className={styles.heroDescription}>
              Experience the freshest produce, book farm visits, hire skilled workers, 
              and rent top-quality machinery — all in one place.
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
              <div className={styles.heroEmojis}>
                <span>🌾</span><span>🥭</span><span>🥬</span><span>🍅</span>
                <span>🧈</span><span>🍯</span><span>🌽</span><span>🥛</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className={styles.statsStrip}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statItem}>
                <span className={styles.statValue}>{s.value}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
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
            {FEATURES.map((f) => (
              <Link to={f.to} key={f.title} className={styles.featureLink}>
                <Card interactive className={styles.featureCard}>
                  <div className={styles.featureIconWrapper}>
                    {f.icon}
                  </div>
                  <h3>{f.title}</h3>
                  <p className="text-muted">{f.desc}</p>
                  <span className={styles.featureCta}>{f.cta}</span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className={styles.howItWorks}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How KisanSetu Works</h2>
            <p className="text-muted">Three simple steps to farm-fresh goodness.</p>
          </div>
          <div className={styles.stepsGrid}>
            {STEPS.map((step, i) => (
              <div key={step.num} className={styles.step}>
                <div className={styles.stepNum}>{step.num}</div>
                {i < STEPS.length - 1 && <div className={styles.stepConnector} />}
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDesc}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Produce */}
      <section className={styles.featured}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Featured Produce</h2>
            <p className="text-muted">Hand-picked favorites from our best farmers.</p>
          </div>
          <div className={styles.featuredGrid}>
            {FEATURED.map((product) => (
              <Card
                key={product.id}
                interactive
                className={styles.featuredCard}
                onClick={() => setSelectedProduct(product)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProduct(product); }}
                aria-label={`View ${product.name} details`}
              >
                <div className={styles.featuredEmoji}>{product.emoji}</div>
                <div className={styles.featuredInfo}>
                  <span className={styles.featuredCategory}>{product.category}</span>
                  <h3 className={styles.featuredName}>{product.name}</h3>
                  <p className={styles.featuredFarmer}>By {product.farmer}</p>
                  <div className={styles.featuredPrice}>
                    <span className={styles.priceValue}>₹{product.price}</span>
                    <span className={styles.priceUnit}>{product.unit}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <div className={styles.featuredCta}>
            <Link to="/marketplace">
              <Button variant="outline" size="lg">
                View All Products
                <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer CTA Strip */}
      <section className={styles.ctaStrip}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Ready for farm-fresh produce?</h2>
            <p className={styles.ctaDesc}>Join thousands of families buying directly from farmers.</p>
            <Link to="/marketplace">
              <Button size="lg" variant="secondary">
                Start Shopping Today
                <ArrowRight size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
};
