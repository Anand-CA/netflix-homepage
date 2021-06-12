import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { logout, selectUser } from "../features/userSlice";
import { auth } from "../firebase";

function Nav() {
  const [show, setShow] = useState(false);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        setShow(true);
      } else {
        setShow(false);
      }
    });

  }, []);
  return (
    <Container style={{ backgroundColor: `${show ? "black" : "transparent"}` }}>
      <img
        src="https://netflix-clone-b1e44.web.app/images/netflix-logo.svg"
        alt=""
      />

      <Avatar
        onClick={() => {
          auth.signOut();
          dispatch(logout());
        }}
        src={user?.profileUrl}
        alt=""
      />
    </Container>
  );
}

export default Nav;

const Container = styled.div`
  height: 60px;
  position: fixed;
  top: 0;
  z-index: 100;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  img {
    height: 30px;
    object-fit: contain;
  }
`;

const Avatar = styled.img`
  cursor: pointer;
  height: 50px;
  border-radius: 50%;
`;
