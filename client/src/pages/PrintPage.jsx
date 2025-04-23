import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTasks } from "../context/TasksContext";
import dayjs from "dayjs";
import logo from "../assets/kasa.png";

function PrintPage() {
  const { id } = useParams();
  const { getTask } = useTasks();
  const [task, setTask] = useState(null);

  useEffect(() => {
    async function fetchTask() {
      const fetchedTask = await getTask(id);
      setTask(fetchedTask);
      setTimeout(() => window.print(), 500);
    }
    fetchTask();
  }, [id]);

  if (!task) return <p className="text-white">Cargando...</p>;

  const Ticket = ({ data }) => (
    <div className="ticket">
      <div className="header">
        <div className="logo-placeholder flex justify-center mb-2">
            <img src={logo} className="h-12 object-contain" />
        </div>
        <h2 className="font-bold">Salida de equipo de computo</h2>
      </div>
      <div className="info">
        <div><strong>Estado:</strong> {data.status}</div>
        <div><strong>N° de Serie:</strong> {data.serialNumber}</div>
        <div><strong>Marca:</strong> {data.brand}</div>
        <div><strong>Modelo:</strong> {data.model}</div>
        <div><strong>Agencia:</strong> {data.agency}</div>
        <div><strong>Departamento:</strong> {data.department}</div>
        <div><strong>Hardware:</strong> {data.hardware}</div>
        {data.status === "usado" && (
          <>
        <div><strong>Diagnóstico:</strong> {data.diagnostic}</div>
        <div><strong>Estado Final:</strong> {data.finalStatus}</div>
        <div><strong>Trabajo Realizado:</strong> {data.workDone}</div>
        </>
        )}
        <div><strong>Fecha:</strong> {dayjs(data.date).format("DD/MM/YYYY")}</div>
      </div>
      <div className="firma">
        <div>_____________________________<br/><strong>Nombre y firma de quien recibe</strong></div>
        <div>_____________________________<br/><strong>Nombre y firma de quien entrega</strong></div>
      </div>
    </div>
  );

  return (
    <div className="print-container ">
      <Ticket data={task} />
      <div className="divider" />
      <Ticket data={task} />

      <style jsx>{`
        .print-container {
          width: 21cm;
          height: 29.7cm;
          padding: 1cm;
          background: white;
          font-family: Arial, sans-serif;
          color: #333;
        }

        .ticket {
          width: 100%;
          height: 45%;
          border: 1px solid #ccc;
          padding: 10px;
          margin-bottom: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .header {
          background-color: #fff8dc;
          padding: 5px;
          text-align: center;
          border-bottom: 1px solid #ccc;
        }

        .logo-placeholder {
          font-size: 0.9em;
          font-style: italic;
          margin-bottom: 5px;
        }

        .info {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px 20px;
          padding: 10px;
        }

        .firma {
          display: flex;
          justify-content: space-between;
          padding: 10px;
          font-size: 0.9em;
        }

        .divider {
          height: 5%;
          border-top: 1px dashed #aaa;
          margin: 10px 0;
        }

        @media print {
          body {
            margin: 0;
          }

          .print-container {
            padding: 0.5cm;
          }

          .divider {
            border-top: 1px dashed #aaa;
            margin: 0.5cm 0;
          }
        }
      `}</style>
    </div>
  );
}

export default PrintPage;
