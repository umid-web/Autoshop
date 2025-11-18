import React, { useEffect, useState } from 'react';
import '../Programm/Programm.scss';

const Programm = () => {
  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/db.json')
      .then((res) => {
        if (!res.ok) throw new Error('Serverdan maʼlumot olinmadi');
        return res.json();
      })
      .then((data) => {
        // data objekt — bizning db.json ichidagi butun object
        // undagi "programm" massivni o'qiymiz
        setPrograms(data.programm || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="programm">Yuklanmoqda...</div>;
  if (error) return <div className="programm">Xatolik: {error}</div>;

  return (
    <div className='programm'>
      <div className="container">
        <h2 className="program-title">Преимущества программы</h2>
        <div className="card-wrp">
          {programs.map((item) => (
            <div key={item.id} className="card">
              <img src={item.img} alt={item.text} />
              <h3 className="number">{item.number}</h3>
              <p className="text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Programm;
