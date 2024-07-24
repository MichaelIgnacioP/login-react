import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnimatedRoutes from './hoc/routes/Routes';

function App() {
  return (
    <Router>
    <AnimatedRoutes />
  </Router>
  );
}

export default App;
