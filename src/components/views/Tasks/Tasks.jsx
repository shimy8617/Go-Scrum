import {useEffect, useState} from 'react';

import { Header } from "../../Header/Header";
import "./Task.styles.css";

export const Tasks = () => {
    const [isPhone, setIsPhone] = useState(window.innerWidth < 900 ? true:false
        )
    
        const handleResize = () => {
            if(window.innerWidth < 900) setIsPhone(true)
            else setIsPhone(false)
        }

        useEffect(() => {
            handleResize();
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize)
        })

const limitString = (str) => {
    if(str.length > 370)
        return {string:str.slice(0,367).concat("..."), addButton:true}
    return {string:str, addButton:false}
}

return (
    <>
    <Header />
        <main id="tasks">
            <section className="wrapper_list">
                <div className="list_header"><h2>Mis tareas</h2>
                </div>
                {isPhone ? (<div className="list phone">
                <div className="card">
                    <div className="close">x</div>
                        <h2>Tarea 1 PHONE</h2>
                        <h6>24/1/2022 16:40hs</h6>
                        <h5>Cristina Shim</h5>
                        <button type="button">Nueva</button>
                        <button type="button">Alta</button>
                        <p>Descripción fake</p>
                </div>
            </div>
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
                            <p>{limitString(`Toilet paper attack claws fluff everywhere meow miao french ciao litterbox find something else more interesting, yet slap owner's face at 5am until human fills food dish get my claw stuck in the dog's ear yet kitty loves pigs. Get video posted to internet for chasing red dot scamper blow up sofa in 3 seconds, but scamper. Roll on the floor purring your whiskers off going to catch the red dot today going to catch the red dot today lies down . Fooled again thinking the dog likes me decide to want nothing to do with my owner today or reward the chosen human with a slow blink. Is good you understand your place in my world spit up on light gray carpet instead of adjacent linoleum. I am the best pee in human's bed until he cleans the litter box. Taco cat backwards spells taco cat licks paws fat baby cat best buddy little guy tuxedo cats always looking dapper.`).string}</p>
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
            </div>)}
                
            </section>
        </main>;
    </>
)
}