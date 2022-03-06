<template>
  <div id="signInBox" class="signInBox" v-if="!this.$store.state.logged" @click="openSignInPopup">登录</div>

  <div class="userInfo" v-if="this.$store.state.logged">
    <div class="userNameBox">
      <div class="userNameEllipsisBox">
        {{this.username}}
      </div>
    </div>
  </div>

  <div class="signPopup" v-if="signInVisible" @click.self="closeSignInPopup">
    <div class="signPopupBox">

      <div class="userSignText">用户登录</div>

      <div class="usernameInputBox">
        <input type="text" id="userNameSignInInput" class="userNameInput" placeholder="在此输入用户名">
      </div>

      <div class="passwordInputBox">
        <input type="password" id="passwordSignInInput" class="passwordInput" placeholder="在此输入密码">
      </div>

      <div class="signButton" @click="login">
        登录
      </div>
      <div class="closeButton" @click="closeSignInPopup">
        取消
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: "User",
  data: () => {
    return {
      signInVisible: false,
      signUpVisible: false,
      // logged: false,

      username: '',
    }
  },
  computed: {
    loginURL(){ return "http://" + this.$store.state.serverAddress + "/user/login"},
    checkTokenUrl(){ return "http://" + this.$store.state.serverAddress + "/user/tokenCheck"},
  },
  methods: {
    openSignInPopup: function (){
      this.signInVisible = true
    },
    closeSignInPopup: function (){
      this.signInVisible = false
    },
    //登录，能往cookie里存储token（包含管理员flag）
    login(){
      let username = document.getElementById('userNameSignInInput').value
      let password = document.getElementById('passwordSignInInput').value



      let loginData = {
        username,
        password
      }

      this.Axios.post(this.loginURL,loginData).then(data => {
        let cookieStr = "admininfo="+username+"-"+data.data+"-"+"admin"+"; expires=Thu, 18 Dec 2043 12:00:00 GMT"
        document.cookie = cookieStr
        this.signInVisible = false
        this.checkLoginStatus()
      })
    },
    checkLoginStatus (){
      // 获取cookie
      let cookie = document.cookie
      if (cookie !== ''){
        // 从cookie中获取uuid和token
        let trueCookie = ''
        cookie.split('; ').forEach(ogtCookie => {
          if (ogtCookie.indexOf('admininfo=') !== -1){
            trueCookie = ogtCookie
          }
        })
        let cookieArray = (trueCookie.split('=')[1]).split('-');
        let username = cookieArray[0]
        let UUID = cookieArray[1]
        let token = cookieArray[2]
        let adminFlag = cookieArray[3]


        let checkTokenData = {
          userId: UUID,
          userToken: token
        }

        let _this = this;
        this.Axios.post(this.checkTokenUrl,checkTokenData).then(data => {
          if (data.data === true){
            if (adminFlag === 'admin'){
              _this.$store.commit('updateLogged', true)
              this.username = username
            }
          }
        })

      }

    },
  },
  mounted() {
    this.checkLoginStatus()
  }
}
</script>

<style scoped>

.signInBox {
  position: absolute;
  right: 20px;

  height: 100%;
  width: 40px;

  cursor: pointer;

  display: grid;
  align-items: center;
}


.signPopup {
  position: fixed;
  left: var(--zero-pixel);
  top: var(--zero-pixel);

  height: var(--full-screen-height);
  width: var(--full-screen-width);

  background-color: #000000AA;

  z-index: var(--top-layer);

  display: grid;
  align-items: center;
  justify-items: center;
}

.signPopupBox {
  height: 300px;
  width: 400px;
  border-radius: 10px 10px;

  background-color: #dadada;

  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  align-items: center;
}

.userSignText {
  color: black;
  font-size: 30px;
}


.userInfo {
  position: absolute;
  right: 20px;
  height: 100%;
  width: 150px;
}

.userNameBox {
  height: 100%;
  width: 100%;

  display: grid;
  align-items: center;
  justify-items: end;
}

.userNameEllipsisBox {
  width: 100%;

  text-align: right;

  text-overflow:ellipsis; /* 文字超出长度会被截取并添加... */
  white-space: nowrap;
  overflow: hidden;

  display: block;
}

.usernameInputBox {
  /*position: relative;*/
  /*top: 20px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 300px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: white;

  display: grid;
  align-items: center;
  justify-items: center;
}

.userNameInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  color: black;
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: white;
}
.userNameInput::-webkit-input-placeholder {
  font-size: 18px;
  color: black;
}


.passwordInputBox {
  /*position: relative;*/
  /*top: 40px;*/
  /*left: 40px;*/

  margin-top: 10px;
  width: 300px;
  height: 50px;

  border-radius: 5px 5px;
  background-color: #eeeeee;

  display: grid;
  align-items: center;
  justify-items: center;
}

.passwordInput {
  width: 97.5%;
  height: 88%;

  font-size: 18px;
  color: black;
  border: 0;
  outline:none;
  border-radius: 5px 5px;
  background-color: white;
}
.passwordInput::-webkit-input-placeholder {
  font-size: 18px;
  color: black;
}

.signButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin-top: 10px;
  margin-left: 5px;
  width: 100px;
  height: 40px;

  margin-bottom: 30px;

  font-size: 18px;
  color: black;
  border: 2px solid black;
  border-radius: 5px 5px;
  background-color: white;
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.signButton:hover {
  color: black;
  border: 2px solid #e8ffc6;
}



.closeButton {
  /*position: relative;*/
  /*top: 8px;*/
  /*left: 40px;*/

  margin-top: 10px;
  margin-right: 5px;
  width: 100px;
  height: 40px;

  margin-bottom: 30px;

  font-size: 18px;
  color: black;
  border: 2px solid black;
  border-radius: 5px 5px;
  background-color: white;
  cursor: pointer;

  display: grid;
  align-items: center;
  justify-items: center;
}

.closeButton:hover {
  background-color: #FF00004A;
  color: red;
  border: 2px solid red;
}


</style>