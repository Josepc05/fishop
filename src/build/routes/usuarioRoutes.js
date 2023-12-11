"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuarioController_1 = require("../controllers/usuarioController");
const auth_1 = require("../middleware/auth");
class usuarioRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarUsuario/', auth_1.validarToken, usuarioController_1.usuarioController.insertar_usuario);
        this.router.delete('/eliminarUsuario/:id', auth_1.validarToken, usuarioController_1.usuarioController.eliminar_usuario);
        this.router.put('/modificarUsuario/:id', auth_1.validarToken, usuarioController_1.usuarioController.modificar_usuario);
        this.router.get('/mostrarTodosUsuario/', auth_1.validarToken, usuarioController_1.usuarioController.mostrar_Todos_usuario);
        this.router.get('/mostrarUsuario/:id', auth_1.validarToken, usuarioController_1.usuarioController.mostrar_usuario);
    }
}
const UsuarioRoutes = new usuarioRoutes();
exports.default = UsuarioRoutes.router;
