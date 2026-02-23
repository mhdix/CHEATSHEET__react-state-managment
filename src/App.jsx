import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<LocationList />} />
      </Routes>
      {/* <LocationList  /> */}
    </div>
  );
}

export default App;

//? video 105
