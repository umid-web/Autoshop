import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.scss';
import Katalog from '../Components/HomeComponents/katalogAuto/Katalog';
import MySwiper from '../UI/MySwiperMain/MySwiper';
import Naliche from '../Components/HomeComponents/AvtomobileNaliche/Naliche';
import Swiper from '../UI/MySwiperExtra/Swiper';
import Offer from '../Components/HomeComponents/Offer/Offer';
import PartnerSwiper from '../UI/PartnerSwiper/PartnerSwiper';
import Believe from '../UI/Believe/Believe';
import Map from '../Components/HomeComponents/Map/Map';
import Comment from '../Components/HomeComponents/AvtomobileNaliche/Comment/Comment';
import Kompany from '../Components/HomeComponents/Kompany/Kompany';
import BlogSwiper from '../UI/BlogSwiper/BlogSwiper';
import Application from '../Components/HomeComponents/Application/Application';
import MapMain from '../Components/HomeComponents/MapMain/MapMain';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Birinchi marta ochilganda tekshirish
    const hasRegistered = localStorage.getItem('hasRegistered');
    if (!hasRegistered) {
      // Kichik kechikish bilan registratsiya sahifasiga yo'naltirish
      setTimeout(() => {
        navigate('/register');
      }, 1000);
    }
  }, [navigate]);

  return (
    <div className='page-div'>
      <MySwiper/>
      <Katalog/>
      <Naliche/>
      <Swiper/>
      <Offer/>
      <Swiper/>
      <Application/>
      <PartnerSwiper/>
      <Believe/>
      <Map/>
      <Comment type='comments'/>
      <Kompany/>
      <BlogSwiper/>
      <MapMain/>
    </div>
  )
}

export default Home;
