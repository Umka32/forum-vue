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
      post.publishedAt = Math.floor(Date.now() / 1000)
      commit('setPost', { post: post })
      commit('appendPostToThread', { postId: post.id, threadId: post.threadId })
    },
    async createThread({ commit, dispatch, state }, { text, title, forumId }) {
      const id = 'qqqq' + Math.random()
      const userId = state.authId
      const publishedAt = Math.floor(Date.now() / 1000)
      const thread = { forumId, title, id, userId, publishedAt }
      commit('setThread', { thread })
      commit('appendThreadToUser', { userId, threadId: id })
      commit('appendThreadToForum', { forumId, threadId: id })
      dispatch('createPost', { text, threadId: id })
      return state.threads.find((thread) => thread.id === id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = state.threads.find((thread) => thread.id === id)
      const post = state.posts.find((post) => post.id === thread.posts[0])
      const newThread = { ...thread, title }
      const newPost = { ...post, text }
      commit('setThread', { thread: newThread })
      commit('setPost', { post: newPost })
      return newThread
    },
    updateUser({ commit }, user) {
      commit('setUser', { user: user, userId: user.id })
    },
  },
  mutations: {
    setPost(state, { post }) {
      const index = state.posts.findIndex((p) => p.id === post.id)
      if (post.id && index !== -1) {
        return (state.posts[index] = post)
      }
      return state.posts.push(post)
    },
    setThread(state, { thread }) {
      const index = state.threads.findIndex((t) => t.id === thread.id)
      if (thread.id && index !== -1) {
        state.threads[index] = thread
      } else {
        state.threads.push(thread)
      }
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((el) => el.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = state.threads.find((thread) => thread.id === threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = state.users.find((user) => user.id === userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = state.forums.find((forum) => forum.id === forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
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
