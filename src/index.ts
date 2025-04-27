// src/index.ts
import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger';

// DataSources
import { centro1DataSource } from './data-source/centro1DataSource';
import { centro2DataSource } from './data-source/centro2DataSource';
import consultaMedicaRouter from './routes/consultaMedicaRoute';
import pacientesRouters from './routes/pacientesRoutes';
import medicoRoutes from './routes/medicoRoutes';
import especialidadRoutes from './routes/especialidadRoutes';

declare global {
    namespace Express {
        interface Request {
            repo?: any;
        }
    }
}

dotenv.config();

async function startServer() {
  try {

    await centro1DataSource.initialize();
    console.log('Conexión con base de datos centro1 establecida.');

    await centro2DataSource.initialize();
    console.log('Conexión con base de datos centro2 establecida.');

    const app = express();
    app.use(cors());
    app.use(express.json());

    // Rutas
    app.use('/api/paciente', pacientesRouters);
    app.use('/api/consulta-medica', consultaMedicaRouter);
    app.use('/api/medico', medicoRoutes);
    app.use('/api/especialidad', especialidadRoutes);

    // Levantamos el servidor
    const PORT = process.env.PORT || 3002;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en el puerto ${PORT}`);
    });
    setupSwagger(app);

  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }

}

startServer();
