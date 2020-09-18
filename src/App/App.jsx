import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.scss";


const nonExistenTasks = {
  task1: "Non exstistent user, you also get some tasks! Tell the barkeeper a funny story.",
  task2: "Animate people to dance.",
  task3: "Pick someone’s nose."
}

const App = () => {
  const [tasks, setTasks] = useState([]);
  const nameRef = useRef(null);
  const meRef = useRef(null)

  const handleGetTasks = () => {
    if (
      nameRef.current &&
      nameRef.current.value &&
      nameRef.current.value !== ""
    ) {
      const name = nameRef.current.value.replace(/\s+/g, "");
      axios
        .get(encodeURI(`/api/fetchUserTasks?name=${name}`))
        .then((result) => {
          console.log(result.data.data);
          if (result.data.success) {
            setTasks(result.data.data?result.data.data: nonExistenTasks);
            localStorage.setItem("name", nameRef.current.value);
          }
        })
        .catch((err) => {console.log(err)
          setTasks(nonExistenTasks);
          localStorage.setItem("name", nameRef.current.value);
        });
    }
  };

  useEffect(() => {
    localStorage.getItem("name") && handleGetTasks();
  }, []);

  /*const [users, setUsers] = useState([])
  

  const handleAdd = () => {
    if (nameRef.current && nameRef.current.value && nameRef.current.value !== '') {
      axios.post('/api/createUser', {name: nameRef.current.value})
      .then(result => {
        if (result.data.success) setUsers([...users, result.data.data])
      })
    }
  }
*/

  return (
    <main>
      <div className="balloon-container">
        <div class="balloon"></div>
      </div>
      <section className="header-section">
        <h3>Birthday Mission Game</h3>
      </section>

      <section className="description-section">
        <h3>General</h3>
        <div>
          <ol>
            <li>Come to BeachMitte on Saturday around 19h :)</li>
            <li>We have fields 1&amp;2 from 20:00 to 22:00.</li>
            <li>
              If you want to play, bring water and an extra pair of socks (sand
              might be cold).
            </li>
            <li>Please follow the corona hygiene rules!</li>
          </ol>
        </div>
      </section>
      <section className="description-section">
        <h3>Game</h3>
        <div>
          <ol>
            <li>Never mention this game during the party 🤫</li>
            <li>Complete as many tasks as you can.</li>
            <li>Drop me a message if you are done.</li>
          </ol>
        </div>
      </section>

      <section className="task-section">
        <h3>Enter Your User-Code:</h3>

        <div>
          <input
            type="text"
            ref={nameRef}
            defaultValue={localStorage.getItem("name") || ""}
          />
        </div>
        <br></br>

        <button className="glow-on-hover" onClick={handleGetTasks}>
          Get my tasks
        </button>
        <br></br>
        <div>
          {tasks && tasks?.task1 && (
            <ol>
             { tasks?.task1&&<li>
               {tasks?.task1}
              </li>}
              {tasks?.task2&& <li>
                {tasks?.task2}
              </li>}
             { tasks?.task3&&<li>
               {tasks?.task3}
              </li>}
              { tasks?.task4&&<li>
                {tasks?.task4}
              </li>}
              { tasks?.task4&&<li>
               {tasks?.task5}
              </li>}
            </ol>
          )}
        </div>
      </section>

      <section className="footer-section">
        <div>Made with React + Flask + PostgreSQL by Elizaveta Ragozina</div>
        <br></br>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/elizavetaRa/Python-party-mission"
        >
          Follow me on GitHub and give the project a ⭐ for further development!
        </a>
      </section>
    </main>
  );
};

export default App;
