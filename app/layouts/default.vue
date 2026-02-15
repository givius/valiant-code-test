<script setup lang="ts">
import { en, es } from '@nuxt/ui/locale'
const { t } = useI18n()

const { locale, setLocale } = useI18n()
</script>

<template>
    <UApp>

        <UHeader to="/" class="bg-muted">
            <template #title>
                <UIcon name="ph:calculator-duotone" class="size-12 text-primary"/>
                <div class="flex flex-col gap-1">
                    <h2>{{ t('app.header') }}</h2>
                    <p class="text-muted text-xs!">By: {{ t('app.author') }}</p>
                </div>
            </template>

            <template #right>
                <ULocaleSelect
                    :model-value="locale"
                    :locales="[en, es]"
                    class="w-48"
                    @update:model-value="setLocale($event)"
                />
                <UColorModeButton />
            </template>
        </UHeader>
        <UContainer class="py-8">
            <slot />
        </UContainer>
    </UApp>
</template>
