import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleModule } from './entities/role-module.entity';
import { CreateRoleModuleDto } from './dto/create-role-module.dto';
import { UpdateRoleModuleDto } from './dto/update-role-module.dto';

@Injectable()
export class RoleModuleService {
  constructor(
    @InjectRepository(RoleModule)
    private readonly repo: Repository<RoleModule>,
  ) {}

  async getAll() {
    return this.repo.find();
  }

  async store(data: CreateRoleModuleDto) {
    try {
      for (let i = 0; i < data.modules.length; i++) {
        let src = await this.repo.findOne({
          where: {
            module_id: data.modules[i]['module_id'],
            hospital_id: data.hospital_id,
            role: data.role,
          },
        });
  
        let isNewData = false
        if (src === undefined) {
          src = new RoleModule()
          isNewData = true
        }
  
        src.module_id = data.modules[i]['module_id']
        src.hospital_id = data.hospital_id
        src.role = data.role
        src.is_visible = data.modules[i]['is_visible']
        src.is_create = data.modules[i]['is_create']
        src.is_read = data.modules[i]['is_read']
        src.is_edit = data.modules[i]['is_edit']
        src.is_delete = data.modules[i]['is_delete']
  
        if (isNewData) {
          await this.repo.save(src);
        } else {
          await this.repo.update(src.id, src);
        }
      }
    } catch (error) {
      return error
    }

    return 'Success'
  }

  async getById(id) {
    const src = await this.repo.findOne({
      where: { id: id },
    });

    return src;
  }

  async update(id, data: UpdateRoleModuleDto) {
    const src = {
        // module_id: data.module_id,
        // hospital_id: data.hospital_id,
        // role: data.role,
        // is_visible: data.is_visible,
        // is_create: data.is_create,
        // is_read: data.is_read,
        // is_edit: data.is_edit,
        // is_delete: data.is_delete,
        updated_at: new Date(),
    };

    await this.repo.update(id, src);

    return await this.repo.findOne({
      where: { id: id },
    });
  }

  async remove(id) {
    const result = await this.repo.delete({ id: id });
    if (result.affected > 0) return { message: 'Role module deleted!' };
    else return { message: 'Failed to delete Role module!' };
  }
}
