import React from "react";
import { useFormik } from "formik";
import { Link } from "react-router-dom";

import "../Auth.styles.css"; 

export const Register = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = () => {
    alert();
  };

  const formik = useFormik({ initialValues, onSubmit });

  const { handleSubmit, handleChange, values, errors } = formik;

  return (
    <div className="auth">
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <div>
        <label>Nombre de usuario</label>
        <input
          type="text"
          name="username"
          value={values.username}
          onChange={handleChange}
        />
        {errors.username && <div>{errors.username}</div>}
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && <div>{errors.password}</div>}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <div>{errors.email}</div>}
      </div>
      <input type="hidden" name="teamID" value="asd" />
      <div>
        <label>Rol</label>
        <select name="role" value={values.role} onChange={handleChange}>
          <option value="Team Member">Team Member</option>
          <option value="Team Leader">Team Leader</option>
        </select>
        {errors.role && <div>{errors.role}</div>}
      </div>
      <div>
        <label>Continente</label>
        <select
          name="continent"
          value={values.continent}
          onChange={handleChange}
        >
          <option value="America">America</option>
          <option value="Europa">Europa</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.continent && <div>{errors.continent}</div>}
      </div>
      <div>
        <label>Región</label>
        <select name="region" value={values.region} onChange={handleChange}>
          <option value="Latam">Latam</option>
          <option value="Brasil">Brasil</option>
          <option value="America del Norte">America del Norte</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.region && <div>{errors.region}</div>}
      </div>
      <div>
        <button type="submit">Enviar</button>
      </div>
        <div><Link to="/login">Ir a Iniciar sesión</Link></div>
    </form>
    </div>
  );
};
