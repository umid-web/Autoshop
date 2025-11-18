import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "./MySwiper.scss";

const MySwiper = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    fetch("/db.json") // ✅ public ichidagi faylga to‘g‘ri murojaat
      .then((res) => res.json())
      .then((data) => setSlides(data.swiper)) // ✅ to‘g‘ri funksiyani chaqirish
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="my-swiper-container">
      <div className="container">
        {slides.length > 0 ? (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000 }}
            loop={true}
            slidesPerView={1}
            spaceBetween={10}
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="titles">
                  <h2 className="slide__title">
                    Грандиозная распродажа тестового парка!
                  </h2>
                  <h4 className="subtitle">Узнай свою цену!</h4>
                </div>

                <div className="slide-item">
                <div className="images">
                  <img className="img1" src={slide.img} alt={slide.title} />
                  <img className="img2" src={slide.img2} alt={slide.title} />
                  <img  src={slide.img3} alt="" className="img3" />
                </div>
                  <p>{slide.title}</p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <p style={{ textAlign: "center", color: "#666" }}>Yuklanmoqda...</p>
        )}
      </div>
    </div>
  );
};

export default MySwiper;
