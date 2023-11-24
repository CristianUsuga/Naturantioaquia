import Laboratorio from '../models/laboratorios.js';

const laboratoriosGet = async (req, res) => {

  try {
    const laboratorios = await Laboratorio.findAll();
    res.json(laboratorios);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const getLaboratorio = async (req, res) => {

  try {
    const { id_laboratorio } = req.params;
    const laboratorio = await Laboratorio.findByPk(id_laboratorio);
    res.json(laboratorio);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const laboratoriosPost = async (req, res) => {
  console.log("Hola post api");
  try {

    const { nombre_laboratorio, correo, ...resto } = req.body;


    const laboratorioExistente = await Laboratorio.findOne({
      where: { nombre_laboratorio },
    });

    if (laboratorioExistente) {
      return res.status(400).json({
        errors: [
          {
            type: 'field',
            msg: 'Ya existe un laboratorio con este nombre.',
            path: 'nombre_laboratorio',
            location: 'body',
          },
        ],
      });
    }

    const laboratorioExistenteCorreo = await Laboratorio.findOne({
      where: { correo },
    });

    if (laboratorioExistenteCorreo) {
      return res.status(400).json({
        errors: [
          {
            type: 'field',
            msg: 'Ya existe un laboratorio con este correo.',
            path: 'correo',
            location: 'body',
          },
        ],
      });
    }

    // Crear un nuevo laboratorio
    const nuevoLaboratorio = await Laboratorio.create({
      nombre_laboratorio,
      correo,
      ...resto,
    });

    res.status(201).json(nuevoLaboratorio);
  } catch (error) {
    res.status(500).json({ msg: 'Hable con el administrador del backend :c', });
  }
};


const laboratoriosPut = async (req, res) => {

  try {
    const { id_laboratorio } = req.params;
    const { body } = req;

    const laboratorio = await Laboratorio.findByPk(id_laboratorio);

    await laboratorio.update(body);

    res.json(laboratorio);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}

const laboratoriosDelete = async (req, res) => {

  try {
    const { id_laboratorio } = req.params;

    await Laboratorio.destroy({ where: { id_laboratorio } });

    res.sendStatus(204);

  } catch (error) {
    res.status(500).json({ message: error.message })
  }

}

export {
  laboratoriosGet,
  getLaboratorio,
  laboratoriosPost,
  laboratoriosPut,
  laboratoriosDelete
}