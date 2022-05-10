import {useState, useEffect} from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import "./Task.styles.css";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";

const {REACT_APP_API_ENDPOINT:API_ENDPOINT} = process.env

export const Tasks = () => {
  const [list, setList] = useState(null);
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
      setLoading(false) 
    })
  },[])

  const limitString = (str) => {
    if (str.length > 370)
      return { string: str.slice(0, 367).concat("..."), addButton: true };
    return { string: str, addButton: false };
  };

  const renderAllCards = () => {
    return list?.map((data) => <Card key={data.id} data={data} />);
  };

  const renderNewCards = () => {
    return list?.filter(data => data.status === "NEW").map((data) => <Card key={data.id} data={data} />);
  };

  const renderInProgressCards = () => {
    return list?.filter(data => data.status === "IN PROGRESS").map((data) => <Card key={data.id} data={data} />);
  };

  const renderFinishedCards = () => {
    return list?.filter(data => data.status === "FINISHED").map((data) => <Card key={data.id} data={data} />);
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
          {isPhone ? (
            !list?.length ? (
              <div>No hay tareas creadas</div>
            ) : (
            <div className="list phone">{renderAllCards()}</div>
            )
          ) : (
            <div className="list_group">
              {!list?.lenght ? <div>No hay tareas creadas</div> : 
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
              }
            </div>
          )}
        </section>
      </main>
      ;
    </>
  );
};
