<template>
  <div>
    <h2 style="margin-left: 20px">
      测试上传3
    </h2>

    <a class="btn" @click="toggleShow">设置头像</a>

    <crop-upload
        field="file"
        @crop-success="cropSuccess"
        @crop-upload-success="cropUploadSuccess"
        @crop-upload-fail="cropUploadFail"
        v-model="show"
        :width="300"
        :height="300"
        :url="testImageUploadUrl"
        :params="params"
        :headers="headers"
        :max-size="maxSize"
        img-format="png"
        :withCredentials="false"
        :need-origin-img="true"
    ></crop-upload>

    <div id="avBox" style="width: 500px; height: 500px; border: black solid 1px; background-size: cover"></div>

  </div>
</template>

<script>
import cropUpload from '../upload/vue-image-crop-upload/upload-3'
export default {
  name: "testImageUpload3",
  components: {
    cropUpload

  },
  data: () => {
    return {
      show: false,
      params: {
        userId: 'userrrrr',
        token: 'tokennnnnnnnnnnnnnn'
      },
      headers: {
        // 'Content-Type': 'multipart/form-data',
        // 'Access-Control-Allow-Origin': '*',
        // 'withCredentials': false,
      },
      imgDataUrl: '', // the datebase64 url of created image
      maxSize: 50 // maxSize (MB)
    }
  },
  computed: {
    testImageUploadUrl() {return "http://" + this.$store.state.serverAddress + '/group/avatar'},
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    /**
     * crop success
     *
     * [param] imgDataUrl
     * [param] field
     */
    cropSuccess(imgDataUrl, field){
      console.log('-------- crop success --------');
      this.imgDataUrl = imgDataUrl;
      console.log('fieldddddddddddddddddddddddddddddd',field)
    },
    /**
     * upload success
     *
     * [param] jsonData   服务器返回数据，已进行json转码
     * [param] field
     */
    cropUploadSuccess(jsonData, field, imgDataUrl){
      console.log('-------- upload success --------');
      console.log(jsonData);
      console.log('field: ',field);
      console.log('createImgUrl', imgDataUrl)

      document.getElementById('avBox').style.backgroundImage = `url("${imgDataUrl}")`
    },
    /**
     * upload fail
     *
     * [param] status    server api return error status, like 500
     * [param] field
     */
    cropUploadFail(status, field){
      console.log('-------- upload fail --------');
      console.log(status);
      console.log('field: ' + field);
    }
  }
}
</script>

<style scoped>

</style>