import { useFormik } from "formik";

import "./TaskForm.styles.css";


export const TaskForm = () => {
    const navigate = useNavigate();
  const initialValues = {
    email: "",
    password: "",
  };

  const validate = (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "El email es requerido";
    }
    if (!values.password) {
      errors.password = "El password es requerido";
    }
    return errors;
  };

  const onSubmit = () => {
    localStorage.setItem("logged", "yes");
    navigate("/", { replace: true });
  };

  const formik = useFormik({ initialValues, validate, onSubmit });

  const { handleSubmit, handleChange, values, errors } = formik;

    return( 
    <section className="task-form">
        <h2>Crear tarea</h2>
        <p>Crea tus tareas</p>
        <form>
            <div>
                <div>
                    <imput />
                </div>
                <div>
                    <select />
                </div>
                <div>
                    <select />
                </div>
            </div>
            <div>
                <textarea />
            </div>
        </form>
    </section>
    )
}