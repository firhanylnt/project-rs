import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { HospitalModuleEntity } from './entities/hospital-module.entity';
import { CreateHospitalModuleDto } from './dto/create-hospital-module.dto';

@Injectable()
export class HospitalModuleService {
  constructor(
    @InjectRepository(HospitalModuleEntity)
    private readonly repo: Repository<HospitalModuleEntity>,
    private readonly connection: Connection,
  ) {}

  async store(data: CreateHospitalModuleDto) {
    try {
      let modulesId = data.modules_id.join(',')
      let whereQuery = data.modules_id.length > 0 ? `and module_id not in(${modulesId})` : ''
      await this.connection.query(`
        delete from hospitals_modules
        where hospital_id = ${data.hospital_id}
        ${whereQuery}
      `)
  
      for (let i = 0; i < data.modules_id.length; i++) {
        const hospitalModule = await this.repo.findOne({ where: { 
          hospital_id: data.hospital_id,
          module_id: data.modules_id[i] 
        }});
  
        if (hospitalModule === undefined) {
          const src = new HospitalModuleEntity();
          src.hospital_id = data.hospital_id;
          src.module_id = data.modules_id[i];
          await this.repo.save(src);
        }
      }        
    } catch (error) {
      return error
    }

    return 'Success'
  }
}
