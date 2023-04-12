import * as yup from "yup";

export const signupScheme = yup.object().shape({
  username: yup.string().required("Username is required").min(3).max(20),
  email: yup.string().email().required("Email is required"),
  password: yup.string().required("Password is required").min(8).max(20),
});
