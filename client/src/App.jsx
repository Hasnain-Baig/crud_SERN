import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {

  var [users, setUsers] = useState([]);

  var [name, setName] = useState("");
  var [age, setAge] = useState(0);
  var [username, setUsername] = useState("");
  var [eUser, setEUser] = useState({});
  var [edit, setEdit] = useState(false);

  useEffect(() => {

    Axios.get("http://localhost:4000/apis/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      })

  }, []);



  const addUser = () => {

    console.log(name)
    var newUser = {
      name: name,
      age: age,
      username: username,
    }

    Axios.post("http://localhost:4000/apis/users", newUser)
      .then((response) => {
        if(!response.data.errno){
          newUser._id=response.data.insertId;
          setUsers([...users, newUser]);
          setName("");
          setAge("");
          setUsername("");  
        }
        else{
          return alert("USERNAME ALREADY TAKEN! KINDLY CHANGE USERNAME...");
        }
      })
      .catch((error) => {
        console.log(error);
      })

    if (edit) {
      setEdit(false);
    }

  }


  const deleteUser = (id) => {
    console.log(id);

    Axios.delete(`http://localhost:4000/apis/users/${id}`)
      .then((response) => {

        var newUsers = users.filter(function (user) {
          console.log(user._id);
          return user._id !== id;
        });

        setUsers(newUsers);

      })
      .catch((error) => {
        console.log("=============>", error);
      })


  }




  const editUser = (id) => {
    eUser = users.filter(function (user) {
      return user._id === id;
    });

    setEUser({
      _id: id,
      name: eUser[0].name,
      age: eUser[0].age,
      username: eUser[0].username
    });

    if (!edit) {
      setEdit(true);
    }

  }


  const updateUser = (uUser) => {

    var index = -1;

    Axios.put(`http://localhost:4000/apis/users/${uUser._id}`, uUser)
      .then((response) => {

        if(!response.data.errno){
          users.forEach((user, i) => {
            if (user._id === uUser._id) {
              index = i;
              return;
            }
          });
  
          users[index] = uUser;
          console.log(users);
  
          setUsers(users);
          if (edit) {
            setEdit(false);
          }
  
        }
        else{
          return alert("USERNAME ALREADY TAKEN! KINDLY CHANGE USERNAME...");
        }

      })
      .catch((error) => {
        console.log("=============>", error);
      })

  }




  // console.log(edit)
  return (

    <div className="App bg-dark pt-1">

      {/* input div */}
      <div className="userDisplay m-3 p-3 bg-secondary rounded">
        <h3 className='m-3 text-light'>CRUD APP</h3>
        <input className="form-control mb-3" type="text" value={name} placeholder='Name' onChange={(e) => { setName(e.target.value) }} />
        <input className="form-control mb-3" type="number" value={age} placeholder='Age' onChange={(e) => { setAge(e.target.value) }} />
        <input className="form-control mb-3" type="text" value={username} placeholder='Username' onChange={(e) => { setUsername(e.target.value) }} />
        <button className="m-0 btn btn-success" onClick={addUser} type="button">Add User</button>
      </div>

      {/* usersDisplay */}
      <div className="userDisplay bg-primary rounded m-5 p-2">
   {users.length===0 ?<h4 className='text-light m-3'>NO USERS DATA FOUND</h4> :<h4 className='text-light m-3'>USERS DATA</h4>}   
        {users.map((user, i) => {
          return <div key={user._id} className="bg-dark p-3 m-4">
            {eUser._id === user._id && edit
              ?
              <div className='container' >
                <h3 className='text-light mb-2'>Edit</h3>
                <input className="form-control mb-2" type="text" value={eUser.name} placeholder='Name' onChange={(e) => { setEUser({ _id: eUser._id, name: e.target.value, age: eUser.age, username: eUser.username }); console.log(eUser); }} />
                <input className="form-control mb-2" type="number" value={eUser.age} placeholder='Age' onChange={(e) => { setEUser({ _id: eUser._id, name: eUser.name, age: e.target.value, username: eUser.username }); console.log(eUser); }} />
                <input className="form-control mb-2" type="text" value={eUser.username} placeholder='Username' onChange={(e) => { setEUser({ _id: eUser._id, name: eUser.name, age: eUser.age, username: e.target.value }); console.log(eUser); }} />
                <div className="d-flex justify-content-end align-items-baseline">
                  <button className="btn btn-warning m-1" onClick={() => updateUser(eUser)} type="button">Update User</button>
                </div>
              </div>
              :
              <div>
                <div>
                  <div className="alert alert-primary p-2 mb-2">
                    <strong>Name: {user.name}</strong><br />
                  </div>
                  <div className="alert alert-primary p-2 mb-2">
                    <strong>Age: {user.age}</strong><br />
                  </div>
                  <div className="alert alert-primary p-2 mb-2">
                    <strong>Username: {user.username}</strong>
                  </div>
                </div>
                <div className="d-flex justify-content-end align-items-baseline">
                  <button className="btn btn-danger m-1" onClick={() => { deleteUser(user._id) }}>Delete </button>
                  <button className="btn btn-primary m-1" onClick={() => { editUser(user._id) }}>Edit </button>
                </div>
              </div>

            }

          </div>
        })}
      </div>

    </div >
  );
}

export default App;
