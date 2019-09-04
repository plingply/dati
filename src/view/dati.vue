<template>
  <div class="datibox">
    <div class="jindu">
      {{ index }}/{{ list.length}}
    </div>
    <div class="timubox">
      <span class="span1"></span>
      <span class="span2"></span>
      <span class="span3"></span>
      <span class="span4"></span>
      <div v-html="obj.question"></div>
    </div>
    <div class="anlist" :class="{active:q[index-1].select == 'A'}" @click="changedaan('A')">A
      <span>{{ obj.option_a }}</span>
    </div>
    <div class="anlist" :class="{active:q[index-1].select == 'B'}" @click="changedaan('B')">B
      <span>{{ obj.option_b }}</span>
    </div>
    <div class="anlist" :class="{active:q[index-1].select == 'C'}" @click="changedaan('C')">C
      <span>{{ obj.option_c }}</span>
    </div>
    <div class="anlist" :class="{active:q[index-1].select == 'D'}" @click="changedaan('D')">D
      <span>{{ obj.option_d }}</span>
    </div>
    <div class="nextbtn">
      <button class="sbtn1" type="button" @click="backFun" :class="{active:index>1}">上一题</button>
      <button class="sbtn2" type="button" @click="nextFun()" v-show="q[index-1].select && q[index-1].select != '' && index < q.length">下一题</button>
      <button class="sbtn2" type="button" @click="save" v-show="q[index-1].select && q[index-1].select != '' && index == q.length">完成</button>
      <button class="sbtn2" type="button" @click="nextFun()" v-show="!q[index-1].select || q[index-1].select == ''" disabled style="background:#ddd">下一题</button>
    </div>
  </div>
</template>
<script>
export default {
  computed: {
    msg() {
      return this.$store.state.msg;
    },
    q() {
      return this.$store.state.d;
    },
    lists() {
      return this.$store.state.list;
    }
  },
  data() {
    return {
      actived: "",
      index: 1,
      list: [],
      obj: {}
    };
  },
  methods: {
    changedaan(val) {
      var self = this;
      this.$store.commit("setd1", {
        index: self.index - 1,
        val: val
      });
    },
    getTimu() {
      this.$http
        .get("/api/weixin/hd/dati/" + this.$route.params.id + "/ti")
        .then(data => {
          this.list = data.data.list;
          this.obj = this.list[0];
          var q = [];
          this.list.map(item => {
            q.push({
              ti_id: item.id,
              select: ""
            });
          });
          this.$store.commit("setd", q);
        })
        .catch(err => {
          console.log(err);
        });
    },
    backFun() {
      if (this.index <= 1) {
        this.index = 1;
      } else {
        this.index--;
      }
      this.obj = this.list[this.index - 1];
    },
    nextFun() {
      if (this.q[this.index - 1] == "") return;
      if (this.index >= this.list.length) {
        this.index = this.list.length;
      } else {
        this.index++;
      }
      this.obj = this.list[this.index - 1];
    },
    save() {
      var score = Math.round(
        100 / (this.list.length === 0 ? 1 : this.list.length)
      );
      var s = 0;
      var index = 0;
      this.q.map((item, i) => {
        if (item.select != this.list[i].option_right) {
          s += score;
          index++;
        }
      });
      var gid = 0;
      var scl = 100 - (index === this.list.length ? 100 : s);
      this.msg.jiang.map(item => {
        if (scl >= item.score_low && scl <= item.score_high) {
          gid = item.id;
        }
      });

      var m = {
        score: scl,
        grade_id: gid
      };

      this.$store.commit("setm", m);

      this.$router.push({
        name: "information",
        params: {
          id: this.$route.params.id
        }
      });
    }
  },
  created() {
    if (this.lists.length > 0) {
      this.list = this.lists;
      this.obj = this.lists[0];
      var q = [];
      this.lists.map(item => {
        q.push({
          ti_id: item.id,
          select: ""
        });
      });
      this.$store.commit("setd", q);
    } else {
      this.getTimu();
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.msg.stop === 1) {
        this.$router.push({
          name: "index",
          params: { id: this.$route.params.id }
        });
      }
    });
  }
};
</script>
