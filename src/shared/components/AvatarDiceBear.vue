<script setup lang="ts">
import { computed } from 'vue'
import { Avatar, Style } from '@dicebear/core'
import adventurerNeutral from '@dicebear/styles/adventurer-neutral.json' with { type: 'json' }

defineOptions({
  name: 'AvatarDiceBear',
})

const props = withDefaults(
  defineProps<{
    alt?: string
    seed: string
    size?: number
  }>(),
  {
    alt: 'Avatar de usuario',
    size: 64,
  },
)

const estiloAvatar = new Style(adventurerNeutral)

const avatar = computed(() =>
  new Avatar(estiloAvatar, {
    seed: props.seed || 'avatar-por-defecto',
    size: props.size,
  }).toDataUri(),
)
</script>

<template>
  <img
    :src="avatar"
    :alt="alt"
    :width="size"
    :height="size"
  />
</template>
