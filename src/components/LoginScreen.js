import React, { useState } from "react";
import { useStyles } from "./styles.style";
import { Button, TextField, CircularProgress } from "@material-ui/core";
import Logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { Stringee } from "../stringeeMethods/methods";

const stringee = new Stringee();

export const LoginScreen = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onTextFieldChange = (event) => {
    setUsername(event.target.value);
  };

  const onLogin = async () => {
    setLoading(true);
    try {
      await stringee.auth(username);
      navigate("/create-room");
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  return (
    <>
      <div className={classes.root}>
        <div className={classes.logo}>
          <img src={Logo} alt="logo" />
        </div>
        <div className={classes.title}>Let's get started</div>
        <div className={classes.formLogin}>
          <div className={classes.enterName}>
            <TextField
              classes={{ root: classes.userName }}
              value={username}
              onChange={(e) => onTextFieldChange(e)}
              InputProps={{
                disableUnderline: true,
                placeholder: "Enter your name",
              }}
            />
          </div>
          <div className={classes.button}>
            <Button onClick={onLogin}>
              {loading ? <CircularProgress size={25} /> : "Enter"}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginScreen;
