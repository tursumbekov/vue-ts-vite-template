import { App, Component } from 'vue';
import LinearSpinner from './spinners/LinearSpinner.vue';
import RoundSpinner from './spinners/RoundSpinner.vue';

const components: Readonly<{ name: string; instance: Component }[]> = [
    {
        name: 'LinearSpinner',
        instance: LinearSpinner,
    },
    {
        name: 'RoundSpinner',
        instance: RoundSpinner,
    },
];

export default function (app: App) {
    components.forEach(({ name, instance }) => {
        app.component(name, instance);
    });
}
