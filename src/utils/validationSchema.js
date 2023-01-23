import * as Yup from "yup";

export const PostSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  desc: Yup.string().required("Required"),
});
