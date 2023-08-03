import * as fs from 'fs-extra';
import * as path from 'path';

export class MainHelper {
  static async savePhotoAndGetPath(photo: any, folder: string): Promise<string | null> {
    if (!photo || !photo.buffer) {
      return null;
    }

    try {
      const uniqueFileName = new Date().getTime() + '-' + photo.originalname;
      const uploadPath = path.join(__dirname, '..', 'public', folder, uniqueFileName);

      // Ensure the folder exists; if not, create it
      await fs.ensureDir(path.join(__dirname, '..', 'public', folder));

      await fs.writeFile(uploadPath, photo.buffer);
      return path.join('/', folder, uniqueFileName).replace(/\\/g, '/');
    } catch (error) {
      console.error('Error saving photo:', error);
      return null;
    }
  }

  static async removeFile(filePath: string): Promise<void> {
    try {
      const uploadPath = path.join(__dirname, '..', 'public', filePath);
      await fs.unlink(uploadPath);
      console.log('File removed successfully:', filePath);
    } catch (error) {
      console.error('Error removing file:', error);
    }
  }
}
