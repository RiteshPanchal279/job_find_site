import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";

const shortListStatus = ["Accepted", "Rejected"];
const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

   const statusHandler = async(status,id)=>{
      try {
         axios.defaults.withCredentials=true;
         const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status},{withCredentials:true});
         if(res.data.success){
            toast.success(res.data.message)
         }
      } catch (err) {
         toast.error(err.response.data.message)
      }
   }


  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied user</TableCaption>
        <TableRow>
          <TableHead>FullName</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Contact</TableHead>
          <TableHead>Resume</TableHead>
          <TableHead>Date</TableHead>
          <TableHead className="text-right">Action</TableHead>
        </TableRow>
        <TableBody>
          {applicants?.applications.map((user) => (
            <tr>
              <TableCell>{user?.applicant?.fullname}</TableCell>
              <TableCell>{user?.applicant?.email}</TableCell>
              <TableCell>{user?.applicant?.phoneNumber}</TableCell>
              <TableCell>
                {user?.applicant?.profile?.resume ? (
                  <a
                    className="text-blue-600"
                    href={user?.applicant?.profile?.resume}
                    target="_blank"
                  >
                    {user?.applicant?.profile?.resumeOriginalName}
                  </a>
                ) : (
                  <span>NA</span>
                )}
              </TableCell>
              <TableCell>{user?.applicant?.createdAt.split("T")[0]}</TableCell>
              <TableCell className="text-right">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent>
                    {shortListStatus.map((status, index) => (
                      <div
                        key={index}
                        className="flex w-fit items-center my-2 cursor-pointer"
                        onClick={()=>statusHandler(status,user?._id)}
                      >
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
