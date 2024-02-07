import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import {components} from "@/components/UI"

const app = createApp(App);

Object.keys(components).forEach(key => {
  app.component(key, components[key])
});

app.mount('#app')
