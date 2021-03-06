import { createStore } from 'vuex'
import sourceData from '../../public/data/data.json'
import { findById, upsert } from '@/helpers'

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
      return findById(state.threads, id)
    },
    async updateThread({ commit, state }, { title, text, id }) {
      const thread = findById(state.threads, id)
      const post = findById(state.posts, thread.posts[0])
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
      upsert(state.posts, post)
    },
    setThread(state, { thread }) {
      upsert(state.threads, thread)
    },
    setUser(state, { user, userId }) {
      const userIndex = state.users.findIndex((el) => el.id === userId)
      state.users[userIndex] = user
    },
    appendPostToThread(state, { postId, threadId }) {
      const thread = findById(state.threads, threadId)
      thread.posts = thread.posts || []
      thread.posts.push(postId)
    },
    appendThreadToUser(state, { userId, threadId }) {
      const user = findById(state.users, userId)
      user.threads = user.threads || []
      user.threads.push(threadId)
    },
    appendThreadToForum(state, { forumId, threadId }) {
      const forum = findById(state.forums, forumId)
      forum.threads = forum.threads || []
      forum.threads.push(threadId)
    },
  },
  getters: {
    authUser: (state) => {
      const user = findById(state.users, state.authId)
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
