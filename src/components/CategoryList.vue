<template>
  <ForumList
    v-for="category in categories"
    :key="category.id"
    :forums="getForumsForCategory(category.id)"
    :category-name="category.name"
    :category-id="category.id"
  />
</template>

<script>
import ForumList from '@/components/ForumList'
import { useStore } from 'vuex'
export default {
  name: 'CategoryList',
  components: { ForumList },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore()

    const getForumsForCategory = (categoryId) => {
      return store.state.forums.filter(
        (forum) => forum.categoryId === categoryId,
      )
    }

    return {
      getForumsForCategory,
    }
  },
}
</script>

<style scoped></style>
