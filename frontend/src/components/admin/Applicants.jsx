import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setApplicants } from '@/redux/applicationSlice'

const Applicants = () => {
  const dispatch = useDispatch()
  const params=useParams();
  const {applicants} = useSelector(store=>store.application)
  useEffect(()=>{
    const fetchAllApplicants = async()=>{
      try {
        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true})
        if(res.data.success){
          dispatch(setApplicants(res.data.job))
        }
      } catch (err) {
        console.log(err);        
      }
    }
    fetchAllApplicants();
  },[])
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto'>
         <h1 className='font-bold text-xl my-5'>Applicants ({applicants?.applications?.length})</h1>
         <ApplicantsTable/>
      </div>
    </div>
  )
}

export default Applicants