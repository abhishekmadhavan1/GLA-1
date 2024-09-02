import { useNavigate } from "react-router-dom";
import { useUser } from "./App";

const Logout = () => {
  const { setCurrentUser } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    navigate("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
