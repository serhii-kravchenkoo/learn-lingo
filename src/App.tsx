import { Route, Routes } from "react-router-dom";



import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";
import Teachers from "./pages/teachers/Teachers";


function App() {
  return (
    <Routes>

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
      </Route>


      <Route path="/teachers" element={<Teachers />} />
    </Routes>
  );
}

export default App;