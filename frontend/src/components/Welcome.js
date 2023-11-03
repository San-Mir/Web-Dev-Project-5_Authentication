import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
let firstRender = true;
const Welcome = () => {
  const [user, setUser] = useState();

  const refreshToken = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}api/refresh`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    return data;
  };
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/user`, {
        withCredentials: true,
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    if (firstRender) {
      firstRender = false;
      sendRequest().then((data) => setUser(data.user));
    }
    let interval = setInterval(() => {
      refreshToken().then((data) => setUser(data));
    }, 1000 * 60);

    return () => clearInterval(interval);
  }, []);
  return <div>{user && <h1>{user.name}</h1>}</div>;
};

export default Welcome;
