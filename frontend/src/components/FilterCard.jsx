import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const filterData = [
  {
    filterType: "Location",
    array: ["Mumbai", "Gujarat", "Pune", "Bangalore"],
  },
  {
    filterType: "Industry",
    array: ["IT", "Frontend Developer", "Account", "Audit"],
  },
  {
    filterType: "Job Type",
    array: ["Full time","Part Time"],
  },
];
const FilterCard = () => {
  const [selectedValue,setSelectedValue]=useState("");
  const dispatch = useDispatch()
  const changeHandler=(value)=>{
    setSelectedValue(value)
  }
  useEffect(()=>{
    dispatch(setSearchQuery(selectedValue))
  },[selectedValue])
  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className="font-semibold text-lg">{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId = `id${index}-${idx}`;
                  return (
                    <div className="flex items-center space-x-2 my-2">
                      <RadioGroupItem value={item} key={itemId}  />
                      <Label htmlFor={itemId} className="text-gray-700" >{item}</Label>
                    </div>
                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
