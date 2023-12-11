import { Request, Response } from 'express';
import pool from '../database';

class UsuarioController {
    public async insertar_usuario(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO usuario set ?", [req.body]);
        res.json(resp);
    }
    public async eliminar_usuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM producto WHERE id_usuario = ${id}`);
        res.json(resp);
    }
    public async mostrar_usuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [id]);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'Usuario no encontrado' });
    }
    public async modificar_usuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE usuario set ? WHERE id_usuario = ?", [req.body, id]);
        res.json(resp);
    }
    public async mostrar_Todos_usuario(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT * FROM usuario ');
        res.json(respuesta);
    }
}
export const usuarioController = new UsuarioController();