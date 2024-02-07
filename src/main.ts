import '@/assets/main.css'
import { createApp } from 'vue'
import App from '@/App.vue'
import {components} from "@/components/UI"
import {VOutsideclick} from "@/plugins/directives/VOutsideclick";


const app = createApp(App);

Object.keys(components).forEach(key => {
  app.component(key, components[key])
});

app.directive('outsideClick', VOutsideclick)


app.mount('#app')
