import { supabase } from './supabase.service';

export const getPublicImageUrl = (fileName: string) => {
  const { data } = supabase.storage.from('character-crisis').getPublicUrl(fileName);
  return data.publicUrl;
};
