import React, { useEffect, useState } from "react";
import "../Personal/Personal.scss";

const Personal = () => {
  const [personalData, setPersonalData] = useState(null);

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => {
        setPersonalData(data.Personal); // db.json ichidagi "Personal" obyektni olish
      })
      .catch((err) => console.log("Xatolik:", err));
  }, []);

  if (!personalData) {
    return <p className="loading">Загрузка...</p>;
  }

  return (
    <div className="personal">
      <div className="container">
        <h2 className="name">{personalData.title}</h2>

        <form className="form">
          <input
            type="text"
            placeholder={personalData.namePlaceholder}
            required
          />
          <input
            type="tel"
            placeholder={personalData.phonePlaceholder}
            required
          />

          <select required>
            <option value="" hidden>
              {personalData.selectLabel}
            </option>
            {personalData.gifts.map((gift, index) => (
              <option key={index} value={gift}>
                {gift}
              </option>
            ))}
          </select>

          <button type="submit" className="btn">
            {personalData.buttonText}
          </button>
        </form>

        <p className="text">{personalData.consentText}</p>
      </div>
    </div>
  );
};

export default Personal;
