import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Mainlayout from "./components/Mainlayout";
import Enquiries from "./pages/Enquiries";
import Bloglist from "./pages/Bloglist";
import Orders from "./pages/Orders";
import Colorlist from "./pages/Colorlist";
import Categorylist from "./pages/Categorylist";
import Productlist from "./pages/Productlist";
import Customers from "./pages/Customers";
import Brandlist from "./pages/Brandlist";
import Addblogs from "./pages/Addblogs";
import Addblogcat from "./pages/Addblogcat";
import Addcolor from "./pages/Addcolor";
import Addcat from "./pages/Addcat";
import Addbrand from "./pages/Addbrand";
import Addproduct from "./pages/Addproduct";
import Blogscatlist from "./pages/Blogscatlist";
import Couponlist from "./pages/Couponlist";
import Addcoupon from "./pages/Addcoupon";
import ViewEnq from "./pages/ViewEnq";
import ViewOrder from "./pages/ViewOrder";
import { PrivateRoutes } from "./routing/PrivateRoutes";
import { OpenRoutes } from "./routing/OpenRoutes";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<OpenRoutes><Login /></OpenRoutes>} />
        <Route path="/admin" element={<PrivateRoutes><Mainlayout /></PrivateRoutes>}>
          <Route index element={<Dashboard />} />
          <Route path="enquiries" element={<Enquiries />} />
          <Route path="enquiries/:id" element={<ViewEnq />} />
          <Route path="blog-list" element={<Bloglist />} />
          <Route path="add-blog" element={<Addblogs />} />
          <Route path="add-blog/:id" element={<Addblogs />} />
          <Route path="coupon-list" element={<Couponlist />} />
          <Route path="coupon" element={<Addcoupon />} />
          <Route path="coupon/:id" element={<Addcoupon />} />
          <Route path="orders" element={<Orders />} />
          <Route path="order/:id" element={<ViewOrder />} />
          <Route path="customers" element={<Customers />} />
          <Route path="color-list" element={<Colorlist />} />
          <Route path="brand-list" element={<Brandlist />} />
          <Route path="product-list" element={<Productlist />} />
          <Route path="category-list" element={<Categorylist />} />
          <Route path="blog-category" element={<Addblogcat />} />
          <Route path="blog-category/:id" element={<Addblogcat />} />
          <Route path="blog-list-category" element={<Blogscatlist />} />
          <Route path="category" element={<Addcat />} />
          <Route path="category/:id" element={<Addcat />} />
          <Route path="color" element={<Addcolor />} />
          <Route path="color/:id" element={<Addcolor />} />
          <Route path="brand" element={<Addbrand />} />
          <Route path="brand/:id" element={<Addbrand />} />
          <Route path="product" element={<Addproduct />} />
          <Route path="product/:id" element={<Addproduct />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
