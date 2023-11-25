
import Categoria from '../models/categorias.js';
import { response, request } from 'express';

export const categoriasGet = async (req = request, res = response) => {
    try {
        const categorias = await Categoria.findAll();
        res.json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const getCategoria = async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const categoria = await Categoria.findByPk(id_categoria);
        if (categoria) {
            res.json(categoria);
        } else {
            res.status(404).json({ msg: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const categoriasPost = async (req, res) => {
    const { nombre_categoria } = req.body;

    try {
        const nuevaCategoria = await Categoria.create({ nombre_categoria });
        res.json(nuevaCategoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const categoriasPut = async (req, res) => {
    const { p_id_categoria } = req.params;
    const { nombre_categoria } = req.body;

    try {
        const categoria = await Categoria.findByPk(p_id_categoria);
        if (categoria) {
            await categoria.update({ nombre_categoria });
            res.json({ msg: 'Categoría actualizada con éxito' });
        } else {
            res.status(404).json({ msg: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};


export const categoriaDelete = async (req, res) => {
    const { id_categoria } = req.params;

    try {
        const categoria = await Categoria.findByPk(id_categoria);
        if (categoria) {
            await categoria.destroy();
            res.json({ msg: 'Categoría eliminada con éxito' });
        } else {
            res.status(404).json({ msg: 'Categoría no encontrada' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: 'Error interno del servidor' });
    }
};
