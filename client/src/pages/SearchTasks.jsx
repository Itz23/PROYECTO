import { useState } from "react";
import axios from "axios";
import TaskCard from "../components/TaskCard"; // Asegúrate de que la ruta sea correcta

function SearchTasks() {
  const [filters, setFilters] = useState({ serialNumber: '', agency: '', date: '' });
  const [results, setResults] = useState([]); // un arreglo vacío por defecto

  const [noResultsMessage, setNoResultsMessage] = useState(''); // Mensaje para cuando no se encuentren resultados
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSearch = async () => {
    const params = new URLSearchParams();
    if (filters.serialNumber) params.append("serialNumber", filters.serialNumber);
    if (filters.agency) params.append("agency", filters.agency);
    if (filters.date) params.append("date", filters.date);
  
    try {
        const { data } = await axios.get(`http://localhost:4000/api/search?${params.toString()}`, {
            withCredentials: true
          });
      
      if (Array.isArray(data)) {
        setResults(data);
        if (data.length === 0) {
          setNoResultsMessage('No se encontraron tareas con los filtros proporcionados.');
        } else {
          setNoResultsMessage(''); // Limpiar mensaje si hay resultados
        }
      } else {
        console.error("La respuesta del servidor no es un arreglo:", data);
        setResults([]);
        setNoResultsMessage('No se encontraron tareas con los filtros proporcionados.');

      }
    } catch (error) {
      console.error("Error al obtener los datos:", error);
      setResults([]);
      setNoResultsMessage('Hubo un error al realizar la búsqueda. Intenta nuevamente.');
    }
  };
  

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Buscar Equipos por numero de serie, agencia o fecha de creación:</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        <input name="serialNumber" placeholder="Número de serie" onChange={handleChange} className="p-2 border rounded text-black" />
        <input name="agency" placeholder="Agencia" onChange={handleChange} className="p-2 border rounded text-black" />
        <input name="date" type="date" onChange={handleChange} className="p-2 border rounded text-black" />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">Buscar</button>
      </div>

      <div className="flex flex-col gap-4">
        {results.map(task => (
          <TaskCard key={task._id} task={task} />
        ))}
        {noResultsMessage && (
          <div className="text-red-500 font-semibold">{noResultsMessage}</div>
        )}
      </div>
    </div>
  );
}

export default SearchTasks;
