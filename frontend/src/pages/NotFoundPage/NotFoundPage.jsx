import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./index.module.css";

const NotFoundPage = () => {
  const navigation = useNavigate();

  useEffect(() => {
    setInterval(() => {
      navigation("/");
    }, 5000);
  }, []);

  return (
    <div className={classes.errorMessage}>
      <h1>404 - Page Not Found</h1>
    </div>
  );
};

export default NotFoundPage;
