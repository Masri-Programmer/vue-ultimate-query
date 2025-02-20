const modules = {};

const importAll = async () => {
    const context = import.meta.glob('./*.js');

    for (const path in context) {
        if (path === './index.js') continue;
        const moduleName = path.replace(/(\.\/|\.js)/g, '');
        const module = await context[path]();
        modules[moduleName] = module.default;
    }
};

await importAll();
// https://developers.deepl.com/docs

export default modules;