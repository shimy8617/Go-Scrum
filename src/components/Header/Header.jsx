import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Header.styles.css";

export const Header = () => {
  const navigate = useNavigate();

  const { tasks } = useSelector((state) => {
    return state.tasksReducer;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    navigate("/login", { replace: true });
  };

  return (
    <header>
      <span>Go Scrum</span>
      {console.log(process.env)}
      <span>Estamos en el entorno {process.env.NODE_ENV} corriendo en el puerto {process.env.REACT_APP_PORT}</span>
      <div className="wrapper_right_header">
        <div>
          <button onClick={() => navigate("/donate", {replace:true})}>
            Donar
          </button>
        </div>
        <div className="black">Tareas creadas: {tasks?.length}</div>
        <div>{localStorage.getItem("userName")}</div>
        <div onClick={handleLogout}>x</div>
      </div>
    </header>
  );
};
