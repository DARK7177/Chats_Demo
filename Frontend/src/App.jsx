import React from "react";
import Left from "./home/left/Left";
import Right from "./home/right/Right";
import Logout from "./home/left1/Logout";
import Signup from "./components/Signup";
import Login1 from "./components/Login1";
import { useAuth } from "./contextapi/AuthProvider";
import { Routes, Route, Navigate } from "react-router-dom";

// Main App Component

function App() {
  const { authUser, setAuthUser } = useAuth();
  console.log(authUser);
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen">
                <Logout></Logout>
                <Left></Left>
                <Right></Right>
              </div>
            ) : (
              <Navigate to={"/Login1"} />
            )
          }
        />
        <Route
          path="/login1"
          element={authUser ? <Navigate to={"/"} /> : <Login1 />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>
    </>
  );
}

export default App;
