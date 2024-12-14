// vite.config.js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { resolve } from "path";

const pathSrc = resolve("olas.web", "src");

export default defineConfig({
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
    proxy: {}, // 自定义代理规则
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
        ElementPlusResolver(),
      ],
      // 指定自定义组件位置(默认:src/components)
      dirs: ["src/**/components"],
      // 配置文件位置 (false:关闭自动生成)
      dts: resolve("olas.web", "src/types/components.d.ts"),
    }),
  ],
  resolve: {
    // 导入文件时省略文件扩展名
    extensions: [".js", ".ts", ".vue", ".json", "es"],
    // 配置路径别名
    alias: { "@": pathSrc },
  },
  // ...
});

