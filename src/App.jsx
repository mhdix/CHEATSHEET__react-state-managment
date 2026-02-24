import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
function App() {
  return (
    <div>
      <Header />
      <Toaster />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<div>Hotels</div>} />
          <Route path=":id" element={<div>single hotels</div>} />
        </Route>
      </Routes>
      {/* <LocationList  /> */}
    </div>
  );
}

export default App;

//? video 105
//? video 109
