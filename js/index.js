class VideoPlayer extends HTMLElement {
    constructor() {
        super();
        this.video = null;
        this.muted = this.hasAttribute('muted') || false;
        this.autoplay = this.hasAttribute('autoplay') || false;
        this.controls = this.hasAttribute('controls') || false;
        this.loop = this.hasAttribute('loop') || false;
        this.width = this.getAttribute('width') || '100%';
        this.height = this.getAttribute('height') || 'auto';
        this.poster = this.getAttribute('poster') || '';
        this.preload = this.getAttribute('preload') || 'auto';
        this.playsinline = this.hasAttribute('playsinline');
        this.sources = this.getAttribute('sources') ? JSON.parse(this.getAttribute('sources')) : [];

        const shadow = this.attachShadow({ mode: 'open' });

        this.init(shadow)
        this.events()
        this.setVideoSlotSources()

    }
    init(shadow) {
        shadow.innerHTML = `
          <style>
            :host {

            }
            video {
                width: 100%;
                height: auto;
                aspect-ratio: 16 / 9;
            }
          </style>
            <div class="player-video__wrapper">
                <video 
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
            </div>
        `;
    }
    events() {
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target.tagName === 'VIDEO') {
                this.clickOnVideo();
            }
        });

    }
    clickOnVideo() {
        console.log('clickOnVideo');
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

}


customElements.define('player-video', VideoPlayer);