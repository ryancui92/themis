<script setup lang="ts">
import { downloadURL } from './index.ts'

const url = ref('https://httpbin.org/response-headers?Content-Type=application/json;%20charset=UTF-8&Content-Disposition=attachment;%20filename%3d%22example.json%22')
</script>

<template>
  <div>
    <input v-model="url" type="text">
    <button @click="downloadURL(url)">
      下载
    </button>
  </div>
</template>
