<template>
  <h1 class="push-top">Welcome to the Forum</h1>
  <CategoryList :categories="categories" />
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import CategoryList from '@/components/CategoryList'

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Home',
  components: { CategoryList },
  setup() {
    const store = useStore()

    const categories = computed(() => {
      return store.state.categories
    })

    return {
      categories,
    }
  },
}
</script>

<style scoped></style>
