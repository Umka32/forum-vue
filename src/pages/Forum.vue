<template>
  <div class="col-full push-top">
    <div class="forum-header">
      <div class="forum-details">
        <h1>{{ forum.name }}</h1>
        <p class="text-lead">{{ forum.description }}</p>
      </div>
      <a href="#" class="btn-green btn-small">Start a thread</a>
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
      return store.state.forums.find((el) => el.id === props.id)
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
