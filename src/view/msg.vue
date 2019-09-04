<template>
  <div class="content" ref="box">
    <div class="msgtitle title">恭喜你完成答题</div>
    <div class="tishi">提交信息后就可以查看成绩</div>
    <div class="formbox">
      <input
        type="text"
        :placeholder="'请输入'+item.field_name"
        v-model="item.val"
        :key="index"
        v-for="(item,index) in arr"
      />
    </div>
    <button type="button" class="btn1" @click="save">查看成绩</button>
  </div>
</template>
<script>
export default {
  computed: {
    msg() {
      return this.$store.state.msg;
    },
    m() {
      return this.$store.state.m;
    },
    d() {
      return this.$store.state.d;
    }
  },
  data() {
    return {
      arr: [{ val: "" }]
    };
  },
  methods: {
    save() {
      var self = this;
      if (this.m.score === "") {
        this.$router.push({
          name: "answering",
          parasm: {
            id: this.$route.params.id
          }
        });
        return;
      }
      var query = this.d;
      console.log(this.d);
      for (var i = 0; i < this.arr.length; i++) {
        if (this.arr[i].val == "") {
          alert(this.arr[i].field_name + "不能为空");
          return;
        }
        if (this.arr[i].field_name == "联系电话") {
          if (!/^1[1234567890]\d{9}$/.test(this.arr[i].val)) {
            alert("手机号码有误，请重填");
            return false;
          }
        }
      }

      var f = new FormData();
      f.append("name", this.arr[0].val);
      f.append("phone", this.arr[1].val);
      f.append("score", this.m.score);
      f.append("grade_id", this.m.grade_id);
      for (var k = 2; k < this.arr.length; k++) {
        f.append("more_field[" + (k - 2) + "][field_value]", this.arr[k].val);
      }
      query.map((item, index) => {
        f.append("ti[" + index + "][ti_id]", item.ti_id);
        f.append("ti[" + index + "][select]", item.select);
      });
      this.$http
        .post("/api/weixin/hd/dati/" + this.$route.params.id, f)
        .then(data => {
          if (data.status == "ok") {
            this.$router.push({
              name: "achievement",
              params: {
                id: self.$route.params.id
              }
            });
          } else {
            alert(data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          alert("网络错误");
        });
    }
  },
  created() {
    var arr = [
      {
        val: this.msg.name,
        field_name: "学生姓名"
      },
      {
        val: this.msg.phone,
        field_name: "联系电话"
      }
    ];
    if (this.msg.more_field) {
      this.msg.more_field.map(item => {
        arr.push({
          val: "",
          field_name: item.field_name
        });
      });
    }
    this.arr = arr;
  },
  mounted() {
    this.$refs.box.style.height = document.documentElement.clientHeight + "px";
    if (this.msg.hdbg_url != "") {
      this.$refs.box.style.backgroundImage = "url(" + this.msg.hdbg_url + ")";
    }
  }
};
</script>
