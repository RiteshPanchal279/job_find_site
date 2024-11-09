import { setAllAdminJobs } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import  { useEffect } from "react";
import { useDispatch } from "react-redux";

 const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        const res = await axios.get(`${JOBS_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAllAdminJobs(res.data.job));
          // console.log(res.data.job)
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllAdminJobs();
  }, []);
};

export default useGetAllAdminJobs;