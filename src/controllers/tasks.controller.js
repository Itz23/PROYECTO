 import Task from '../models/task.model.js';

export const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            //asigna a la tarea el usuario que la creo
            user: req.user.id
            //trae todos los datos del usuario en cuestion
        }).populate('user')
            res.json(tasks);
    } catch (error) {
        return res.status(500).json({message: 'Someting went wrong'});
    }
};
export const createTask = async (req, res) => {
try {
    const {
        status, 
        received,
        date, 
        serialNumber, 
        brand,
        agency,
        department,
        hardware,
        model,
        processor,
        opeSystem,
        hardDisc,
        ram,
        ethernet,
        wifi,
        changes,
        reporter,
        diagnostic,
        finalStatus,
        reportedIssue,
        workDone,} = req.body;

    console.log(req.user)
    
    const newTask= new Task({
        status, 
        user: req.user.id,
        received,
        date,
        serialNumber,
        brand,
        agency,
        department,
        hardware,
        model,
        processor,
        opeSystem,
        hardDisc,
        ram,
        ethernet,
        wifi,
        changes,
        reporter,
        diagnostic,
        finalStatus,
        reportedIssue,
        workDone,
    });
   const savedTask = await newTask.save();
   res.json(savedTask);
} catch (error) {
    return res.status(500).json({message: 'Someting went wrong'});
}
};

export const getTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate('user');
        if(!task) return res.status(404).json({message: 'task not found'});
        res.json(task)
    } catch (error) {
      return res.status(404).json({message: 'task not found'});  
    }    
};
export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: 'task not found'});
    return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({message: 'task not found'});  
    }
};
export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{ 
            new: true
          })
          if(!task) return res.status(404).json({message: 'task not found'})
          res.json(task)
    } catch (error) {
        return res.status(404).json({message: 'task not found'});  
    }
};

export const searchTasks = async (req, res) => {
    try {
      const { serialNumber, agency, date } = req.query;
      const query = { user: req.user.id }; // Asegura que solo vea sus tareas
  
      if (serialNumber) {
        query.serialNumber = { $regex: serialNumber, $options: 'i' }; // búsqueda parcial
      }
  
      if (agency) {
        query.agency = { $regex: agency, $options: 'i' };
      }
  
      if (date) {
        const dayStart = new Date(date);
        dayStart.setHours(0, 0, 0, 0);
        const dayEnd = new Date(date);
        dayEnd.setHours(23, 59, 59, 999);
        query.date = { $gte: dayStart, $lte: dayEnd };
      }
  
      const results = await Task.find(query).populate('user');
      res.json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Search failed' });
    }
  };
  