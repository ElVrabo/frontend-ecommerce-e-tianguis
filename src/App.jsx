import * as React from 'react';
import {Routes,Route} from 'react-router-dom'
import SignUpSellerPages from './components/Pages/SignUpSeller/SignUpSellerPages'
import SignIn from "./components/Pages/SignInSeller/SignInSellerPages"
import HomePages from './components/Pages/Home/HomePages';


export default function App(){
  return (
       <Routes>
           <Route path='/' element={<HomePages/>} />
           <Route path='/signUp' element={<SignUpSellerPages/>} />
           <Route path='/signIn' element={<SignIn/>} />
       </Routes>
  )
}