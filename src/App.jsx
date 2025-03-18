import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpSellerPages from "./components/Pages/SignUpSeller/SignUpSellerPages";
import HomePages from "./components/Pages/Home/HomePages";
import AccountTypePages from "./components/Pages/AccountType/AccountTypePages";
import SignUpBuyerPages from "./components/Pages/SignUpBuyer/SignUpBuyerPages";
import SignInPages from "./components/Pages/SignIn/SignInPages";
import CartPages from "./components/Pages/Cart/CartPages";
import { UserContextProvider } from "./context/userContext/userContext";
import ProfilePages from "./components/Pages/Profile/ProfilePages";
import DashboardSeller from "./components/Pages/DashboardSeller/DashboardSeller";
import { ProductContextProvider } from "./context/productsContext/productContext";
import FormAddProducts from "./components/Pages/DashboardSeller/FormAddProducts/FormAddProducts";
import ListProductsSeller from "./components/Pages/DashboardSeller/ListProductsSeller/ListProducts";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import ProtectedRoutes from "./ProtectedRoutes";

export default function App() {
  return (
    <UserContextProvider>
      <ProductContextProvider>
      <Routes>
        <Route element={<ProtectedRoutes/>} >
        <Route path="/dashboardSeller" element={<DashboardSeller />} />
        <Route path="/addProducts" element={<FormAddProducts />} />
        <Route path="/addProducts/:id" element={<FormAddProducts />} />
        <Route path="/productsSeller" element={<ListProductsSeller />} />
        <Route path="/cart" element={<CartPages />} />
        <Route path="/profile" element={<ProfilePages />} />
       
        </Route>
        <Route path="/" element={<HomePages />} />
        <Route path="/selectAccount" element={<AccountTypePages />} />
        <Route path="/signUpSeller" element={<SignUpSellerPages />} />
        <Route path="/signIn" element={<SignInPages />} />
        <Route path="/signUpBuyer" element={<SignUpBuyerPages />} />
        <Route path="/product/:id" element={<ProductDetails />} />

      </Routes>
      </ProductContextProvider>
    </UserContextProvider>
  );
}
