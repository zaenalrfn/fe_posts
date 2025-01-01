<script setup>
import { RouterLink, RouterView } from "vue-router";
import { useAuthStore } from "@/stores/auth";
import { onMounted } from "vue";

const authStore = useAuthStore();
onMounted(() => {
  authStore.getUser();
});
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>

        <p v-if="authStore.user" class="text-white">
          {{ authStore.user.name }}
        </p>
        <div>
          <RouterLink :to="{ name: 'register' }" class="nav-link"
            >Register</RouterLink
          >
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

