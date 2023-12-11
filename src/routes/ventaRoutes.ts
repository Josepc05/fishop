import { Router } from 'express';
import { ventaController } from '../controllers/ventaController'
import { validarToken } from '../middleware/auth';
class ventaRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarVenta/', validarToken, ventaController.insertar_venta);
        this.router.delete('/eliminarVenta/:id', validarToken, ventaController.eliminar_venta);
        this.router.put('/modificarVenta/:id', validarToken, ventaController.modificar_venta);
        this.router.get('/mostrarTodasVenta/', validarToken, ventaController.mostrar_Todas_venta);
        this.router.get('/mostrarVenta/:id', validarToken, ventaController.mostrar_venta);
        this.router.get('/mostrarporFechaVenta/:fecha', validarToken, ventaController.mostrar_porFecha_venta);
        this.router.get('/mostrarTotalVenta/:id', validarToken, ventaController.mostrar_Totalventa);
        this.router.get('/mostrarCarritoVenta/:id', validarToken, ventaController.mostrar_Carritoventa);
    }
}
const VentaRoutes = new ventaRoutes();
export default VentaRoutes.router;