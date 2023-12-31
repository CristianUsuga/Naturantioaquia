import { response, request } from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';


const usuariosGet = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json({
      usuarios
    });
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

const getUsuario = async (req, res) => {
  try {
    const { id_usuario } = req.params
    const usuario = await Usuario.findByPk(id_usuario);
    if (usuario) {
      res.json({ usuario });
    } else {
      res.status(404).json({
        msg: `No existe usuario con el id  ${id_usuario}`,
      })
    }

  } catch (error) {
    console.error('Error al obtener usuario:', error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

const usuariosPost = async (req = request, res = response) => {
  try {
    const { contraseña, ...usuarioData } = req.body;

    // Verificar si ya existe un usuario con el mismo email
    const existeEmail = await Usuario.findOne({
      where: { correo: usuarioData.correo },
    });

    if (existeEmail) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el email: ${usuarioData.correo}`,
      });
    }

    // Verificar si ya existe un usuario con el mismo ID
    const existeUsuario = await Usuario.findByPk(usuarioData.id_usuario);

    if (existeUsuario) {
      return res.status(400).json({
        msg: `Ya existe un usuario con el ID: ${usuarioData.id_usuario}`,
      });
    }

    const salt = await bcrypt.genSalt(10); // Corregir el nombre de la función a bcrypt.genSalt
    const hashPassword = await bcrypt.hash(contraseña, salt); // Corregir el nombre de la función a bcrypt.hash
    console.log(`${usuarioData}`);
    console.log('contraseña: ', hashPassword);
    // Crear un nuevo usuario
    const usuario = await Usuario.create({ ...usuarioData, contraseña: hashPassword });

    res.status(201).json({ usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador del backend :c',
    });
  }
};




const usuariosPut = async (req, res = response) => {

  const { id_usuario } = req.params;
  const {body} = req;

  try {

    const usuario = await Usuario.findByPk(id_usuario);
    if (!usuario) {
      return res.status(404).json({
        msg: `No existe un usuario con el id ${id_usuario} `,
      });
    }

    await usuario.update(body);
    res.json(usuario);
    
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Hable con el administrador del backend :c',
    });
  }
};

const usuariosDelete = async(req, res = response) => {
  const {id_usuario} = req.params;
  const usuario = await Usuario.findByPk(id_usuario);
  if (!usuario) {
    return res.status(404).json({
      msg:' No existe un usuario con el id: '+ id_usuario,
    });
  }
  await usuario.update({estado_usuario: 0})
  //await usuario .destroy();

  res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: 'patch API - Controlador'
  });

};

export { usuariosGet, usuariosPost, usuariosPut, usuariosDelete, usuariosPatch, getUsuario };