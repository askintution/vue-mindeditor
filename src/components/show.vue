<template>
  <div>
    <div id="mySearch">

      <el-input v-model="query" clearable placeholder="搜索mind文件" @keyup.enter.native="search">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>

      <el-button type="primary" @click="toCreate()" style="float:right">新建mind</el-button>

    </div>

    <div id="ShowMinds">
      <el-scrollbar id="minds-ul">
        <li class='ShowMinds-mind' v-for="item in show.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          :key="item._id">
          <a style="" @click="toDetail(item._id)">{{ item.category }} - {{ item.title }}
          </a>

          <el-button type="primary" icon="el-icon-edit" @click="toEdit(item._id)" style="float:right"></el-button>
        </li>
        <el-pagination style="display:inline-block;margin:30px 0 0 100px;" @current-change="handleCurrentChange"
          :page-size="pageSize" :current-page="currentPage" layout="total, prev, pager, next"
          :total=" show.length"></el-pagination>

      </el-scrollbar>

    </div>
  </div>
</template>


<script>
export default {
  name: "ShowMinds",
  created() {
    this.get_minds();
  },
  data() {
    return {
      minds: [],
      show: [],
      pageSize: 50,
      currentPage: 1,
      query: ""
    };
  },
  methods: {
    search() {
      this.show = this.minds
        .filter(
          data =>
            !this.query ||
            data.title.toLowerCase().includes(this.query.toLowerCase())
        )
        .slice(
          (this.currentPage - 1) * this.pageSize,
          this.currentPage * this.pageSize
        );
    },
    get_minds() {
      this.$axios.get(`/data/mind/`).then(res => {
        this.minds = res.data;
        this.show = res.data;
      });
    },
    toDetail(id) {
      let detailUrl = this.$router.resolve({
        name: "editor",
        params: { id: id }
      });

      window.open(detailUrl.href, "_blank");
    },

    toEdit(id) {
      let detailUrl = this.$router.push({
        name: "mind",
        params: { id: id }
      });

      //   window.open(detailUrl.href, "_blank");
    },

    toCreate(id) {
      let detailUrl = this.$router.push({
        name: "mind",
        params: { id: "new" }
      });
      //   window.open(detailUrl.href, "_blank");
    },
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
    }
  }
};
</script>

<style>
#mySearch {
  position: relative;
  padding: 0 0 0 300px;
  margin: 0;
  vertical-align: top;
  display: inline-block;
  width: 50%;
}
#mySearch input {
  font-size: 16px;
  border-radius: 5px 0 0 5px;
}

#ShowMinds #minds-ul {
  display: inline-block;
  width: 60%;
}
#ShowMinds .ShowMinds-mind {
  position: relative;
  padding: 10px 20px 10px 70px;
  margin-bottom: 30px;
  line-height: 1.5em;
  font-size: 19px;
  box-shadow: 5px 5px 10px rgb(228, 227, 227);
  border-left: solid 12px rgb(255, 224, 199);
  box-sizing: border-box;
  transition: 0.4s;
}
#ShowMinds span {
  position: absolute;
  left: 40px;
  color: rgb(87, 87, 87);
}
#ShowMinds .ShowMinds-mind:hover {
  cursor: pointer;
  border-left: solid 12px rgb(253, 178, 116);
  transform: scale(1.03);
}
</style>
