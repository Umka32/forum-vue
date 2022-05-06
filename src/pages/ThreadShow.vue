<template>
  <div class="col-large push-top">
    <h1>
      {{ thread.title }}
      <router-link
        :to="{ name: 'ThreadEdit', params: { id: id } }"
        class="btn-green btn-small"
      >
        Edit Thread
      </router-link>
    </h1>
    <PostList :posts="threadPosts" />
    <PostEditor @save="addPost" :thread-id="id" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import PostList from '@/components/PostList'
import PostEditor from '@/components/PostEditor'

export default {
  name: 'ThreadShow',
  components: { PostEditor, PostList },
  props: {
    id: {
      required: true,
      type: String,
    },
  },
  setup(props) {
    const store = useStore()

    const threads = computed(() => {
      return store.state.threads
    })

    const thread = computed(() => {
      return threads.value.find((thread) => thread.id === props.id)
    })

    const posts = computed(() => {
      return store.state.posts
    })

    const threadPosts = computed(() => {
      return posts.value.filter((post) => post.threadId === props.id)
    })

    const addPost = (post) => {
      store.dispatch('createPost', post)
    }

    return {
      thread,
      posts,
      threadPosts,
      addPost,
    }
  },
}
</script>

<style scoped></style>
