<template>
  <div class="col-full push-top">
    <h1>
      Editing <i>{{ thread.title }}</i>
    </h1>

    <ThreadEditor
      :title="thread.title"
      :text="text"
      @save="save"
      @cancel="cancel"
    />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/router'

import ThreadEditor from '@/components/ThreadEditor'
import { findById } from '@/helpers'

export default {
  name: 'ThreadEdit',
  props: {
    id: { type: String, required: true },
  },
  components: { ThreadEditor },
  setup(props) {
    const store = useStore()

    const thread = computed(() => {
      return findById(store.state.threads, props.id)
    })

    const text = computed(() => {
      return findById(store.state.posts, thread.value.posts[0]).text
    })

    const save = async ({ title, text }) => {
      const res = await store.dispatch('updateThread', {
        id: props.id,
        title,
        text,
      })
      await router.push({ name: 'ThreadShow', params: { id: res.id } })
    }

    const cancel = () => {
      router.push({ name: 'ThreadShow', params: { id: props.id } })
    }

    return {
      save,
      thread,
      cancel,
      text,
    }
  },
}
</script>

<style scoped></style>
