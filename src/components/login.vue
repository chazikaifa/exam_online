<template>
  <el-container>
    <el-header class="title">
      在线考试系统
    </el-header>
    <el-main>
      <el-row>
        <el-col :span="24" class="content"></el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="content"></el-col>
        <el-col :span="2" class="content label">账号</el-col>
        <el-col :span="16" class="content"><el-input v-model="number" placeholder="请输入您的账号"></el-input></el-col>
        <el-col :span="3" class="content"></el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="content"></el-col>
        <el-col :span="2" class="content label">密码</el-col>
        <el-col :span="16" class="content"><el-input v-model="password" type="password" placeholder="请输入您的密码"></el-input></el-col>
        <el-col :span="3" class="content"></el-col>
      </el-row>
      <el-row>
        <el-col :span="3" class="content"></el-col>
        <el-col :span="18" class="content"><el-button id="btn_submit" type="primary" :loading="loading" @click="send">登录</el-button></el-col>
        <el-col :span="3" class="content"></el-col>
      </el-row>
      <el-row>
        <el-col :span="24" class="content"></el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
var Base64 = require('js-base64').Base64;
export default {
  name: 'Login',
  data() {
    return {
      number:'',
      password:'',
      loading:false,
    }
  },
  created: function() {
    this.$setgoindex();
    // this.back()
  },
  activated:function(){
    
  },
  methods: {
    send: function() {
      let self = this;
      if(self.number == ''){
        self.$message.warning('账号不能为空！');
        return;
      }
      if(self.password == ''){
        self.$message.warning('密码不能为空！');
        return;
      }
      self.loading = true;
      let data = new FormData();
      data.append('number', self.number);
      data.append('password', Base64.encode(self.password));
      this.axios
        .post('http://' + self.$global_msg.HOST + 'scripts/system/login.php', data)
        .then(function(res) {
          let status = res.data.status;
          self.loading = false;
          switch (status) {
            case 'success':
              self.token = res.data.token;
              self.$cookies.set('user_token', res.data.token);
              self.$cookies.set('user_name', res.data.name);
              self.$message.success('登陆成功！正在跳转...');
              setTimeout(self.back,500);
              break;
            case 'fail':
              self.$message.error('用户名或密码错误！');
              break;
            case 'error':
              self.$notify({
                title:'错误',
                message:res.data.errMsg,
                duration:0
              });
              break;
          }
        }).catch(function(e){
          self.$message.error(e+"");
          self.loading = false;
        })
    },
    back:function(){
      if (this.$route.query.goindex === 'true') {
        this.$router.replace({
          name: 'index',
          params: {}
        });
      } else {
        this.$router.back(-1);
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409EFF;
  font-size: 26px;
}
#btn_submit{
  width: 100%;
}
.el-container{
  margin-top: 100px;
}
.el-row {
  margin-bottom: 20px;
}
.el-main{
  border-radius: 30px;
  border: 1px solid #DCDFE6;
  width:50vw;
  margin:0 25vw 0 25vw;
  transition: .5s;
}
.el-main:hover{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
}
.content{
  min-height: 36px;
}
.label{
  display: flex;
  align-items: center;
}
</style>
