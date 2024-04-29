<template>
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <h1 class="text-center">User Profile</h1>
          
          <div>
            <p>User ID: {{ userProfile.user_id }}</p>
            <p>Username: {{ userProfile.username }}</p>
            <p>Followers: {{ userProfile.followersCount }}</p>
            <p>Likes: {{ userProfile.likesCount }}</p>
          </div>
          
          <!-- Buttons -->
          <div class="mb-3">
            <BLink to="/make-post"><button class="btn btn-primary">Make Post</button></BLink>
            <button class="btn btn-success" @click="toggleFollow">{{ userProfile.isFollowing ? 'Unfollow' : 'Follow' }}</button>
            <button class="btn btn-danger" @click="toggleLike">{{ userProfile.isLiked ? 'Unlike' : 'Like' }}</button>
          </div>
          
          <!-- Followers Section -->
          <div>
            <h2>Followers</h2>
            <ul>
              <li v-for="follower in userProfile.followers" :key="follower.user_id">{{ follower.username }}</li>
            </ul>
          </div>
          
          <!-- Liked Posts Section -->
          <div>
            <h2>Liked Posts</h2>
            <ul>
              <li v-for="likedPost in userProfile.likedPosts" :key="likedPost.post_id">{{ likedPost.text }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div v-if="error">{{ error }}</div>
  </template>
  
  <script>
  import { postService } from '../../services/posts.service';
  export default {
    data() {
      return {
        error:"",
        userProfile: {
          user_id: "placeholder", 
          username: 'exampleUser', 
          followersCount: "placeholder", 
          likesCount: "placeholder", 
          isFollowing: false, 
          isLiked: false, 
          followers: [], 
          likedPosts: [] 
        }
      };
    },
    methods: {
      toggleFollow() {
        console.log('Toggling follow');
        this.userProfile.isFollowing = !this.userProfile.isFollowing;
      },
      toggleLike() {
        console.log('Toggling like');
        this.userProfile.isLiked = !this.userProfile.isLiked;
      }
    }
  };
  </script>