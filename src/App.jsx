import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import Messages from "./Messages";
import Home from "./Home";
import { UserAuth } from "./context/AuthContext";

function App() {
  const { user, logOut } = UserAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {}
  };
  return (
    <>
      {user.email && (
        <div className="user">
          <img src={user.photoURL} alt="" referrerPolicy="no-referrer" />
          <p className="u-mail">{user.email}</p>
          <button onClick={handleSignOut}>SignOut</button>
        </div>
      )}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/messages/:primary/:secondary" element={<Messages />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
