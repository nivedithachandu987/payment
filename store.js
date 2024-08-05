import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

function Fakestore() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handler = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/')
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const handlePayment = (price) => {
    navigate('/payment', { state: { price } });
  };

  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
          <input
            type='text'
            className='form-control'
            placeholder='Search'
            value={search}
            onChange={handler}
          />
        </div>
      </div>
      <div className='row'>
        {data
          .filter((x) => x.title.toLowerCase().includes(search.toLowerCase()))
          .map((item) => (
            <div className='col-md-4' key={item.id}>
              <div className='card'>
                <img src={item.image} className='card-img-top' alt={item.title} />
                <div className='card-body'>
                  <h4 className='card-title text-center'>{item.title}</h4>
                  <h5 className='text-center'>
                    <button
                      className='btn btn-outline-danger'
                      onClick={() => handlePayment(item.price)}
                    >
                      {item.price}
                    </button>
                  </h5>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Fakestore;

