import { useState } from "react";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { insertPost } from "../store/postSlice";
import { Form, Button } from "react-bootstrap";
import Loading from "../components/Loading";
import withGuard from "../utils/withGuard";

const AddPost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {loading ,error} = useSelector(state => state.posts)
  const submitHandle = (e) => {
    e.preventDefault();
    dispatch(insertPost({ title, desc }))
      .unwrap()
      .then(() => {
        navigate("/");
      }).catch(error =>{
        console.log(error);
      });
  };
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
      <Loading loading={loading} error ={error}>
      <Button variant="primary" type="submit">
        Submit
      </Button>


      </Loading>
    </Form>
  );
};

export default withGuard(AddPost);
