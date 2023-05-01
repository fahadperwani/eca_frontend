import React from "react";
import Email from "./Email";
import Inbox from "./Inbox";
import Nav from "./Nav";
import SignIn from "./SignIn";
import { UserAuth } from "./context/AuthContext";
import { useState } from "react";

function Home() {
  const { user } = UserAuth();
  const [section, setSection] = useState("inbox");
  return (
    <>
      <Nav setSection={setSection} section={section} />
      {!user.displayName && <SignIn />}
      {user.displayName && section == "inbox" && (
        <Inbox setSection={setSection} />
      )}
      {user.displayName && section == "email" && <Email />}
    </>
  );
}

export default Home;
