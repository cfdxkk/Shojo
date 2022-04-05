<template>
  <div>
    <h2>测试图片上传</h2>

    <el-upload
        class="avatar-uploader"
        :action="testImageUploadUrl"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
    </el-upload>

  </div>
</template>

<script>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
export default {
  name: "testImageUpload",
  data: () => {
    return {
      imageUrl : ref('')
    }
  },
  computed: {
    testImageUploadUrl() {return "http://" + this.$store.state.serverAddress + '/image/upload'},
  },
  methods: {
    handleAvatarSuccess( response, uploadFile ) {
      this.imageUrl.value = URL.createObjectURL(uploadFile.raw)
    },
    beforeAvatarUpload(rawFile) {
      if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
      } else if (rawFile.size / 1024 / 1024 > 50) {
        ElMessage.error('Avatar picture size can not exceed 50MB!')
        return false
      }
      return true
    }
  }
}
</script>

<style scoped>


.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}


.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}

</style>