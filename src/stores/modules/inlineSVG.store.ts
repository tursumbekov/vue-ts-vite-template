import { defineStore } from 'pinia';
import { ref } from 'vue';
import { StoreIds } from '@/@enums';
import { InlineSVG } from '@/@interfaces';

export const useInlineSVGStore = defineStore(StoreIds.SVG, () => {
    const svgList = ref<InlineSVG[]>([]);

    async function addSVG(name: string) {
        if (!svgList.value.find((value) => value.name === name)) {
            svgList.value.push({
                name,
            });
            const response = await fetch(`/assets/svg/sh-icon_${name}.svg`);
            svgList.value[svgList.value.length - 1].data = await response.text();
        }
    }

    return {
        svgList,
        addSVG,
    };
});
