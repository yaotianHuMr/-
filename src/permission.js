// 路由守卫
import router from "@/router";

router.beforeEach((to, from, next) => {
    if (to.path == "/login") {
        next();
    } else {
        let token = sessionStorage.getItem("token");
        if (!token) {
            next("/login");
        } else {
            next();
        }
    }
    // next()
});
