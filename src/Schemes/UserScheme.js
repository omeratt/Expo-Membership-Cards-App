import * as yup from "yup";

const schema = yup.object().shape({
  // fullName: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Please enter valid  email")
    .required("Email Address is required"),
  password: yup
    .string()
    .min(6, ({ min }) => `Password must be at least ${min} characters`)
    .required("password is required"),
  confirmpassword: yup.string().when("password", {
    is: (val) => (val && val.length > 0 ? true : false),
    then: yup
      .string()
      .oneOf([yup.ref("password")], "Both password need to be the same"),
  }),
});

export default schema;
