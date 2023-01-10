<template>
  <div class="header">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <router-link class="nav-link" to="/posts" exact-path>Posts</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/map" exact-path>Map</router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>

</template>

<script>

</script>

<style>
.header {
  background: linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(72, 212, 156, 1) 0%, rgba(71, 193, 188, 1) 100%, rgba(0, 212, 255, 1) 100%);
}


</style>