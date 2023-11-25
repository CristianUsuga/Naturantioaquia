import { response, request } from 'express';
import Categoria  from '../models/categorias.js';



const categoriasGet = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json({
        categorias
    });
  } catch (error) {
    console.error('Error al obtener categorias:', error);
    res.status(500).json({ error: 'Error al obtener categorias' });
  }
};

const getCategoria = async (req, res) => {
  try {
    const { id_categoria } = req.params
    const categoria = await Producto.findByPk(id_categoria);
    if (categoria) {
      res.json({ categoria });
    } else {
      res.status(404).json({
        msg: `No existe categoria con el id  ${id_categoria}`,
      })
    }

  } catch (error) {
    console.error('Error al obtener categoria:', error);
    res.status(500).json({ error: 'Error al obtener categoria' });
  }
};

const categoriasPost = async (req = request, res = response) => {
    try {
      
      const { } = req.body;
  
      const nuevaCategoria = await Categoria.create
     
  
      res.status(201).json({ categoria: nuevaCategoria });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Hable con el administrador del backend :c',
      });
    }
  };
  



const CategoriasPut = async (req, res = response) => {

  const { p_id_categoria } = req.params;
  const {createdAt,updatedAt, id_categoria, ...resto } = req.body;

  try {

    const categoria = await Categoria.findByPk(p_id_categoria);
    if (!categoria) {
      return res.status(404).json({
        msg: `No existe una categoria con el id ${p_id_categoria} `,
      });
    }

    await categoria.update(resto);
    res.json(categoria);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador del backend :c',
    });
  }
};

const productoDelete = async(req, res = response) => {
  const {id_categoria} = req.params;
  const producto = await Producto.findByPk(id_categoria);
  if (!producto) {
    return res.status(404).json({
      msg:' No existe un producto con el id: '+ id_categoria,
    });
  }
  //await producto.update({estado_producto: 2})
  await  producto.destroy();

  res.json(producto);
};

const productosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador'
  });

};

export { };