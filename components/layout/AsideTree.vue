<template>
  <ul class="navigation-tree" :class="{ 'nested-level': level > 0 }">
    <LayoutAsideTreeItem v-for="link in links" :key="link._id" :link="link" :level="level" />
  </ul>
</template>

<script setup lang="ts">
import type { NavItem } from '@nuxt/content';

defineProps<{
  links: NavItem[];
  level: number;
}>();
</script>

<style scoped>
.navigation-tree {
  padding: 0.525rem 0;
}

.nested-level {
  border-left: 1px solid var(--color-border);
  margin-left: -0.4rem;
  padding-left: 0.5rem;
}
</style>
