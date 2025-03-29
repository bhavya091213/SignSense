import { Routes, Route } from "react-router";
import "./App.css";
import { Demo } from "./pages/Demo";
import { DemoTwo } from "./pages/DemoTwo";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Demo />} />
        <Route path="/demotwo" element={<DemoTwo />} />
      </Routes>
    </>
  );
}

export default App;
