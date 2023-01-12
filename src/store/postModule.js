export const postModule = {
  state: () => ({
    posts: [],
    filteredPosts: [],
    postsChunk: [],
    isLoading: false,
    postsOnPage: 10,
    offset: 0,
    currentPage: 1,
    pagesAmount: 0,
  }),
  getter: {},
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setFilteredPosts(state, filteredPosts) {
      state.filteredPosts = filteredPosts;
    },
    setPostsChunk(state, postsChunk) {
      state.postsChunk = postsChunk;
    },
    setLoading(state, isLoading) {
      state.isLoading = isLoading;
    },
    setOffset(state, offset) {
      state.offset = offset;
    },
    setCurrentPage(state, currentPage) {
      state.currentPage = currentPage;
    },
    setPagesAmount(state, pagesAmount) {
      state.pagesAmount = pagesAmount;
    },
  },
  actions: {
    async getPosts({ state, commit }) {
      try {
        commit("setLoading", true);
        const res = await fetch(`${import.meta.env.VITE_APP_POSTS_URL}`, {
          headers: { "Content-type": "application/json" },
        });
        const posts = await res.json();
        commit("setPosts", posts);
        commit("setFilteredPosts", posts);
        commit(
          "setPagesAmount",
          Math.ceil(state.filteredPosts.length / state.postsOnPage)
        );
        commit(
          "setPostsChunk",
          [...state.filteredPosts].splice(state.offset, state.postsOnPage)
        );
        commit("setOffset", state.postsOnPage * 1 - state.postsOnPage);
      } catch (error) {
        console.log(error);
      } finally {
        commit("setLoading", false);
      }
    },

    async getPostComments({ commit }, postId) {
      try {
        commit("setLoading", true);
        const res = await fetch(
          `${import.meta.env.VITE_APP_COMMENTS_URL}?postId=${postId}`,
          {
            headers: { "Content-type": "application/json" },
          }
        );
        const comments = await res.json();

        return comments;
      } catch (error) {
        console.log(error);
      } finally {
        commit("setLoading", false);
      }
    },

    changePage({ state, commit }, pageNum) {
      commit("setLoading", true);
      state.currentPage = pageNum;
      commit("setOffset", state.postsOnPage * pageNum - state.postsOnPage);
      commit(
        "setPostsChunk",
        [...state.filteredPosts].splice(state.offset, state.postsOnPage)
      );
      commit("setLoading", false);
    },

    filterPostsBySuggestion({ state, commit }, suggestion) {
      if (state.currentPage !== 1) {
        state.currentPage = 1;
      }
      commit(
        "setFilteredPosts",
        state.posts.filter((post) =>
          post.title.toLowerCase().includes(suggestion.toLowerCase())
        )
      );
      commit(
        "setPagesAmount",
        Math.ceil(state.filteredPosts.length / state.postsOnPage)
      );
      commit("setOffset", 0);
      commit(
        "setPostsChunk",
        [...state.filteredPosts].splice(state.offset, state.postsOnPage)
      );
    },

    sortPostsByTitle({ state, commit }, event) {
      const orderBy = event.target.value;
      commit("setLoading", true);

      if (orderBy === "desc") {
        commit(
          "setFilteredPosts",
          state.filteredPosts.sort((a, b) => a.title.localeCompare(b.title))
        );
      } else {
        commit(
          "setFilteredPosts",
          [...state.filteredPosts]
            .sort((a, b) => a.title.localeCompare(b.title))
            .reverse()
        );
      }
      commit(
        "setPostsChunk",
        [...state.filteredPosts].splice(state.offset, state.postsOnPage)
      );
      commit("setLoading", false);
    },
  },

  namespaced: true,
};
