<script setup lang="ts">
definePageMeta({
  name: 'index',
})
</script>

<template>
  <div class="flex flex-col gap-4">
      <UPageHeader
          :headline="$t('app.name')"
          :title="$t('app.title')"
          :description="$t('app.description')"
      />

      <p>{{ $t('app.usage') }}</p>

      <div class="flex justify-center px-10">
        <LoanCalculator />
      </div>
  </div>
</template>
