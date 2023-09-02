import {NavigationGuardNext, RouteLocationNormalized, Router} from "vue-router";
export default (router:Router) => {
    router.beforeEach(  async (to:RouteLocationNormalized,from:RouteLocationNormalized,next:NavigationGuardNext) => {

        next()
    })
}

