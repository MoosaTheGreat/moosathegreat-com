import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CmsService } from './cms.service';

@Controller('cms')
export class CmsController {
  constructor(private readonly cmsService: CmsService) {}

  @Post()
  create(@Body() createPageDto: any) {
    return this.cmsService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.cmsService.findAll();
  }

  @Get(':slug')
  findOne(@Param('slug') slug: string) {
    return this.cmsService.findOne(slug);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: any) {
    return this.cmsService.update(id, updatePageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cmsService.remove(id);
  }
}