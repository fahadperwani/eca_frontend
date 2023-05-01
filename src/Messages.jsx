import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Messages.css";
import { UserAuth } from "./context/AuthContext";

function Messages() {
  const { primary, secondary } = useParams();
  const [msgs, setMsgs] = useState([]);
  const [msgsText, setMsgsText] = useState([]);
  const [reciever, setReciever] = useState({});
  const bottomRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
    fetch("http://localhost:5000/inbox/" + primary + "/" + secondary)
      .then((res) => res.json())
      .then((data) => {
        setMsgs(data);
        const temp = data.map((msg, idx) => {
          return {
            idx,
            text: atob(msg.text) || msg.text,
          };
        });
        setMsgsText(temp);
      });
    fetch("http://localhost:5000/user/" + secondary)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setReciever(data);
      })
      .catch((err) => alert("User not found"));
  }, []);

  //   function atob(b64txt) {
  //     const buff = Buffer.from(b64txt, "base64");
  //     const txt = buff.toString("utf16le");
  //     return txt;
  //   }
  const handleDecrypt = (type, text, idx) => {
    const key = prompt("Message has been decrypted with " + type + " key");
    console.log(key);
    if (type == "symmetric") {
      console.log("symmetric");
      fetch(
        "http://localhost:5000/decrypt/symmetric?key=" + key + "&text=" + text
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const texts = msgsText.map((t) =>
            t.idx == idx ? { ...t, text: data.text } : t
          );
          setMsgsText(texts);
          console.log(msgsText);
        })
        .catch((err) => alert("Invalid Key"));
    } else {
      console.log("......");
      fetch(
        "http://localhost:5000/decrypt/assymmetric?key=" +
          key +
          "&text=" +
          text +
          "&keyType=" +
          type
      )
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          const texts = msgsText.map((t) =>
            t.idx == idx ? { ...t, text: data.text } : t
          );
          setMsgsText(texts);
          console.log(msgsText);
        })
        .catch((err) => alert("Invalid Key"));
    }
  };

  return (
    <div className="msg-section">
      <div className="reciever">
        <img src={reciever.dp} alt="No dp" referrerPolicy="no-referrer" />
        <p className="u-mail">{reciever.email}</p>
      </div>
      <div className="msgs" ref={bottomRef}>
        {msgs.map((msg, idx) => (
          <div
            className={msg.send ? "mesg send" : "mesg recieve"}
            id={msg.text}
          >
            {msgsText[idx].text}
            <p
              className="decrypt-btn"
              onClick={() => handleDecrypt(msg.keyType, msg.text, idx)}
            >
              Decrypt Text
            </p>
          </div>
        ))}
      </div>
      <div className="footer">
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    </div>
  );
}

export default Messages;
