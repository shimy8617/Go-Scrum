import {useState, useEffect} from 'react';

import "./Task.styles.css";
import { useResize } from "../../../hooks/useResize";
import { Header } from "../../Header/Header";
import { TaskForm } from "../../TaskForm/TaskForm";
import { Card } from "../../Card/Card";
import { cardsData } from "./data";

const {REACT_APP_API_ENDPOINT:API_ENDPOINT} = process.env

export const Tasks = () => {
  const [list, setList] = useState(null);
  const { isPhone } = useResize();

  useEffect(() => {
    fetch(`${API_ENDPOINT}/task`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + localStorage.getItem("token"),
      },
    })
    .then(response => response.json())
    .then(data => setList(data.result))
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
            <div className="list phone">{renderAllCards()}</div>
          ) : (
            <div className="list_group">
              <div className="list">
                <h4>Nuevas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h2>Tarea 1</h2>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Cristina Shim</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>
                    {
                      limitString(
                        `Toilet paper attack claws fluff everywhere meow miao french ciao litterbox find something else more interesting, yet slap owner's face at 5am until human fills food dish get my claw stuck in the dog's ear yet kitty loves pigs. Get video posted to internet for chasing red dot scamper blow up sofa in 3 seconds, but scamper. Roll on the floor purring your whiskers off going to catch the red dot today going to catch the red dot today lies down . Fooled again thinking the dog likes me decide to want nothing to do with my owner today or reward the chosen human with a slow blink. Is good you understand your place in my world spit up on light gray carpet instead of adjacent linoleum. I am the best pee in human's bed until he cleans the litter box. Taco cat backwards spells taco cat licks paws fat baby cat best buddy little guy tuxedo cats always looking dapper.`
                      ).string
                    }
                  </p>
                </div>
              </div>
              <div className="list">
                <h4>En proceso</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h2>Tarea 1</h2>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Cristina Shim</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
              <div className="list">
                <h4>Finalizadas</h4>
                <div className="card">
                  <div className="close">x</div>
                  <h2>Tarea 1</h2>
                  <h6>24/1/2022 16:40hs</h6>
                  <h5>Cristina Shim</h5>
                  <button type="button">Nueva</button>
                  <button type="button">Alta</button>
                  <p>Descripción fake</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
      ;
    </>
  );
};
