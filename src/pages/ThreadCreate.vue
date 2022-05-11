<template>
  <div class="col-full push-top">
    <h1>
      Create new thread in <i>{{ forumName }}</i>
    </h1>

    <ThreadEditor @save="save" @cancel="cancel" />
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import router from '@/router/router'

import ThreadEditor from '@/components/ThreadEditor'
import { findById } from '@/helpers'

export default {
  name: 'ThreadCreate',
  props: {
    forumId: { type: String, required: true },
  },
  components: { ThreadEditor },
  setup(props) {
    const store = useStore()

    const forumName = computed(() => {
      return findById(store.state.forums, props.forumId).name
    })

    const save = async ({ title, text }) => {
      const res = await store.dispatch('createThread', {
        forumId: props.forumId,
        title,
        text,
      })
      await router.push({ name: 'ThreadShow', params: { id: res.id } })
    }

    const cancel = () => {
      router.push({ name: 'Forum', params: { id: props.forumId } })
    }

    return {
      save,
      forumName,
      cancel,
    }
  },
}
</script>

<style scoped></style>
