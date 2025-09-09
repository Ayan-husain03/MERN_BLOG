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

const getCategory = asyncHandler(async (req, res) => {
  const { _id } = req.params;
  const category = await Category.findById(_id);
  if (!category) {
    throw new ApiError(404, "Category not found");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Category fetch successfully", category));
});

const editCategory = asyncHandler(async (req, res) => {});

export { addCategory, getAllCategory, editCategory, getCategory };
