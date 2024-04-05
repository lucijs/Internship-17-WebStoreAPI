import './App.css';
import ProductsPage from './pages/ProductsPage';
import ProductPage from './pages/ProductPage';
import NotFoundPage from './pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import ProductsLayout from './components/ProductsLayout';
import Register from './pages/Authentication/Register';
import LogIn from './pages/Authentication/LogIn';

function App() {
  return (
    <div className="background">
      <Routes>
        <Route path="/users/register" element={<Register />} />
        <Route path="/users/login" element={<LogIn />} />
        <Route path="/" element={<ProductsLayout />} />
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
