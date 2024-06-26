import { useState } from "react";
import { auth } from "../../configs/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAppContext } from "../../context/AppContext";
import { Box, Button, TextField } from "@mui/material";

const Login = ({ handleClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setAlert } = useAppContext();

  const handleSubmit = async () => {
    if (!email || !password) {
      setAlert({
        open: true,
        message: "Please fill all the Fields",
        type: "error",
      });
      return;
    }

    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      setAlert({
        open: true,
        message: `Login Successful. Welcome ${user.email}`,
        type: "success",
      });

      handleClose();
    } catch (error) {
      setAlert({
        open: true,
        message: error.message,
        type: "error",
      });
      return;
    }
  };

  return (
    <Box
      p={3}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
      }}
    >
      <TextField
        variant="outlined"
        type="email"
        label="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
      />
      <TextField
        variant="outlined"
        label="Enter Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
      />
      <Button
        variant="contained"
        size="large"
        onClick={handleSubmit}
        style={{ backgroundColor: "#EEBC1D" }}
      >
        Login
      </Button>
    </Box>
  );
};

export default Login;
