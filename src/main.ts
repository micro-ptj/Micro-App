import { createSSRApp } from "vue";
import App from "./App.vue";
// 引入 uView UI
import uView from '@/uni_modules/vk-uview-ui';
import {setupStore} from './store';
import DictTag from "@/pages/components/DictTag"
import Transaction from "@/pages/components/Transaction"

export function createApp() {
  const app = createSSRApp(App);
  setupStore(app);
  // 使用 uView UI
  app.use(uView)
  app.component('DictTag', DictTag)
  app.component('Transaction', Transaction)
  return {
    app,
  };
}
