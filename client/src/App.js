import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [projects, setProjects] = useState([]);

  const fetchActions = id => {
    axios
      .get(`https://samsprojects.herokuapp.com/projects/${id}/actions`)
      .then(res => console.log(res.data));
  };

  useEffect(() => {
    axios
      .get("https://samsprojects.herokuapp.com/projects")
      .then(res => setProjects(res.data))
      .catch(error => console.log(error));
  }, []);

  useEffect(() => {
    projects.forEach(project => fetchActions(project.id));
  }, [projects]);

  return (
    <div className="App">
      {projects.map(project => {
        return (
          <div
            key={project.id}
            className={`project ${project.completed && "completed"}`}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
          </div>
        );
      })}
    </div>
  );
}

export default App;
