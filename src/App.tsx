import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import Ship from './pages/Ship';
import Track from './pages/Track';
import PackageDetails from './pages/PackageDetails';
import LiveStatus from './pages/LiveStatus';
import DeliveryLocation from './pages/DeliveryLocation';
import { Toaster } from './components/ui/toaster';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/ship" element={<Ship />} />
        <Route path="/track" element={<Track />} />
        <Route path="/package-details" element={<PackageDetails />} />
        <Route path="/live-status" element={<LiveStatus />} />
        <Route path="/delivery-location" element={<DeliveryLocation />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;