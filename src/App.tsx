import { Routes, Route } from "react-router-dom";

import { CreateBuildLayout } from './layouts/CreateBuildLayout';
import { ViewBuildLayout } from './layouts/ViewBuildLayout';

import './App.css';
import { Footer } from "./Footer";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateBuildLayout />} />
        <Route path="/build" element={<ViewBuildLayout />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
