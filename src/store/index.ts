import type { App } from 'vue';
import { createPinia } from 'pinia';
const store = createPinia();
import UserStore from './user'
import Permission from "./permission";
import Setting from "./setting";
export default (app:App) => {
    app.use(store)
}
export const userStore = UserStore(store)
export const permissionStore = Permission(store)
export const settingStore = Setting(store)
