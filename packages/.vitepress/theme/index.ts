import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DemoContainer from './component/DemoContainer.vue'
import './styles/demo.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('DemoContainer', DemoContainer)
  },
} satisfies Theme
