
import './App.css';
import OrderCreating from "./components/order/OrderCreating";
import {BrowserRouter, Route, Routes} from "react-router-dom";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<OrderCreating />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
