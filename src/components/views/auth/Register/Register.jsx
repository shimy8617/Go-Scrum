import React, {useState, useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, Navigate } from "react-router-dom";
import {v4 as uuidv4 } from 'uuid';
import {Switch, FormControlLabel} from '@mui/material';
import { useNavigate } from "react-router-dom";

import "../Auth.styles.css"; 

const {REACT_APP_API_ENDPOINT:API_ENDPOINT} = process.env

export const Register = () => {
const [data, setData] = useState()
  const navigate = useNavigate();

useEffect(() => {
  fetch(`${API_ENDPOINT}/auth/data`)
  .then(response => response.json())
  .then(data => setData(data.result))
}, [])

console.log({data});

  const initialValues = {
    userName: "",
    password: "",
    email: "",
    teamID: "",
    role: "",
    continent: "",
    region: "",
  };

  const required = "* Campo obligatotio";

  const validationSchema = () =>
    Yup.object().shape({
      userName: Yup.string()
      .min(4, "La cantidad mínima de caracteres es 4")
      .required(required),
      password: Yup.string().required(required),
      email: Yup.string().email("Debe ser un email válido").required(required),
      //teamID: Yup.string().required(required),
      role: Yup.string().required(required),
      continent: Yup.string().required(required),
      region: Yup.string().required(required),
    });

    const handleChangeContinent = value => {
      setFieldValue('continent',value);
      if(value !== "America") setFieldValue("region", "otro");
    }

  const onSubmit = () => {
    const teamID = !values.teamID ? uuidv4() : values.teamID ;
    fetch(`${API_ENDPOINT}/auth/register`, {
      method:"POST",
      headers: {
        "Content-Type": "application/json",
      },
      body:JSON.stringify({
        user: {
          userName: values.userName,
          password: values.password,
          email: values.email,
          teamID,
          role: values.role,
          continent: values.continent,
          region: values.region,
        }
      })
    }).then(response => response.json())
    .then(data =>
      Navigate("/registered/" + data?.result?.user?.teamID, {
        replace:true,
      })
      )
  };

  const formik = useFormik({ initialValues, validationSchema, onSubmit });


  const { handleSubmit, handleChange, errors, touched, handleBlur, values, setFieldValue } = formik;

  return (
    <div className="auth">
    <form onSubmit={handleSubmit}>
      <h1>Registro</h1>
      <div>
        <label>Nombre de usuario</label>
        <input
          type="text"
          name="userName"
          value={values.userName}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.userName && touched.userName ? "error" : ""}
        />
        {errors.userName && touched.userName && (
        <span className="error-message">{errors.userName}</span>)}
      </div>
      <div>
        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.password && touched.password ? "error" : ""}
        />
        {errors.password && touched.password && (
        <span className="error-message">{errors.password}</span>)}
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.email && touched.email ? "error" : ""}
        />
        {errors.email && touched.email && (
        <span className="error-message">{errors.email}</span>)}
      </div>
      <FormControlLabel 
      control={<Switch 
        value={values.switch}
        onChange={() =>
        formik.setFieldValue("switch", !formik.values.switch)
      }
      name="switch"
      color="secondary"
      />
      } 
      label="Pertenecés a un equipo ya creado"
      />
      {values.switch && (
        <div>
        <label>Por favor, introduce el identificador de equipo</label>
        <input 
        type="text" 
        name="teamID" 
        value={values.teamID} 
        onChange={handleChange} 
        />
        </div>
      )}
      <div>
        <label>Rol</label>
        <select 
          name="role" 
          value={values.role} 
          onChange={handleChange}
          onBlur={handleBlur}
          className={errors.role && touched.role ? "error" : ""}
        >
          <option value="">Seleccionar una opción</option>
          {data?.role?.map(option => (
          <option value={option} key={option}>
            {option}
          </option>))}
          <option value="Team Member">Team Member</option>
          <option value="Team Leader">Team Leader</option>
        </select>
        {errors.role && touched.role && (
        <span className="error-message">{errors.role}</span>)}
      </div>
      <div>
        <label>Continente</label>
        <select
          name="continent"
          value={values.continent}
          onChange={event => handleChangeContinent(event.currentTarget.value)}
          onBlur={handleBlur}
          className={errors.continent && touched.continent ? "error" : ""}
        >
          <option value="">Seleccionar una opción</option>
          {data?.continent?.map(option => (<option value={option} key={option}>{option}</option>))}
          <option value="America">America</option>
          <option value="Europa">Europa</option>
          <option value="Otro">Otro</option>
        </select>
        {errors.continent && touched.continent && (
        <span className="error-message">{errors.continent}</span>)}
      </div>
      {values.continent === "America" && (
        <div>
        <label>Región</label>
        <select 
        name="region" 
        value={values.region} 
        onChange={handleChange}
        onBlur={handleBlur}
        className={errors.region && touched.region ? "error" : ""}
        >
          <option value="">Seleccionar una opción</option>
          {data?.region?.map(option => (
          <option 
          value={option} 
          key={option}>
            {option}
          </option>
          ))}
        </select>
        {errors.region && touched.region && (
        <span className="error-message">{errors.region}</span>)}
      </div>
      )}      
      <div>
        <button type="submit">Enviar</button>
      </div>
        <div><Link to="/login">Ir a Iniciar sesión</Link></div>
    </form>
    </div>
  );
};
