import React, { useEffect, useState } from 'react';
import axios from 'axios'

import User from './components/User'
import AddUserForm from './components/AddUserForm'



function App() {

  const [users, setUsers] = useState()

  useEffect(() => {
    axios.get(`http://localhost:5000/api/users`)
          .then(res => {
            setUsers(res.data.users)
            console.log(res.data.users)
          })
          .catch(res => console.log('error retrieving from api:', res))
  }, [])

  return (
    <div className="App">
      <h1>List of Users</h1>
      
    </div>
  );
}

export default App;
