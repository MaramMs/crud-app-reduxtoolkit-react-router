import { Button, ButtonGroup } from "react-bootstrap";

const PostListItem = ({ data,deletePostHandle}) => {
  const deleteHandler = (item) =>{
    if(window.confirm('Do you want delete this item')){
      deletePostHandle(item)

    }
  }
  const posts = data.map((post, indx) => (
    // console.log(post.id ,'post')
    <tr key={post.id}>
      <td>#{++indx}</td>
      <td>{post.title}</td>
      <td>
        <ButtonGroup aria-label="Basic example">
          <Button variant="success">Edit</Button>
          <Button variant="danger" onClick={() =>deleteHandler(post.id)}>Delete</Button>
        </ButtonGroup>
      </td>
    </tr>
  ));
  return <>
  { posts }
  </>;
};

export default PostListItem;
