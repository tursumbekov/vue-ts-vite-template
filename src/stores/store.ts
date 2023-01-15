import { createPinia } from 'pinia';
import { BASE_API_URL, HttpClient } from '@/utils';

const store = createPinia();
const httpClient: HttpClient = new HttpClient(BASE_API_URL);

export { store, httpClient };
