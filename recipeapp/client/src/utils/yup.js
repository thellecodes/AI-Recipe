import * as Yup from "yup";

export const RecipeSchema = Yup.object().shape({
  firstname: Yup.string().required("No first name provided."),
  lastname: Yup.string().required("No first name provided."),
  email: Yup.string().email().required("Email is required"),
});
