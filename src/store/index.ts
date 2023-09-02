import type { App } from 'vue';
import { createPinia } from 'pinia';
import UserStore from './user'
import SettingStore from './setting'
const store = createPinia();
import piniaPersist from 'pinia-plugin-persist'
export default (app:App) => {
    store.use(piniaPersist)
    app.use(store)
}
export const userStore = UserStore(store)
export const settingStore = SettingStore(store)
