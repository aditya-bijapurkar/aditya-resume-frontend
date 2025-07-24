import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ProjectsDetails from './pages/ProjectDetails';
import Skills from './pages/Skills';
import Experience from './pages/Experience';
import Contact from './pages/Contact';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="details" element={<ProjectsDetails />} />
            <Route path="skills" element={<Skills />} />
            <Route path="experience" element={<Experience />} />
            <Route path="contact" element={<Contact />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
