import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import 'react-loading-skeleton/dist/skeleton.css';
import FormControl from "@mui/material/FormControl";
import "react-loading-skeleton/dist/skeleton.css";

import "./Task.styles.css";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";
import { FormControlLabel } from '@mui/material';

const {REACT_APP_API_ENDPOINT:API_ENDPOINT} = process.env

export const Tasks = () => {
  const [list, setList] = useState(null);
  const [renderList, setRenderList] = useState(null);
  const [loading, setLoading] = useState(false);
  const { isPhone } = useResize();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/task`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(response => response.json())
    .then(data => {
      setList(data.result)
      setRenderList(data.result)
      setTimeout(() => {setLoading(false) }, 3000)
      
    })
  },[])

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return renderList?.map((data) => <Card key={data._id} data={data} />);
  };

  const renderNewCards = () => {
    return renderList?.filter(data => data.status === "NEW").map((data) => <Card key={data._id} data={data} />);
  };

  const renderInProgressCards = () => {
    return renderList?.filter(data => data.status === "IN PROGRESS").map((data) => <Card key={data._id} data={data} />);
  };

  const renderFinishedCards = () => {
    return renderList?.filter(data => data.status === "FINISHED").map((data) => <Card key={data._id} data={data} />);
  };

  return (
    <>
      <Header />
      <main id="tasks">
          <TaskForm />
        <section className="wrapper_list">
          <div className="list_header">
            <h2>Mis tareas</h2>
          </div>
          <div className='filters'>
            <FormControl>
              <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel 
                value="ALL"
                control={<Radio />}
                label="Todas"
              />
              <FormControlLabel 
                value="ME"
                control={<Radio />}
                label="Mis tareas"
              />
              </RadioGroup>
            </FormControl>
            <select name="importance" onChange={() => {}}>
              <option value="">
                Seleccionar una prioridad
              </option>
              <option value="ALL">
                Todas
              </option>
              <option value="LOW">
                Baja
              </option>
              <option value="MEDIUM">
                Media
              </option>
              <option value="HIGH">
                Alta
              </option>
            </select>
          </div>
          {isPhone ? (
            !renderList?.length ? (
              <div>No hay tareas creadas</div>
            ) : loading ? ( 
            <>
              <Skeleton height={90} />
              <Skeleton height={90} />
              <Skeleton height={90} />
            </> ) : (
            <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!renderList?.lenght ? <div>No hay tareas creadas</div> : 
              loading ? ( <Skeleton /> ) : (
              <><div className="list">
                <h4>Nuevas</h4>
                {renderNewCards}
              </div>
              <div className="list">
                <h4>En proceso</h4>
                {renderInProgressCards}
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                {renderFinishedCards}
              </div>
              </>
              )
              }
            </div>
          )}
        </section>
      </main>
      ;
    </>
  );
};
