<template>
  <span :title="humanFriendlyDate()">
    {{ diffForHumans() }}
  </span>
</template>

<script>
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import localizedDate from 'dayjs/plugin/localizedFormat'
dayjs.extend(relativeTime)
dayjs.extend(localizedDate)

export default {
  name: 'BaseDate',
  props: {
    timestamp: {
      type: Number,
      required: true,
    },
  },
  setup(props) {
    const diffForHumans = () => {
      return dayjs.unix(props.timestamp).fromNow()
    }

    const humanFriendlyDate = () => {
      return dayjs.unix(props.timestamp).format('llll')
    }

    return {
      diffForHumans,
      humanFriendlyDate,
    }
  },
}
</script>

<style scoped></style>
