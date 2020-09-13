import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./App.scss";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const nameRef = useRef(null);

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
            setTasks(result.data.data);
            localStorage.setItem("name", nameRef.current.value);
          }
        })
        .catch((err) => console.log(err));
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

  useEffect(() => {
    axios.get('/api/fetchAllUsers')
    .then(result => {
      if (result.data.success) {setUsers(result.data.data)
      console.log(result.data.data)}
    }).catch(err=>console.log(err))
  }, [])*/

  return (
    <main>
      <section className="header-section">
        <h2>Birthday Mission Game</h2>
      </section>

      <section className="task-section">
        <h3>Enter your user-code</h3>

        <div>
          <input
            type="text"
            ref={nameRef}
            defaultValue={localStorage.getItem("name") || ""}
          />
        </div>
        <br></br>

        <button className="glow-on-hover" onClick={handleGetTasks}>
          Get my Tasks
        </button>
        <br></br>
        {/**  <div>
          <input type="text" ref={nameRef}/>
          <button onClick={handleAdd}>Add</button>
        </div>

        { users.map( (user, index) => {
          return <div key={index}>
            <p>{index}. {user.name}</p>
          </div>
        })

        } */}

        <div>
          {tasks&&<ol>
            <li>
              <p>{tasks?.task1}</p>
            </li>
            <li>
              <p>{tasks?.task2}</p>
            </li>
            <li>
              <p>{tasks?.task3}</p>
            </li>
          </ol>}
        </div>
      </section>

      <section className="footer-section">
        <div>Made with React + Flask + PostgreSQL by Elizaveta Ragozina</div>
        <br></br>
        <a href="https://github.com/elizavetaRa/Python-party-mission">
          Follow me on GitHub and give the project a ⭐
        </a>
      </section>
    </main>
  );
};

export default App;
