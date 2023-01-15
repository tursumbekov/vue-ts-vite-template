<template>
    <div class="circles-wrapper">
        <div
            class="circles"
            :class="[size]"
        >
            <span
                v-for="index in circles"
                :key="index"
                :class="['circle', size, `circle-${index}`]"
            >
            </span>
        </div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import { ElementSizes } from '@/@enums';

export default defineComponent({
    name: 'LinearSpinner',
    props: {
        size: {
            type: String as PropType<ElementSizes>,
            default: ElementSizes.L,
        },
    },
    data() {
        return {
            circles: 4,
        };
    },
});
</script>

<style lang="scss" scoped>
$circle-radius-md: 6;
$circle-radius-lg: 12;
$animation-duration: 1.5;
$spinners-count: 4;
$velocity: 4;
$transform: $velocity * 100%;

.circles {
    position: relative;
    display: block;
    margin-bottom: #{$circle-radius-lg * $velocity}px;

    &.m-size {
        margin-bottom: #{$circle-radius-md * $velocity}px;
    }
}

.circle {
    position: relative;
    display: inline-block;
    width: #{$circle-radius-lg}px;
    height: #{$circle-radius-lg}px;
    background-color: $spring-green;
    border-radius: 50%;
    animation: linearSpinnerLoading #{$animation-duration}s cubic-bezier(0.8, 0.5, 0.2, 1.4) infinite;
    transform-origin: bottom center;
    opacity: 0;

    & + & {
        margin-left: 4px;
    }

    &.m-size {
        width: #{$circle-radius-md}px;
        height: #{$circle-radius-md}px;
    }

    .v-theme--dark & {
        background-color: $spring-green-dark;
    }
}

@for $i from 1 through $spinners-count {
    .circle-#{$i} {
        animation-delay: #{0.1 + $i * 0.1}s;
    }
}

@keyframes linearSpinnerLoading {
    0% {
        transform: translateY(0);
        opacity: 0;
    }
    50% {
        transform: translateY($transform);
        opacity: 1;
    }
    100% {
        transform: translateY(0);
        opacity: 0;
    }
}
</style>
