import { useEffect, useState } from 'react';
import './App.css'
import { useNavigate } from 'react-router-dom';

function App() {
  //Hooks area
  const funcNav = useNavigate(); 
  function Navega() {
    funcNav('/Home')
  }

  const [dadosA, setDados] = useState([])

  useEffect(() => {
    const dadosApi = async () => {
      const url = import.meta.env.VITE_API_URL;
      const apiKey = import.meta.env.VITE_API_KEY;
      const endPoint = `${url}/movie/top_rated?api_key=${apiKey}`;

      try { // Nao, passe depois
        const response = await fetch(endPoint);
        if (!response.ok) {
          throw new Error(`Erro de HTTP: Status ${response.status}`);
        }
        const dados = await response.json();
        setDados(dados);
        console.log(dados);

      } catch (error) { // Sim, pode passar
        console.error('Erro ao adquerir dados:', error.message);
      }
    };

    dadosApi();
  }, []);
  //Hooks area end

  return (
    <div>
      <h1>Pagina de Inicio</h1>
      <button className='dft' onClick={Navega}>Ir para Home</button>
    </div>
  )
}

export default App
