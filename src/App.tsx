import React from "react";
import "./App.css";
import HomeScreen from "./Pages/HomeScreen";
import Navs from "./components/Navs";
import { Route } from "react-router-dom";
import Movies from "./Pages/Movies";
import Series from "./Pages/Series";
import { Routes } from "react-router";
import ShowInfo from "./Pages/ShowInfo";
import SearchPage from "./Pages/SearchPage";

function App() {
  return (
    <div className="app">
      <Navs />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/series" element={<Series />} />
        <Route path="/showinfo" element={<ShowInfo />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
