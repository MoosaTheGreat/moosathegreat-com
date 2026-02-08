import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UpdateLogService } from './update-log.service';

@Injectable()
export class CmsService {
  constructor(
    private prisma: PrismaService,
    private updateLog: UpdateLogService,
  ) {}

  async create(data: any) {
    const page = await this.prisma.page.create({ data });
    await this.updateLog.log('PAGE', 'New Page Created', `Page /${page.slug} was created.`);
    return page;
  }

  async findAll() {
    return this.prisma.page.findMany();
  }

  async findOne(slug: string) {
    const page = await this.prisma.page.findUnique({ where: { slug } });
    if (!page) throw new NotFoundException(`Page ${slug} not found`);
    return page;
  }

  async update(id: string, data: any) {
    const page = await this.prisma.page.update({
      where: { id },
      data,
    });
    await this.updateLog.log('PAGE', 'Page Updated', `Page /${page.slug} was updated.`);
    return page;
  }

  async remove(id: string) {
    const page = await this.prisma.page.delete({ where: { id } });
    if (page) {
      await this.updateLog.log('PAGE', 'Page Deleted', `Page /${page.slug} was deleted.`);
    }
    return page;
  }
}
