import{response, request} from 'express'

const usuariosGet = (req= request, res = response) => {
    const {q, nombre , apikey} = req.query;
    res.json({
        msg: 'get API - Controlador',
        q,
        nombre,
        apikey
    });
};

const usuariosPost = (req, res= response) => {
    
    const body = req.body;

    res.json({
        msg: 'post API - Controlador',
        body
    });
};

const usuariosPut = (req, res = response) => {

    const {id} = req.params;

    res.json({
        msg: 'put API - Controlador',
        id
    });
};

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    })

};

const usuariosPatch = (req, res = response) => {
    res.json({
        msg: 'patch API - Controlador'
    });

};

export{usuariosGet, usuariosPost,usuariosPut, usuariosDelete, usuariosPatch};