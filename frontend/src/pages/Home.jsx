import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/v1/user/me", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(
        () => {
          navigate("/dashboard");
        },
        () => {
          navigate("/signup");
        }
      );
  });
};
