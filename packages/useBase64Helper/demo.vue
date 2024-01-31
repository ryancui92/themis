<script setup lang="ts">
import { ref } from 'vue'
import { useBase64 } from '@vueuse/core'
import { useBase64Helper } from './index'

const file = ref() as Ref<File>
const { base64: target } = useBase64(file)

const { base64, mimeType, download } = useBase64Helper(target)

async function onFileInput(e: Event) {
  file.value = (e.target as HTMLInputElement).files![0]
}
</script>

<template>
  <div>
    <input type="file" @input="onFileInput">
  </div>
  <div>
    <p>MimeType: {{ mimeType }}</p>
    <p>Base64</p>
    <textarea :value="base64" style="width: 100%" readonly />
  </div>
  <button type="button" @click="() => download('file')">
    下载
  </button>
</template>
