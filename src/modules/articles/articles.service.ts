import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ArticleDto } from 'src/dtos/article.dto';
import { Article } from 'src/typeorm/Article';
import { Repository } from 'typeorm';

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private postsRepository: Repository<Article>,
  ) {}

  async getAllPosts(): Promise<Article[]> {
    return await this.postsRepository.find({
      relations: ['user'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getPost = async (id: string): Promise<Article> => {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new Error('Invalid Post');
    }
    return post;
  };

  createPost = async (postData: ArticleDto): Promise<Article> => {
    const data = { ...postData, userId: postData.userId };
    const newPost = this.postsRepository.create({ ...data });
    await this.postsRepository.save(newPost);
    return newPost;
  };

  editPost = async (postData: ArticleDto, id: string): Promise<Article> => {
    const post = await this.getPost(id);
    post.title = postData.title;
    post.body = postData.body;
    post.isPublished = postData.isPublished;
    const updatedPost = await this.postsRepository.save(post);
    return updatedPost;
  };

  deletePost = async (id: string): Promise<any> => {
    const post = await this.getPost(id);
    return await this.postsRepository.remove(post);
  };
}
