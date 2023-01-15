import { createApp } from 'vue';
import vuetify from '@/plugins/vuetify';
import { store } from '@/stores';
import setupDirectives from '@/directives';
import setupComponents from '@/components/global';
import App from './App.vue';
import i18n from './i18n';
import router from './router';
import './styles/main.scss';

const app = createApp(App);

setupDirectives(app);
setupComponents(app);

app.use(router).use(i18n).use(store).use(vuetify).mount('#app');
