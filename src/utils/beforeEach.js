import router from '../router';
import Cookies from 'js-cookie';

const whiteList = ['/login', '/403', '/404'];
router.beforeEach((to, from, next) => {
    // 在免登录白名单，直接进入
    if (whiteList.some((item) => {
        return item === to.path;
    })) {
        next();
    } else if (Cookies.get('session') === undefined) {
        next({path: '/login', replace: true});
    } else {
        next();
    }
});

