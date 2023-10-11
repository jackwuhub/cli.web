import {UserConfig, ConfigEnv, loadEnv, splitVendorChunkPlugin} from 'vite'
import monkey  from 'vite-plugin-monkey';
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
//@ts-ignore
import path from 'path'

export default ({command, mode}: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root)
    return {
        root,
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
            },
        },
        build: {
            target: 'es2015',
            outDir: "dist",
            cssCodeSplit: true,
            minify: false,
            lib: {
                entry: "src/main.tsx",
                formats: ["iife"],
            },
        },
        plugins: [
            vue(),
            splitVendorChunkPlugin(),
            vueJsxPlugin(),
            monkey({
                entry: 'src/main.tsx',
                userscript: {
                    icon: 'https://vitejs.dev/logo.svg',
                    namespace: 'npm/vite-plugin-monkey',
                    match: ['https://ks.feigua.cn/Content/dist/*'],
                    grant: null
                }
            })
        ],
        clearScreen: true,
    }
}
