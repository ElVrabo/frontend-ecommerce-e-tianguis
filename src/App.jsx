import * as React from "react";
import { Routes, Route } from "react-router-dom";
import SignUpSellerPages from "./components/Pages/SignUpSeller/SignUpSellerPages";
import HomePages from "./components/Pages/Home/HomePages";
import AccountTypePages from "./components/Pages/AccountType/AccountTypePages";
import SignUpBuyerPages from "./components/Pages/SignUpBuyer/SignUpBuyerPages";
import SignInPages from "./components/Pages/SignIn/SignInPages";
import CartPages from "./components/Pages/CartPages/CartPages";
import { UserContextProvider } from "./context/userContext/userContext";

export default function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<HomePages />} />
        <Route path="/selectAccount" element={<AccountTypePages />} />
        <Route path="/signUpSeller" element={<SignUpSellerPages />} />
        <Route path="/signIn" element={<SignInPages />} />
        <Route path="/signUpBuyer" element={<SignUpBuyerPages />} />
        <Route path="/Cart" element={<CartPages />} />
      </Routes>
    </UserContextProvider>
  );
}
