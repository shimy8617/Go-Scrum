import { useFormik } from "formik";
import * as Yup from "yup";

import "./TaskForm.styles.css";

export const TaskForm = () => {
  const initialValues = {
    title: "",
    status: "",
    priority: "",
    description: "",
  };

  const onSubmit = () => {
    alert();
  };

  const required = "* Campo obligatotio";

  const validationSchema = () =>
    Yup.object().shape({
      title: Yup.string()
        .min(6, "La cantidad mínima de caracteres es 6")
        .required(required),
      status: Yup.string().required(required),
      priority: Yup.string().required(required),
    });

  const formik = useFormik({ initialValues, validationSchema, onSubmit });

  const { handleSubmit, handleChange, errors, touched, handleBlur } = formik;

  return (
    <section className="task-form">
      <h2>Crear tarea</h2>
      <p>Crea tus tareas</p>
      <form onSubmit={handleSubmit}>
        <div>
          <div>
            <input name="title" 
            onChange={handleChange} 
            onBlur={handleBlur} 
            placeholder="Título" 
            className={errors.title ? "error" : ""}
            />
          {errors.title && touched.title && 
          <span className="error-message">{errors.title}</span>}
          </div>
          <div>
            <select name="status" 
            onChange={handleChange} 
            onBlur={handleBlur}
            className={errors.status ? "error" : ""}
            >
              <option value="">Seleccionar opción</option>
              <option value="new">Nueva</option>
              <option value="inProcess">En proceso</option>
              <option value="finished">Terminada</option>
            </select>
          {errors.status && touched.status && 
          <span className="error-message">{errors.status}</span>}
          </div>
          <div>
            <select name="priority" 
            onChange={handleChange} 
            onBlur={handleBlur}
            className={errors.priority ? "error" : ""}
            >
              <option value="">Seleccionar opción</option>
              <option value="low">Baja</option>
              <option value="medium">Media</option>
              <option value="high">Alta</option>
            </select>
          {errors.priority && touched.priority && 
          <span className="error-message">{errors.priority}</span>}
          </div>
        </div>
        <div>
          <textarea
            name="description"
            onChange={handleChange}
            placeholder="Descripción"
          />
        </div>
        <button type="submit">Crear</button>
      </form>
    </section>
  );
};
