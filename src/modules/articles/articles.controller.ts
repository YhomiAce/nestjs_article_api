import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ArticleDto } from 'src/dtos/article.dto';
import { Article } from 'src/typeorm/Article';
import { ArticlesService } from './articles.service';

@Controller('posts')
export class ArticlesController {
  constructor(private postsService: ArticlesService) {}

  @Get()
  getPosts(): Promise<Article[]> {
    return this.postsService.getAllPosts();
  }

  @Post()
  createNewPost(@Body() requestData: ArticleDto): Promise<Article> {
    return this.postsService.createPost(requestData);
  }

  @Get(':id')
  getSinglePost(@Param() param): Promise<Article> {
    return this.postsService.getPost(param.id);
  }

  @Patch(':id')
  updatePost(@Param() param, requestData: ArticleDto): Promise<Article> {
    return this.postsService.editPost(requestData, param.id);
  }

  @Delete(':id')
  deletePost(@Param() param): any {
    return this.postsService.deletePost(param.id);
  }
}
