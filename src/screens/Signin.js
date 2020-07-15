import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../actions/authActions";

const Signin = () => {
  const dispatch = useDispatch();
  const { signingIn } = useSelector(({ auth }) => auth);
  const [form, setForm] = useState({
    password: "",
    email: "",
  });

  const onChange = ({ target: { type, value } }) => {
    switch (type) {
      case "password":
        setForm(prevForm => ({ ...prevForm, password: value }));
        break;
      case "email":
        setForm(prevForm => ({ ...prevForm, email: value }));
        break;
      default:
        break;
    }
  };

  const onClickSignin = () => {
    dispatch(signIn(form));
  };

  return (
    <div>
      <input
        type="email"
        onChange={onChange}
        placeholder="Email"
        value={form.email}
      />
      <input
        onChange={onChange}
        type="password"
        placeholder="Password"
        value={form.password}
      />
      {signingIn ? (
        <p>Signing in...</p>
      ) : (
        <button type="button" onClick={onClickSignin}>
          Signin
        </button>
      )}
    </div>
  );
};

export default Signin;
