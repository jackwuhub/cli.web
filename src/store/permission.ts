import {defineStore} from "pinia";
import {PermissionState} from "./@types/permission";
export default defineStore({
    id:'permission',
    state:():PermissionState => ({
        roles: [],
        routes: [],
        permissions: []
    }),
    getters:{

    },
    actions:{

    }
})