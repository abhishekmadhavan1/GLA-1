import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./login";
import Counter from "./counter";
import Table from "./table";
import UseRefCounter from "./useRef";
import { Home } from "./home";

const App = (props) => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/table" element={<Table />} />
          <Route path="/useRef" element={<UseRefCounter />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
