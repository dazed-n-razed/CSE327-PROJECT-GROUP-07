// backend/controllers/searchController.js

import Project from "../models/projectModel.js";

// Search projects by title
export const searchProjectsByTitle = async (req, res) => {
  const { title } = req.query; // Extract the title from query parameters

  if (!title || title.trim() === "") {
    return res.status(400).json({ error: "Title query parameter is required" });
  }

  try {
    // Search for projects with titles matching the provided title (case-insensitive)
    const projects = await Project.find({
      title: { $regex: title, $options: "i" },
    });

    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error: "Error searching projects", details: error.message });
  }
};
