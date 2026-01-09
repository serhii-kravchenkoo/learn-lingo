import { Route, Routes } from "react-router-dom";


// import Teachers from "../pages/Teachers"
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/home/Home";


function App() {
  return (
    <Routes>

      <Route element={<MainLayout/>}>
        <Route path="/" element={<Home />} />
      </Route>


      {/* <Route path="/teachers" element={<Teachers />} /> */}
    </Routes>
  );
}

export default App;