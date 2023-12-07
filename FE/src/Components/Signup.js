

import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Signup = () => {


  const [formData, setFormData] = useState({
    user_first_name: '',
    user_last_name: '',
    user_email: '',
    user_password: '',
  });

  const { user_first_name, user_last_name, user_email, user_password } = formData;
  const history = useHistory();


  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/common/register', {
        user_first_name,
        user_last_name,
        user_email,
        user_password,
      });

      console.log(res.data);
      if (res.data.status === 200) {
        history.push('/home');
      }
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="user_first_name"
          value={user_first_name}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Last Name"
          name="user_last_name"
          value={user_last_name}
          onChange={onChange}
        />
        <input
          type="email"
          placeholder="Email"
          name="user_email"
          value={user_email}
          onChange={onChange}
        />
        <input
          type="password"
          placeholder="Password"
          name="user_password"
          value={user_password}
          onChange={onChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

