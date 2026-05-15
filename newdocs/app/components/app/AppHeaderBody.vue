<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation')
const contentNavVariants = useUIConfig('contentNavigation')
</script>

<template>
  <div class="flex flex-col gap-4">
    <UButton
      to="/docs/getting-started/introduction"
      color="neutral"
      variant="ghost"
      label="Docs"
      class="lg:hidden justify-start"
    />
    <UContentNavigation
      :highlight="contentNavVariants.highlight ?? true"
      :highlight-color="contentNavVariants.highlightColor"
      :variant="contentNavVariants.variant ?? 'link'"
      :color="contentNavVariants.color"
      :navigation="navigation"
    />
  </div>
</template>
