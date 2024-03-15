import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useState } from "react";
const Private = ({ user }) => {
  const [input, setInput] = useState("");
  const HandleSignOut = () => {
    signOut(auth)
      .then(() => console.log("sign out"))
      .catch((error) => console.log(error));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevCity) => ({
      ...prevCity,
      [name]: value,
    }));
  };
  return (
    <div>
      {user ? (
        <h3>
          welcome, {user.email} || {user.displayName}
        </h3>
      ) : (
        <h1 className="mx-auto">Please log in to access this page</h1>
      )}
      <div className="mx-auto col-lg-6">
        <input type="text" className="form-control" />
      </div>
      <button>add</button>
      <button
        value={input}
        className="button-confirm btn btn-primary"
        onClick={HandleSignOut}
        onChange={handleChange}
      >
        Log out
      </button>
      <p></p>
    </div>
  );
};

export default Private;
// const unsubscribe = ref(db, "/posts/foo-bar-123");

// const addTodo = () => {
//   try {
//     if (input.trim === "") {
//       addDoc(collection(db, "todos"), { todo: input });
//       setInput("");
//     }
//   } catch (error) {}
// };
