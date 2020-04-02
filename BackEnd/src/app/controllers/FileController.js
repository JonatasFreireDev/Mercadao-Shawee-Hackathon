import File from '../models/File';

class FileController {
   async store(req, res) {
      const { originalname: name, filename: path } = req.file;

      const file = await File.create({
         name,
         path,
      });

      return res.json(file);
   }

   async delete(req, res) {
      const file = await File.findByPk(req.params.id);

      if (!file) {
         return res.status(401).json({ error: 'File does not exists' });
      }

      await file.destroy();

      return res.json({
         sucess: 'File was deleted',
      });
   }
}

export default new FileController();
