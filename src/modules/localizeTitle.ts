import { watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export function useLocalizeTitleModule() {
    const route = useRoute();
    const { t } = useI18n();

    watch(() => route.name, localizeTittle);

    function localizeTittle() {
        document.title = t((route.meta.title as string) || 'pages.default');
    }
}
