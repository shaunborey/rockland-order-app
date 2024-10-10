import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { pdfjs } from 'react-pdf';
import Login from './components/Login';
import Register from './components/Register';
import OrderSystem from './components/OrderSystem';
import AuthService, { AuthServiceContext } from './services/auth.service';
import ApiService, { ApiServiceContext } from './services/api.service';
import OrderService, { OrderServiceContext } from './services/order.service';
import UtilitiesService, { UtilitiesServiceContext } from "./services/utilities.service";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  axios.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return (
    <AuthServiceContext.Provider value={AuthService()}>
      <ApiServiceContext.Provider value={ApiService()}>
        <OrderServiceContext.Provider value={OrderService()}>
          <UtilitiesServiceContext.Provider value={UtilitiesService()}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/catalog" element={<OrderSystem displayComponent="catalog" />} />
                <Route path="/cart" element={<OrderSystem displayComponent="cart" />} />
                <Route path="/checkout" element={<OrderSystem displayComponent="checkout" />} />
              </Routes>
            </BrowserRouter>
          </UtilitiesServiceContext.Provider>
        </OrderServiceContext.Provider>
      </ApiServiceContext.Provider>
    </AuthServiceContext.Provider>
  );
}

export default App;
