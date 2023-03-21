import axios from 'axios';
import { ImageParameters } from 'src/types/imageServer.types';

export interface ImageAPIResponse {
  images: string[];
  parameters: ImageParameters;
  info: string /**
    '{"prompt": "affe", "all_prompts": ["affe"], "negative_prompt": "", "all_negative_prompts": [""], "seed": 769847161, "all_seeds": [769847161], "subseed": 3165843693, "all_subseeds": [3165843693], "subseed_strength": 0, "width": 512, "height": 512, "sampler_name": "DDIM", "cfg_scale": 7.0, 
      "steps": 50, "batch_size": 1, "restore_faces": false, "face_restoration_model": null, "sd_model_hash": "cc6cb27103", "seed_resize_from_w": -1, "seed_resize_from_h": -1, "denoising_strength": 0, "extra_generation_params": {}, "index_of_first_image": 0, "infotexts": ["affe\\nSteps: 50, Sampler: DDIM, CFG scale: 7.0, Seed: 769847161, Size: 512x512, Model hash: cc6cb27103, Model: v1-5-pruned-emaonly, Seed resize from: -1x-1, Denoising strength: 0"], "styles": [], "job_timestamp": "20230207104621", "clip_skip": 1, "is_using_inpainting_conditioning": false}'
  */;
}

export const fetchTxt2Img = async (apiServer: string, params: ImageParameters) => {
  return axios.post<ImageAPIResponse>(`${apiServer}/sdapi/v1/txt2img`, params);
};
