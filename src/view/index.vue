<template>
  <div ref="box" class="content">
    <h1 class="title">
      {{ msg.title }}
    </h1>

    <button class="btn" @click="$router.push({name:'answering',params:{id:msg.id}})" v-if="msg.stop !== 1">开始答题</button>
    <div class="hdgzbox">
      <div class="banner"></div>
      <div class="line"><img src="static/img/line.png" alt=""></div>
      <div class="cbox" ref="cbox" v-html="msg.info"></div>
      <div class="line"><img src="static/img/line.png" alt=""></div>
      <div class="time">
        活动时间：{{ msg.start_time | yy_mm_dd }} 至 {{ msg.end_time | yy_mm_dd }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    msg() {
      return this.$store.state.msg;
    }
  },
  mounted() {
    this.$refs.cbox.style.height =
      document.documentElement.clientHeight - 340 + "px";
      if(this.msg.hdbg_url != ''){
        this.$refs.box.style.backgroundImage = 'url('+this.msg.hdbg_url+')'
      }
    this.$refs.box.style.height = document.documentElement.clientHeight + "px";

    this.$nextTick(() => {
      if (this.msg.stop === 1) {
        alert("活动已暂停");
      }
    });
  }
};
</script>
