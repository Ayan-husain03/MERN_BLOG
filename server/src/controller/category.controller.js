import asyncHandler from "../utils/AsyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

const addCategory = asyncHandler(async (req, res) => {
  const { name, slug } = req.body;
  if (!name || !slug) {
    throw new ApiError(404, "All fields are required");
  }
  await Category.create({
    name,
    slug,
  });
  res.status(201).json(new ApiResponse(201, "new category added"));
});

export { addCategory };
