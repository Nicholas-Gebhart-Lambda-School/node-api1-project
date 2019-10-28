import React from "react";
import axios from "axios";
import fetch from "./services/fetchUsers";

export default () => {
  const [users, setUsers] = React.useState([]);

  React.useEffect(() => {
    fetch().then(res => {
      console.log(res);
      res && setUsers(res.data);
    });
  }, []);

  return (
    <>
      {users.length ? (
        users.map(user => {
          return (
            <Card name={user.name} bio={user.bio} key={user.id} id={user.id} />
          );
        })
      ) : (
        <h1>No users found</h1>
      )}
    </>
  );
};

const Card = ({ name, bio, id }) => {
  const clickHandler = async id => {
    const result = await axios
      .delete(`http://localhost:8000/api/users/${id}`)
      .then(res => console.log(res));
    return result;
  };

  return (
    <>
      <h1>{name}</h1>
      <p>{bio}</p>
      <button onClick={() => clickHandler(id)}>Delete me</button>
    </>
  );
};
