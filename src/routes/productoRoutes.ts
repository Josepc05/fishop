import { Router } from 'express';
import { productoController } from '../controllers/productoController'
import { } from '../middleware/auth';
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
        this.router.get('/mostrarporCategoriaProducto/:nombre_categoria', productoController.mostrar_porCategoria_producto);
        this.router.get('/mostrarMarcaProducto/:id',  productoController.mostrar_Marca_producto);
        this.router.get('/mostrarporMarcaProducto/:nombre_marca',  productoController.mostrar_porMarca_producto);
        this.router.get('/mostrarporCantidadProducto/:cantidad',  productoController.mostrar_porCantidad_producto);
        //nueva consulta
        this.router.get('/obtenerNombreProducto/:id',  productoController.obtenerNombrePorId);
        this.router.get('/buscarProducto/:nombre_categoria', productoController.buscarProductoPorNombreoCategoria);
    }
}
const ProductoRoutes = new productoRoutes();
export default ProductoRoutes.router;