import React, { useEffect, useState } from "react";
import "./Inbox.css";
import { UserAuth } from "./context/AuthContext";
import { Link } from "react-router-dom";

function Inbox({ setSection }) {
  const { user } = UserAuth();
  const [inbox, setInbox] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/inbox/" + user.email)
      .then((res) => res.json())
      .then((data) => setInbox(data));
  }, []);
  return (
    <div className="inbox">
      {inbox.map((i) => (
        <Link to={"/messages/" + user.email + "/" + i.email}>
          <div className="msg" onClick={() => setSection("messages")}>
            <img src={i.dp} alt="No image" referrerPolicy="no-referrer" />
            <h2>{i.email}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default Inbox;
