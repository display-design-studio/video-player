# Video Player - Custom Component
#### Custom component version of Vue Video Player, the scope of this project is to explore Web components and make an agnostic/"frameworkless" element.

#### To do:
- [ ] Create package/cdn only [jsdeliver](https://www.jsdelivr.com/?docs=gh) -> https://cdn.jsdelivr.net/gh/display-design-studio/video-player/js/index.min.js?
- [ ] Documentation
- [ ] Website preview

Nuxt example: 
```
<script setup>
definePageMeta({
  pageTransition,
});

useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/gh/display-design-studio/video-player/js/index.min.js",
      type: "module",
    },
  ],
});
</script>

<template>
  <video-player muted loop autoplay>
    <source
      slot="video"
      src="https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/cat.mp4"
      type="video/mp4"
      media="(min-width:901px)"
    />
    <source
      slot="video"
      src="https://res.cloudinary.com/demo/video/upload/q_auto,f_auto/dog.mp4"
      type="video/mp4"
      media="(max-width:900px)"
    />
    <div slot="controls" class="controls-wrapper">
      <div class="controls">
        <div class="controls__play-mute">
          <button data-video-player="play-button">play</button>
          <button data-video-player="mute-button">mute</button>
        </div>
        <div class="controls__time">
          <p data-video-player="current-time"></p>
          /
          <p data-video-player="duration"></p>
          <input
            data-video-player="progress-bar"
            type="range"
            min="0"
            max="100"
            value="0"
          />
        </div>
        <div class="controls__utils">
          <button data-video-player="fullscreen-button">Fullscreen</button>
          <button data-video-player="pip-button">Pip</button>
        </div>
      </div>
    </div>
  </video-player>
</template>

```
