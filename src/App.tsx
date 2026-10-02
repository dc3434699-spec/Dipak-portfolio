import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { Marketplace } from './pages/Marketplace';
import { FarmVisits } from './pages/FarmVisits';
import { Workers } from './pages/Workers';
import { Machinery } from './pages/Machinery';
import { NotFound } from './pages/NotFound';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="marketplace" element={<Marketplace />} />
          <Route path="visits" element={<FarmVisits />} />
          <Route path="workers" element={<Workers />} />
          <Route path="machinery" element={<Machinery />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
