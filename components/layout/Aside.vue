<template>
  <UiScrollArea orientation="vertical" class="relative overflow-hidden h-full py-6 pr-6 text-sm" type="hover">
    <LayoutHeaderNavMobile v-if="isMobile" class="border-b pb-2 mb-5" />
    <LayoutSearchButton v-if="config.search.inAside" />

    <ul v-if="config.aside.useLevel" class="pb-4 border-b mb-1">
      <li v-for="link in navigation" :key="link.id">
        <NuxtLink :to="link._path" class="navigation-link">
          <Icon v-if="link.icon" :name="link.icon" class="link-icon" size="16" />
          {{ link.title }}
        </NuxtLink>
      </li>
    </ul>

    <LayoutAsideTree :links="tree" :level="0" class="px-3"
      :class="{ 'pt-4': config.aside.useLevel, 'pt-1': !config.aside.useLevel }" />
  </UiScrollArea>
</template>

<script setup lang="ts">
defineProps<{ isMobile: boolean }>();

const { navDirFromPath } = useContentHelpers();
const { navigation } = useContent();
const config = useConfig();

const tree = computed(() => {
  const route = useRoute();
  const path = route.path.split('/');
  if (config.value.aside.useLevel) {
    const leveledPath = path.splice(0, 2).join('/');

    const dir = navDirFromPath(leveledPath, navigation.value);
    return dir ?? [];
  }

  return navigation.value;
});


const path = useRoute().path;
</script>



<style scoped>
.navigation-link {
  display: flex;
  align-items: center;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0.25rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s, color 0.2s;
}

.navigation-link:hover {
  background-color: var(--color-muted);
}

.active-link {
  background-color: var(--color-muted);
  font-weight: 600;
  color: var(--color-primary);
}

.link-icon {
  margin-right: 0.5rem;
}
</style>