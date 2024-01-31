<script setup lang="ts">
import { formatNumberIntoLocalString } from './index.ts'

const inputValue = ref(1024)
const number = computed(() => inputValue.value || 0)
const formatted = computed(() => {
  try {
    return formatNumberIntoLocalString(number.value)
  }
  catch (e: any) {
    return e.message
  }
})
</script>

<template>
  <div>
    <input v-model="inputValue" type="number">
    <div>
      Number: {{ number }}
    </div>
    <div>
      Formatted: {{ formatted }}
    </div>
  </div>
</template>
