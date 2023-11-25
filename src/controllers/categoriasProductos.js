import { response, request } from 'express';
import CategoriaProducto from '../models/categoriasProductos.js';
import Categoria from '../models/categorias.js';
import Producto from '../models/productos.js';

const categoriasProductosGet = async (req, res) => {
    try {
        const categoriasProductos = await CategoriaProducto.findAll();
        res.json(categoriasProductos);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const getCategoriaProducto = async (req, res) => {
    const { id_categoria, id_producto } = req.params;

    try {
        const categoriaProducto = await CategoriaProducto.findOne({
            where: { id_categoria, id_producto },
            include: [{ model: Categoria, as: 'Categoria' }, { model: Producto, as: 'Producto' }],
        });

        if (categoriaProducto) {
            const { Categoria, Producto } = categoriaProducto;
            res.json({
                id_categoria,
                id_producto,
                nombre_categoria: Categoria.nombre_categoria,
                nombre_producto: Producto.nombre_producto,
            });
        } else {
            res.status(404).json({ msg: 'Relación categoría-producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};




const categoriasProductosPost = async (req, res) => {
    const { id_categoria, id_producto } = req.body;

    try {
        const nuevaRelacion = await CategoriaProducto.create({ id_categoria, id_producto });
        res.json(nuevaRelacion);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const categoriaProductoDelete = async (req, res) => {
    const { id_categoria, id_producto } = req.params;

    try {
        const categoriaProducto = await CategoriaProducto.findOne({
            where: { id_categoria, id_producto },
        });

        if (categoriaProducto) {
            await categoriaProducto.destroy();
            res.json({ msg: 'Relación categoría-producto eliminada con éxito' });
        } else {
            res.status(404).json({ msg: 'Relación categoría-producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

const categoriasProductosPut = async (req, res) => {
    const { id_categoria, id_producto } = req.params;
    const { nueva_id_categoria, nueva_id_producto } = req.body;

    try {
        const categoriaProducto = await CategoriaProducto.findOne({
            where: { id_categoria, id_producto },
        });

        if (categoriaProducto) {
            await categoriaProducto.update({
                id_categoria: nueva_id_categoria,
                id_producto: nueva_id_producto,
            });
            res.json({ msg: 'Relación categoría-producto actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'Relación categoría-producto no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


// Nueva función para obtener productos por categoría
const getProductosPorCategoria = async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const productos = await CategoriaProducto.findAll({
            where: { id_categoria },
            include: [{ model: Producto, as: 'Producto' }],
        });

        if (productos.length > 0) {
            const productosConNombres = productos.map(producto => ({
                id_producto: producto.id_producto,
                nombre_producto: producto.Producto.nombre_producto,
            }));

            res.json(productosConNombres);
        } else {
            res.status(404).json({ msg: 'No se encontraron productos para la categoría especificada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};

// Nueva función para obtener categorías por producto
const getCategoriasPorProducto = async (req, res) => {
    const { id_producto } = req.params;

    try {
        const categorias = await CategoriaProducto.findAll({
            where: { id_producto },
            include: [{ model: Categoria, as: 'Categoria' }],
        });

        if (categorias.length > 0) {
            const categoriasConNombres = categorias.map(categoria => ({
                id_categoria: categoria.id_categoria,
                nombre_categoria: categoria.Categoria.nombre_categoria,
            }));

            res.json(categoriasConNombres);
        } else {
            res.status(404).json({ msg: 'No se encontraron categorías para el producto especificado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export {getProductosPorCategoria,getCategoriasPorProducto, categoriaProductoDelete, categoriasProductosGet, categoriasProductosPost, categoriasProductosPut, getCategoriaProducto, }