import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import GoogleLogin from 'react-google-login';


const Login = ({ setIsLoginSuccessful }) => {
  const [formData, setFormData] = useState({
    user_email: '',
    user_password: '',
  });

  const { user_email, user_password } = formData;
  const history = useHistory();

  const [registerData, setRegisterData] = useState({
    username: '',
    email: '',
    password: '',
  });
  
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:5000/common/login', {
        user_email,
        user_password,
      });

      console.log(res.data);
      if (res.data.status === 200) {
        // Set login success state to true
        history.push('/home');
      }
    } catch (err) {
      console.error(err.response.data);
      alert ("User need to signup")
    }
  };

    const responseGoogle = (response) => {
    if (response && response.profileObj && response.profileObj.name) {
        setRegisterData((prevData) => ({
            ...prevData,
            username: response.profileObj.name,
        }));
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
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

        <div>
                        <GoogleLogin
                            clientId="461609963731-d9034mnag6mvc0f4tgbsrh5abpnks8rs.apps.googleusercontent.com"
                            buttonText="Continue with Google"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>

        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
