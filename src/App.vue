<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink :to="{ name: 'home' }" class="nav-link">Home</RouterLink>
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

