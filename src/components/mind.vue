<template>
  <div>
    <el-input v-model="title" placeholder="输入mind标题" style='width:500px;margin-bottom:10px'></el-input>
    <el-input v-model="category" placeholder="输入类别名称" style='width:500px;margin-bottom:10px'></el-input>
    <el-input type="textarea" :rows="20" placeholder="请输入内容" v-model="mind_json">
    </el-input>
    <el-button @click="pushData" type='primary' size='small' style='margin-right:40px;'>{{btn}}</el-button>
  </div>

</template>

<script>
export default {
  name: "Edit",
  data() {
    return {
      title: "",
      category: "",
      mind_json: "",
      isNew: true
    };
  },
  computed: {
    btn: function() {
      return (this.isNew ? "发表" : "更新") + "Mind";
    }
  },
  created() {
    console.log(this.$route.params.id);
    if (this.$route.params.id != "new") {
      this.isNew = false;
    }
    console.log(this.isNew);
  },
  mounted() {
    if (!this.isNew) {
      this.$axios.get(`/data/mind/${this.$route.params.id}`).then(res => {
        this.title = res.data.title;
        this.category = res.data.category;
        this.mind_json = JSON.stringify(res.data.data);
      });
    }
  },
  methods: {
    pushData() {
      //更新数据
      if (!this.isNew) {
        this.$axios
          .post(`/data/mind/${this.$route.params.id}`, {
            title: this.title,
            category: this.category,
            data: JSON.parse(this.mind_json),
            type: "create"
          })
          .then(res => {
            let detailUrl = this.$router.push({
              name: "editor",
              params: { id: this.$route.params.id }
            });
          });
      } else {
        //创建数据
        this.$axios
          .post(`/data/mind/new`, {
            title: this.title,
            category: this.category,
            data: JSON.parse(this.mind_json)
          })
          .then(res => {
            let id = res.data._id;
            let detailUrl = this.$router.push({
              name: "editor",
              params: { id: id }
            });
          });
      }
    }
  }
};
</script>

<style>
.CodeMirror-scroll {
  min-height: 350px;
  height: 350px;
}
</style>