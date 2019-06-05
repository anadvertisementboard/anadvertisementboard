<template>
  <div class="container-outer boxclass" >
    <div class="boxsecond">
        <artcontent-before_mb ref="artcontent-before_mb" v-show="isshow_before_mb" 
        :language="language" 
        :artprice="artprice" 
        :etzprice="etzprice"
        :currentpatron= "currentpatron" 
        :timeHeld = "timeHeld" 
        :depositable="depositable" 
        :foreclosureTime="foreclosureTime" 
        :totalCollected="totalCollected" 
        :tokenType="tokenType" 
        :artTitle="artTitle"
        :artName="artName"
        :tips1="tips1"/>
        <artcontent-after_mb ref="artcontent-before_mb" v-show="isshow_after_mb"
        :language="language" 
        :artprice="artprice" 
        :etzprice="etzprice"
        :currentpatron= "currentpatron" 
        :timeHeld = "timeHeld" 
        :depositable="depositable" 
        :foreclosureTime="foreclosureTime" 
        :totalCollected="totalCollected" 
        :tokenType="tokenType" 
        :artTitle="artTitle"
        :artName="artName"
        :tips1="tips1"/>
        <artcontent-before_pc ref="artcontent-before_mb" v-show="isshow_before_pc" 
        :language="language" 
        :artprice="artprice" 
        :etzprice="etzprice"
        :currentpatron= "currentpatron" 
        :timeHeld = "timeHeld" 
        :depositable="depositable" 
        :foreclosureTime="foreclosureTime" 
        :totalCollected="totalCollected" 
        :tokenType="tokenType" 
        :artTitle="artTitle"
        :artName="artName"
        :tips1="tips1"/>
        <artcontent-after_pc ref="artcontent-before_mb" v-show="isshow_after_pc" 
        :language="language" 
        :artprice="artprice" 
        :etzprice="etzprice"
        :currentpatron= "currentpatron" 
        :timeHeld = "timeHeld" 
        :depositable="depositable" 
        :foreclosureTime="foreclosureTime" 
        :totalCollected="totalCollected" 
        :tokenType="tokenType" 
        :artTitle="artTitle"
        :artName="artName"
        :tips1="tips1"
        />

    </div>
    <hr/>
    <div class="autoplayclass">
      <img src="../assets/player/play.png" width="30px"  @click="isPlay" v-show="isa">
      <img src="../assets/player/pause.png"  width="30px"  @click="isStop" v-show="isb">
      <audio ref="audio" id="audio" src="../../static/music.mp3" preload  autoplay="true"></audio>
    </div>
  </div>
</template>

<script>
  import ArtContent1_mb from './Sections/ArtContent1_mb';
  import ArtContent2_mb from './Sections/ArtContent2_mb';
  import ArtContent1_pc from './Sections/ArtContent1_pc';
  import ArtContent2_pc from './Sections/ArtContent2_pc';
  import chainApi from '../service/ChainApi'
  import axios from 'axios';
  export default {
    name: 'Main',
    components: {
      'artcontent-before_mb': ArtContent1_mb,
      'artcontent-after_mb': ArtContent2_mb,
      'artcontent-before_pc': ArtContent1_pc,
      'artcontent-after_pc': ArtContent2_pc,
      
    },
    data() {
      return {
        isa:false,
        isb:true,
        isshow_before_pc:false,
        isshow_after_pc:false,
        isshow_before_mb:true,
        isshow_after_mb:false,
        language: 'en',
        artprice :"0",
        etzprice:"0",
        currentpatron:"",
        timeHeld:"0",
        depositable:"0",
        foreclosureTime:"0",
        totalCollected:"0",
        tokenType:"以太坊",
        artName:"",
        artTitle:"一块广告牌",
        contenttips:"本广告牌字数限制：12个中文字符/24个字符",
        tips1:"持有者管理广告牌",
        
      };
    },
    mounted() {
      this.init();
      let audiox = document.getElementById("audio");
      audiox.setAttribute('loop','loop');
      chainApi.Initial();
      
    },
    methods:{
      init:function(){

        this.$trans.$off("inithome")
        this.$trans.$on("inithome",(data)=>{
            if(data.islogin==true){
              if(data.flat!=null){
                this.isshow_before_mb = false;
                this.isshow_after_mb= true;
                this.isshow_before_pc = false;
                this.isshow_after_pc= false;
              }else{
                this.isshow_before_mb = false;
                this.isshow_after_mb= false;
                this.isshow_before_pc = false;
                this.isshow_after_pc= true;
              }
              
            }else{
              if(data.flat!=null){
                this.isshow_before_mb = true;
                this.isshow_after_mb= false;
                this.isshow_before_pc = false;
                this.isshow_after_pc= false;
              }else{
                this.isshow_before_mb = false;
                this.isshow_after_mb= false;
                this.isshow_before_pc = true;
                this.isshow_after_pc= false;
              }
            }
            if(data.index==true){
              this.firstPrice();
              this.autoPrice();
              this.getData();
            }
        })
        this.$trans.$off("operate");
        this.$trans.$on("operate",(data)=>{
          this.getData();
        })
      },
      firstPrice: function(){
        let that = this;
         axios.get("https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD").then(async (res)=>{
          let price = await that.$maseter.methods.price().call();
          let ethprice =res.data.USD;
          that.artprice = price/10**18+" ETH";
          that.etzprice = "¥ "+Number(Number(ethprice)*6.7*price/10**18).toFixed(2);
        });
        
      },
      autoPrice: function(){
        setInterval(this.firstPrice,2000);
      },
      getData:async function(){
        let currentpatron = await this.$token.methods.ownerOf(42).call();
        let timeLastCollected = await this.$maseter.methods.timeLastCollected().call();
        let depositable = await this.$maseter.methods.depositAbleToWithdraw().call();
        let foreclosureTime = await this.$maseter.methods.foreclosureTime().call();
        let totalCollected = await this.$maseter.methods.totalCollected().call();
        let artName = await this.$maseter.methods.artName().call();
        this.currentpatron = currentpatron;
        if(timeLastCollected>0){
          this.timeHeld = parseInt((new Date().getTime()-timeLastCollected*1000)/86400000)+" 日";
        }else{
          this.timeHeld = "0 日"
        }
        

        this.depositable = " " +String(depositable/10**18).substr(0,4)+" ETH";
        this.foreclosureTime = chainApi.timeFormat(new Date(foreclosureTime*1000));
        this.totalCollected = " " +Number(totalCollected/10**18).toFixed(2)+" ETH";

        // let artNamex ="您好您好您好您好您好您好"
        // let len=parseInt(artNamex.length/12);
        // if(artNamex.length%12>0){
        //   len+=1;
        // }
        // let htmlbody="";
        // for(var i=0;i<len;i++){
        //     htmlbody+="<h1>"+artNamex.substring(12*i,12*(i+1))+"</h1><br/>"
        // }
        this.artName = artName;
      },
      isPlay(){
            document.getElementById("audio").play();
            this.isa=false;
            this.isb= true;
            return false
      },
      isStop(){
          document.getElementById("audio").pause();
          this.isb=false;
          this.isa = true;
          return false
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import '../styles/util.scss';
  @import '../styles/app.scss';
  div{
    height:100%;
  }
.autoplayclass{
      width: 20%;
    position: fixed;
    top: 35px;
    right: 0%;
}
.boxclass{
  margin-top:30px;
}

</style>
