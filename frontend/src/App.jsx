import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";

function App() {
  const [message, setMessage] = useState();
  const connectBackend = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.text();
      setMessage(data);
      console.log("Message from backend:", data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="m-auto">Hello World!</h1>
        <Button as="button" variant="success" onClick={connectBackend}>
          Call Backend
        </Button>
        {message ? <h2>{message}</h2> : ""}
      </div>
    </>
  );
}

export default App;
