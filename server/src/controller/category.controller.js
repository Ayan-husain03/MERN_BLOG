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

const getAllCategory = asyncHandler(async (req, res) => {
  const AllCategories = await Category.find().sort({ createdAt: -1 });
  return res
    .status(200)
    .json(new ApiResponse(200, "fetched successfully", AllCategories));
});

export { addCategory, getAllCategory };
