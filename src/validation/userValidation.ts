import * as yup from "yup";

export const userSchemaReg = yup.object({
    fullName: yup.string().required(),
    password: yup.string().min(4).max(10).required(),
    dob: yup.date(),
    email: yup.string().email().required(),
    avatarImg: yup.string(),
  })
  export const userSchemaAuth = yup.object({
    password: yup.string().min(4).max(10).required(),
    email: yup.string().email().required(),
  })
