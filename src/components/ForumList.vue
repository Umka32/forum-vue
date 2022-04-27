<template>
  <div class="col-full">
    <div class="forum-list">
      <h2 class="list-title">
        <router-link
          v-if="categoryId"
          :to="{ name: 'Category', params: { id: categoryId } }"
          >{{ categoryName }}</router-link
        >
        <span v-else>{{ categoryName }}</span>
      </h2>
      <div class="forum-listing" v-for="forum in forums" :key="forum.id">
        <div class="forum-details">
          <router-link
            :to="{ name: 'Forum', params: { id: forum.id } }"
            class="text-xlarge"
            >{{ forum.name }}</router-link
          >
          <p>{{ forum.description }}</p>
        </div>
        <div class="threads-count">
          <p>
            <span class="count">{{ forum.threads?.length }}</span>
            {{ forumThreadsWord(forum) }}
          </p>
        </div>
        <div class="last-thread"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ForumList',
  props: {
    forums: {
      required: true,
      type: Array,
    },
    categoryName: {
      type: String,
      required: true,
      default: 'Forum',
    },
    categoryId: {
      type: String,
      required: false,
    },
  },
  setup() {
    const forumThreadsWord = (forum) => {
      if (forum.threads?.length) {
        return forum.threads?.length > 1 ? 'threads' : 'thread'
      } else {
        return 'no threads'
      }
    }

    return { forumThreadsWord }
  },
}
</script>

<style scoped></style>
