import { useNavigate } from "react-router-dom";
import "./Header.styles.css";

export const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("logged");
    navigate("/login", {replace:true})
  }

  return (
    <header>
      <span>Go Scrum</span>
      <div onClick={handleLogout}>x</div>
    </header>
  );
};
