import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Airtable from "airtable";
import './projects.css';

const base = new Airtable({ apiKey: "patanT7MxnFhHtZpu.f2fa66947dc28b29984138874318ed4afd3efdbe7341d1df73901f631e35e1ef" }).base("appkxnFzi4j8JH4ys");

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    base("prot")
      .select({ view: "Grid view" })
      .eachPage((records, fetchNextPage) => {
        setProjects(records);
        fetchNextPage();
      });
  }, []);

  const handleProjectClick = (id) => {
    navigate(`/projectsview/${id}`);
  };

  return (
    <div id="project">
      <h1 id="proj-head">My Projects</h1>
      <section id="project-section">
        <div id="projects-cont">
          <ol>
            {projects.map((project) => (
              <li key={project.id} onClick={() => handleProjectClick(project.id)}>
                <h1>{project.fields.Name}</h1>
                {project.fields.images && project.fields.images.length > 0 && (
                  
                  <img id="pimages" 
                       src={project.fields.images[0].url} 
                       alt={project.fields.Name} />
               )}
                <p>View more about this project.....</p>
               </li>
            ))}
          </ol>
        </div>
      </section>
    </div>
  );
}
