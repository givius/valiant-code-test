<script setup lang="ts">
defineProps<{
    label: string
    name: string
}>()

const modalForm = useModalForm()
</script>

<template>
    <UFormField :label="appT(label)" :name="name">
        <UInput
            v-if="modalForm"
            v-model="modalForm.state[name]"
            size="lg"
            class="w-full"
            v-bind="$attrs"
        />
    </UFormField>
</template>
