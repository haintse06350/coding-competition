import React from "react";
import { useStyles } from "./styles.style";
import { Button, TextField } from "@material-ui/core";
import Logo from "../assets/logo.png";

export const LoginScreen = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.logo}>
        <img src={Logo} alt="logo" />
      </div>
      <div className={classes.title}>Let's get started</div>
      <div className={classes.formLogin}>
        <div className={classes.enterName}>
          <TextField
            classes={{ root: classes.userName }}
            InputProps={{
              disableUnderline: true,
              placeholder: "Enter your name",
            }}
          />
        </div>
        <div className={classes.button}>
          <Button>Enter</Button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
