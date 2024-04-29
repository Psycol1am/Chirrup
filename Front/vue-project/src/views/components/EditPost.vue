<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center">Edit Post</h1>
          
          <form @submit.prevent="EditPost">
            <div class="form-group">
              <label for="postText">Write your post:</label>
              <textarea id="postText" class="form-control" v-model="postText" rows="4"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit Post</button>
            <div v-if="error">{{ error }}</div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { postService } from '../../services/posts.service';
  export default {
    data() {
      return {
        postText: '',
        error:''
      };
    },
    methods: {
      EditPost() {
        postService.updatePost(this.postText,localStorage.getItem("post_id"))
        .then(result => {
                this.$router.push("/posts/" + localStorage.getItem("post_id"))
            })
            .catch(error => this.error = error);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  