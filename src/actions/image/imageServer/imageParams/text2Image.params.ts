// import { DiffusionSamplerIndexKey } from 'src/types/imageServer-sd.types';
import { ImageParameters, ImageParamsConfig } from 'src/types/imageServer.types';

const negPromptHuman = `((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), out of frame, impossible joint angles, complicated joint positions, extra fingers, missing fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, missing limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (too long fingers), (too short fingers), (((long neck)))`;
const negPromptRealisticVision = `(deformed iris, deformed pupils, semi-realistic, cgi, 3d, render, sketch, cartoon, drawing, anime:1.4), text, close up, cropped, out of frame, worst quality, low quality, jpeg artifacts, ugly, duplicate, morbid, mutilated, extra fingers, mutated hands, poorly drawn hands, poorly drawn face, mutation, deformed, blurry, dehydrated, bad anatomy, bad proportions, extra limbs, cloned face, disfigured, gross proportions, malformed limbs, missing arms, missing legs, extra arms, extra legs, fused fingers, too many fingers, long neck`;

// declare here?
const text2imageDefaultConfig: Partial<ImageParameters> = {
  cfg_scale: 6,
};

export const getImageParams = (
  prompt: string,
  config: ImageParamsConfig,
): ImageParameters => ({
  prompt,
  seed: config.seed,
  steps: config.steps,
  width: 512,
  height: 512,
  n_iter: 1,
  batch_size: 1,
  cfg_scale: config.cfgScale || text2imageDefaultConfig.cfg_scale,
  tiling: config.tiling,
  restore_faces: true,
  // face_restoration_model: 'CodeFormer', // not working
  negative_prompt: config.nonegative ? '' : negPromptRealisticVision,
  // seed: seedArg ? Number.parseInt(seedArg, 10) : 1,
  s_noise: 1,
  denoising_strength: 0.6, // 0.25-0.7,
  // enable_hr
  // hr_scale:
  // subseed
  // subseed_strength
  //
  // sampler_index: 'DDIM',
  sampler_index: config.sampler || 'Euler a',
  // sampler_index: 'LMS Karras',
});
