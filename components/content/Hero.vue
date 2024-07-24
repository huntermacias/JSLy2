<template>
  <section
    class="hero-container mx-auto flex max-w-[980px] flex-col items-center gap-2 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
    <NuxtLink v-if="announcement" :to="announcement.to" :target="announcement.target"
      class="inline-flex items-center rounded-lg bg-muted px-3 py-1 text-sm font-medium">
      <template v-if="announcement.icon">
        <Icon :name="announcement.icon" size="16" />
        <UiSeparator class="mx-2 h-4" orientation="vertical" />
      </template>
      <span class="sm:hidden">{{ announcement.title }}</span>
      <span class="hidden sm:inline">
        {{ announcement.title }}
      </span>
      <Icon name="lucide:arrow-right" class="ml-1 h-4 w-4" />
    </NuxtLink>

    <h1 class="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
      <ContentSlot :use="$slots.title" unwrap="p" />
    </h1>
    <span class="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
      <ContentSlot :use="$slots.description" unwrap="p" />
    </span>

    <div class="bg absolute inset-0 -z-10  blur-3xl overflow-hidden">
      <div
        class=" ellipse aspect-[1.7] h-full w-full bg-gradient-to-r from-[rgb(var(--color-primary-DEFAULT))] to-white/80 lg:opacity-30 xs:opacity-50"
        style="clip-path: polygon(-10.0893% 93.4197%, 1.90807% 99.9044%, 20.3067% 55.4744%, 8.9527% 53.1652%, 96.1543% 47.7565%, 23.8094% 59.4113%, 46.4544% 17.2139%, 56.309% 87.2388%, 72.439% 53.1202%, 78.0015% 69.3929%, 13.3426% 41.8002%, 77.5346% 65.7295%, 28.7536% 26.3882%, 54.0914% 28.6241%, 99.0899% 44.3881%, 44.1751% 47.1269%);">
      </div>
    </div>

    <section class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10">
      <NuxtLink v-for="(action, i) in actions" :key="i" :to="action.to" :target="action.target">
        <UiButton :variant="action.variant">
          <Icon v-if="action.leftIcon" :name="action.leftIcon" class="mr-1" />
          {{ action.name }}
          <Icon v-if="action.rightIcon" :name="action.rightIcon" class="ml-1" />
        </UiButton>
      </NuxtLink>
    </section>

    <!-- card section -->
    <!-- <section>
  <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
    <div
      v-for="(card, index) in cards"
      :key="index"
      class="card"
      @mousemove="updatePosition"
      @mouseleave="resetHighlight"
    >
      <div class="card-inner flex flex-col overflow-hidden rounded-xl divide-y divide-gray-200 dark:divide-gray-800 transition-colors duration-300">
        <div class="card-content flex flex-col p-4 sm:p-6 space-y-4">
          <div class="icon-container mb-2">
            <span class="icon text-gray-900 dark:text-white text-2xl">⚡</span>
          </div>
          <p class=" text-gray-900 dark:text-white text-base font-bold truncate">Easy to use</p>
          <p class=" text-gray-500 dark:text-gray-300 text-sm mt-1">
            Focus on writing your <em>documentation</em> with Markdown, not tooling.
          </p>
        </div>
      </div>
    </div>
  </div>
</section> -->


  </section>
</template>

<script setup lang="ts">
defineProps<{
  announcement?: {
    to?: string;
    target?: string;
    icon?: string;
    title: string;
  };
  actions: [{
    name: string;
    leftIcon?: string;
    rightIcon?: string;
    variant?: 'default' | 'link' | 'destructive' | 'outline' | 'secondary' | 'ghost';
    to: string;
    target?: string;
  }];
}>();

import { ref } from 'vue';

const cards = ref([
  { title: 'Card 1', content: 'Content 1', description: 'Description 1' },
  { title: 'Card 2', content: 'Content 2', description: 'Description 2' },
  { title: 'Card 3', content: 'Content 3', description: 'Description 3' },
]);

const updatePosition = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  const rect = card.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  const distanceX = Math.abs(x - centerX);
  const distanceY = Math.abs(y - centerY);
  const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);
  const proximity = 1 - (Math.sqrt(distanceX * distanceX + distanceY * distanceY) / maxDistance);
  const brightness = 50 + (250 * proximity);

  const gradient = `radial-gradient(circle at ${x}px ${y}px, hsl(var(--primary)), rgba(255, 255, 255, 0.05))`;
  card.style.setProperty('--card-gradient', gradient);

  card.style.setProperty('--border-top-color', `hsla(var(--primary), ${brightness}%)`);
  card.style.setProperty('--border-bottom-color', `hsla(var(--primary), ${brightness}%)`);
  card.style.setProperty('--border-left-color', `hsla(var(--primary), ${brightness}%)`);
  card.style.setProperty('--border-right-color', `hsla(var(--primary), ${brightness}%)`);
};

const resetHighlight = (event: MouseEvent) => {
  const card = event.currentTarget as HTMLElement;
  card.style.removeProperty('--border-top-color');
  card.style.removeProperty('--border-bottom-color');
  card.style.removeProperty('--border-left-color');
  card.style.removeProperty('--border-right-color');
};
</script>

<style scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  background-color: var(--bg-color, white);
  background: var(--card-gradient, hsl(var(--primary)));
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease, border-color 0.3s ease;
  border: 0.5px solid transparent;
}
.card-inner {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: var(--card-gradient, hsl(var(--primary)));
}

.hero-container {
  position: relative;
}

.ellipses-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  pointer-events: none;
  overflow: hidden;
}

@keyframes moveEllipse {

  0%,
  100% {
    transform: translate(0, 0) scale(1) rotate(0deg);
    opacity: 1;
  }

  20% {
    transform: translate(300px, -300px) scale(2.5) rotate(45deg);
    opacity: 0.8;
  }

  40% {
    transform: translate(300px, -150px) scale(1.8) rotate(90deg);
    opacity: 0.6;
  }

  60% {
    transform: translate(-300px, 150px) scale(2) rotate(135deg);
    opacity: 0.4;
  }

  80% {
    transform: translate(-500px, 300px) scale(1.5) rotate(180deg);
    opacity: 0.5;
  }
}


.ellipse {
  position: absolute;
  background: linear-gradient(to right, hsl(var(--primary)), rgba(255, 255, 255, 0.1));
  filter: blur(3xl);
  animation: moveEllipse 20s infinite cubic-bezier(0.42, 0, 0.58, 1);
}
</style>






