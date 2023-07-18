import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { Specialization } from './entities/specialization.entity'
import { readFileSync, writeFileSync } from 'fs';
import { CreateSpecializationDto } from './dto/create-specialization.dto';
import { UpdateSpecializationDto } from './dto/update-specialization.dto';

@Injectable()
export class SpecializationService {
  private filePath = __dirname + '/specialization/specializations.json';

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
    const characters = '123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
