import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import cls from "classnames";

export const Search = () => {
  const [inputClass, setInputClass] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleInputClass = () => {
    if (inputClass === true) {
      setInputClass(false);
    } else {
      setInputClass(true);
    }
  };

  const searchRequest = async (event: any) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const navigateToSearch = setTimeout(() => {
      if (search.trim() !== "") {
        navigate("/search", { state: search });
      } else if (location.pathname === "/search") {
        navigate("/");
        setInputClass(true);
      }
    }, 2000);
    return () => clearTimeout(navigateToSearch);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className=" flex justify-around w-52">
      <input
        className={`w-42 h-34 pl-4 py-1 m-0 border-none outline-none bg-grey-light/70 rounded-l-3xl ${cls(
          { invisible: inputClass }
        )}`}
        onChange={searchRequest}
        value={search}
      ></input>
      <button
        className={` py-1 h-34 w-9 border-none cursor-pointer ${cls({
          "m-0 border-none outline-none rounded-r-3xl bg-grey-light/70":
            !inputClass,
        })}`}
        onClick={handleInputClass}
      >
        <HiSearch size={25} color={`${!inputClass ? "#000000" : "#ffffff"}`} />
      </button>
    </div>
  );
};
