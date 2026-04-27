import { supabase } from './supabase';

export const uploadMedia = async (file: File, path: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
  const filePath = `${path}/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('media')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(filePath);

  return publicUrl;
};

export const deleteMedia = async (url: string) => {
  // Extract path from public URL
  // Example: https://xxx.supabase.co/storage/v1/object/public/media/gallery/abc.jpg
  const path = url.split('/media/')[1];
  if (!path) return;

  const { error } = await supabase.storage
    .from('media')
    .remove([path]);

  if (error) {
    console.error('Error deleting media:', error);
  }
};
