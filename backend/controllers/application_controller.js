import { Application } from "../models/Application_model.js";
import { Job } from "../models/job_model.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    // const {id:jobId} = req.params;
    //       OR
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({
        message: "Job id is required",
        success: false,
      });
    }
    // check if usre has already applied for job
    const existingApplication = await Application.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res.status(400).json({
        message: "You have already applied for this job",
        success: false,
      });
    }

    // check if the jobs exists
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "Jon not found",
        success: false,
      });
    }

    // create new application
    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });
    // this is from job model where we are push in array of applications
    job.applications.push(newApplication._id);
    await job.save();
    return res.status(201).json({
      message: "Job applied successfully",
      success: true,
    });
  } catch (err) {
    console.log("applyjob erro", err);
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const application = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        //   here we are doing nested populate
        populate: { path: "company", options: { sort: { createdAt: -1 } } },
      });
    if (!application) {
      return res.status(404).json({
        message: "Application not found",
        success: false,
      });
    }

    return res.status(200).json({
      application,
      success: true,
    });
  } catch (err) {
    console.log("getAppliedJobs erro", err);
  }
};

// admin will know that how many students have applied for this job
export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    return res.status(200).json({
      job,
      success:true
    })
  } catch (err) {
    console.log("getApplicent error", err);
  }
};

export const updateStatus = async (req, res) => {
  try {
    const {status} = req.body;
    const applicationId = req.params.id;
    if(!status){
      return res.status(400).json({
        message:"Status is required",
        success:false
      })
    };

    // find the application by application Id
    const application = await Application.findOne({_id:applicationId})
    if(!application){
      return res.status(404).json({
        message:"application not found",
        success:false
      })
    };
    
    // update the status
    application.status = status.toLowerCase();
    await application.save();

    return res.status(200).json({
      message:"status updated successfully",
      success:true
    })

  } catch (err) {
    console.log('updateStatus error',err);
  }
}
