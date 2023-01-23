import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updatePost } from "../store/postSlice";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { cleanRecord } from "../store/postSlice";
import withGuard from "../utils/withGuard";
import { PostSchema } from "../utils/validationSchema";
import { useFormik } from "formik";
const EditPost = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, record } = usePostDetails();

  useEffect(() => {
    return () => {
      dispatch(cleanRecord());
    };
  }, [dispatch]);

  const formik = useFormik({
    initialValues: {
      title: record ? record?.title : "",
      desc: record ? record?.desc : "",
    },
    enableReinitialize:true,
    validationSchema: PostSchema,
    onSubmit: (values) => {
      dispatch(
        updatePost({ id: record.id, title: values.title, desc: values.desc })
      )
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

export default withGuard(EditPost);
