import React from 'react';
import "./styles.css";
import { useState, useEffect } from 'react';
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);
  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  },[])
  
  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Novo Repositorio ${Date.now()}`,
      url: 'url repositorio',
      techs: ['js', "node"]
    });

    const repository = response.data
    setRepositories([...repositories, repository])
  }

  async function handleRemoveRepository(id) {
     await api.delete(`/repositories/${id}`)
     await api.get('/repositories').then(response => {
      setRepositories(response.data)
     })
 }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
        <li key={repository.id}> 
        {repository.title}
        <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button> </li>)}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
