import { connectDB } from '../../../src/db';
import Task from '../../../src/models/task.model';

export default async function handler(req, res) {
  await connectDB();

  const { serialNumber, agency, date } = req.query;

  const filter = {};

  if (serialNumber) filter.serialNumber = { $regex: serialNumber, $options: 'i' };
  if (agency) filter.agency = { $regex: agency, $options: 'i' };
  if (date) {
    const start = new Date(date);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);
    filter.date = { $gte: start, $lte: end };
  }

  try {
    const tasks = await Task.find(filter);
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar tareas', error });
  }
}
