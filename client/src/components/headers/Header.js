import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Menu from "./icon/bars-solid.svg";
import Close from "./icon/times-solid.svg";
import Cart from "./icon/shopping-cart-solid.svg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  console.log(state)
  const [isLogged, setIsLogged] = state.UserAPI.isLogged;
  const [isAdmin, setIsAdmin] = state.UserAPI.isAdmin;

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/create_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };
  const logoutUser = async () => {
    await axios.get('/user/logout')
    localStorage.clear()
    setIsAdmin(false)
    setIsLogged(false)
  }

  const loggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>Logout</Link>
        </li>
      </>
    );
  };
  return (
    <header>
      <div className="menu">
        <img src={Menu} alt="" width="30" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "DevAT Shop"}</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/"> {isAdmin ? "Products" : "Shop"}Products</Link>
        </li>
        {isAdmin && adminRouter()}{" "}
        {isLogged ? (
          loggedRouter()
        ) : (
          <li>
            <Link to="/login">Login ‹› Register</Link>
          </li>
        )}
        <li>
          <img src={Close} alt="" width="30" className="menu" />
        </li>
      </ul>
      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>0</span>
          <Link to="/cart">
            <img src={Cart} alt="" width="30" />
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
