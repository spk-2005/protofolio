import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Airtable from "airtable";
import './projectsview.css';
import ReactMarkdown from 'react-markdown';
const base = new Airtable({ apiKey: "patanT7MxnFhHtZpu.f2fa66947dc28b29984138874318ed4afd3efdbe7341d1df73901f631e35e1ef" }).base("appkxnFzi4j8JH4ys");

export default function ProjectsView() {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    base("prot")
      .find(id)
      .then((record) => {
        setProject(record.fields);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div id="project-view-section">
      <h1>{project.Name}</h1>
      
      <div id="pr-images-cont">{project.images && Array.isArray(project.images) ? (
  project.images.map((img, index) => (
    <div key={index} style={{ flex: "0 0 auto" }}>
      <img src={img.url} alt={`Project ${index}`} />
    </div>
  ))
) : (
  <p>No images available</p>
)}

</div>  <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
    
      <p id="pr-desc"><ReactMarkdown>{project.desc}</ReactMarkdown></p>
      <ol id="project-technologies">
        <li><strong>Frontend:</strong> {project.front}</li>
        <li><strong>Backend:</strong> {project.back}</li>
        <li><strong>Database:</strong> {project.data}</li>
        <li><strong>Deployment:</strong> {project.deployment}</li>
      </ol>
      </div>
  );
}
