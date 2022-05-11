<template>
  <h1>{{ category.name }}</h1>
  <ForumList
    :category-name="category.name"
    :forums="getForumsForCategory(category.id)"
  />
</template>

<script>
import ForumList from '@/components/ForumList'
import { useStore } from 'vuex'
import { computed } from 'vue'

import { findById } from '@/helpers'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Category',
  components: { ForumList },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const store = useStore()

    const category = computed(() => {
      return findById(store.state.categories, props.id)
    })

    const getForumsForCategory = (categoryId) => {
      return store.state.forums.filter(
        (forum) => forum.categoryId === categoryId,
      )
    }

    return {
      category,
      getForumsForCategory,
    }
  },
}
</script>

<style scoped></style>
