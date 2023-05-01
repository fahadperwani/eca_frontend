import React, { useState } from "react";
import "./Email.css";
import { UserAuth } from "./context/AuthContext";

function Email() {
  const [msg, setMsg] = useState("");
  const [key, setKey] = useState("");
  const [keyType, setKeyType] = useState(null);
  const [asKeyType, setAsKeyType] = useState(null);
  const [email, setEmail] = useState("");
  const { user } = UserAuth();

  const handleSubmit = (e) => {
    console.log(".......");
    e.preventDefault();
    const data = {
      primary: user.email,
      secondary: email,
      text: msg,
      type: asKeyType,
      key: key,
      keyType,
    };

    if (keyType == "symmetric") {
      fetch("http://localhost:5000/encrypt/symmetric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setMsg("");
          setKey("");
          setKeyType("");
          setAsKeyType("");
          setEmail("");
          console.log(data);
        })
        .catch((error) => console.error(error));
    } else {
      fetch("http://localhost:5000/encrypt/assymmetric", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          setMsg("");
          setKey("");
          setKeyType("");
          setAsKeyType("");
          setEmail("");
          console.log(data);
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Receipent address"
      />
      <textarea
        name="msg"
        id=""
        cols="30"
        rows="2"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        placeholder="Text........"
      ></textarea>
      <div className="type">
        <label for="" id="type">
          Type of Encryption
        </label>
        <div class="radio-section">
          <input
            type="radio"
            checked={keyType == "symmetric"}
            name="method"
            id="radio1"
            onClick={() => setKeyType("symmetric")}
          />
          <label for="radio1">Symmetric</label>
          <input
            type="radio"
            checked={keyType == "assymetric"}
            name="method"
            id="radio2"
            onClick={() => setKeyType("assymetric")}
          />
          <label for="radio2" on>
            Assymmetric
          </label>
        </div>
      </div>
      <div
        className="assymetric-key"
        style={{
          display: !(keyType == "assymetric") && "none",
        }}
      >
        <label for="" id="type">
          Type of Assymetric Key
        </label>
        <div class="radio-section">
          <input
            type="radio"
            checked={asKeyType == "private"}
            name="key-type"
            id="key-radio1"
            onClick={() => setAsKeyType("private")}
          />
          <label for="key-radio1">Private</label>
          <input
            type="radio"
            checked={asKeyType == "public"}
            name="key-type"
            id="key-radio2"
            onClick={() => setAsKeyType("public")}
          />
          <label for="key-radio2" on>
            Public
          </label>
        </div>
      </div>
      <textarea
        name="key"
        id="key"
        cols="30"
        rows="3"
        value={key}
        onChange={(e) => setKey(e.target.value.replace("/\n/g", "\n"))}
        placeholder="key"
      ></textarea>
      <button type="submit" onClick={handleSubmit}>
        Send
      </button>
    </form>
  );
}

export default Email;
