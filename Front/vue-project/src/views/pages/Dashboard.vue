<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">For You</h5>
            <p class="card-text">Find a post...</p>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Search for a post by id..." v-model="postSearch">
              <div class="input-group-append">
                <button class="btn btn-outline-secondary" type="button" @click="searchPosts">Search</button>
              </div>
          </div>
        </div>
      </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Feed</h5>
            <p class="card-text">Feed would go here...</p>
          </div>
        </div>
      </div>

      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Profile</h5>
            <p class="card-text"></p>
            <BLink to="/profile"><button class="btn btn-primary">Go to Profile</button></BLink>
            <div v-if="error">{{ error }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      postSearch: "",
      error: ""
    };
  },
  methods: {
    searchPosts() {
      this.$router.push("/posts/" + this.postSearch)
    },
  },
};
</script>

<style>

p {
    color: black;
}
body {
    background-color: blanchedalmond;
}
</style>