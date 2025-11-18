import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes, Navigate, useLocation } from 'react-router-dom'

import Navbar from '../Components/Main/Navbar/Navbar'
import Home from '../Pages/Home'
import Footer from '../Components/Main/Footer/Footer'
import FooterBottom from '../Components/Main/Footer/FooterBottom'
import KatologAvto from '../Pages/KatologAvto'
import AutoProbeg from '../Pages/AutoProbeg'
import Kredit from '../Pages/Kredit'
import FooterTop from '../Components/Main/Footer/FooterTop/FooterTop'
import Expres from '../Pages/Expres'
import FamilyCar from '../Pages/FamilyCar'
import FirstAvto from '../Pages/FirstAvto'
import Medisine from '../Pages/Medisine'
import PaymentPlan from '../Pages/PaymentPlan'
import TradeIn from '../Pages/TradeIn'
import Taxi_Kredit from '../Pages/Taxi-Kredit'
import Reviews from '../Pages/Reviews'
import Kontakt from '../Pages/Kontakt'
import AboutCompany from '../Pages/AboutCompany'
import TechnicalCenter from '../Pages/TechnicalCenter'
import SpecialOffers from '../Components/SpecialOffersComp/SpecialOffers'
import Search from '../Components/SearchCopm/Search'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

// 🔥 Auth bo'lmaganlar kirishi mumkin bo'lgan sahifalar
const AuthRoutes = ['/login', '/register']

function Layout({ children }) {
  const location = useLocation()
  const currentUser = JSON.parse(localStorage.getItem('currentUser'))

  // Agar foydalanuvchi login bo'lmagan bo'lsa → faqat Login / Register sahifalar ochilsin
  const isAuthPage = AuthRoutes.includes(location.pathname)

  if (!currentUser && !isAuthPage) {
    return <Navigate to="/register" replace />
  }

  // Agar AuthPage bo'lsa → Header/Footersiz
  if (isAuthPage) {
    return <>{children}</>
  }

  // Login bo'lganlar uchun Navbar + Footer + Page
  return (
    <>
      <Navbar />
      {children}
      <FooterTop />
      <Footer />
      <FooterBottom />
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected pages */}
          <Route path="/" element={<Home />} />
          <Route path="catalog-avto" element={<KatologAvto />} />
          <Route path="avto-probeg" element={<AutoProbeg />} />
          <Route path="avto-kredit" element={<Kredit />} />
          <Route path="express-kredit" element={<Expres />} />
          <Route path="family-car" element={<FamilyCar />} />
          <Route path="first-avtomobil" element={<FirstAvto />} />
          <Route path="medisine" element={<Medisine />} />
          <Route path="payment-plan" element={<PaymentPlan />} />
          <Route path="trade-in" element={<TradeIn />} />
          <Route path="taxi-kredit" element={<Taxi_Kredit />} />
          <Route path="Отзывы" element={<Reviews />} />
          <Route path="Контакты" element={<Kontakt />} />
          <Route path="компании" element={<AboutCompany />} />
          <Route path="Техцентр" element={<TechnicalCenter />} />
          <Route path="special-offers" element={<SpecialOffers />} />
          <Route path="search" element={<Search />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
