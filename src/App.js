import React, {useState, useEffect} from "react";
import api from './services/api';
import "./styles.css";


function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories')
      .then(repositories => {
        setRepositories(repositories.data)
      });    
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Desafio React",
      url: `https://github.com/uricbonatti/teste`,
      techs: ["ReactJS", "React Native", "NodeJS"]
    });
    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`);  
    const notRemoved = repositories.filter(repository => repository.id !== id);
    setRepositories([...notRemoved]);
  }
  
  
  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
