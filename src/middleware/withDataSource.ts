import { Request, Response, NextFunction } from "express";
import { centro1DataSource } from "../data-source/centro1DataSource";
import { centro2DataSource } from "../data-source/centro2DataSource";
import { RequestHandler } from "express";

// Extender la interfaz Request para incluir repo
declare module "express-serve-static-core" {
    interface Request {
        repo?: any; 
    }
}

export function withDataSource(entity: any): RequestHandler {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const source = req.query.source || req.body.centroMedicoId;

            let dataSource;
            if (source === "2" ) {
                dataSource = centro1DataSource;
            } else if (source === "3" ) {
                dataSource = centro2DataSource;
            } else {
                res.status(400).json({ error: "Fuente de datos no válida o no especificada" });
                return;
            }

            if (!dataSource.isInitialized) {
                await dataSource.initialize();
            }

            req.repo = dataSource.getRepository(entity);
            next();
        } catch (err) {
            console.error("Error en withDataSource:", err);
            res.status(500).json({ error: "Error al configurar la fuente de datos" });
        }
    };
}