import { Weather } from "./Components/Weather.jsx";
import { HashRouter } from "react-router-dom";
import "./Weather.css";

function App() {
  return (
    <HashRouter>
      <div className="app">
        <Weather />
      </div>
    </HashRouter>
  );
}

export default App;
