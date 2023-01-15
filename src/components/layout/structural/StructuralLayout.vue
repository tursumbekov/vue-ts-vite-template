<template>
    <v-container
        fluid
        class="d-flex flex-column h-100 pa-0"
    >
        <RoundSpinner
            v-if="isLoading"
            class="d-flex flex-1 justify-center align-center"
        />
        <section
            v-else
            class="my-5 mx-6 flex-1"
        >
            <slot />
        </section>
        <InlineSVGContainer />
    </v-container>
</template>

<script lang="ts" setup>
import { InlineSVGContainer } from '@/components';

const { isLoading = false } = defineProps<{ isLoading?: boolean }>();
</script>
