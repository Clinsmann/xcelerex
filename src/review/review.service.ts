import { v4 as uuidv4 } from 'uuid';
import { Injectable, BadRequestException } from '@nestjs/common';

import { Repository } from 'typeorm';
import { ReviewDTO } from './review.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';

@Injectable()
export class ReviewService {

  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
  ) { }

  async addReview(reviewDTO: ReviewDTO) {
    const id = uuidv4();
    reviewDTO.id = id;
    const { userId, wpId } = reviewDTO;
    const existingReview = await this.reviewRepository.findOne({ userId, wpId });
    if (existingReview) throw new BadRequestException('Review already added');
    const newReview = this.reviewRepository.create({ ...reviewDTO });
    await this.reviewRepository.save(newReview);
    return await this.getReview(wpId, userId);
  }

  async getReview(wpId: number, userId: string) {
    if (!wpId) throw new BadRequestException('ID not valid.');
    const [reviews, reviewsCount] = await this.reviewRepository.findAndCount({ wpId });
    const review = userId ? await this.reviewRepository.findOne({ userId, wpId }) : {};
    return { review: { ...review, averageRating: this.getAverage(reviews, reviewsCount) } };
  }

  getAverage(reviews: any[], reviewsCount: number): string {
    const sum = reviews.reduce((total, review) => total + parseInt(review.rating), 0);
    return reviewsCount > 0 ? (sum / reviewsCount).toFixed(2) : null;
  }
}
