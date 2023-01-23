import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPost } from "../store/postSlice";
import { Form, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import withGuard from "../utils/withGuard";
import { useFormik } from "formik";
import { PostSchema } from "../utils/validationSchema";

const AddPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.posts);

  const formik = useFormik({
    initialValues: {
      title: "",
      desc: "",
    },
    validationSchema: PostSchema,
    onSubmit: (values) => {
      dispatch(insertPost({ title: values.title, desc: values.desc }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  });
  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          name="title"
          onChange={formik.handleChange}
          value={formik.values.title}
          isInvalid={!!formik.errors.title}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.title}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="desc"
          onChange={formik.handleChange}
          value={formik.values.desc}
          isInvalid={!!formik.errors.desc}
        />
        <Form.Control.Feedback type="invalid">
          {formik.errors.desc}
        </Form.Control.Feedback>
      </Form.Group>
      <Loading loading={loading} error={error}>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Loading>
    </Form>
  );
};

export default withGuard(AddPost);
