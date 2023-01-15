import { App, Directive } from 'vue';

const directives: Readonly<{ name: string; instance: Directive }[]> = [];

export default function (app: App) {
    directives.forEach(({ name, instance }) => {
        app.directive(name, instance);
    });
}
