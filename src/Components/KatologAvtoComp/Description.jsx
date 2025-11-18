import React, { useEffect, useState } from 'react';
import '../KatologAvtoComp/Description.scss';

const Description = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then((response) => {
        if (!response.ok) throw new Error('Xatolik yuz berdi!');
        return response.json();
      })
      .then((json) => {
        if (json.description) {
          setData(json.description);
        }
      })
      .catch((error) => console.error('Fetch xatolik:', error));
  }, []);

  return (
    <div className="description">
      <div className="container">
        {data.length > 0 ? (
          data.map((item) => (
            <div key={item.id} className="info">
              <h2 className="title">{item.title}</h2>
              <p className="text">{item.text}</p>
            </div>
          ))
        ) : (
          <p className="loading">Описание загружается...</p>
        )}
      </div>
    </div>
  );
};

export default Description;
