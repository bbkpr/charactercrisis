import { Image } from './image';
export type ImageType = 'main' | 'alt';

export interface CharacterImage {
  character_id: number;
  image: Image;
  image_id: number;
  image_type: ImageType;
}
