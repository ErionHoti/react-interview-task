import "./index.css";
import MainPage from "./pages/MainPage";
import InventoryDashboard from "./components/inventory/InventoryDashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/inventory/:id" element={<InventoryDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
