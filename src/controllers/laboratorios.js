import Laboratorio from '../models/laboratorios.js';

const laboratoriosGet = async(req, res) => {

  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}

const getLaboratorio = async(req, res) => {
  
  try {
    const { id_laboratorio } = req.params;  
    const laboratorio = await Laboratorio.findByPk(id_laboratorio);
    res.json(laboratorio);
  } catch (error) {
    res.status(500).json({message: error.message});
  }

}

const laboratoriosPost = async(req, res) => {

  try {
    const { body } = req;  
    const nuevoLaboratorio = await Laboratorio.create(body);
    res.status(201).json(nuevoLaboratorio);
  } catch (error) {
    res.status(500).json({message: error.message}); 
  }

}

const laboratoriosPut = async(req, res) => {

  try {
    const { id_laboratorio } = req.params;
    const { body } = req;

    const laboratorio = await Laboratorio.findByPk(id_laboratorio);

    await laboratorio.update(body);

    res.json(laboratorio);

  } catch (error) {
     res.status(500).json({message: error.message});
  }

}

const laboratoriosDelete = async(req, res) => {

  try {
    const { id_laboratorio } = req.params;

    await Laboratorio.destroy({where: {id_laboratorio}});

    res.sendStatus(204);

  } catch (error) {
    res.status(500).json({message: error.message}) 
  }

}

export {
  laboratoriosGet,
  getLaboratorio, 
  laboratoriosPost,
  laboratoriosPut,
  laboratoriosDelete
}