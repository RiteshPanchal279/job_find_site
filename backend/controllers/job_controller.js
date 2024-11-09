import { Job } from "../models/job_model.js";

// for admin
export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirments,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body; // took from request body

    const userId = req.id; // took from request id
    if (
      !title ||
      !description ||
      !requirments ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "something is missing",
        success: false,
      });
    }
    const job = await Job.create({
      title,
      description,
      requirments: requirments.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      message: "New job created successfully",
      job,
      success: true,
    });
  } catch (err) {
    console.log("postJob error:", err);
  }
};

// for student
export const getAllJobs = async (req, res) => {
  try {
    // it is used to filter out something from job api
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };
    // ew use populate method for geting converted ID into name. here the company id will converted into it's name
    const jobs = await Job.find(query)
      .populate({ path: "company" })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        message: "jobs not foound",
        success: true,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });
  } catch (err) {
    console.log("postJob error:", err);
  }
};

// for student
export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
      path: "applications",
    });
    if (!job) {
      return res.status(404).json({
        message: "jobs not foound",
        success: true,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log("getJobById error:", err);
  }
};

// for admin how many job has been created by him self only
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const job = await Job.find({ created_by: adminId }).populate({
      path:"company",
      createdAt:-1
    })
    if (!job) {
      return res.status(404).json({
        message: "jobs not foound",
        success: true,
      });
    }
    return res.status(200).json({
      job,
      success: true,
    });
  } catch (err) {
    console.log("getAdminJobs error", err);
  }
};
