import * as React from "react";
import { Routes, Route } from "react-router-dom";
import { UserContextProvider } from "./context/userContext/userContext";
import { ProductContextProvider } from "./context/productsContext/productContext";
import ProtectedRoutes from "./ProtectedRoutes";

// Páginas
import SignUpSellerPages from "./components/Pages/SignUpSeller/SignUpSellerPages";
import HomePages from "./components/Pages/Home/HomePages";
import AccountTypePages from "./components/Pages/AccountType/AccountTypePages";
import SignUpBuyerPages from "./components/Pages/SignUpBuyer/SignUpBuyerPages";
import SignInPages from "./components/Pages/SignIn/SignInPages";
import CartPages from "./components/Pages/Cart/CartPages";
import ProfilePages from "./components/Pages/Profile/ProfilePages";
import DashboardSeller from "./components/Pages/DashboardSeller/DashboardSeller";
import FormAddProducts from "./components/Pages/DashboardSeller/FormAddProducts/FormAddProducts";
import ListProductsSeller from "./components/Pages/DashboardSeller/ListProductsSeller/ListProducts";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails";
import EditProfilePages from "./components/Pages/Profile/EditProfilePages/EditProfilePages";
import MenuProfilePages from "./components/Pages/Profile/MenuProfilePages/MenuProfilePages";

export default function App() {
  return (
    <div className="min-h-screen bg-background-paper dark:bg-gray-900 transition-colors duration-300">
      <UserContextProvider>
        <ProductContextProvider>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path="/dashboardSeller" element={<DashboardSeller />} />
              <Route path="/addProducts" element={<FormAddProducts />} />
              <Route path="/addProducts/:id" element={<FormAddProducts />} />
              <Route path="/productsSeller" element={<ListProductsSeller />} />
              <Route path="/cart" element={<CartPages />} />
              <Route path="/profile" element={<ProfilePages />} />
              <Route path="/editProfile" element={<EditProfilePages />} />
              <Route path="/menuProfile" element={<MenuProfilePages />} />
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
    </div>
  );
}