import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route path="/" exact component={Projects} />
        <Route path="/:id" component={ProjectDetails} />
      </div>
    </Router>
  );
}

const ProjectDetails = (props) => {
  const [singleProjectActions, setSingleProjectActions] = useState([]);
  const { id } = props.match.params;
  const project = props.location.state;

  console.log(props);

  const fetchActions = (id) => {
    axios
      .get(`https://samsprojects.herokuapp.com/projects/${id}/actions`)
      .then((res) => setSingleProjectActions(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchActions(id);
  }, [id]);

  return (
    <div
      key={project.id}
      className={`project${project.completed ? " completed" : ""} `}
    >
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <ul>
        {singleProjectActions.length > 0 ? (
          singleProjectActions.map((item) => (
            <li key={item.id}>{item.description}</li>
          ))
        ) : (
          <small>
            <i>No action found.</i>
          </small>
        )}
      </ul>
    </div>
  );
};

const Projects = (props) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("https://samsprojects.herokuapp.com/projects")
      .then((res) => setProjects(res.data))
      .catch((error) => console.log(error));
  }, []);

  return projects.map((project) => {
    return (
      <Link
        key={project.id}
        to={{ pathname: `/${project.id}`, state: project }}
      >
        <div className={`project${project.completed ? " completed" : ""} `}>
          <h3>{project.name}</h3>
          <p>{project.description}</p>
        </div>
      </Link>
    );
  });
};

export default App;
