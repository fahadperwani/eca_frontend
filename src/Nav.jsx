import React from "react";
import "./Nav.css";

function Nav({ setSection, section }) {
  return (
    <nav>
      <button
        className={section == "email" ? "active" : ""}
        onClick={() => setSection("email")}
      >
        Email
      </button>
      <div className="line"></div>
      <button
        className={section == "inbox" ? "active" : ""}
        onClick={() => setSection("inbox")}
      >
        Inbox
      </button>
    </nav>
  );
}

export default Nav;
