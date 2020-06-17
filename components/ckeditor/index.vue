<template>
    <div>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig" @ready="onReady" @blur="onEditorBlur"></ckeditor>
    </div>
</template>

<script>
import axios from 'axios'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

class MyUploadAdapter {
  constructor( loader ) {
    // Save Loader instance to update upload progress.
    this.loader = loader;
  }
 
  async upload() {
    const data = new FormData();
    data.append('typeOption', 'upload_image');
    data.append('file', await this.loader.file);
    return new Promise((resolve, reject) => {
      axios({
        url: `http://manyuem.cn/public/putObject`,
        method: 'post',
        data,
        withCredentials: true // true 为不允许带 token, false 为允许，可能会遇到跨域报错：Error: Network Error 弹窗提示（感谢@ big_yellow 指正）
      }).then(res => {
        const resData = res;
        resData.default = resData.data;
        resolve(resData);
      }).catch(error => {
        reject(error)
      });
    });
  }
}
    export default {
        data() {
            return {
                editor: ClassicEditor,
                editorData: '<p>离开后，会清空哦！</p>',
                editorConfig: {
                    // The configuration of the editor.
                    fontSize: {
                        options: [8, 9, 10, 11, 12, 'default', 14, 16, 18, 20, 22, 24, 26, 28, 36, 44, 48, 72],
                    },
                    highlight: {
                        options: [
                            { model: 'blackPen', class: 'pen-black', title: '黑色', color: 'var(--ck-highlight-pen-black)', type: 'pen' },
                            { model: 'redPenPen', class: 'pen-red', title: '红色', color: 'var(--ck-highlight-pen-red)', type: 'pen' },
                        ]
                    },
                    ckfinder: {
                        uploadUrl: `http://manyuem.cn/public/putObject`,
                        // 后端处理上传逻辑返回json数据,包括uploaded 上传的字节数 和url两个字段
                    },
                }
            };
        },
        methods:{
            onEditorBlur(){
                // 失去焦点后更新数据给父组件
                this.$emit('getEditorData',this.editorData)
            },
            onReady( editor ) {
                editor.plugins.get( 'FileRepository' ).createUploadAdapter = ( loader ) => {
                    return new MyUploadAdapter( loader );
                }
            }
        }
}
</script>
<style>
.ck-editor__editable { min-height: 100px; }
</style>