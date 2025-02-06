import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";

import router from "./router/index";
import pinia from "./store";

const app = createApp(App);

app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
	app.component(key, component);
}
app.component("QuillEditor", QuillEditor);
app.mount("#app");
