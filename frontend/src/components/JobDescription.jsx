import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  APPLICATION_API_END_POINT,
  JOBS_API_END_POINT,
} from "@/utils/constant";
import { toast } from "sonner";

const JobDescription = () => {

  const params = useParams();
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);

  const jobId = params.id;
  const dispatch = useDispatch();

  const isInitiallyApplied =
    singleJob?.applications?.some(
      (application) => application.applicant === user?._id
    ) || false;

  const [isApplied,setIsApplied] = useState(isInitiallyApplied)

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true)//update the local state
        const updatedSingleJob = {...singleJob,applications:[...singleJob?.applications,{applicant:user?._id}]}
        dispatch(setSingleJob(updatedSingleJob))// hwlps us to real time UI update
        toast.success(res.data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.responce.data.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application=>application.applicant===user?._id));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div className="flex items-center gap-2 mt-4">
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position} Positions
            </Badge>
            <Badge className="text-[#F83002] font-bold" variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className="text-[#7209b7] font-bold" variant="ghost">
              {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
          onClick={isInitiallyApplied ? null : applyJobHandler}
          //  disabled={isApplied}
          className={`rounded-lg ${
            isInitiallyApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#963fd0]"
          }`}
        >
          {isInitiallyApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-semibold text-lg py-4">
        Job Description
      </h1>
      <div className="my-4">
        <h1 className="font-semibold my-1">
          Role:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Location:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.location}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Description:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.description}.
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Experiance:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.experiance} yrs
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Salary:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.salary}LPA
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Total Applicants:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.applications?.length}
          </span>
        </h1>
        <h1 className="font-semibold my-1">
          Posted Date:{" "}
          <span className="font-normal pl-4 text-gray-800">
            {" "}
            {singleJob?.createdAt.split("T")[0]}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;