import { promises as fs } from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'items.json');

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      const data = await fs.readFile(dataFilePath, 'utf-8');
      res.status(200).json(JSON.parse(data));
      break;

    case 'POST':
      const newItem = req.body;
      const currentData = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
      currentData.push(newItem);
      await fs.writeFile(dataFilePath, JSON.stringify(currentData, null, 2));
      res.status(201).json(newItem);
      break;

    case 'DELETE':
      const { id } = req.query;
      let updatedData = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
      updatedData = updatedData.filter(item => item.id !== parseInt(id));
      await fs.writeFile(dataFilePath, JSON.stringify(updatedData, null, 2));
      res.status(204).end();
      break;

    case 'PUT':
      const { id: updateId } = req.query;
      const updatedItem = req.body;
      let dataToUpdate = JSON.parse(await fs.readFile(dataFilePath, 'utf-8'));
      dataToUpdate = dataToUpdate.map(item => (item.id === parseInt(updateId) ? updatedItem : item));
      await fs.writeFile(dataFilePath, JSON.stringify(dataToUpdate, null, 2));
      res.status(200).json(updatedItem);
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
