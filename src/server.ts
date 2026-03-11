import express from 'express';
import { createServer as createViteServer } from 'vite';
import fs from 'fs/promises';
import path from 'path';

const app = express();
app.use(express.json());

const DATA_FILE = path.join(process.cwd(), 'contacts.json');

app.post('/api/contact', async (req, res) => {
  try {
    const { nombre, correo, consultoria } = req.body;

    if (!nombre || !correo || !consultoria) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newContact = {
      id: Date.now().toString(),
      fecha: new Date().toISOString(),
      nombre,
      correo,
      consultoria
    };

    let contacts = [];
    try {
      // Intentar leer el archivo existente
      const fileContent = await fs.readFile(DATA_FILE, 'utf-8');
      contacts = JSON.parse(fileContent);
    } catch (error: any) {
      // Si el archivo no existe, no hay problema, empezamos con un array vacío
      if (error.code !== 'ENOENT') {
        throw error;
      }
    }

    // Agregar el nuevo contacto
    contacts.push(newContact);

    // Guardar el archivo actualizado
    await fs.writeFile(DATA_FILE, JSON.stringify(contacts, null, 2), 'utf-8');

    console.log('Contacto guardado localmente:', newContact);
    res.json({ success: true });
  } catch (error) {
    console.error('Error al guardar el contacto:', error);
    res.status(500).json({ error: 'Error al procesar la solicitud' });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
