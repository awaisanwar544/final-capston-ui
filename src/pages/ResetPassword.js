import { useDispatch, useSelector } from 'react-redux';

import { useLocation } from 'react-router';
import { useState } from 'react';

// import { useNavigate } from 'react-router-dom';

import { passwordReset } from '../redux/reducers/user';
import logo from '../assets/logo.png';

function ResetPassword() {
  const dispatch = useDispatch();
  const location = useLocation();
  const searchQuery = location.search;
  const resetToken = searchQuery.split('&reset_password_token=')[1];
  const message = useSelector((state) => state.user.status);
  // const navigate = useNavigate();

  const [displayMessage, setDisplayMessage] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPassword = event.target[0].value;
    const confirmPassword = event.target[1].value;
    if (newPassword === confirmPassword) {
      dispatch(passwordReset(newPassword, resetToken));
      setDisplayMessage(message);
    } else {
      setDisplayMessage('Password do not match, please re-enter');
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center bg-custom-green-500 space-y-10">
      {displayMessage && <p className="text-custom-white-500">Pasword changed succesfully. You will be redirected to sign in page shortly</p>}
      <form className="bg-white shadow-xl rounded px-8 pt-6 pb-8 h-fit mx-auto max-w-xs" onSubmit={handleSubmit}>
        <div className="flex w-full p-10 justify-center">
          <a href="/">
            <img className="w-24" src={logo} alt="logo" />
          </a>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            New password
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-custom-green-500 focus:placeholder:text-custom-green-500" id="password" type="password" placeholder="******************" />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
            Confirm password
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-custom-green-500 focus:placeholder:text-custom-green-500" id="confirm-password" type="password" placeholder="******************" />
          </label>
        </div>
        <div className="flex items-center justify-center">
          <button className="bg-custom-white-500 text-custom-grey-500 border border-custom-green-500 hover:bg-custom-green-500 hover:text-white font-bold py-2 px-4 rounded focus:outline-none" type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPassword;
