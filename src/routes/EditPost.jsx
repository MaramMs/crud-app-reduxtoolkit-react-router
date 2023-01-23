import { useState, useEffect } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { updatePost } from "../store/postSlice";
import usePostDetails from "../hooks/use-post-details";
import Loading from "../components/Loading";
import { cleanRecord } from "../store/postSlice";
import withGuard from "../utils/withGuard";
const EditPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, record } = usePostDetails();
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(updatePost({ id: record.id, title, desc }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    if (record) {
      setTitle(record.title);
      setDesc(record.desc);
    }
  }, [record]);

  useEffect(()=>{
  return() =>{
    dispatch(cleanRecord())
  } 
  },[dispatch])
  return (
    <Form onSubmit={submitHandle}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Description</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
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
