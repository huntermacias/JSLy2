<template>
  <UiNavigationMenu>
    <UiNavigationMenuList>
      <UiNavigationMenuItem v-for="(item, i) in nav" :key="i">
        <template v-if="item.links">
          <ul class="flex gap-2 mt-2 relative">
            <!-- lamp effect -->
            <div class="absolute inset-x-0 bottom-[-8px] h-2 flex items-center justify-center">
              <div class="h-[6px] w-full bg-primary opacity-50 blur-md"></div>
              <div class="absolute h-[2px] w-full bg-primary opacity-5 blur-sm"></div>
            </div>
            <li v-for="link in item.links" :key="link.title">
              <NuxtLink :to="link.to" :target="link.target"
                class="px-3 py-1 mb-1 hover:bg-muted rounded-md w-full h-7 flex items-center justify-center transition-all shadow-md shadow-secondary border border-gray-300 dark:border-gray-800">
                <div class="font-semibold">
                  {{ link.title }}
                </div>
              </NuxtLink>
            </li>
          </ul>
        </template>
        <NuxtLink v-else :to="item.to" :target="item.target">
          <Icon name="lucide:arrow-up-right" class="absolute right-2 top-2 text-muted-foreground" size="13" />
          <div class="pr-6 font-semibold bg-transparent" :class="navigationMenuTriggerStyle()">
            {{ item.title }}
          </div>
        </NuxtLink>
      </UiNavigationMenuItem>
    </UiNavigationMenuList>
  </UiNavigationMenu>
</template>

<script setup lang="ts">
import { navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const { nav } = useConfig().value.header;
</script>
