// external dependency imports
import React from "react";
import { useNavigate } from "react-router-dom";

// style imports
import { Button } from "@material-ui/core";

// Auth import
import { logOut } from "../../services/AuthService";

// component used for logging out a user
function Logout(props) {
  const navigate = useNavigate();

  const handleLeave = async () => {
    const res = await logOut();
    if (res) {
      props.socket.disconnect();
      navigate("/", { replace: true });
    }
  };
  return (
    <Button onClick={handleLeave} variant="contained" color="secondary">
      Logout
    </Button>
  );
}

export default Logout;
