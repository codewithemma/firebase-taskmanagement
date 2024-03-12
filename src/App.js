import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import Private from "./Pages/Private.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
function App() {
  const [user, setUser] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setIsFetching(false);
        return;
      }

      setUser(null);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);
  if (isFetching) {
    return <p>loading...</p>;
  }
  return (
    <>
      <Router>
        <Routes>
          <Route index path="/" element={<Home user={user} />} />
          <Route
            path="/private"
            element={
              <ProtectedRoute user={user}>
                <Private user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
