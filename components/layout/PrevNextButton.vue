<template>
  <NuxtLink v-if="prevNext && prevNext._path" :to="prevNext._path"
    class="basis-full lg:basis-1/3 max-w-xs mx-auto lg:mx-0">
    <div class="border p-4 rounded-lg hover:bg-muted/50 transition-all mb-4">
      <div class="flex items-center gap-3">
        <div v-if="side === 'left'" class="flex h-6 w-6 min-w-6">
          <Icon name="lucide:arrow-left" size="20" class="self-center mx-auto" />
        </div>
        <div class="flex-1">
          <div class="text-lg font-semibold">
            {{ prevNext.title }}
          </div>
          <div v-if="prevNext.description" class="text-sm text-muted-foreground ">
            {{ prevNext.description.substring(0, 60) }}...
          </div>
        </div>
        <div v-if="side === 'right'" class="flex h-6 w-6 min-w-6 ml-auto">
          <Icon name="lucide:arrow-right" size="20" class="self-center mx-auto" />
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
defineProps<{
  prevNext: {
    _path: string;
    title: string;
    description?: string;
  };
  side: 'left' | 'right';
}>();
</script>
