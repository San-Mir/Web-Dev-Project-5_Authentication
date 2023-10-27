import React, { useState } from "react";
import axios from "axios";
import { AppBar, Toolbar, Typography, Box, Tab, Tabs } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
axios.defaults.withCredentials = true;

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const sendLogoutReq = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", null, {
      withCredentials: true,
    });
    if (res.status == 200) {
      return res;
    }
    return new Error("Can Not Logout");
  };

  const handleLogout = () => {
    sendLogoutReq().then(() => dispatch(authActions.logout()));
  };

  const [value, setValue] = useState();

  return (
    <div>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4">
            MERN Authentication & Authorization
          </Typography>
          <Box sx={{ marginLeft: "auto" }}>
            <Tabs>
              <Tab to="/signup" LinkComponent={Link} label="Signup" />
              <Tab to="/login" LinkComponent={Link} label="Login" />
              {isLoggedIn && (
                <Tab
                  onClick={handleLogout}
                  // to="/logout"
                  LinkComponent={Link}
                  label="Logout"
                />
              )}{" "}
            </Tabs>
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
