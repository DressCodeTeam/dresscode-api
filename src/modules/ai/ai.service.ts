import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

export interface ImageAnalysisResult {
  subcategory_id: number | null;
  description: string;
}

export interface OutfitResult {
  name: string;
  garments: number[];
}

@Injectable()
export class AiService {
  private readonly baseUrl: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.baseUrl = this.configService.get<string>('ai.baseUrl')!;
  }

  async generateOutfits(payload: {
    garments: any[];
    nb_outfits: number;
    style: string;
    sex: string;
    weather: string;
  }): Promise<OutfitResult[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/generate`, payload),
      );
      return response.data as OutfitResult[];
    } catch (error) {
      console.error('Failed to generate outfits:', error);
      throw new Error('AI outfit generation failed');
    }
  }

  async analyzeImage(payload: {
    image_url: string;
    subcategories: { id: number; name: string }[];
  }): Promise<ImageAnalysisResult> {
    try {
      const response = await firstValueFrom(
        this.httpService.post(`${this.baseUrl}/analyze`, payload),
      );
      return response.data as ImageAnalysisResult;
    } catch (error) {
      console.error('Failed to analyze image:', error);
      throw new Error('Image analysis failed');
    }
  }
}
