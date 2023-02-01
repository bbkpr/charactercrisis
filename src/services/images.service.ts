import { Image } from '../models/image';
import { EntitiesData } from '../state/dtos';
import { imagesLoaded } from '../state/imagesSlice';
import { AppDispatch } from '../state/store';
import { supabase } from './supabase.service';

export const loadImage = async (dispatch: AppDispatch, image_id: number) => {
  return dispatch(imagesLoaded((await supabase.from('image').select('*').eq('id', image_id)) as EntitiesData<Image>));
};

export const loadImages = async (dispatch: AppDispatch) => {
  return dispatch(imagesLoaded((await supabase.from('image').select('*').order('id')) as EntitiesData<Image>));
};

export const getPublicImageUrl = (fileName: string) => {
  const { data } = supabase.storage.from('character-crisis').getPublicUrl(fileName);
  return data.publicUrl;
};
