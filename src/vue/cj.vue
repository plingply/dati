<template>
  <div class="content" ref="box">
    <div class="cj">
      <div class="top">
        <div class="cjtitle">{{ obj.title }}</div>
        <p style="text-align:center">当前得分</p>
        <p class="cjbox">{{ m.score }}</p>
        <p style="text-align:center">{{ obj.info }}</p>
      </div>
      <div class="bottom" v-show="m.grade_id != 0">
        <p>您获得奖品：{{ obj.prize_name }}</p>
        <img :src="obj.image" alt="">
        <div>请保持电话畅通，我们会通知您前来领奖</div>
      </div>
      <div class="bottom" v-show="m.grade_id == 0">
        <p class="wzj">您未中奖，请再接再厉！</p>
      </div>
      <!-- <button @click="closeFun" v-show="closebtn">关闭当前页面</button> -->
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    m() {
      return this.$store.state.m;
    },
    msg() {
      return this.$store.state.msg;
    }
  },
  data() {
    return {
      obj: {},
      closebtn:false
    };
  },
  methods:{
    closeFun(){
      WeixinJSBridge.call('closeWindow');
    }
  },
  created() {
    if(WeixinJSBridge){
      this.closebtn = true
    }
    this.msg.jiang.map(item => {
      if (item.id == this.m.grade_id) {
        this.obj = item;
      }
    });
  },
  mounted() {
    if (this.msg.hdbg_url != "") {
      this.$refs.box.style.backgroundImage = "url(" + this.msg.hdbg_url + ")";
    }
  }
};
</script>
