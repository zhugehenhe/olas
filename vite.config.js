// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";
import { loadEnv } from "vite"
const pathSrc = resolve("./src");

export default defineConfig(({ command, mode }) => {
    const root = process.cwd()
  const env = loadEnv(mode, root)
  return {
    preview: {
      port: 8081,
      open: true,
    },
    server: {
      https: false, // 是否开启 https
      port: 8080, // 端口号
      host: "0.0.0.0", // 监听所有地址
      open: true, // 服务启动时是否自动打开浏览器
      cors: true, // 允许跨域
      proxy: {
        '/api': {
          target: 'https://localhost:7160/api',
          changeOrigin: true
        },
        '/upload': {
          target: 'https://localhost:7160',
          secure: false,
          changeOrigin: true
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
        },
      },
    },

    plugins: [
      vue(),
      // 自动导入
      AutoImport({
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue", "vue-router", "@vueuse/core"],
        resolvers: [
          // 自动导入 Element Plus 相关函数
          ElementPlusResolver(),
        ],
        eslintrc: {
          enabled: true, // 解决 Eslint 提示 no-undef 错误
        },
      }),
      Components({
        resolvers: [
          // 自动导入 Element Plus 组件
          ElementPlusResolver()
        ],
      }),
    ],
    resolve: {
      // 导入文件时省略文件扩展名
      extensions: [".js", ".ts", ".vue", ".json", "es"],
      // 配置路径别名
      alias: { "@": pathSrc },
    },
    // ...
  }
});

