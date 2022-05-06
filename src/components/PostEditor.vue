<template>
  <div class="col-full">
    <form @submit.prevent="save">
      <div class="form-group">
        <textarea
          name=""
          id=""
          cols="30"
          rows="20"
          class="form-input"
          v-model="text"
        ></textarea>
      </div>
      <div class="form-actions">
        <button class="btn-blue">Submit post</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'PostEditor',
  props: {
    threadId: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit }) {
    const text = ref('')

    const save = () => {
      const post = {
        text: text.value,
        threadId: props.threadId,
      }
      emit('save', post)
      text.value = ''
    }

    return {
      text,
      save,
    }
  },
}
</script>

<style scoped></style>
