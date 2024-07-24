<template>
  <header
    class="sticky top-0 z-40 bg-background/80 backdrop-blur-lg"
    :class="{ 'lg:border-b border-b': config.header.border }"
  >
    <div
      class="container mx-auto flex h-14 items-center px-4 md:px-8"
      :class="{ 'max-w-screen-2xl': config.main.padded }"
    >
      <!-- Logo for Desktop -->
      <LayoutHeaderLogo class="hidden md:flex flex-1" />

      <!-- Mobile Navigation and Logo -->
      <div class="flex items-center gap-2 lg:hidden">
        <LayoutMobileNav />
        <LayoutHeaderLogo v-if="config.header.showTitleInMobile" class="md:hidden" />
      </div>

      <!-- Navigation for Desktop -->
      <LayoutHeaderNav class="hidden lg:flex flex-1" />

      <!-- Right-Side Icons and Buttons -->
      <div class="flex flex-1 justify-end gap-2">
        <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'input'" />
        <div class="flex items-center gap-2">
          <LayoutSearchButton v-if="!config.search.inAside && config.search.style === 'button'" />
          <ThemePopover v-if="config.theme.customizable" />
          <DarkModeToggle v-if="config.header.darkModeToggle" />
          <NuxtLink
            v-for="(link, i) in config.header.links"
            :key="i"
            :to="link.to"
            :target="link.target"
          >
            <UiButton variant="ghost" size="icon" class="flex items-center gap-2">
              <Icon v-if="link.icon" :name="link.icon" size="18" />
            </UiButton>
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Table of Contents for Mobile -->
    <div v-if="config.toc.enable && config.toc.enableInMobile" class="lg:hidden">
      <LayoutToc is-small />
    </div>
  </header>
</template>

<script setup lang="ts">
const config = useConfig();
</script>

<style scoped>
header {
  transition: background-color 0.3s, border-color 0.3s;
}
.container {
  max-width: 100%;
}
@media (min-width: 1024px) {
  .container {
    max-width: 1280px;
  }
}
</style>
