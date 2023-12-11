import { Router } from 'express';
import { carritoController } from '../controllers/carritoController';
import { validarToken } from '../middleware/auth';
class carritoRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarCarrito/', validarToken, carritoController.insertar_carrito);
        this.router.delete('/eliminarCarrito/:id', validarToken, carritoController.eliminar_carrito);
        this.router.put('/modificarCarrito/:id', validarToken, carritoController.modificar_carrito);
        this.router.get('/mostrarTodosCarrito/', validarToken, carritoController.mostrar_Todos_carrito);
        this.router.get('/mostrarCarrito/:id', validarToken, carritoController.mostrar_carrito);
        this.router.get('/mostrarEstadoCarrito/:id', validarToken, carritoController.mostrar_Estado_carrito);
        //this.router.get('/mostrarporFechaCarrito/:fecha', carritoController.mostrar_porFecha_carrito);
    }
}
const CarritoRoutes = new carritoRoutes();
export default CarritoRoutes.router;