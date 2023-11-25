import Transportista from '../models/transportistas.js';

const transportistasGet = async (req, res) => {
  try {
    const transportistas = await Transportista.findAll();
    res.json(transportistas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getTransportista = async (req, res) => {
  try {
    const { id_transportista } = req.params;
    const transportista = await Transportista.findByPk(id_transportista);
    res.json(transportista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transportistasPost = async (req, res) => {
  try {
    const { body } = req;
    const nuevoTransportista = await Transportista.create(body);
    res.status(201).json(nuevoTransportista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transportistasPut = async (req, res) => {
  try {
    const { id_transportista } = req.params;
    const { body } = req;

    const transportista = await Transportista.findByPk(id_transportista);

    await transportista.update(body);

    res.json(transportista);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const transportistasDelete = async (req, res) => {
  try {
    const { id_transportista } = req.params;

    await Transportista.destroy({ where: { id_transportista } });

    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export {
  transportistasGet,
  getTransportista,
  transportistasPost,
  transportistasPut,
  transportistasDelete
};
