<template>
  <div class="container">
    <div class="flex-grid">
      <div class="col-3 push-top">
        <UserProfileCard v-if="!edit" :user="user" />
        <USerProfileCardEditor v-if="edit" :user="user" />
      </div>

      <div class="col-7 push-top">
        <div class="profile-header">
          <span class="text-lead"> {{ user.username }} recent activity </span>
          <a href="#">See only started threads?</a>
        </div>
        <PostList :posts="user.posts" />
      </div>
    </div>
  </div>
</template>

<script>
import PostList from '@/components/PostList'
import { useStore } from 'vuex'
import { computed } from 'vue'
import UserProfileCard from '@/components/UserProfileCard'
import USerProfileCardEditor from '@/components/USerProfileCardEditor'
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Profile',
  components: { USerProfileCardEditor, UserProfileCard, PostList },
  props: {
    edit: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const store = useStore()

    const user = computed(() => {
      return store.getters['authUser']
    })

    const userPosts = computed(() => {
      return store.state.posts.filter((post) => post.userId === user.value.id)
    })

    return {
      user,
      userPosts,
    }
  },
}
</script>

<style scoped></style>
