"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productoController_1 = require("../controllers/productoController");
const auth_1 = require("../middleware/auth");
class productoRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        //this.router.get('/', (req, res) => res.send('probando ruta'));
        this.router.post('/insertarProducto/', auth_1.validarToken, productoController_1.productoController.insertar_producto);
        this.router.delete('/eliminarProducto/:id', auth_1.validarToken, productoController_1.productoController.eliminar_producto);
        this.router.put('/modificarProducto/:id', auth_1.validarToken, productoController_1.productoController.modificar_producto);
        this.router.get('/mostrarTodosProducto/', auth_1.validarToken, productoController_1.productoController.mostrar_Todos_producto);
        this.router.get('/mostrarProducto/:id', auth_1.validarToken, productoController_1.productoController.mostrar_producto);
        this.router.get('/mostrarCategoriaProducto/:id', auth_1.validarToken, productoController_1.productoController.mostrar_Categoria_producto);
        this.router.get('/mostrarMarcaProducto/:id', auth_1.validarToken, productoController_1.productoController.mostrar_Marca_producto);
        this.router.get('/mostrarporMarcaProducto/:nombre_marca', auth_1.validarToken, productoController_1.productoController.mostrar_porMarca_producto);
        this.router.get('/mostrarCantidadProducto/:id', auth_1.validarToken, productoController_1.productoController.mostrar_Cantidad_producto);
    }
}
const ProductoRoutes = new productoRoutes();
exports.default = ProductoRoutes.router;
