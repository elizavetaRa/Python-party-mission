import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './App.scss';

const App = () => {

  const [tasks, setTasks] = useState([])
  const nameRef = useRef(null);

  const handleGetTasks = () => {

    if (nameRef.current && nameRef.current.value && nameRef.current.value !== '') {

      const name = nameRef.current.value.replace(/\s+/g, '')
      axios.get(encodeURI(`/api/fetchUserTasks?name=${name}`))
      .then(result => {
        console.log(result.data.data)
        if (result.data.success) {setTasks(result.data.data)
          localStorage.setItem('name', nameRef.current.value);
        }
      }).catch(err=> console.log(err))
    }

  }


  useEffect(() => {
    localStorage.getItem("name")&&handleGetTasks();
  }, [])

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



      <section>
        Birthday Mission Game
      </section>

      <section>
        <h3>Enter your user-code</h3>

        <div>
          <input type="text" ref={nameRef} defaultValue={localStorage.getItem('name') || ''}/>
          <button onClick={handleGetTasks}>Get my Tasks</button>
        </div>

        
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

      <p>{tasks?.task1}</p>
      <p>{tasks?.task2}</p>
      <p>{tasks?.task3}</p>
      </section>

    </main>
  )
}

export default App;