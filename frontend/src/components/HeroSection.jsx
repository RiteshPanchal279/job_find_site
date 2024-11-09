import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchQuery } from "@/redux/jobSlice";

const HeroSection = () => {

  const [query, setQuery] = useState("");
  const disptch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = () => {
    disptch(setSearchQuery(query));
    navigate('/browse')
  };

  return (
    <div className="text-center">
      <div className="flex flex-col gap-5 m-10">
        <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium">
          No. 1 Job Hunt Website
        </span>
        <h1 className="text-5xl font-bold ">
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6A38C2]">Dream Job</span>
        </h1>
        <p className="text-gray-500 font-semibold">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel non unde
          necessitatibus ad sint?
        </p>
        <div className="flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto">
          <input
            type="text"
            placeholder="Find your dream job.."
            className="outline-none border-none w-full p-2"
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button className="rounded-r-full bg-[#ff230f]">
            <Search onClick={searchJobHandler} className="h-5 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
