"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productoController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductoController {
    insertar_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("INSERT INTO producto set ?", [req.body]);
            res.json(resp);
        });
    }
    eliminar_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query(`DELETE FROM producto WHERE id_producto = ${id}`);
            res.json(resp);
        });
    }
    mostrar_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Producto no encontrado' });
        });
    }
    modificar_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query("UPDATE producto set ? WHERE id_producto = ?", [req.body, id]);
            res.json(resp);
        });
    }
    mostrar_Todos_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const respuesta = yield database_1.default.query('SELECT * FROM producto ');
            res.json(respuesta);
        });
    }
    mostrar_porCategoria_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_categoria } = req.params;
                console.log('Categoría recibida:', nombre_categoria);
                const respuesta = yield database_1.default.query('SELECT * FROM producto WHERE categoria = ?', [nombre_categoria]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Devolver el array completo de productos
                }
                else {
                    res.status(404).json({ 'mensaje': 'Categoría no encontrada' });
                }
            }
            catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ 'mensaje': 'Error interno del servidor' });
            }
        });
    }
    mostrar_Marca_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT marca FROM producto WHERE id_producto = ?', [id]);
            if (respuesta.length > 0) {
                res.json(respuesta[0]);
                return;
            }
            res.status(404).json({ 'mensaje': 'Marca no encontrada' });
        });
    }
    mostrar_porMarca_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nombre_marca } = req.params;
                console.log('Marca recibida:', nombre_marca);
                const respuesta = yield database_1.default.query('SELECT * FROM producto WHERE marca = ?', [nombre_marca]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Devolver el array completo de productos
                }
                else {
                    res.status(404).json({ 'mensaje': 'Marca no encontrada' });
                }
            }
            catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ 'mensaje': 'Error interno del servidor' });
            }
        });
    }
    mostrar_porCantidad_producto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { cantidad } = req.params;
                console.log('Cantidad de producto recibido:', cantidad);
                const respuesta = yield database_1.default.query('SELECT * FROM producto WHERE cantidad = ?', [cantidad]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Devolver el array completo de productos
                }
                else {
                    res.status(404).json({ 'mensaje': 'Cantidad no encontrada' });
                }
            }
            catch (error) {
                console.error('Error al ejecutar la consulta:', error);
                res.status(500).json({ 'mensaje': 'Error interno del servidor' });
            }
        });
    }
    //nueva consulta
    obtenerNombrePorId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const respuesta = yield database_1.default.query('SELECT nombre FROM producto WHERE id_producto = ?', [id]);
            if (respuesta.length > 0) {
                res.json({ nombre: respuesta[0].nombre });
            }
            else {
                res.status(404).json({ mensaje: 'Nombre de producto no encontrado' });
            }
        });
    }
    //Nueva consulta para busqueda
    buscarProductoPorNombreoCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre_categoria } = req.params;
            try {
                const respuesta = yield database_1.default.query(`SELECT * FROM producto
                WHERE nombre LIKE ? OR categoria LIKE ? OR marca LIKE ?;`, [`%${nombre_categoria}%`, `%${nombre_categoria}%`, `%${nombre_categoria}%`]);
                if (respuesta.length > 0) {
                    res.json(respuesta); // Se encontraron resultados
                }
                else {
                    res.status(404).json({ mensaje: 'No se encontraron productos que coincidan con la búsqueda.' });
                }
            }
            catch (error) {
                console.error('Error al buscar producto:', error);
                res.status(404).json({ error: 'Error interno del servidor.' });
            }
        });
    }
}
exports.productoController = new ProductoController();
