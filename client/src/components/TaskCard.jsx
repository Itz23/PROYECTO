import { useTasks } from "../context/TasksContext";
import { Link} from "react-router-dom";

import  dayjs  from "dayjs";
import  utc  from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
    const {deleteTask}=useTasks();

    return (
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <header className="flex justify-between">
          <h1 className="text-2xl font-bold">Información del equipo</h1>
          <div className="flex gap-x-2 items-center">
            {/*mandar un mensaje de advertencia tas seguro de que quieres borrar el ese ése?*/}
            <button className="bg-red-500 hover:bg-red-600 text-white px-4
            py-2 rounded-md"
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              borrar
            </button>
            <Link to={`/tasks/${task._id}`} 
            className="bg-blue-500 hover:bg-red-600 text-white px-4
            py-2 rounded-md">editar</Link>
          </div>
        </header>
  
        <table className="text-slate-300 mt-4 w-full table-auto">
          <tbody>
            <tr>
              <td className="pr-4 font-semibold">Estado:</td>
              <td>{task.status}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Persona que recibe en sistemas:</td>
              <td>{task.received}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">No. Serie:</td>
              <td>{task.serialNumber}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Marca:</td>
              <td>{task.brand}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Agencia:</td>
              <td>{task.agency}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Departamento:</td>
              <td>{task.department}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Hardware:</td>
              <td>{task.hardware}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Modelo:</td>
              <td>{task.model}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Procesador:</td>
              <td>{task.processor}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Sistema Operativo:</td>
              <td>{task.opeSystem}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Disco Duro:</td>
              <td>{task.hardDisc}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">RAM:</td>
              <td>{task.ram}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">MAC Ethernet:</td>
              <td>{task.ethernet}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">MAC WiFi:</td>
              <td>{task.wifi}</td>
            </tr>
            <tr>
              <td className="pr-4 font-semibold">Cambios realizados:</td>
              <td>{task.changes}</td>
            </tr>

            {task.status === "usado" && (
              <>
            <tr>
            <td className="pr-4 font-semibold">Persona que reporta:</td>
            <td>{task.reporter}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold">Diagnóstico:</td>
            <td>{task.diagnostic}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold">Estado Final:</td>
            <td>{task.finalStatus}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold">Falla Reportada:</td>
            <td>{task.reportedIssue}</td>
          </tr>
          <tr>
            <td className="pr-4 font-semibold">Trabajo Realizado:</td>
            <td>{task.workDone}</td>
          </tr>
          </>
            )}
          </tbody>
        </table>
  
        <p className="text-sm text-right text-gray-400 mt-4">
          Fecha: {dayjs(task.date).utc().format("DD/MM/YYYY")}
        </p> {/*editar para que se actualice al editar*/}
      </div>
    );
  }
  
  export default TaskCard;
  