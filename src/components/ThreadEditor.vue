<template>
  <form @submit.prevent="save">
    <div class="form-group">
      <label for="thread_title">Title:</label>
      <input
        v-model="form.title"
        type="text"
        id="thread_title"
        class="form-input"
        name="title"
      />
    </div>

    <div class="form-group">
      <label for="thread_content">Content:</label>
      <textarea
        v-model="form.text"
        id="thread_content"
        class="form-input"
        name="content"
        rows="8"
        cols="140"
      ></textarea>
    </div>

    <div class="btn-group">
      <button class="btn btn-ghost" @click.prevent="cancel">Cancel</button>
      <button class="btn btn-blue" type="submit" name="Publish">
        {{ isUpdate ? 'Update' : 'Publish' }}
      </button>
    </div>
  </form>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'ThreadEditor',
  props: {
    title: { type: String, default: '' },
    text: { type: String, default: '' },
  },
  setup(props, { emit }) {
    const form = {
      title: props.title,
      text: props.text,
    }

    const isUpdate = computed(() => {
      return !!props.title
    })

    const save = () => {
      emit('save', { ...form })
    }

    const cancel = () => {
      emit('cancel')
    }

    return {
      form,
      isUpdate,
      save,
      cancel,
    }
  },
}
</script>

<style scoped></style>
