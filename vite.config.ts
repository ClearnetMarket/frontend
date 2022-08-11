 import { defineConfig } from 'vite'
 import vue from '@vitejs/plugin-vue'


 export default defineConfig({
   plugins: [vue()],
   server: {
     host: true
   },
     build: {
         chunkSizeWarningLimit: 1600,
         assetsInlineLimit: 2048 // 2kb
     },
 })
