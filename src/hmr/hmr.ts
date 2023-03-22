import dotenv from 'dotenv';
import { timelogFormat } from './lib/log.lib';

import HotModuleReloadSetup from './hmrSetup';

// https://dev.to/omar4ur/vite-hot-module-replacement-a-complete-example-pkg
// https://github.com/OmarShehata/vite-hot-reload-example

// TODO: implement logger service

// (async () => {
//   console.log('Botlike is starting...');

//   /** dynamic import purpose:
//    *
//    * => validate environment vars AFTER dotenv.config() has loaded the ".env" file content,
//    *    otherwise if there is no ".env" file, vars must be provided through the hosting provider.
//    *
//    * => modify "./src/env.ts" env ZOD schema to your needs,
//    *    use the typed export helper (the default export)
//    *
//    * => you can use the absolute import: "import env from 'env'" for this purpose
//    *    also absolute imports via "src/..." are enabled by default
//    **/

//   console.info('.env vars will be loaded if file is present');
//   dotenv.config();

//   console.info(`${timelogFormat(new Date())} - Starting bootstrap...`);

//   await (await import('./app/bootstrap')).default();
// })();

async function init() {
  // Setup HMR
  const hmr = new HotModuleReloadSetup();
  // Load a module that will be updated dynamically
  hmr.import(await import('./hmrTest'));
  // Now we access it through hmr.instances['Draw']
  // which will point to the new module when it gets swapped
  // function draw() {
  //   hmr.instances['main'].draw(canvas);
  //   // requestAnimationFrame(draw);
  // }

  function run() {
    hmr.instances['Main'].execute(p);
    requestAnimationFrame(run);
  }

  // Setup the canvas & render loop
  // const canvas = document.createElement('canvas');
  // document.body.appendChild(canvas);
  // draw();

  const p = document.createElement('p');
  document.body.appendChild(p);
  p.innerHTML = 'Start';
  run();

  // function resizeCanvas() {
  //   canvas.width = window.innerWidth;
  //   canvas.height = window.innerHeight;
  // }
  // resizeCanvas();
  // window.addEventListener('resize', resizeCanvas);
}

init();

// async function init() {
//   // Setup HMR
//   const hmr = new HotModuleReloadSetup();
//   // Load a module that will be updated dynamically
//   hmr.import(await import('./draw'));
//   // Now we access it through hmr.instances['Draw']
//   // which will point to the new module when it gets swapped
//   function draw() {
//     hmr.instances['Draw'].draw(canvas);
//     requestAnimationFrame(draw);
//   }

//   // Setup the canvas & render loop
//   const canvas = document.createElement('canvas');
//   document.body.appendChild(canvas);
//   draw();

//   function resizeCanvas() {
//     canvas.width = window.innerWidth;
//     canvas.height = window.innerHeight;
//   }
//   resizeCanvas();
//   window.addEventListener('resize', resizeCanvas);
// }

// init();
