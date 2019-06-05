<template>
	<div v-show="isshowtips" class="pledgetipsclass" :class="{'classa':isa,'classb':isb}">
     {{tiptext}}
	</div>
</template>

<script>
import trans from '../../service/Trans'
export default {
  name: 'MainScreen',
  components:{
  },
  data () {
    return {
    	isshowtips:false,
    	tiptext:"error",
    	isa:true,
    	isb:false
    }
  },
  mounted() {
  	this.init()
  },
  methods: {
  	init:function(){
      this.$trans.$off('tiptext')
  		this.$trans.$on("tiptext",(data)=>{  
      this.isshowtips=true		
        if(data.type==2){
  				this.isb=true;
          this.isa=false
  			}else if(data.type==3){
          this.isa=true
          this.isb=false
  			}
  			this.tiptext=data.tiptext
        setTimeout(this.sss,3000)
  		})
  	},
    sss:function(){
       this.isshowtips=false
        console.log("showtips:",this.isshowtips)
    }
  }
}
</script>

<style scoped="scoped">
.classa{
	background-color: green;
	color:white;
}
.classb{
	background-color: #ef5075;
	color:white;
}
.pledgetipsclass{
  width: 14%;
  height: 70px;
  position: fixed;
  z-index: 10;
  top: 0%;
  left: 86%;
  border-radius: 13px;
  font-size: 20px;
  text-align: center;
  line-height: 70px;

}
</style>