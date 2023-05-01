import React from "react";
import { UserAuth } from "./context/AuthContext";
import GoogleButton from "react-google-button";

function SignIn() {
  const { googleSignIn } = UserAuth();
  const handleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {}
  };

  return (
    <div>
      <GoogleButton onClick={handleSignIn} />
    </div>
  );
}

export default SignIn;
