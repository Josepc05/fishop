import { Request, Response } from 'express';
import pool from '../database';

class AdministradorController {
    public async insertar_administrador(req: Request, res: Response): Promise<void> {
        const resp = await pool.query("INSERT INTO administrador set ?", [req.body]);
        res.json(resp);
    }
    public async eliminar_administrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query(`DELETE FROM administrador WHERE id_admin = ${id}`);
        res.json(resp);
    }
    public async mostrar_administrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const respuesta = await pool.query('SELECT * FROM administrador WHERE id_admin = ?', [id]);
        if (respuesta.length > 0) {
            res.json(respuesta[0]);
            return;
        }
        res.status(404).json({ 'mensaje': 'administrador no encontrado' });
    }
    public async modificar_administrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query("UPDATE administrador set ? WHERE id_admin = ?", [req.body, id]);
        res.json(resp);
    }
    public async mostrar_Todos_administrador(req: Request, res: Response): Promise<void> {
        const respuesta = await pool.query('SELECT * FROM administrador ');
        res.json(respuesta);
    }
}
export const administradorController = new AdministradorController();