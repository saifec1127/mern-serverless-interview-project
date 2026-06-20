import { useState, useEffect } from "react";

const FilterUser = () => {
  const [user, setuser] = useState([]);
  //console.log("data", user);
  const [name, SetName] = useState("");
  const [filterName, setFilterName] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
      );
      const Data = await response.json();
      setuser(Data);
      setFilterName(Data);
    };

    fetchUser();
  }, []);

  const OnChangeHandler = (e) => {
    const nameSet = e.target.value;
    SetName(nameSet);

    if (nameSet === "") {
      return setFilterName([]);
    } else {
      const NameFilter = user.filter((value) =>
        value.name.toLowerCase().includes(nameSet.toLowerCase()),
      );
      setFilterName(NameFilter);
    }
  };

  const HandlerOnSubmit = (e) => {
    e.preventDefault();
    setFilterName(filterName);
  };

  return (
    <div>
      <h2>Filter user</h2>
      <div>
        <form onSubmit={HandlerOnSubmit}>
          <input
            placeholder="write here..."
            value={name}
            onChange={OnChangeHandler}
          />
        </form>
      </div>
      {filterName.map((user) => {
        return <p key={user.id}>{user.name}</p>;
      })}
    </div>
  );
};

export default FilterUser;
