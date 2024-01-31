<script setup lang="ts">
import { downloadFile } from './index.ts'

const file = new Blob(['Hello, world!'], { type: 'text/plain' })
</script>

<template>
  <div>
    <button @click="downloadFile(file, 'test.txt')">
      下载
    </button>
  </div>
</template>
