class VideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.video = null;
        this.playButton = null;
        this.muteButton = null;
        this.fullscreenButton = null;
        this.pipButton = null;
        this.progressBar = null;
        this.durationElement = null;
        this.currentTimeElement = null;
        this.duration = 0;
        this.progressValue = 0;
        this.muted = this.hasAttribute('muted') || false;
        this.autoplay = this.hasAttribute('autoplay') || false;
        this.controls = this.hasAttribute('controls') || false;
        this.loop = this.hasAttribute('loop') || false;
        this.width = this.getAttribute('width') || '100%';
        this.height = this.getAttribute('height') || 'auto';
        this.poster = this.getAttribute('poster') || '';
        this.preload = this.getAttribute('preload') || 'auto';
        this.playsinline = this.hasAttribute('playsinline');

        //Shadow DOM
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
                <video data-video-player="video"
                    ${this.muted && 'muted'}
                    ${this.autoplay && 'autoplay'}
                    ${this.controls && 'controls'}
                    ${this.loop && 'loop'}
                    ${this.poster && `poster="${this.poster}"`}
                    ${this.preload && 'preload'}
                    ${this.playsinline && 'playsinline'}
                    width="${this.width}"
                    height="${this.height}" 
                >
                </video>
                <slot name="video" style="display: none;"></slot> 
                <slot name="controls"></slot>
        `;
    }
    connectedCallback() {
        this.video = this.shadowRoot.querySelector('[data-video-player="video"]');
        this.playButton = this.querySelector('[data-video-player="play-button"]');
        this.muteButton = this.querySelector('[data-video-player="mute-button"]');
        this.fullscreenButton = this.querySelector('[data-video-player="fullscreen-button"]');
        this.pipButton = this.querySelector('[data-video-player="pip-button"]');
        this.progressBar = this.querySelector('[data-video-player="progress-bar"]');
        this.durationElement = this.querySelector('[data-video-player="duration"]');
        this.currentTimeElement = this.querySelector('[data-video-player="current-time"]');

        this.setVideoSlotSources();
        this.events();
    }
    setVideoSlotSources() {
        const slot = this.shadowRoot.querySelector('slot[name="video"]');
        const video = this.shadowRoot.querySelector('video');

        slot.addEventListener('slotchange', () => {
            const sources = slot.assignedElements();
            video.innerHTML = '';
            sources.forEach(source => {
                if (source.tagName.toLowerCase() === 'source') {
                    video.appendChild(source.cloneNode(true));
                }
            });
        });
    }
    events() {
        this.video.addEventListener('loadedmetadata', () => {
            this.duration = this.video.duration;
            if (this.currentTimeElement) this.currentTimeElement.textContent = `00:00`
            if (this.durationElement) this.durationElement.textContent = this.convertTimeToDuration(this.duration);
            if (this.progressBar) this.progressValue;
        });
        this.video.addEventListener('timeupdate', () => {
            this.progressValue = (this.video.currentTime / this.video.duration) * 100
            if (this.currentTimeElement) this.currentTimeElement.textContent = this.convertTimeToDuration(this.video.currentTime);
            if (this.progressBar) this.progressBar.value = this.progressValue;
        });
        this.video.addEventListener('click', () => {
            this.toggleVideoPlay();
        })
        this.playButton.addEventListener('click', () => {
            this.toggleVideoPlay();
        })
        this.muteButton.addEventListener('click', () => {
            this.toggleVideoMute();
        })
        this.fullscreenButton.addEventListener('click', () => {
            this.toggleFullscreen();
        })
        this.pipButton.addEventListener('click', () => {
            this.togglePip();
        })
        this.progressBar.addEventListener('input', (event) => {
            this.video.currentTime = (event.target.value / 100) * this.video.duration;
        })
    }
    toggleVideoPlay() {
        this.video.paused ? this.video.play() : this.video.pause();
        this.playButton.classList.toggle('paused');
    }
    toggleVideoMute() {
        this.video.muted = !this.video.muted;
        this.muteButton.classList.toggle('muted');
    }
    toggleFullscreen() {
        if (this.video.requestFullscreen) {
            this.video.requestFullscreen();
        } else if (this.video.webkitRequestFullscreen) {
            this.video.webkitRequestFullscreen();
        } else if (this.video.msRequestFullscreen) {
            this.video.msRequestFullscreen();
        }
    }
    togglePip() {
        if (this.video.requestPictureInPicture) {
            this.video.requestPictureInPicture();
        }
    }
    convertTimeToDuration(seconds) {
        return [Math.floor((seconds / 60) % 60), Math.floor(seconds % 60)]
            .map(num => num.toString().padStart(2, "0"))
            .join(":");
    }
}
customElements.define('video-player', VideoPlayer);