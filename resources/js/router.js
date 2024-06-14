import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/signin",
        component: () => import("./pages/Signin.vue"),
    },
    {
        path: "/signup",
        component: () => import("./pages/Signup.vue"),
    },
    {
        path: "/forgot-password",
        component: () => import("./pages/ForgotPassword.vue"),
    },
    {
        path: "/password.reset/:token",
        component: () => import("./pages/ResetPassword.vue"),
    },
    {
        path: "/subscription",
        component: () => import("./pages/Subscription.vue"),
    },
    {
        path: "/",
        component: () => import("./pages/Home.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/about",
        component: () => import("./pages/About.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/contact",
        component: () => import("./pages/Contact.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/terms",
        component: () => import("./pages/Terms.vue"),
        meta: { requiresAuth: true }
    },
    {
        path: "/settings",
        component: () => import("./pages/Settings.vue"),
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
    if (to.matched.some(record => record.meta.requiresAuth) && !token) {
        next('/signin');
    } else {
        next();
    }
});

export default router;