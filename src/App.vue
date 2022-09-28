<template>
  <div id="app">
    <h2>basic</h2>
    <Ken ref="ken1" :cssStyle="customStyle"/>
    <button @click="play()">Play</button>
    <button @click="pause()">Pause</button>

    <h2>sprite-change</h2>
    <Ken ref="ken2" :cssStyle="customStyle"/>
    <button @click="kick()">Kick</button>

    <h2>sprite+translate</h2>
    <Ken ref="ken3" :cssStyle="customStyle"/>
    <button @click="leftMove">◀</button>
    <button @click="rightMove">►</button>
  </div>
</template>

<script>
import Ken from "./components/Ken";

export default {
  name: "App",
  components: {
    Ken
  },
  data() {
    return {
      customStyle: {
         width: "70px",
         height: "80px",
         backgroundImage: "url(https://uploads.codesandbox.io/uploads/user/50ba5672-ab19-466c-a1a4-38e62b5eb553/S5rk-ken.png)"
      },
    }
  },
  methods: {
    play() {
      this.$refs.ken1.spriteRestart(() => {
        this.$refs.ken1.basicGesture();
      });
    },
    pause() {
      this.$refs.ken1.spritePause();
    },
    kick() {
      this.$refs.ken2.kickGesture();
    },
    leftMove() {
      this.$refs.ken3.leftMove();
    },
    rightMove() {
      this.$refs.ken3.rightMove();
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h2 {
  text-align: left;
}
</style>
