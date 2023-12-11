import { Router } from 'express';
import { usuarioController } from '../controllers/usuarioController'
import { validarToken } from '../middleware/auth';
class usuarioRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarUsuario/', validarToken, usuarioController.insertar_usuario);
        this.router.delete('/eliminarUsuario/:id', validarToken, usuarioController.eliminar_usuario);
        this.router.put('/modificarUsuario/:id', validarToken, usuarioController.modificar_usuario);
        this.router.get('/mostrarTodosUsuario/', validarToken, usuarioController.mostrar_Todos_usuario);
        this.router.get('/mostrarUsuario/:id', validarToken, usuarioController.mostrar_usuario);
    }
}
const UsuarioRoutes = new usuarioRoutes();
export default UsuarioRoutes.router;