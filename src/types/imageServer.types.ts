import { Command } from '@commander-js/extra-typings';
import { DiffusionSamplerIndexKey } from 'src/types/imageServer-sd.types';

export interface ImageParamsConfig {
  seed: number;
  nonegative: boolean;
  steps: number;
  sampler?: DiffusionSamplerIndexKey;
  sdModel: string;
  tiling: boolean;
  cfgScale: number;
}

export interface ImageEditParamsConfig extends ImageParamsConfig {
  imgCfgScale: number;
  initialNoiseMultiplier: number;
  denoisingStrength: number;
}

export interface ImageParameters {
  enable_hr?: boolean; // false;
  denoising_strength?: number; // 0;
  firstphase_width?: number; // 0;
  firstphase_height?: number; // 0;
  hr_scale?: number; // 2;
  hr_upscaler?: string;
  hr_second_pass_steps?: number; // 0;
  hr_resize_x?: number; // 0;
  hr_resize_y?: number; // 0;
  prompt: string;
  styles?: string[];
  seed?: number; // -1;
  subseed?: number; // -1;
  subseed_strength?: number; // 0;
  seed_resize_from_h?: number; // -1;
  seed_resize_from_w?: number; // -1;
  sampler_name?: string;
  batch_size?: number; // 1;
  n_iter?: number; // 1;
  steps: number; // 50;
  cfg_scale?: number; // 7;
  width?: number; // 512;
  height?: number; // 512;
  restore_faces?: boolean; // false;
  // face_restoration_model?: 'CodeFormer'; // 'CodeFormer' | 'GFPGAN' | null // not passed as params

  tiling?: boolean; // false;
  negative_prompt?: string;
  eta?: number; // 0;
  s_churn?: number; // 0;
  s_tmax?: number; // 0;
  s_tmin?: number; // 0;
  s_noise?: number; // 1;
  override_settings?: {};
  override_settings_restore_afterwards?: boolean; // true;
  script_args?: string[];
  sampler_index: DiffusionSamplerIndexKey;
  script_name?: string;
}

export interface ImageEditParameters extends ImageParameters {
  init_images?: string[];
  resize_mode?: number; // 0,
  image_cfg_scale?: number;
  mask?: string;
  mask_blur?: number; // 4
  inpainting_fill?: number; // 0
  inpaint_full_res: boolean; // true
  inpaint_full_res_padding: number; // 0
  inpainting_mask_invert: number; // 0
  initial_noise_multiplier: number; // 0
  include_init_images: boolean; // false
}

//////

export type LocalImageCommand = Command<
  [string],
  {
    seed?: number | undefined;
    info?: true | undefined;
    nonegative?: true | undefined;
  }
>;

//////

export type LocalImageOptions = {
  seed?: number | undefined;
  info?: true | undefined;
  nonegative?: true | undefined;
  variants?: number | undefined;
  quality?: number | undefined;
  sampler?: number | undefined;
  sdModel?: string | undefined;
  tiling?: boolean | undefined;
  cfgScale?: number | undefined;
};

export interface LocalImageEditOptions extends LocalImageOptions {
  imgCfgScale?: number | undefined;
  initNoise?: number | undefined;
  denoising?: number | undefined;
}

export interface ParseImageInfo {
  seed: number;
  sampler_name: string;
}
