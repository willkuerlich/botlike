type Module = any;

class HotModuleReloadSetup {
  modules: Record<string, any> = {};
  instances: Record<string, any> = {};
  constructor() {
    this.modules = {};
    this.instances = {};

    document.body.addEventListener('hot-module-reload', (event: Module) => {
      const { newModule } = event.detail;
      const m = newModule as Module;
      this.swapModule(m);
    });
  }

  swapModule(newModule: Module) {
    const name = newModule.default.name;
    console.log('newModule.default.name: ', newModule.default.name);
    const oldModule = this.modules[name];
    const oldInstance = this.instances[name];
    if (!oldModule) return;

    const newInstance = new newModule.default();
    newInstance.hotReload(oldInstance);

    this.modules[name] = newModule;
    this.instances[name] = newInstance;
  }

  import(newModule: Module) {
    const newInstance = new newModule.default();

    const name = newModule.default.name;
    this.modules[name] = newModule;
    this.instances[name] = newInstance;
  }
}

export default HotModuleReloadSetup;

export function HMREventHandler(newModule: Module) {
  const event = new CustomEvent('hot-module-reload', { detail: { newModule } });
  document.body.dispatchEvent(event);
}
