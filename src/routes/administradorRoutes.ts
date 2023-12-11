import { Router } from 'express';
import { administradorController } from '../controllers/administradorController'
import { validarToken } from '../middleware/auth';
class administradorRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarAdministrador/', validarToken, administradorController.insertar_administrador);
        this.router.delete('/eliminarAdministrador/:id', validarToken, administradorController.eliminar_administrador);
        this.router.put('/modificarAdministrador/:id', validarToken, administradorController.modificar_administrador);
        this.router.get('/mostrarTodosAdministrador/', validarToken, administradorController.mostrar_Todos_administrador);
        this.router.get('/mostrarAdministrador/:id', validarToken, administradorController.mostrar_administrador);
    }
}
const AdministradorRoutes = new administradorRoutes();
export default AdministradorRoutes.router;