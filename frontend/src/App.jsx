import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProductsLayout from "./components/ProductsLayout";
import Register from "./pages/Authentication/Register";

function App() {
  return (
    <div className="background">
      <Routes>
        <Route path="/" element={<ProductsLayout />} />
        <Route path="/products" element={<ProductsLayout />}>
          <Route index element={<ProductsPage />} />
          <Route path=":id" element={<ProductPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/users/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
