
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import About from "./pages/About";
import Contact from "./pages/Contact";
import "./App.css";

function Navigation() {
  return (
    <header className="site-header">
      <NavLink to="/" className="brand">
        S<span>.</span>JAT
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/work">Work</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <span className="availability">
        <span className="status-dot" />
        OPEN TO CONNECT
      </span>
    </header>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navigation />

      <main className="page-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
