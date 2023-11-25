import ImagenProducto from '../models/imagenesProductos.js';

// Obtener todas las imágenes de productos
export const imagenesProductosGet = async (req, res) => {
    try {
        const imagenesProductos = await ImagenProducto.findAll();
        res.json(imagenesProductos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Obtener una imagen de producto por su ID
export const getImagenProducto = async (req, res) => {
    const { id_imagen } = req.params;

    try {
        const imagenProducto = await ImagenProducto.findByPk(id_imagen);

        if (imagenProducto) {
            res.json(imagenProducto);
        } else {
            res.status(404).json({ msg: 'Imagen de producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Crear una nueva imagen de producto
export const imagenesProductosPost = async (req, res) => {
    const { id_producto, nombre_imagen, ubicacion_imagen } = req.body;

    try {
        const nuevaImagenProducto = await ImagenProducto.create({ id_producto, nombre_imagen, ubicacion_imagen });
        res.json(nuevaImagenProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Eliminar una imagen de producto por su ID
export const imagenProductoDelete = async (req, res) => {
    const { id_imagen } = req.params;

    try {
        const imagenProducto = await ImagenProducto.findByPk(id_imagen);

        if (imagenProducto) {
            await imagenProducto.destroy();
            res.json({ msg: 'Imagen de producto eliminada con éxito' });
        } else {
            res.status(404).json({ msg: 'Imagen de producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Actualizar una imagen de producto por su ID
export const imagenesProductosPut = async (req, res) => {
    const { id_imagen } = req.params;
    const { id_producto, nombre_imagen, ubicacion_imagen } = req.body;

    try {
        const imagenProducto = await ImagenProducto.findByPk(id_imagen);

        if (imagenProducto) {
            await imagenProducto.update({ id_producto, nombre_imagen, ubicacion_imagen });
            res.json({ msg: 'Imagen de producto actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'Imagen de producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Nueva función para obtener imágenes por producto
export const getImagenesPorProducto = async (req, res) => {
    const { id_producto } = req.params;

    try {
        const imagenesPorProducto = await ImagenProducto.findAll({
            where: { id_producto },
        });

        res.json(imagenesPorProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
