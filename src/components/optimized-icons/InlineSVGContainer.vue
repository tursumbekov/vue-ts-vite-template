<template>
    <div
        v-for="{ name: key, data } in svgList"
        :key="key"
        class="svg-container"
        v-html="data"
    />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useInlineSVGStore } from '@/stores';

const { svgList } = storeToRefs(useInlineSVGStore());
</script>

<style lang="scss" scoped>
.svg-container {
    display: none;
}
.svg-container :deep(svg path) {
    fill: inherit;
}
</style>
