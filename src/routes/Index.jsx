import React, { useEffect,useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/postSlice";
import CustomTable from "../components/CustomTable";
import Loading from "../components/Loading";

const Index = () => {
  const dispatch = useDispatch();
  const { records, error, loading } = useSelector((state) => state.posts);
  const {isLogin} = useSelector(state =>state.auth)

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const deletePostHandle =useCallback((id) => {
    dispatch(deletePost(id));
  },[dispatch]);

  return (
    <Loading error={error} loading={loading}>
      <CustomTable data={records} deletePostHandle={deletePostHandle} isLogin={isLogin}/>
    </Loading>
  );
};

export default Index;
