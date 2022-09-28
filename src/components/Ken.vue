<template>
  <div :style="cssStyle" />
</template>

<script>
import { Sprite } from "@/mixins/sprite.js";

export default {
  name: "Ken",
  mixins: [Sprite],
  props: {
    cssStyle: {
      type: Object,
    },
  },
  data() {
    return {
      x: 0,
    };
  },
  mounted() {
    this.basicGesture();
  },
  methods: {
    basicGesture() {
      this.setLoop();
      this.moveToX(0);
      this.moveToY(-80, -80);
      this.playTo(3, 400);
    },
    kickGesture() {
      this.spritePause();
      this.setLoop(false);
      this.moveToX(0);
      this.moveToY(-480, -480);
      this.playTo(4, 300, null, () => {
        this.basicGesture();
      });
    },
    leftMove() {
      this.y -= 10;
      this.$el.style.transform = `translateX(${this.x}px)`;
    },
    rightMove() {
      this.y += 10;
      this.$el.style.transform = `translateX(${this.x}px)`;
    },
  },
};
</script>

<style lang="scss" scoped>
.slime {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .slime-box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 500px;
  }

  .slime-icon,
  .check {
    width: 164px;
    height: 164px;
  }

  .check {
    background: url("../img/check.png");
  }

  .slime-name {
    border-radius: 1rem;
    border: 1px solid;
    h4 {
      margin: 0.4rem 1.25rem;
    }
  }
}
</style>