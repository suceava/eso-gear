import { Routes, Route, Link } from "react-router-dom";

import { CreateBuildLayout } from './layouts/CreateBuildLayout';
import { ViewBuildLayout } from './layouts/ViewBuildLayout';

import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<CreateBuildLayout />} />
        <Route path="/build" element={<ViewBuildLayout />} />
      </Routes>
    </div>
  );
}

export default App;
