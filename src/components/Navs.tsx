import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../Images/netflix-logo.png";
import avatar from "../Images/Netflix-avatar.png";
import cls from "classnames";
import { Search } from "./Search";

const Navs = () => {
  const [show, handleShow] = useState(false);

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    return () => {
      window.removeEventListener("scroll", transitionNavBar);
    };
  }, []);

  return (
    <div
      className={`fixed top-0 p-8 w-full z-max ease-in duration-500 ${cls({
        "bg-black": show,
      })}`}
    >
      <div className="w-full flex justify-between items-center">
        <div className="fixed left-0 p-5 flex justify-between">
          <Link to="/" className="flex items-center no-underline">
            <img
              className="left-0 w-32 cursor-pointer"
              src={logo}
              alt="Netflix logo"
            />
          </Link>
          <Link to="/movies" className="flex items-center no-underline">
            <button className="text-white text-16 cursor-pointer m-2.5 border-none uppercase font-bold">
              movies
            </button>
          </Link>
          <Link to="/series" className="flex items-center no-underline">
            <button className="text-white text-16 cursor-pointer m-2.5 border-none uppercase font-bold">
              series
            </button>
          </Link>
        </div>
        <div className="flex justify-between fixed w-64 right-5">
          <Search />
          <img className="w-8 h-8 cursor-pointer" src={avatar} alt="avatar" />
        </div>
      </div>
    </div>
  );
};

export default Navs;
