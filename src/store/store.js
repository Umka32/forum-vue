import { createStore } from 'vuex'
import sourceData from '../../public/data/data.json'

export default createStore({
  state: {
    ...sourceData,
    authId: 'VXjpr2WHa8Ux4Bnggym8QFLdv5C3',
  },
  actions: {
    createPost({ commit, state }, post) {
      post.id = 'qqqq' + Math.random()
      post.userId = state.authId
      commit('setPost', post)
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    createThread({ commit, state }, { text, title, forumId }) {
      const id = 'qqqq' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, id, userId, publishedAt }
      commit('setThread', { thread })
    },
    updateUser({ commit }, user) {
      commit('setUser', { user: user, userId: user.id })
    },
  },
  mutations: {
    setPost(state, post) {
      state.posts.push(post)
    },
    setThread(state, { thread }) {
      state.threads.push(thread)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((el) => el.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      state.threads.find((thread) => thread.id === threadId).posts.push(postId)
    },
  },
  getters: {
    authUser: (state) => {
      const user = state.users.find((user) => user.id === state.authId)
      if (!user) return null
      return {
        ...user,

        get posts() {
          return state.posts.filter((post) => post.userId === user.id)
        },

        get postsCount() {
          return this.posts.length
        },

        get threads() {
          return state.threads.filter((thread) => thread.userId === user.id)
        },

        get threadsCount() {
          return this.threads.length
        },
      }
    },
  },
})
