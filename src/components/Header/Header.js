import React from "react";
//css
import "./Header.css";

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li id='logo'>Pick me up</li>
          <li>
            <a href='#'>Home</a>
          </li>
          <li>
            <a href='#'>Destination</a>
          </li>
          <li>
            <a href='#'>Login</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
