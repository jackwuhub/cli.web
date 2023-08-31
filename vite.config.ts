import {UserConfig, ConfigEnv, loadEnv, ProxyOptions, splitVendorChunkPlugin} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsxPlugin from "@vitejs/plugin-vue-jsx";
import { theme } from 'ant-design-vue';

//@ts-ignore
import path from 'path'

interface ProxyItem extends ProxyOptions {
    prefix: string,
    target: string,
}

/**
 *  创建代理列表
 * @param proxyList { ProxyItem } 代理列表数组
 */
const makeProxy = (proxyList: Array<ProxyItem>) => {
    return proxyList.reduce((target, current: ProxyItem) => ({
        [current.prefix]: {
            ...current,
            changeOrigin: current?.changeOrigin ?? true,
            rewrite: (path) => {
                return path.replace(new RegExp(`^${current.prefix}`), '')
            }
        }
    }), {})
}
const { defaultAlgorithm, defaultSeed } = theme;

const mapToken = defaultAlgorithm(defaultSeed);
export default ({command, mode}: ConfigEnv): UserConfig => {
    const root = process.cwd();
    const env = loadEnv(mode, root)
    return {
        root,
        server: {
            host: true,
            port: 8081,
            proxy: makeProxy([
                { prefix:'/api', target:'' }
            ])
        },
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src'),
            },
        },
        build: {
            target: 'es2015',
            outDir: 'dist',
            manifest: false,
            cssCodeSplit: true,
            assetsInlineLimit: 4096,
            chunkSizeWarningLimit: 2000
        },
        plugins: [
            vue(),
            splitVendorChunkPlugin(),
            vueJsxPlugin(),
        ],
        clearScreen: true,
        css:{
            preprocessorOptions:{
                less: {
                    modifyVars: mapToken,
                }
            }
        }
    }
}
