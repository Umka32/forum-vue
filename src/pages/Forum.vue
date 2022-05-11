<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <router-link
        :to="{ name: 'ThreadCreate', params: { forumId: forum.id } }"
        class="btn-green btn-small"
        >Start a thread</router-link
      >
    </div>
  </div>
  <div class="col-full push-top">
    <ThreadList :threads="threads" />
  </div>
</template>

<script>
import ThreadList from '@/components/ThreadList'
import { computed } from 'vue'
import { useStore } from 'vuex'

import { findById } from '@/helpers'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Forum',
  components: { ThreadList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const forum = computed(() => {
      return findById(store.state.forums, props.id)
    })

    const threads = computed(() => {
      return store.state.threads.filter((thread) => thread.forumId === props.id)
    })

    return {
      threads,
      forum,
    }
  },
}
</script>

<style scoped></style>
