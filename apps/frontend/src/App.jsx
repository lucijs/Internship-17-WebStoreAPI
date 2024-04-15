import "./App.css";
import ProductsPage from "./pages/ProductsPage";
import ProductPage from "./pages/ProductPage";
import NotFoundPage from "./pages/NotFoundPage";
import { Route, Routes } from "react-router-dom";
import ProductsLayout from "./components/ProductsLayout";
import Register from "./components/Authentication/Register";
import LogIn from "./components/Authentication/LogIn";
import AuthenticationPage from "./pages/AuthenticationPage";
import { useEffect, useState } from "react";

function App() {
  const [gretting, setGreeting]=useState('');

  useEffect(()=>{
    fetch('/api/products/1')
      .then((res)=>
        res.json()
      )
      .then(data => {
        console.log(data); // Check if the data is received correctly
        setGreeting(data.title); // Use data.title to set the state
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
  },[])
  return (
    <div className="background">
      <p>Nesto: {gretting}</p>
      <Routes>
        <Route path="/users" element={<AuthenticationPage />} />
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