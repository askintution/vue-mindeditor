<template lang="html">
  <div class="mind-editor"></div>
</template>

<script>
import { mapActions, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {
      title: "",
      old_doc: {},
      new_doc: {}
    };
  },
  async mounted() {
    var Editor = require("../../script/editor");
    var el = this.$el;
    var editor = (window.editor = new Editor(el));
    this.setEditor(editor);

    window.minder = window.km = editor.minder;
    this.setMinder(editor.minder);

    console.log("set editor");

    let res = await this.$axios.get(`/data/mind/${this.$route.params.id}`);
    if (
      res.data &&
      res.data.data &&
      res.data.data.root &&
      res.data.data.root.data
    ) {
      console.log(res.data.data.root.data.text);

      document.title = res.data.data.root.data.text;
    }
    let text = res.data;
    this.title = text.title;
    if (!text.hasOwnProperty("data")) {
      let res = await this.$axios.post(`/data/mind/${this.$route.params.id}`, {
        data: editor.minder.exportJson(),
        title: this.title,
        type: "create"
      });
    } else {
      editor.minder.importJson(text.data);
    }

    this.old_doc = editor.minder.exportJson();

    editor.minder.on("contentchange", async () => {
      this.new_doc = editor.minder.exportJson();
      let opdata = this.jsonpatch.compare(this.old_doc, this.new_doc);
      console.log("更新内容");

      if (opdata.length > 0) {
        let temp = Object.assign({}, this.old_doc);
        this.old_doc = this.new_doc;
        let res = await this.$axios.post(
          `/data/mind/${this.$route.params.id}`,
          {
            data: opdata,
            title: this.title,
            type: "increment"
          }
        );
        let text = res.data;
        if (text == "更新成功") {
          this.$message({
            message: res.data,
            type: "success"
          });
        } else {
          this.old_doc = temp;
        }
      }

      // window.localStorage.mindText = JSON.stringify(editor.minder.exportJson());
    });

    // if (window.localStorage.mindText) {
    //   console.log("test");
    // }

    this.executeCallback();
  },
  computed: {
    ...mapGetters(["minder"])
  },
  methods: {
    ...mapActions(["executeCallback"]),
    ...mapMutations(["setMinder", "setEditor"])
  }
};
</script>

<style lang="scss">
@import "../../style/editor.scss";
</style>
