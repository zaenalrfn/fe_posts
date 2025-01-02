import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/Auth/RegisterView.vue";
import LoginView from "../views/Auth/LoginView.vue";
import CreatePostsView from "../views/posts/CreatePostsView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/auth/register",
      name: "register",
      component: RegisterView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/auth/login",
      name: "login",
      component: LoginView,
      meta: {
        guest: true,
      },
    },
    {
      path: "/posts/create",
      name: "create-post",
      component: CreatePostsView,
      meta: {
        auth: true,
      },
    },
  ],
});

router.beforeEach(async (to, from) => {
  const authStore = useAuthStore();
  await authStore.getUser();

  if (authStore.user && to.meta.guest) {
    return { name: "home" };
  }

  if (!authStore.user && to.meta.auth) {
    return { name: "login" };
  }
});

export default router;
