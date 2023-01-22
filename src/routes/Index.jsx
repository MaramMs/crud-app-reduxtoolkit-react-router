import React, { useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../state/postSlice";
import CustomTable from "../components/CustomTable";
import Loading from "../components/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const { records, error, loading } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);
  console.log(records);

  const deletePostHandle =useCallback((id) => {
    dispatch(deletePost(id));
  },[dispatch]);

  return (
    <Loading error={error} loading={loading}>
      <CustomTable data={records} deletePostHandle={deletePostHandle} />
    </Loading>
  );
};

export default Index;
