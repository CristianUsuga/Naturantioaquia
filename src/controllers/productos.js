import { response, request } from 'express';
import Producto  from '../models/productos.js';



const productosGet = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json({
        productos
    });
  } catch (error) {
    console.error('Error al obtener productos:', error);
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};

const getProducto = async (req, res) => {
  try {
    const { id_producto } = req.params
    const producto = await Producto.findByPk(id_producto);
    if (producto) {
      res.json({ producto });
    } else {
      res.status(404).json({
        msg: `No existe producto con el id  ${id_producto}`,
      })
    }

  } catch (error) {
    console.error('Error al obtener producto:', error);
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};

const productosPost = async (req = request, res = response) => {
    try {
      // Obtén los datos del cuerpo de la solicitud
      const { nombre_producto, descripcion_producto, precio, STOCK_MINIMO, STOCK_MAXIMO, stock, id_laboratorios, estado_producto } = req.body;
  
      // Crea un nuevo producto en la base de datos
      const nuevoProducto = await Producto.create({
        nombre_producto,
        descripcion_producto,
        precio,
        STOCK_MINIMO,
        STOCK_MAXIMO,
        stock,
        id_laboratorios,
        estado_producto,
      });
  
      res.status(201).json({ producto: nuevoProducto });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        msg: 'Hable con el administrador del backend :c',
      });
    }
  };
  



const ProductosPut = async (req, res = response) => {

  const { p_id_producto } = req.params;
  const {createdAt,updatedAt, id_producto, ...resto } = req.body;

  try {

    const producto = await Producto.findByPk(p_id_producto);
    if (!producto) {
      return res.status(404).json({
        msg: `No existe un producto con el id ${p_id_producto} `,
      });
    }

    await producto.update(resto);
    res.json(producto);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador del backend :c',
    });
  }
};

const productoDelete = async(req, res = response) => {
  const {id_producto} = req.params;
  const producto = await Producto.findByPk(id_producto);
  if (!producto) {
    return res.status(404).json({
      msg:' No existe un producto con el id: '+ id_producto,
    });
  }
  await producto.update({estado_producto: 2})
  //await usuario .destroy();

  res.json(producto);
};

const productosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador'
  });

};

export { productosGet, productosPost, ProductosPut, productoDelete, productosPatch, getProducto };