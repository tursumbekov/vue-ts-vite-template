<template>
    <MainLayout>
        <router-view v-slot="{ Component, route }">
            <transition name="fade">
                <div
                    :key="route.fullPath"
                    class="h-100"
                >
                    <component :is="Component" />
                </div>
            </transition>
        </router-view>
    </MainLayout>
</template>

<script lang="ts" setup>
import { useLocalizeTitleModule } from '@/modules';
import { MainLayout } from '@/components';

useLocalizeTitleModule();
</script>
