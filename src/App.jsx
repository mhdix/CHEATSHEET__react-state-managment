import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header";
import LocationList from "./components/LocationList";
function App() {
  return (
    <>
      <Header />
      <Toaster />
      <LocationList  />
    </>
  );
}

export default App;


//? video 105