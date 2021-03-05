<template>
  <el-container class="main_container"
    v-loading="!loginStatus"
    element-loading-text="加载中，请稍后..."
    element-loading-background="#222933">
    <el-header>
      <div class="title">在线考试系统</div>
      <div class="loginLabel" v-if="loginStatus">
        {{user_name}}&nbsp;你好！
        <el-button type="text" @click="logout">退出登陆</el-button>
      </div>
    </el-header>
    <el-container direction="horizontal" style="height: 100%;">
      <el-aside :width="isCollapse?'fit-content':'200px'">
        <el-menu
          id="nav_bar"
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="default_index"
          @select="select_nav">
          <el-menu-item index="0">
            <el-button type="text" :icon="isCollapse?'el-icon-arrow-right':'el-icon-arrow-left'">收起</el-button>
          </el-menu-item>
          <el-menu-item index="1" id="m1">
            <el-button type="text">个人中心</el-button>
          </el-menu-item>
          <el-menu-item index="2" id="m2">
            <el-button type="text">考试列表</el-button>
          </el-menu-item>
          <el-menu-item index="3" id="m3">
            <el-button type="text">成绩查询</el-button>
          </el-menu-item>
          <el-menu-item index="4" id="m4">
            <el-button type="text">成绩管理</el-button>
          </el-menu-item>
          <el-menu-item index="5" id="m5">
            <el-button type="text">人员管理</el-button>
          </el-menu-item>
          <el-menu-item index="6" id="m6">
            <el-button type="text">题库管理</el-button>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container style="width: 100%;height: 100%" class="main_body">
        <components :is="comName" :params="params"></components>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>

export default {
  name: 'Index',
  components:{
  },
  data() {
    return {
      token:'',
      user_name:'',
      default_index:'',
      loginStatus:false,
      isCollapse:false,
      comName:'',
      last_index:'1',
      params:{},
      canDo:{},
      doList:['getOrder','getList','export','getCustomerList','getAssessOrder','reportGenerator']
    }
  },
  created:function(){
    this.$setgoindex();
    this.init();
    //this.login();
  },
  activated:function(){
  },
  methods:{
    login:function(){
      let self = this;
      if(this.$cookies.isKey('user_token')){
        this.token = this.$cookies.get('user_token');
        this.isLogin(this.token).then(function(res){
          if(!res){
            self.$message.warning('您尚未登陆，即将跳转到登陆界面')
            setTimeout(self.toLogin,1000);
          }else{
            self.assess_query(self.doList).then(function(){
              self.init();
            })
          }
        });
      }else{
        this.$message.warning('您尚未登陆，即将跳转到登陆界面')
        setTimeout(this.toLogin,1000);
      }
    },
    isLogin:async function(token){
      let self = this;
      let data = new FormData();
      data.append('token', token);
      let flag = false;
      await this.axios
        .post('http://' + self.$global_msg.HOST + 'scripts/system/isLogin.php', data)
        .then(function(res) {
          if(res.data.status == 'success'&& res.data.login == '1'){
            self.$cookies.set('user_name',res.data.name);
            self.user_name = res.data.name;
            flag = true;
          }
        })
      return flag;
    },
    toLogin:function(){
      this.$router.push({
        name: 'login',
        params: {}
      });
    },
    logout:function(){
      this.$cookies.remove('user_token');
      this.$cookies.remove('user_name');
      this.toLogin();
    },
    init:function(){
      this.comName = '';
      this.default_index = '1';
      this.loginStatus = true;
    },
    select_nav:function(index,path){
      switch(index){
        case '0':
          this.isCollapse = !this.isCollapse;
          if(!this.isCollapse){
            this.$nextTick(function(){
              document.getElementById("m"+this.last_index).setAttribute('class','el-menu-item is-active');
            })
          }
          break;
        case '1':
          // this.comName = 'order-list';
          break;
        case '2':
          // this.comName = 'order-list';
          break;
        case '3':
          // this.comName = 'order-list';
          break;
        case '4':
          // this.comName = 'order-list';
          break;
        case '5':
          // this.comName = 'order-list';
          break;
        case '6':
          // this.comName = 'order-list';
          break;
      }
      if(index != '0'){
        if(index != this.last_index){
          this.$nextTick(function(){
            document.getElementById("m"+this.last_index).setAttribute('class','el-menu-item');
            this.last_index = index;
          })
        }else{
          this.last_index = index;
        }
      }
    },
    assess_query:async function(list){
      let self = this;
      for(let i in list){
        await this.canDoQuery(list[i]).then(function(res){
          self.canDo[list[i]] = res;
        })
      }
    },
    canDoQuery:async function(op){
      let data = new FormData();
      data.append('token', this.token);
      data.append('operation',op);
      let canDo = false;
      await this.axios
        .post('http://' + this.$global_msg.HOST + 'scripts/system/canDoQuery.php', data)
        .then(function(res) {
          if(res.data.status == 'success'){
            canDo = true;
          }else{
            console.log("can NOT do "+op+":"+res.data.errMsg);
          }
        })
        .catch(function(e){
          console.log("query error:"+e)
        })
      return canDo;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main_container{
  margin: 0;
  height: 100%;
  width: 100%;
}
.title{
  display: flex;
  justify-content: center;
  align-items: center;
  color: #409EFF;
  height: 100%;
  font-size: 26px;
}
.loginLabel{
  position: absolute;
  right: 24px;
  top:0;
}
#loading_box{
  width: 100%;
  height: 100%;
  display:flex;
  justify-content: center;
  align-items: center;
}
.loading_hint{
  font-size: 16px;
}
#nav_bar{
  height: 100%;
}
</style>
