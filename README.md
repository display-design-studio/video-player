# Video Player - Custom Element
### The scope of this project is to explore web components and create a framework-agnostic video player element.

### Props:
| Prop | Type | Default |
|------|------|---------|
| `muted` | Boolean | `false` |
| `autoplay` | Boolean | `false` |
| `controls` | Boolean | `false` |
| `loop` | Boolean | `false` |
| `width` | String | `"100%"` |
| `height` | String | `"auto"` |
| `poster` | String | `""` |
| `preload` | String | `"auto"` |
| `playsinline` | Boolean | `false` |

### How to use:
#### HTML
Import script in body tag.
```HTML
  <body>
      ...your code
    <script
        src="https://cdn.jsdelivr.net/gh/display-design-studio/video-player/js/index.min.js"
        type="module">
    </script>
  </body>
```

Add `<video-player>` element to your HTML.

Important! `slot="video"` is needed to add your video sources inside custom element.
```HTML
<div class="container">
    <video-player muted loop autoplay>
        <!--  Insert your video sources -->
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
        <!--  Insert your custom controls [slot="controls"] -->
    </video-player>
</div>
```

You can add your custom controls inside the `<video-player>` element.

Important! `data-video-player="VALUE"` is to manage the logic of the controls, so do not modify it or the component will not work.

Thanks to this attribute, values are hung on the element like:

| Value | Description |
|-------|-------------|
| current-time | current time of the video |
| duration | duration of the video |
| progress-bar | progress bar of the video |

```HTML
<div slot="controls" class="controls-wrapper">
    <div class="controls">
        <div class="controls__play-mute">
            <button data-video-player="play-button"></button>
            <button data-video-player="mute-button"></button>
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
```
Now you can style your video player with CSS.

The only trick is to style the video tag like this, to access the tag inside the custom element:
```CSS
video-player::part(video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
```

The rest is completely customizable.

As you can see pause and mute are inserted as class automatically based on their status, use them to customize the buttons as you like.
```CSS
<style>
video-player {
  display: block;
  width: 100%;
  height: 100svh;
  position: relative;
  overflow: hidden;
}

video-player::part(video) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.controls-wrapper {
  position: absolute;
  bottom: 10px;
  left: 0;
  width: 100%;
}

.controls {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-inline: 10px;

  .controls__play-mute {
    width: fit-content;

    [data-video-player="play-button"].paused:before {
      content: "Play";
    }

    [data-video-player="play-button"]:before {
      content: "Pause";
    }

    [data-video-player="mute-button"].muted:before {
      content: "Unmute";
    }

    [data-video-player="mute-button"]:before {
      content: "Mute";
    }
  }

  .controls__time {
    width: fit-content;
    display: flex;
    gap: 5px;
    flex: 1;

    [data-video-player="progress-bar"] {
      width: 100%;
    }
  }

  .controls__utils {
    width: fit-content;
  }
}
</style>
```
---
#### Nuxt
Register the custom element as a vue component.
```ts
export default defineNuxtConfig({
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => ["video-player"].includes(tag),
    },
  },
});
```

And simply use it in your template.
```vue
<script setup>
useHead({
  script: [
    {
      src: "https://cdn.jsdelivr.net/gh/display-design-studio/video-player/js/index.min.js",
      type: "module",
      tagPosition: "bodyClose",
    },
  ],
});
</script>

<template>
  <video-player muted loop autoplay>
    ...
  </video-player>
</template>
