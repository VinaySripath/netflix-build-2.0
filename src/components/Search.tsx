import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiSearch } from "react-icons/hi";
import cls from "classnames";

type InputChangeEventHandler = React.ChangeEventHandler<HTMLInputElement>;

export const Search = () => {
  const [showSearchInput, setShowSearchInput] = useState(true);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const toggleSearchInput = () => {
    setShowSearchInput(!showSearchInput);
  };

  const searchRequest: InputChangeEventHandler = async (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const navigateToSearch = setTimeout(() => {
      if (search.trim() !== "") {
        navigate("/search", { state: search });
      } else if (location.pathname === "/search") {
        navigate("/");
        setShowSearchInput(true);
      }
    }, 2000);
    return () => clearTimeout(navigateToSearch);
    // eslint-disable-next-line
  }, [search]);

  return (
    <div className="flex laptop:justify-around w-32 laptop:w-52">
      <input
        className={`w-20 laptop:w-42 h-34 pl-4 py-1 m-0 border-none outline-none bg-grey-light/70 rounded-l-3xl ${cls(
          { invisible: showSearchInput }
        )}`}
        onChange={searchRequest}
        value={search}
      ></input>
      <button
        className={` py-1 h-34 w-9 border-none cursor-pointer ${cls({
          "m-0 border-none outline-none rounded-r-3xl bg-grey-light/70":
            !showSearchInput,
        })}`}
        onClick={toggleSearchInput}
      >
        <HiSearch
          size={25}
          color={`${!showSearchInput ? "#000000" : "#ffffff"}`}
        />
      </button>
    </div>
  );
};
