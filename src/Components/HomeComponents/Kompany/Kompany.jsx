import React, { useState } from "react";
import "../Kompany/Kompany.scss";

const Kompany = () => {
  const [playVideo, setPlayVideo] = useState(false);

  return (
    <div className="kompany">
      <div className="container">
        <h2 className="title">О компании</h2>
        <p className="text">
          Мы располагаем огромной торговой площадкой более 5000 квадратных метров, у нас в наличии не менее 200 автомобилей как отечественного, так и иностранного производства. В штате автосалона «Альтера» работают настоящие профессионалы, которые знают особенности каждого конкретного автомобиля.
        </p>

        <div className="video">
          {!playVideo ? (
            <div className="icon" onClick={() => setPlayVideo(true)}>
              <img src="src/Images/Svg/Group 1859.svg" alt="Play" />
            </div>
          ) : (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/ZUXKG3JFszc"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
};

export default Kompany;
