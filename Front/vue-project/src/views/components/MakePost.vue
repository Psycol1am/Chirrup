<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center">Make Post</h1>
          
          <form @submit.prevent="createPost">
            <div class="form-group">
              <label for="postText">Write your post:</label>
              <textarea id="postText" class="form-control" v-model="postText" rows="4"></textarea>
            </div>
            
            <button type="submit" class="btn btn-primary">Submit Post</button>
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
        postText: ''
      };
    },
    methods: {
      createPost() {
        postService.addPost(this.postText)
        .then(result => {
                this.$router.push("/posts/" + localStorage.getItem("post_id") )
            })
            .catch(error => this.error = error);
      }
    }
  };
  </script>
  
  <style scoped>
  </style>
  