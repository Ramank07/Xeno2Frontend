import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import { TokenProvider } from './contexts/TokenProvider';

function App() {
  return (
   <TokenProvider>
     <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
   </TokenProvider>
  );
}

export default App;
