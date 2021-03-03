<template>
  <el-button
    id="btn"
    ref="btn"
    class="pop_btn"
    :type="type" 
    :icon="icon"
    :circle="!hover"
    :round="hover"
    @mouseover.native="hoverIn"
    @mouseleave.native="hoverOut"
    >
    {{text}}
  </el-button>
</template>

<script>

export default {
  name: 'pop-button',
  props: ['type','text','icon'],
  data() {
    return {
      hover:false,
      hover_in_timer:undefined,
      hover_out_timer:undefined,
      width:"60px",
      span:undefined
    }
  },
  created: function() {
    this.width = (this.text.length * 15); 
  },
  mounted:function(){
    let btn = this.$refs.btn;
    this.span = btn.$vnode.elm.children[1];
  },
  methods: {
    hoverIn:function(){
      let self = this;
      if(this.hover_in_timer){
        clearTimeout(this.hover_in_timer);
      }
      if(this.hover_out_timer){
        clearTimeout(this.hover_out_timer);
        this.hover_out_timer = undefined;
      }
      self.hover = true;
      self.setWidth(self.width)
      this.hover_in_timer = setTimeout(function(){
        self.hover_in_timer = undefined;
      },100)
    },
    hoverOut:function(){
      let self = this;
      this.setWidth(0);
      if(this.hover_in_timer){
        clearTimeout(this.hover_in_timer)
        this.hover_in_timer = undefined;
      }
      if(this.hover_out_timer){
        clearTimeout(this.hover_in_timer);
      }

      this.hover_out_timer = setTimeout(function(){
        self.hover = false;
        self.hover_out_timer = undefined;
      },250)
    },
    setWidth:function(width){
      if(!this.span){
        return;
      }
      this.span.setAttribute('style',"width:"+width+"px;");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#btn{
  transition: all .5s;
  overflow: hidden;
}
#btn >>> span{
  display: inline-block;
  margin-left: 1px;
  width: 0;
  transition: all .5s;
  opacity:0;
}

#btn:hover >>> span{
  margin-left: 5px;
  opacity:1;
}
</style>
