<template>
  <div class="col-full">
    <div class="thread-list">
      <h2 class="list-title">Threads</h2>

      <div v-for="thread in threads" :key="thread.id" class="thread">
        <div>
          <p>
            <router-link
              :to="{ name: 'ThreadShow', params: { id: thread.id } }"
              >{{ thread.title }}</router-link
            >
          </p>
          <p class="text-faded text-small">
            By <a href="#">{{ userById(thread.userId).name }}</a
            >, <BaseDate :timestamp="thread.publishedAt" />
          </p>
        </div>
        <div class="activity">
          <p class="replies-count">{{ thread.posts.length }} replies</p>
          <img
            class="avatar-medium"
            :src="userById(thread.userId).avatar"
            alt=""
          />
          <div>
            <p class="text-small">
              <a href="#">{{ userById(thread.userId).name }}</a>
            </p>
            <p class="text-small text-faded">
              <BaseDate :timestamp="thread.publishedAt" />
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'

import { findById } from '@/helpers'

export default {
  name: 'ThreadList',
  components: {},
  props: {
    threads: {
      type: Array,
      required: true,
    },
  },
  setup() {
    const store = useStore()
    const users = computed(() => {
      return store.state.users
    })

    const userById = (userId) => {
      return findById(users.value, userId)
    }

    return {
      users,
      userById,
    }
  },
}
</script>

<style scoped></style>
