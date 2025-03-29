import { Routes, Route } from "react-router";
import "./App.css";
import { Demo } from "./pages/Demo";
import { Home } from "./pages/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/demo">
          <Demo />
          <Home />
        </Route>
      </Routes>
    </>
  );
}

export default App;
