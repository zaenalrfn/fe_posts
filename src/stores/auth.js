import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    user: "", // Menyimpan data user
    errors: reactive({
      message: {},
    }), // Menyimpan daftar error
  }),
  actions: {
    // get autehnticated user
    async getUser() {
      if (localStorage.getItem("token")) {
        try {
          const res = await fetch("/api/user", {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });

          const data = await res.json();
          if (res.ok) {
            this.user = data.user;
          }
        } catch (error) {
          console.log(error);
          this.user = "";
        }
      }
    },

    // login or register
    async authenticate(apiRoute, formData) {
      try {
        const res = await fetch(`/api/${apiRoute}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });

        const data = await res.json();
        if (!res.ok) {
          // Update errors jika ada error
          this.errors.message = data.message || {};
          console.log(this.errors.message);
          return;
        }

        // Reset errors jika sukses
        this.errors.message = {};
        // ambail data user dan token
        localStorage.setItem("token", data.data.token);
        this.user = data.data.user;
        this.router.push({ name: "home" });
      } catch (error) {
        this.errors.message = { general: ["An unexpected error occurred."] };
      }
    },
  },
});
