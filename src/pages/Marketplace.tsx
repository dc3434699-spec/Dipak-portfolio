import React, { useState, useEffect, useMemo } from 'react';
import { Search, ShoppingCart, X, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { Button } from '../components/Button';
import { Card } from '../components/Card';
import { Input } from '../components/Input';
import { ProductDetailModal } from '../components/ProductDetailModal';
import { CartDrawer } from '../components/CartDrawer';
import { useApp } from '../context/AppContext';
import { PRODUCTS, type Product } from '../data/products';
import styles from './Marketplace.module.css';
// CartDrawer is used below in JSX

type Category = 'All' | 'Fruits' | 'Vegetables' | 'Grains' | 'Dairy' | 'Other';
type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc';

const CATEGORIES: Category[] = ['All', 'Fruits', 'Vegetables', 'Grains', 'Dairy', 'Other'];

const SORT_LABELS: Record<SortOption, string> = {
  default: 'Default',
  'price-asc': 'Price: Low to High',
  'price-desc': 'Price: High to Low',
  'name-asc': 'Name A-Z',
};

const SkeletonCard: React.FC = () => (
  <div className={styles.skeletonCard}>
    <div className={`skeleton ${styles.skeletonImg}`} />
    <div className={styles.skeletonBody}>
      <div className={`skeleton ${styles.skeletonBadge}`} />
      <div className={`skeleton ${styles.skeletonTitle}`} />
      <div className={`skeleton ${styles.skeletonSub}`} />
      <div className={`skeleton ${styles.skeletonPrice}`} />
    </div>
  </div>
);

export const Marketplace: React.FC = () => {
  const { cart, addToCart, showToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [filterOpen, setFilterOpen] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cartOpen, setCartOpen] = useState(false);

  // Import CartDrawer lazily to avoid circular dep (Navbar also handles cart)
  // Instead we use Navbar's cart icon — but Marketplace page has its own cart button too
  // We'll open the cart via Navbar state — for now we show count and let user use Navbar

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);

  const filtered = useMemo(() => {
    let items = [...PRODUCTS];

    // Category filter
    if (activeCategory !== 'All') {
      items = items.filter((p) => p.category === activeCategory);
    }

    // Search
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      items = items.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.farmer.toLowerCase().includes(q)
      );
    }

    // Price range
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    if (!isNaN(min)) items = items.filter((p) => p.price >= min);
    if (!isNaN(max)) items = items.filter((p) => p.price <= max);

    // Sort
    switch (sortBy) {
      case 'price-asc':
        items.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        items.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        items.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return items;
  }, [searchTerm, activeCategory, sortBy, minPrice, maxPrice]);

  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    addToCart({ id: product.id, name: product.name, price: product.price, unit: product.unit });
    showToast(`${product.name} added to cart`, 'success');
  };


  return (
    <div className={`container ${styles.marketplace}`}>
      <div className={styles.header}>
        <div className={styles.headerText}>
          <h1 className="font-serif">Fresh Produce Market</h1>
          <p className="text-muted">Buy directly from verified local farmers.</p>
        </div>
        <div className={styles.headerActions}>
          <Button variant="outline" onClick={() => setCartOpen(true)}>
            <ShoppingCart size={18} />
            Cart{cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
          </Button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className={styles.categoryTabs}>
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`${styles.categoryTab} ${activeCategory === cat ? styles.activeTab : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.searchBar}>
          <Search className={styles.searchIcon} size={18} />
          <input
            className={styles.searchInput}
            placeholder="Search fruits, vegetables, farmers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className={styles.clearSearch} onClick={() => setSearchTerm('')} aria-label="Clear search">
              <X size={16} />
            </button>
          )}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.sortWrapper}>
            <ChevronDown size={16} className={styles.sortIcon} />
            <select
              className={styles.sortSelect}
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
            >
              {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setFilterOpen(!filterOpen)}
            className={styles.filterBtn}
          >
            <SlidersHorizontal size={16} />
            Filters {(minPrice || maxPrice) ? '•' : ''}
          </Button>
        </div>
      </div>

      {/* Filter Panel */}
      {filterOpen && (
        <div className={styles.filterPanel}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Min Price (₹)</label>
            <Input
              type="number"
              placeholder="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              min="0"
            />
          </div>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Max Price (₹)</label>
            <Input
              type="number"
              placeholder="Any"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              min="0"
            />
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setMinPrice(''); setMaxPrice(''); }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* Product Grid */}
      <div className={styles.productGrid}>
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
        ) : filtered.length === 0 ? (
          <div className={styles.emptyState}>
            <div className={styles.emptyIcon}>🔍</div>
            <h3>No products found</h3>
            <p className="text-muted">Try adjusting your search or filters.</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => { setSearchTerm(''); setActiveCategory('All'); setMinPrice(''); setMaxPrice(''); }}
            >
              Clear All Filters
            </Button>
          </div>
        ) : (
          filtered.map((product) => (
            <Card
              key={product.id}
              interactive
              className={styles.productCard}
              onClick={() => setSelectedProduct(product)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter') setSelectedProduct(product); }}
              aria-label={`View ${product.name} details`}
            >
              <div className={styles.productImagePlaceholder}>
                <span className={styles.productEmoji}>{product.emoji}</span>
              </div>
              <div className={styles.productInfo}>
                <span className={styles.categoryBadge}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.farmerName}>By {product.farmer} · {product.location}</p>
                <div className={styles.productFooter}>
                  <div className={styles.priceContainer}>
                    <span className={styles.price}>₹{product.price}</span>
                    <span className={styles.unit}>{product.unit}</span>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => handleAddToCart(e, product)}
                    aria-label={`Add ${product.name} to cart`}
                  >
                    Add
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <ProductDetailModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      <CartDrawer isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
};
