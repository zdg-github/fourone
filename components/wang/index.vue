<template>
  <div id="wangeditor">
    <div ref="editorElem" style="text-align:left;" />
  </div>
</template>
<script>
import axios from 'axios'
import E from 'wangeditor'
export default {
  name: 'Editor',
  // catchData是一个类似回调函数，来自父组件，当然也可以自己写一个函数，主要是用来获取富文本编辑器中的html内容用来传递给服务端
  props: {
    catchData: {
      type: Function,
      default: null
    },
    content: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      editor: null,
      editorContent: ''
    }
  }, // 接收父组件的方法
  mounted() {
    this.editor = new E(this.$refs.editorElem)
    // 编辑器的事件，每次改变会获取其html内容
    this.editor.customConfig.onchange = html => {
      this.editorContent = html
      this.catchData(this.editorContent) // 把这个html通过catchData的方法传入父组件
    }
    this.editor.customConfig.menus = [
      // 菜单配置
      'head', // 标题
      'bold', // 粗体
      'fontSize', // 字号
      'fontName', // 字体
      'italic', // 斜体
      'underline', // 下划线
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'list', // 列表
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'image', // 插入图片
      'table', // 表格
      'code', // 插入代码
      'undo', // 撤销
      'redo' // 重复
    ]
    // 限制为一张
    this.editor.customConfig.uploadImgMaxLength = 1
    this.editor.customConfig.customUploadImg = function(files, insert) {
    // files 是 input 中选中的文件列表
    // insert 是获取图片 url 后，插入到编辑器的方法
      const data = new FormData()
      data.append('file', files[0])
      axios.post('http://manyuem.cn/public/putObject', data).then((res) => {
        insert(res.data)
      })
      // 上传代码返回结果之后，将图片插入到编辑器中
      // insert(imgUrl)
    }
    this.editor.create() // 创建富文本实例
    this.editor.txt.html(this.content)
  },
  methods: {
    flash(content) {
      this.editor.txt.html(content)
    }
  }
}
</script>
