import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Converter from "./components/Converter";

function App() {
  return (
    <div className="App">
        <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={ <Home /> }></Route>
                <Route exact path="/convert" element={ <Converter /> }></Route>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
