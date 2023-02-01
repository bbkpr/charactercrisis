import { Image } from './image';

export type ImageType = 'main' | 'alt';

export interface CharacterImage {
  character_id: number;
  image_id: number;
  image_type: ImageType;
  image: Image;
}
