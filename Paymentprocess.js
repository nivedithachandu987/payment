import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Paymentprocess.css';

const countries = ['India','United States', 'Canada', 'United Kingdom', 'Australia'];
const regions = {
  'United States': ['California', 'Texas', 'Florida', 'New York', 'Illinois'],
  Canada: ['Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Manitoba'],
  'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
  Australia: ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
  India: ['Andhra Pradesh', 'Maharashtra', 'Karnataka', 'Tamil Nadu','Telangana'],
};

const Paymentform = () => {
  const location = useLocation();
  const { price } = location.state || { price: 0 };

  const [formData, setFormData] = useState({
    nameoncard: '',
    email: '',
    cardinformation: '',
    expiry: '',
    cvc: '',
    country: '',
    region: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validate = () => {
    const errors = {};

    if (!formData.nameoncard) {
      errors.nameoncard = 'Name on card is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nameoncard)) {
      errors.nameoncard = 'Invalid name';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email address is invalid';
    }

    if (!formData.cardinformation) {
      errors.cardinformation = 'Card information is required';
    } else if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(formData.cardinformation)) {
      errors.cardinformation = 'Card information is invalid';
    }

    if (!formData.expiry) {
      errors.expiry = 'Expiry date is required';
    }

    if (!formData.cvc) {
      errors.cvc = 'CVC is required';
    } else if (!/^\d{3,4}$/.test(formData.cvc)) {
      errors.cvc = 'CVC is invalid';
    }

    if (!formData.country) {
      errors.country = 'Country is required';
    }

    if (!formData.region) {
      errors.region = 'Region is required';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    if (Object.keys(errors).length === 0) {
      setSuccessMessage('Payment is successful!');
      setErrors({});
      // Simulate API call with a delay
      setTimeout(() => {
        console.log('Payment data:', formData);
      }, 1000);
    } else {
      setErrors(errors);
      setSuccessMessage('');
    }
  };

  return (
    <div className="payment-form">
      <h1>Payment</h1>
      <h2>-----------Or pay with card-----------</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cardinformation">Card Information</label>
          <input
            type="text"
            id="cardinformation"
            name="cardinformation"
            value={formData.cardinformation}
            onChange={handleChange}
            placeholder="1234 1234 1234 1234"
          />
          {errors.cardinformation && <p className="error">{errors.cardinformation}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="expiry">MM / YY</label>
          <input
            type="text"
            id="expiry"
            name="expiry"
            value={formData.expiry}
            onChange={handleChange}
            placeholder="MM / YY"
          />
          {errors.expiry && <p className="error">{errors.expiry}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="cvc">CVC</label>
          <input
            type="text"
            id="cvc"
            name="cvc"
            value={formData.cvc}
            onChange={handleChange}
            placeholder="CVC"
          />
          {errors.cvc && <p className="error">{errors.cvc}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="nameoncard">Name on Card</label>
          <input
            type="text"
            id="nameoncard"
            name="nameoncard"
            value={formData.nameoncard}
            onChange={handleChange}
          />
          {errors.nameoncard && <p className="error">{errors.nameoncard}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="country">Country or Region</label>
          <select
            id="country"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          {errors.country && <p className="error">{errors.country}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="region">Region</label>
          <select
            id="region"
            name="region"
            value={formData.region}
            onChange={handleChange}
            disabled={!formData.country}
          >
            <option value="">Select Region</option>
            {formData.country && regions[formData.country].map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
          {errors.region && <p className="error">{errors.region}</p>}
        </div>
        <button type="submit" className="btn btn-primary">Pay ${price}</button>
      </form>
      {successMessage && <p className="success">{successMessage}</p>}
    </div>
  );
};

export default Paymentform;

