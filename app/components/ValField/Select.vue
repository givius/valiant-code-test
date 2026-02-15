<script setup lang="ts">
import type { SelectItem } from '#ui/types'

const props = defineProps<{
    label: string
    name: string
    options?: SelectItem[] | string[] | number[]
}>()

const modalForm = useModalForm()

const items = computed(() => props.options?.map((item) =>
    typeof item === 'object' ? {
        ...item,
        label: appT(item?.label),
    } : item,
) ?? [])
</script>

<template>
    <UFormField :label="appT(label)" :name="name">
        <USelect
            v-if="modalForm"
            v-model="modalForm.state[name]"
            :items="items"
            size="lg"
            class="min-w-40"
            v-bind="$attrs"
        />
    </UFormField>
</template>
