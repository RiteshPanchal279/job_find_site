import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({job}) => {
  const navigate = useNavigate()
  const jobId="46";
  const daysAgoFun=(mongodbTime)=>{
    const createdAt  = new Date(mongodbTime);
    const curreantTime = new Date();
    const timeDifferance = curreantTime-createdAt;
    return Math.floor(timeDifferance/(24*60*60*1000))
  }
  
  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-300">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600"> {daysAgoFun(job?.createdAt)=== 0 ? "Today" :`${daysAgoFun(job?.createdAt)} days ago`} </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>
      <div className="flex items-center gap-2 my-2">
        <Button>
          <Avatar>
            <AvatarImage src={job?.company?.logo} className="bg-white object-cover " />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-medium text-lg">{job.company.name}</h1>
          <p className="text-sm text-gray-500"> {job.location}</p>
        </div>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job.title}</h1>
        <p className="text-sm text-gray-700">
        {job.description}
        </p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">{job.position} Positions</Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost"> {job.jobType}</Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">{job.salary}LPA</Badge>
      </div>
      <div className="flex items-center gap-4 mt-4">
        <Button onClick={()=>navigate(`/description/${job._id}`)}>Details</Button>
        <Button className="bg-[#7209b7]">Save For Later</Button>

      </div>
    </div>
  );
};

export default Job;
