import React, { useEffect, useState } from "react";
import "./Comment.scss";

const Comment = ({ type = "comments" }) => {
  const [comments, setComments] = useState([]);
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => {
        if (!res.ok) throw new Error("JSON yuklanmadi!");
        return res.json();
      })
      .then((data) => {
        // ✅ to‘g‘ri o‘zgaruvchi — type
        if (data[type]) setComments(data[type]);
        else console.error(`"${type}" bo‘lim topilmadi!`);
      })
      .catch((err) => console.error("Xatolik:", err));
  }, [type]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/shorts/")) {
      return url.replace("youtube.com/shorts/", "youtube.com/embed/");
    } else if (url.includes("watch?v=")) {
      return url.replace("watch?v=", "embed/");
    }
    return url;
  };

  return (
    <div className="comment">
      <div className="container">
        <h2 className="title">Отзывы</h2>

        <div className="card-wrp">
          {comments.map((item) => {
            const embedUrl = getYouTubeEmbedUrl(item.video);
            return (
              <div className="card" key={item.id}>
                <div
                  className="video"
                  onClick={() =>
                    setActiveVideo(activeVideo === item.id ? null : item.id)
                  }
                >
                  {activeVideo === item.id && item.video ? (
                    embedUrl && embedUrl.includes("youtube.com") ? (
                      <iframe
                        src={embedUrl}
                        title={item.name}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="card-video"
                      ></iframe>
                    ) : (
                      <video
                        src={item.video}
                        controls
                        autoPlay
                        className="card-video"
                      ></video>
                    )
                  ) : (
                    <>
                      <img src={item.img} alt={item.name} className="card-img" />
                      {item.video && (
                        <i className="fa-solid fa-play play-icon"></i>
                      )}
                    </>
                  )}
                </div>

                <h2 className="card__title">{item.name}</h2>
                <p className="card__text">{item.text}</p>

                <select name="commentType" className="comment__select">
                  <option value="" disabled selected hidden>
                    Fikr turini tanlang
                  </option>
                  <option value="positive">Положительный отзыв 👍</option>
                  <option value="negative">Отрицательный отзыв 👎</option>
                </select>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Comment;
