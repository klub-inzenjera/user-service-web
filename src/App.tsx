import { Link, Route, Routes } from "react-router";
import Todos from "./pages/Todos";
import { Welcome } from "./pages/Welcome";

function App() {
  return (
    <>
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link to="/">Home</Link>
        <Link to="/todos">Todos</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </>
  );
}

export default App;
