import { useForm } from "react-hook-form";
import { useTasks } from "../context/TasksContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue,watch,formState: { errors } } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();
  const status = watch("status");

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        console.log(task);

        setValue('status', task.status);
        setValue('received', task.received);
        setValue('serialNumber', task.serialNumber);
        setValue('brand', task.brand);
        setValue('agency', task.agency);
        setValue('department', task.department);
        setValue('hardware', task.hardware);
        setValue('model', task.model);
        setValue('processor', task.processor);
        setValue('opeSystem', task.opeSystem);
        setValue('hardDisc', task.hardDisc);
        setValue('ram', task.ram);
        setValue('ethernet', task.ethernet);
        setValue('wifi', task.wifi);
        setValue('changes', task.changes);
        setValue("date", dayjs(task.date).utc().format('YYYY-MM-DD'));
        setValue("reporter",task.reporter);
        setValue("diagnostic", task.diagnostic);
        setValue("finalStatus", task.finalStatus);
        setValue("reportedIssue", task.reportedIssue);
        setValue("workDone", task.workDone);
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const cleanedData = Object.fromEntries(
      Object.entries(data).filter(([_, value]) => value !== "" && value !== undefined)
    );
  
    const dataValid = {
      ...cleanedData,
      date: cleanedData.date
        ? dayjs.utc(cleanedData.date).format()
        : dayjs.utc().format(),
    };
  
    if (params.id) {
      updateTask(params.id, dataValid);
    } else {
      createTask(dataValid);
    }
  
    navigate("/tasks");
  });
  

  return (
    <div className="flex h-[calc(90vh-100px)] items-start justify-center mt-20">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
  {/* STATUS */}
  <div>
  <label className="block mb-2 text-sm font-medium text-white">Estado</label>
  <div className="flex gap-4">
    <label className="flex items-center gap-2 text-white">
      <input
        type="radio"
        value="nuevo"
        {...register("status", { required: "El estado es obligatorio" })}
        className="accent-blue-500"
      />
      Nuevo
    </label>

    <label className="flex items-center gap-2 text-white">
      <input
        type="radio"
        value="usado"
        {...register("status", { required: "El estado es obligatorio" })}
        className="accent-blue-500"
      />
      Usado
    </label>
  </div>
  {errors.status && <p className="text-red-500 mt-1">{errors.status.message}</p>}
</div>

<div>
    <label htmlFor="received">Persona que recibe en sistemas</label>
    <input
      type="text"
      placeholder="Persona que recibe en sistemas"
      {...register("received", {
        required: "Persona que recibe en sistemas requerido",
        pattern: {
          value: /^[a-z\s]+$/,
          message: "Solo minúsculas",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.received && <p className="text-red-500">{errors.received.message}</p>}
  </div>
  {/* SERIAL NUMBER */}
  <div>
    <label htmlFor="serialNumber">N° de Serie</label>
    <input
      type="text"
      placeholder="Número de serie"
      {...register("serialNumber", {
        required: "Número de serie requerido",
        pattern: {
          value: /^[a-zA-Z0-9-]+$/,
          message: "Solo letras, números y guiones",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.serialNumber && <p className="text-red-500">{errors.serialNumber.message}</p>}
  </div>

  {/* BRAND */}
  <div>
    <label htmlFor="brand">Marca</label>
    <input
      type="text"
      placeholder="Marca"
      {...register("brand", {
        required: "Marca requerida",
        pattern: {
          value: /^[a-z\s]+$/,
          message: "Solo minúsculas",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.brand && <p className="text-red-500">{errors.brand.message}</p>}
  </div>

  {/* AGENCY */}
  <div>
    <label htmlFor="agency">Agencia</label>
    <input
      type="text"
      placeholder="Agencia"
      {...register("agency", {
        required: "Agencia requerida",
        pattern: {
          value: /^[a-z\s]+$/,
          message: "Solo minúsculas",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.agency && <p className="text-red-500">{errors.agency.message}</p>}
  </div>

  {/* DEPARTMENT */}
  <div>
    <label htmlFor="department">Departamento</label>
    <input
      type="text"
      placeholder="Departamento"
      {...register("department", {
        required: "Departamento requerido",
        pattern: {
          value: /^[a-z\s]+$/,
          message: "Solo minúsculas",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.department && <p className="text-red-500">{errors.department.message}</p>}
  </div>

  {/* HARDWARE */}
  <div>
    <label htmlFor="hardware">Hardware</label>
    <input
      type="text"
      placeholder="Hardware"
      {...register("hardware", {
        required: "Hardware requerido",
        pattern: {
          value: /^[a-zA-Z\s]+$/,
          message: "Solo letras sin números",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.hardware && <p className="text-red-500">{errors.hardware.message}</p>}
  </div>

  {/* MODEL */}
  <div>
    <label htmlFor="model">Modelo</label>
    <input
      type="text"
      placeholder="Modelo"
      {...register("model", {
        required: "Modelo requerido",
        pattern: {
          value: /^[a-zA-Z0-9-\s]+$/,
          message: "Letras, números y guiones",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.model && <p className="text-red-500">{errors.model.message}</p>}
  </div>

  <div>
    <label htmlFor="processor">Procesador</label>
    <input
      type="text"
      placeholder="Procesador"
      {...register("processor", {
        pattern: {
          value: /^[a-zA-Z0-9-\s]+$/,
          message: "Letras minusculas, números y guiones",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
  </div>

  <div>
    <label htmlFor="opeSystem">Sistema Operativo</label>
    <input
      type="text"
      placeholder="Sistema operativo"
      {...register("opeSystem")}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
  </div>

  <div>
    <label htmlFor="hardDisc">Disco duro</label>
    <input
      type="text"
      placeholder="Disco duro"
      {...register("hardDisc", {
        pattern: {
          value: /^[a-zA-Z0-9\s]+$/,
          message: "Solo letras y números",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.hardDisc && <p className="text-red-500">{errors.hardDisc.message}</p>}
  </div>

  <div>
    <label htmlFor="ram">RAM (GB)</label>
    <input
      type="number"
      placeholder="Memoria RAM"
      {...register("ram", {
        min: { value: 1, message: "Debe ser mayor que 0" },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.ram && <p className="text-red-500">{errors.ram.message}</p>}
  </div>

  <div>
    <label htmlFor="ethernet">MAC Ethernet</label>
    <input
      type="text"
      placeholder="MAC Ethernet"
      {...register("ethernet", {
        pattern: {
          value: /^([A-F0-9]{2}[:-]){5}([A-F0-9]{2})$/i,
          message: "MAC inválida (usa - o :)",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md uppercase"
    />
    {errors.ethernet && <p className="text-red-500">{errors.ethernet.message}</p>}
  </div>

  <div>
    <label htmlFor="wifi">MAC Wifi</label>
    <input
      type="text"
      placeholder="MAC Wifi"
      {...register("wifi", {
        pattern: {
          value: /^([A-F0-9]{2}[:-]){5}([A-F0-9]{2})$/i,
          message: "MAC inválida (usa - o :)",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md uppercase"
    />
    {errors.wifi && <p className="text-red-500">{errors.wifi.message}</p>}
  </div>

  <div>
    <label htmlFor="changes">Cambios</label>
    <input
      type="text"
      placeholder="Cambios realizados"
      {...register("changes", {
        pattern: {
          value: /^[a-zA-Z\s]+$/,
          message: "Ingresa solo letras",
        },
      })}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
    {errors.changes && <p className="text-red-500">{errors.changes.message}</p>}
  </div>

  {status === "usado" && (//informacion usados 
  <>
    {/* REPORTER */}
    <div>
      <label htmlFor="reporter">Persona que Reporta</label>
      <input
        type="text"
        placeholder="Nombre de quien reporta"
        {...register("reporter", {
          pattern: {
            value: /^[a-zA-Z\s]+$/,
            message: "Solo letras",
          },
        })}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
      {errors.reporter && <p className="text-red-500">{errors.reporter.message}</p>}
    </div>

    {/* DIAGNOSTIC */}
    <div>
      <label htmlFor="diagnostic">Diagnóstico</label>
      <input
        type="text"
        placeholder="Diagnóstico del sistema"
        {...register("diagnostic")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
    </div>

    {/* FINAL STATUS */}
    <div>
      <label htmlFor="finalStatus">Estado Final</label>
      <input
        type="text"
        placeholder="Estado final del equipo"
        {...register("finalStatus")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
    </div>

    {/* REPORTED ISSUE */}
    <div>
      <label htmlFor="reportedIssue">Falla Reportada</label>
      <input
        type="text"
        placeholder="Problema reportado"
        {...register("reportedIssue")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
    </div>

    {/* WORK DONE */}
    <div>
      <label htmlFor="workDone">Trabajo Realizado</label>
      <input
        type="text"
        placeholder="Acciones realizadas"
        {...register("workDone")}
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
      />
    </div>
  </>
)}

  <div>
    <label htmlFor="date">Fecha</label>
    <input
      type="date"
      {...register("date")}
      className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
    />
  </div>

  {/* Botón de envío */}
  <div className="col-span-1 md:col-span-2 flex justify-end">
    <button className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600 transition-all mt-4">
      Guardar
    </button>
    {params.id && (
  <button
    type="button"
    onClick={() => navigate(`/print/${params.id}`)}
    className="ml-4 bg-green-500 px-4 py-2 rounded-md hover:bg-green-600 transition-all mt-4"
  >
    Imprimir
  </button>
)}

  </div>
</form>

      </div>
    </div>
  );
}

export default TaskFormPage;
