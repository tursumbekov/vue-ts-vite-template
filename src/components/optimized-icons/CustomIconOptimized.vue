<template>
    <svg
        class="svg-item"
        :viewBox="viewBox"
        :width="width"
        :height="height"
        :class="{ rotate: rotation, filled: !!fill }"
    >
        <!-- avoid unnecessary rendering of svg childs like path etc. -->
        <!-- helps in lists with many items -->
        <use
            :href="`#${name}`"
            class="svg-use"
        />
    </svg>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { ElementSizes, iconSizes } from '@/@enums';
import { useInlineSVGStore } from '@/stores';

const {
    name,
    width = iconSizes[ElementSizes.S],
    height = iconSizes[ElementSizes.S],
    rotation = 0,
    fill,
    viewBox,
} = defineProps<{
    name: string;
    width?: string | number;
    height?: string | number;
    rotation?: number;
    fill?: string | boolean;
    viewBox?: string;
}>();

const { addSVG } = useInlineSVGStore();

const rotationDeg = $computed(() => (rotation ? `${rotation}deg` : 'none'));

onMounted(() => addSVG(name));
</script>

<style lang="scss" scoped>
.svg-item,
.svg-item .svg-use {
    transition: 0.3s;
}

.svg-item.filled .svg-use {
    fill: v-bind(fill);
}

.rotate {
    transform: rotate(v-bind(rotationDeg));
}
</style>
