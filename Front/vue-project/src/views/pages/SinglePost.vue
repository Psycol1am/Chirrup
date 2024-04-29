<template>
  <div class="container mt-4">
    <em v-if="post.loading">Loading post....</em>

    <div v-else class="card">
      <div class="card-body">
        <p class="card-text">Author: {{ post.author.first_name + " " + post.author.last_name}}</p>
        <p class="card-text">Text: {{ post.text }}</p>
        <p class="card-text">Date: {{ post.timestamp }}</p>
        <p class="card-text">Number of likes: {{ post.likes.length }}</p>

        <BLink to="/EditPost"><button  class="btn btn-primary">Edit</button></BLink>

        <button @click="likePost" class="btn btn-success">Like</button>

        <button @click="followAuthor" class="btn btn-warning">Follow</button>

        <button @click="deletePost" class="btn btn-warning">Delete</button>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>


<script>
import {postService} from '../../services/posts.service'
import { socialService } from '../../services/social.service';


export default {
  data() {
    return {
      post: {},
      error: "",
      id: null 
    };
  },
  created() {
    this.post.loading = true;

    postService.getSinglePost(this.$route.params.post_id)
      .then((post) => {
        this.post = post;
      })
      .catch((error) => {
        this.error = error;
      });
  },
  methods: {
    likePost() {
      postService.addLike(this.$route.params.post_id)
        .then((result) => {
          console.log("Liked!");
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    followAuthor() {
        
      socialService.followUser(localStorage.getItem("author_id"))
      .then((result) => {
          console.log("Liked!");
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deletePost(){ 
        postService.deletePost(localStorage.getItem("author_id"))
        .then((result) => {
          console.log("Post Deleted");
          this.$router.push("/dashboard")
        })
        .catch((error) => {
          console.log(error);
        });

    }
  }
};


</script>