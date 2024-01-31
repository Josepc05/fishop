import { Router } from 'express';
import { productoController } from '../controllers/productoController'
import { validarToken } from '../middleware/auth';
class productoRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarProducto/', productoController.insertar_producto);
        this.router.delete('/eliminarProducto/:id', productoController.eliminar_producto);
        this.router.put('/modificarProducto/:id', productoController.modificar_producto);
        this.router.get('/mostrarTodosProducto/', productoController.mostrar_Todos_producto);
        this.router.get('/mostrarProducto/:id', productoController.mostrar_producto);
        this.router.get('/mostrarCategoriaProducto/:id', validarToken, productoController.mostrar_Categoria_producto);
        this.router.get('/mostrarMarcaProducto/:id', validarToken, productoController.mostrar_Marca_producto);
        this.router.get('/mostrarporMarcaProducto/:nombre_marca', validarToken, productoController.mostrar_porMarca_producto);
        this.router.get('/mostrarCantidadProducto/:id', validarToken, productoController.mostrar_Cantidad_producto);
        //nueva consulta
        this.router.get('/obtenerNombreProducto/:id', validarToken, productoController.obtenerNombrePorId);
    }
}
const ProductoRoutes = new productoRoutes();
export default ProductoRoutes.router;