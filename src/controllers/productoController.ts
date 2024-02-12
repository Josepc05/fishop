import { Request, Response } from 'express';
import pool from '../database';

class ProductoController {
    public async insertar_producto(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO producto set ?", [req.body]);
        res.json(resp);
    }
    public async eliminar_producto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM producto WHERE id_producto = ${id}`);
        res.json(resp);
    }
    public async mostrar_producto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT * FROM producto WHERE id_producto = ?', [id]);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Producto no encontrado' });
    }
    public async modificar_producto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE producto set ? WHERE id_producto = ?", [req.body, id]);
        res.json(resp);
    }
    public async mostrar_Todos_producto(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT * FROM producto ');
        res.json(respuesta);
    }
    public async mostrar_porCategoria_producto(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_categoria } = req.params;
            console.log('Categoría recibida:', nombre_categoria);
            const respuesta = await pool.query('SELECT * FROM producto WHERE categoria = ?', [nombre_categoria]);
    
            if (respuesta.length > 0) {
                res.json(respuesta); // Devolver el array completo de productos
            } else {
                res.status(404).json({ 'mensaje': 'Categoría no encontrada' });
            }
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ 'mensaje': 'Error interno del servidor' });
        }
    }    
    
    public async mostrar_Marca_producto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT marca FROM producto WHERE id_producto = ?', [id]);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Marca no encontrada' });
    }

    public async mostrar_porMarca_producto(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_marca } = req.params;
            console.log('Marca recibida:', nombre_marca);
            const respuesta = await pool.query('SELECT * FROM producto WHERE marca = ?', [nombre_marca]);
    
            if (respuesta.length > 0) {
                res.json(respuesta); // Devolver el array completo de productos
            } else {
                res.status(404).json({ 'mensaje': 'Marca no encontrada' });
            }
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ 'mensaje': 'Error interno del servidor' });
        }
    }
    
    public async mostrar_porCantidad_producto(req: Request, res: Response): Promise<void> {
        try {
            const { cantidad } = req.params;
            console.log('Cantidad de producto recibido:', cantidad);
            const respuesta = await pool.query('SELECT * FROM producto WHERE cantidad = ?', [cantidad]);
    
            if (respuesta.length > 0) {
                res.json(respuesta); // Devolver el array completo de productos
            } else {
                res.status(404).json({ 'mensaje': 'Cantidad no encontrada' });
            }
        } catch (error) {
            console.error('Error al ejecutar la consulta:', error);
            res.status(500).json({ 'mensaje': 'Error interno del servidor' });
        }
    }
    
    //nueva consulta
    public async obtenerNombrePorId(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT nombre FROM producto WHERE id_producto = ?', [id]);

        if (respuesta.length > 0) {
            res.json({ nombre: respuesta[0].nombre });
        } else {
            res.status(404).json({ mensaje: 'Nombre de producto no encontrado' });
        }
    }
    //Nueva consulta para busqueda
    public async buscarProductoPorNombreoCategoria(req: Request, res: Response): Promise<void> {
        const { nombre_categoria } = req.params;
    
        try {
            const respuesta = await pool.query(
                `SELECT * FROM producto
                WHERE nombre LIKE ? OR categoria LIKE ? OR marca LIKE ?;`,
                [`%${nombre_categoria}%`, `%${nombre_categoria}%`, `%${nombre_categoria}%`]
            );
    
            if (respuesta.length > 0) {
                res.json(respuesta); // Se encontraron resultados
            } else {
                res.status(404).json({ mensaje: 'No se encontraron productos que coincidan con la búsqueda.' });
            }
        } catch (error) {
            console.error('Error al buscar producto:', error);
            res.status(404).json({ error: 'Error interno del servidor.' });
        }
    }   
}
export const productoController = new ProductoController();