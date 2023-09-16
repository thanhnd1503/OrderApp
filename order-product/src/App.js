
import './App.css';
import OrderProduct from "./components/OrderProduct";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrderProduct />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
