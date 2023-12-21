import * as yup from "yup";

export const userSchemaReg = yup.object({
    fullName: yup.string().required(),
    password: yup.string().min(4).max(10).required(),
    dob: yup.date().required(),
    email: yup.string().email().required(),
  })
  export const userSchemaAuth = yup.object({
    // fullName: yup.string().required(),
    password: yup.string().min(4).max(10).required(),
    // dob: yup.date().required(),
    email: yup.string().email().required(),
  })
