import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../components/UserContext";
import { getUsers } from "../assets/api"

export default function Header() {
  const { selectedUser, setSelectedUser} = useContext(UserContext);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
    });
  }, []);

  const handleUserChange = (event => {
    setSelectedUser(event.target.value);
  })

  return (
    <header className="header">
      <h1>NC News</h1>
      <div className="selection">
        {selectedUser ? (<p>Welcome, {selectedUser}</p>) : (
          <>
            <label htmlFor="user-select">Login to your account: </label>
            <select id="user-select" value={selectedUser} onChange={handleUserChange}>
              <option value="">Select a username</option>
              {users.map((user) => (
                <option key={user.username} value={user.username}>
                  {user.username}
                </option>
              ))}
            </select>
          </>
        )}
      </div>
    </header>
  )
}
