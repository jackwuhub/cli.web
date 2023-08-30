import store from './store/index'
import {Store} from "./store/types";

export interface AppInterface {
  store: Store
}

App<AppInterface>({
  store,
  onLaunch() {
    store.userStore.doAction("setUserInfo")
  }
})
