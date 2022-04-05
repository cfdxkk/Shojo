<template>
  <div>
    <h2 style="margin-left: 20px">
      测试上传2
    </h2>

    <!--accept定义接收的文件类型,这里只接受图片-->

    <input @change="uploading($event)" type="file" accept="image/*">

    <div style="width: 50px; height: 20px; border-radius: 3px; border: black solid 1px; background-color: lightgray" @click="submit($event)">上传</div>

    <div id="imagePreviewBox" style="width: 600px; height: 300px; border: black solid 1px; background-size:cover"></div>

  </div>
</template>

<script>
export default {
  name: "testImageUpload2",
  data () {
    return {
      file:'',
      src:''
    }
  },
  computed: {
    testImageUploadUrl() {return "http://" + this.$store.state.serverAddress + '/image/upload'},
  },
  methods:{
    uploading(event){
      this.file = event.target.files[0];//获取文件
      let windowURL = window.URL || window.webkitURL;
      this.file = event.target.files[0];
      //创建图片文件的url
      this.src = windowURL.createObjectURL(event.target.files[0]);
    },
    submit(){
      if (this.file !== null && this.file !== '') {
        let formData = new FormData();
        formData.append('file',this.file);
        //此处必须设置为  multipart/form-data
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'  //之前说的以表单传数据的格式来传递fromdata
          }
        };

        let imageBox = document.getElementById('imagePreviewBox')
        imageBox.style.backgroundImage = ''

        this.Axios.post(this.testImageUploadUrl, formData, config).then( (res) => {
          //做处理
          console.log('rrrrrrrrrrrrrrrr', res)
          this.file = null
          imageBox.style.backgroundImage = `url("${res.data}")`
        })
      } else {
        alert('请选择一个文件')
      }
    }
  }
}
</script>

<style scoped>

</style>