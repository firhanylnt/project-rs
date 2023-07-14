import { Injectable } from '@nestjs/common';
import { CreatePharmacistDto } from './dto/create-pharmacist.dto';
import { UpdatePharmacistDto } from './dto/update-pharmacist.dto';
import { readFileSync, writeFileSync } from 'fs';

@Injectable()
export class PharmacistsService {
  private filePath = __dirname + '/pharmacists/pharmacists.json';

  private getData(): any[] {
    const jsonData = readFileSync(this.filePath, 'utf-8');
    return JSON.parse(jsonData);
  }

  private saveData(data: any[]): void {
    writeFileSync(this.filePath, JSON.stringify(data, null, 2), 'utf-8');
  }

  create(data): void {
    const existingData = this.getData();
    data.id = this.generate_code(6);
    existingData.push(data);
    this.saveData(existingData);
  }

  findAll() {
    const jsonData = this.getData();
    return jsonData;
  }

  findOne(id: string) {
    const jsonData = this.getData();
    const item = jsonData.find((item) => item.id === id);
    return item ? item : 'Item not found';
  }

  update(id: string, updatedData) {
    const jsonData = this.getData();
    const index = jsonData.findIndex((item) => item.id === id);
    if (index === -1) {
      return 'Item not found';
    }
    jsonData[index] = { ...jsonData[index], ...updatedData };
    this.saveData(jsonData);
    return 'Data updated successfully';
  }

  remove(id: string) {
    const jsonData = this.getData();
    const index = jsonData.findIndex((item) => item.id === id);
    if (index === -1) {
      return 'Item not found';
    }
    jsonData.splice(index, 1);
    this.saveData(jsonData);
    return 'Data deleted successfully';
  }

  generate_code(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
