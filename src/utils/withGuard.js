import { useSelector } from "react-redux";

const withGuard = (Component) => {
  const Wrapper = (props) => {
    const { isLogin } = useSelector((state) => state.auth);
    return isLogin ? <Component {...props} /> : <p>please login in </p>;
  };
  return Wrapper;
};

export default withGuard;
