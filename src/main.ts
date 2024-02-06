import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import VAccordion from "@/components/VAccordion.vue";

const app = createApp(App);

app.component('VAccordion', VAccordion)
app.mount('#app')
