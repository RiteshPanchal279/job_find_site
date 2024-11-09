import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import {motion} from "framer-motion"

// const randomJobs = [1, 2, 3, 4];
const Browse = () => {
  useGetAllJobs();
  
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch()
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchQuery(""))
    }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-8 ">
        <h1 className="font-semibold text-xl my-8 ">
          Search Result ({allJobs.length})
        </h1>
        <motion.div
        initial={{ opacity: 0, y: 170 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-3 gap-4 ">
          {allJobs.map((job) => {
            return <Job key={job._id} job={job} />;
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default Browse;
