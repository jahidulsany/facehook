import { useNavigate } from "react-router-dom";
import LogOut from "../../assets/icons/logout.svg";

const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <button className="icon-btn" onClick={handleLogout}>
      <img src={LogOut} alt="Logout" />
    </button>
  );
};
export default Logout;
