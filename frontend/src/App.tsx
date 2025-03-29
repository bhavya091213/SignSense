import { Routes, Route } from "react-router";
import "./App.css";
import { Demo } from "./pages/Demo";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </>
  );
}

export default App;
