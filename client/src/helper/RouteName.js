const SignupRoute = "/sign-up";
const LoginRoute = "/login";
const HomeRoute = "/";
const ProfileRoute = "/profile";
const CategoryDetailsRoute = "/categories";
const AddCategoryRoute = "/categories/add";
const EditCategoryRoute = (cat_id) => {
  if (cat_id) {
    return `/categories/edit/${cat_id}`;
  } else {
    return `/categories/edit/:cat_id`;
  }
};
export {
  SignupRoute,
  LoginRoute,
  HomeRoute,
  ProfileRoute,
  CategoryDetailsRoute,
  AddCategoryRoute,
  EditCategoryRoute,
};
