import React, { useEffect, useState } from "react";
import "./Kontakt__Kompani.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Kontakt__Kompani = () => {
  const [data, setData] = useState(null);

  // ✅ Ma'lumotlarni db.json dan olish
  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((info) => setData(info.company))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  if (!data) return <p className="loading">Yuklanmoqda...</p>;

  return (
    <div className="kontakt-kompani">
      <div className="container">
        <div className="description">
          <h2 className="title">{data.title}</h2>
          <p className="text">{data.text}</p>
        </div>

        {/* 📸 Swiper (1 ta rasm ko‘rinadigan karusel) */}
        <div className="images">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            spaceBetween={20}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop
          >
            {data.images.map((img, i) => (
              <SwiperSlide key={i}>
                <img src={img} alt={`Company ${i + 1}`} className="company-img" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Kontakt__Kompani;
