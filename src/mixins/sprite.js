import Velocity from "velocity-animate";

export const Sprite = {
  data() {
    return {
      spriteElement: null,
      spriteStyle: null,
      spriteCss: {
        sx: 0,
        ex: 0,
        sy: 0,
        ey: 0,
        duration: 0,
        easing: 0,
        loop: false,
        queue: ""
      },
      currentScene: {
        x: 0,
        y: 0
      },
      save: true
    };
  },
  mounted() {
    this.spriteInit(this.$el);
  },
  computed: {
    spriteWidth() {
      return this.spriteStyle.width.slice(0, -2);
    },
    spriteHeight() {
      return this.spriteStyle.height.slice(0, -2);
    }
  },
  methods: {
    spriteInit(el) {
      // Init, config
      this.spriteElement = el;
      this.spriteStyle = window.getComputedStyle(this.spriteElement, null);
    },
    spritePlay(cb) {
      Velocity(
        this.spriteElement,
        {
          backgroundPositionX: [this.spriteCss.ex, this.spriteCss.sx],
          backgroundPositionY: [this.spriteCss.ey, this.spriteCss.sy]
        },
        {
          easing: [this.spriteCss.easing],
          duration: this.spriteCss.duration,
          loop: this.spriteCss.loop,
          queue: this.spriteCss.queue,
          complete: () => {
            if (this.save) {
              this.updateScene();
            }
            if (typeof cb === "function") {
              cb();
            }
          }
        }
      );
    },
    spritePause(cb) {
      if (this.save) {
        this.updateScene();
      }
      Velocity(this.spriteElement, "stop");
    },
    spriteRestart(cb) {
      // easing and duration depend on coordinates, so they need synchronization.
      let originEasing = Math.abs(this.spriteCss.ex / this.spriteWidth);
      this.spriteCss.easing = Math.abs(
        (this.spriteCss.ex - this.spriteCss.sx) / this.spriteWidth
      );
      this.spriteCss.duration =
        this.spriteCss.easing * (this.spriteCss.duration / originEasing);

      if (this.spriteCss.loop) {
        this.spriteCss.loop = false;
        this.spritePlay(() => {
          cb();
        });
      } else {
        this.spritePlay();
      }
    },
    updateScene() {
      const bp = this.spriteElement.style.backgroundPosition
        .trim()
        .split(/\s+/);
      const pos = {
        left: bp[0].slice(0, -2),
        top: bp[1].slice(0, -2)
      };
      this.spriteCss.sx = pos.left;
      this.spriteCss.sy = pos.top;
    },
    moveToX(sx, ex) {
      // start point change
      if (!isNaN(sx)) {
        this.spriteCss.sx = sx;
      }
      if (!isNaN(ex)) {
        this.spriteCss.ex = ex;
      }
    },
    moveToY(sy, ey) {
      if (sy) {
        this.spriteCss.sy = sy;
      }
      if (ey) {
        this.spriteCss.ey = ey;
      }
    },
    setLoop(v = true) {
      this.spriteCss.loop = v;
    },
    playTo(frame, duration, initFnc, callbackFnc) {
      // 1 dimension
      this.spriteCss.ex = -this.spriteWidth * frame;
      this.spriteCss.easing = Math.abs(
        (this.spriteCss.ex - this.spriteCss.sx) / this.spriteWidth
      );
      this.spriteCss.duration = duration;

      if (typeof init === "function") {
        initFnc();
      }

      this.spritePlay(callbackFnc);
    }
  }
};
