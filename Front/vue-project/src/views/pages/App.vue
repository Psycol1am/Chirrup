<template>
  <div>
    <Navbar :authenticated="authenticated" />
    <router-view />
  </div>

 
</template>

<script>
import Navbar from "../components/Navbar.vue";



  export default{
    data(){
      return {
        authenticated: false,
      }
    },
    components: {
      Navbar
    },
    created() {
      const token = localStorage.getItem("session_token");
      if(token){
        this.authenticated = true;
      }
    }
  }
</script>


<style scoped>
</style>