
import type { Style } from './types';

export const STYLES: Style[] = [
  {
    id: 'professional',
    name: 'Professional',
    prompt: 'Create a professional, corporate headshot of the person in the image. The background should be clean and slightly blurred. The lighting should be soft and flattering. The person should look confident and approachable. The style should be photorealistic.',
    imageUrl: 'https://picsum.photos/seed/professional/200'
  },
  {
    id: 'cartoon',
    name: 'Cartoon',
    prompt: 'Transform the person in the image into a 3D cartoon character, Pixar style. Exaggerate facial features slightly for a charming look, with big expressive eyes. The final image should be vibrant and full of personality.',
    imageUrl: 'https://picsum.photos/seed/cartoon/200'
  },
  {
    id: 'gamer',
    name: 'Gamer',
    prompt: 'Create a cool gamer avatar of the person in the image. The background should be dark with neon lights and futuristic elements. The person should have a determined or focused expression. Add subtle glowing effects to their eyes or clothing.',
    imageUrl: 'https://picsum.photos/seed/gamer/200'
  },
  {
    id: 'anime',
    name: 'Anime',
    prompt: 'Redraw the person in the image as an anime character. The style should be modern Shonen anime, with sharp lines, dynamic shading, and vibrant hair color. Keep the facial resemblance.',
    imageUrl: 'https://picsum.photos/seed/anime/200'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    prompt: 'Create a minimalist, artistic line-art portrait of the person in the image. Use a single, continuous line if possible. The background should be a solid, soft pastel color. The overall feeling should be elegant and simple.',
    imageUrl: 'https://picsum.photos/seed/minimalist/200'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    prompt: 'Reimagine the person in the image in a cyberpunk world. Add glowing cybernetic implants, neon-lit rainy city streets in the background, and a futuristic outfit. The mood should be gritty and high-tech.',
    imageUrl: 'https://picsum.photos/seed/cyberpunk/200'
  },
];
