<template>
    <div>
        <h1>Search Results</h1>
        <div>
            <p>User ID: {{ user_id }}</p>
            <p>First Name: {{ first_name }}</p>
            <p>Last Name: {{ last_name }}</p>
            <p>Username: {{ username }}</p>
        </div>
        <div v-if="error">{{ error }}</div>
    </div>
</template>
  
<script>
import { socialService } from '../../services/social.service';

export default {
    data() {
        return {
           error:"",
           loading: true,
           user_id: null,
           first_name: null,
           last_name: null,
           username: null,
        };
    },
    mounted() {
  const searchQuery = this.$route.query.searchQuery;
  if (searchQuery) {
    socialService.search(searchQuery)
      .then((result) => {
        this.user_id = result.user_id.toString();
        this.first_name = result.first_name;
        this.last_name = result.last_name;
        this.username = result.username;
        this.loading = false;
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
        this.loading = false;
      });
  } else {
    this.loading = false;
  }
},
}
</script>
  
<style scoped>
</style>
  