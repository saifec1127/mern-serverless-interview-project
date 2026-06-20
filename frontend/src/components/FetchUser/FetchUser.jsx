import {useState, useEffect} from 'react'

const FetchUser = () => {

    const [user, setUser] = useState([]);
    //console.log("user", user);

    useEffect( () => {
        const FetchUser = async () => {
            const response = await fetch("https://jsonplaceholder.typicode.com/users");
            const data = await response.json();
            setUser(data);

        }

        FetchUser();

    }, []);

  return (
    <div>
      <h1>FetchUser</h1>
      {user.map((user) => {
        return <p key={user.id}>{user.name}</p>
      })}
    </div>
  )
}

export default FetchUser
