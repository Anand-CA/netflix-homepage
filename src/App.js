import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Banner from "./components/Banner";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Row from "./components/Row";
import { login, logout, selectUser } from "./features/userSlice";
import { auth } from "./firebase";
import requests from "./requests";
function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            name: userAuth.displayName,
            email: userAuth.email,
            profileUrl: userAuth.photoURL,
          })
        );
      } else {
        dispatch(logout);
      }
    });
    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <>
          <Nav />
          <Banner />
          <Row big={true} title="Trending" fetchUrl={requests.fetchTrending} />
          <Row title="Action" fetchUrl={requests.fetchActionMovies} />
          <Row title="Comedy" fetchUrl={requests.fetchComedyMovies} />
          <Row title="Horror" fetchUrl={requests.fetchHorrorMovies} />
          <Row
            title="Netflix originals"
            fetchUrl={requests.fetchNetflixOriginals}
          />
          <Row title="Documentaries" fetchUrl={requests.fetchDocumentaries} />
        </>
      )}
    </div>
  );
}

export default App;
