import React, { useEffect, useState } from "react";
import "./Requirement.scss";

const Requirement = () => {
  const [requirements, setRequirements] = useState({ conditions: [], documents: [] });

  useEffect(() => {
    fetch("/db.json")
      .then((res) => res.json())
      .then((data) => setRequirements(data.requirements))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="requirement">
      <div className="container">
        {/* === Условия покупки === */}
        <div className="conditions-wrp">
          <h2 className="title">Условия покупки</h2>
          <div className="conditions">
            {requirements.conditions.map((item) => (
              <div className="condition" key={item.id}>
                <i className={item.icon}></i>
                <p className="text">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* === Необходимые документы === */}
        <div className="documents-wrp">
          <h2 className="title">Необходимые документы</h2>
          <div className="documents">
            {requirements.documents.map((doc) => (
              <div className="document" key={doc.id}>
                <i className={doc.icon}></i>
                <p className="text">{doc.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requirement;
