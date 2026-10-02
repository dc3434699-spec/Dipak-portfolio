export interface Product {
  id: number;
  name: string;
  emoji: string;
  price: number;
  unit: string;
  category: 'Fruits' | 'Vegetables' | 'Grains' | 'Dairy' | 'Other';
  farmer: string;
  location: string;
  desc: string;
}

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Alphonso Mango', emoji: '🥭', price: 450, unit: 'per dozen', category: 'Fruits', farmer: 'Ramesh Patil', location: 'Ratnagiri, MH', desc: 'Sun-ripened Alphonso mangoes, hand-picked at peak sweetness. No artificial ripening agents used.' },
  { id: 2, name: 'Organic Tomatoes', emoji: '🍅', price: 60, unit: 'per kg', category: 'Vegetables', farmer: 'Sunita Farms', location: 'Nashik, MH', desc: 'Vine-ripened heirloom tomatoes grown without pesticides. Deep red, naturally sweet flavor.' },
  { id: 3, name: 'Basmati Rice', emoji: '🌾', price: 120, unit: 'per kg', category: 'Grains', farmer: 'Kisan Organics', location: 'Punjab', desc: 'Aged Basmati rice with long grains and a distinct floral aroma. Perfect for biryani and pulao.' },
  { id: 4, name: 'Fresh Spinach', emoji: '🥬', price: 30, unit: 'per bunch', category: 'Vegetables', farmer: 'Green Valley', location: 'Pune, MH', desc: 'Tender baby spinach leaves harvested the same morning. Rich in iron and natural flavor.' },
  { id: 5, name: 'Gir Cow Ghee', emoji: '🧈', price: 1200, unit: 'per liter', category: 'Dairy', farmer: 'Ramesh Patil', location: 'Junagadh, GJ', desc: 'Pure bilona ghee from indigenous Gir cows. Hand-churned using the traditional method for maximum nutrition.' },
  { id: 6, name: 'Raw Honey', emoji: '🍯', price: 400, unit: 'per 500g', category: 'Other', farmer: 'Bee Farms India', location: 'Coorg, KA', desc: 'Unprocessed wild forest honey collected from Coorg hillside apiaries. Rich, dark, and naturally antioxidant-rich.' },
  { id: 7, name: 'Pomegranate', emoji: '🥜', price: 180, unit: 'per kg', category: 'Fruits', farmer: 'Solapur Agri', location: 'Solapur, MH', desc: 'Sweet Bhagwa pomegranates with ruby-red arils. Freshly harvested and sorted by hand.' },
  { id: 8, name: 'Turmeric Powder', emoji: '🧂', price: 220, unit: 'per 250g', category: 'Other', farmer: 'Kisan Organics', location: 'Erode, TN', desc: 'Single-origin turmeric from Erode with over 3.5% curcumin content. Stone-ground for maximum potency.' },
  { id: 9, name: 'Fresh Coriander', emoji: '🌿', price: 15, unit: 'per bunch', category: 'Vegetables', farmer: 'Green Valley', location: 'Pune, MH', desc: 'Fragrant coriander bunches, cut fresh daily from the farm to your kitchen.' },
  { id: 10, name: 'A2 Milk', emoji: '🥛', price: 80, unit: 'per liter', category: 'Dairy', farmer: 'Valley Dairy', location: 'Thane Rural, MH', desc: 'Fresh A2 milk from grass-fed desi cows. Non-homogenized, minimally pasteurized.' },
  { id: 11, name: 'Jowar (Sorghum)', emoji: '🌽', price: 55, unit: 'per kg', category: 'Grains', farmer: 'Bijapur Farmers', location: 'Bijapur, KA', desc: 'Organically grown jowar with natural sweetness, ideal for rotis and porridge.' },
  { id: 12, name: 'Banana (Nendran)', emoji: '🍌', price: 120, unit: 'per dozen', category: 'Fruits', farmer: 'Kerala Farms', location: 'Thrissur, KL', desc: 'Large Nendran bananas, a prized Kerala variety known for their starchy flesh and unique flavor.' },
];
