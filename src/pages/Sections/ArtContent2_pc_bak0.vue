
<template>
  <section class="section-wrapper">
    <h1>一块广告牌</h1>
    <div class="sechead">
      <p>当前广告内容：</p>
      <p class="headcontent">{{artName}}</p>
    </div>
    <div class="secbody">
      <div class="bodybox">
        <div class="bodyleft">
          <h3>当前广告主信息:</h3>
          <p>
            <ul>
              <li><span>地址：</span><span>{{currentpatron}}</span></li>
              <li><span>可用预存款：</span><span>{{depositable}}</span></li>
              <li><span>拥有可赎回权利期限：</span><span>{{foreclosureTime}}</span></li>
              <li><span>当前广告牌价格：</span><span>{{artprice}}</span>&nbsp;&nbsp;<span>({{etzprice}})</span></li>
            </ul>
          </p>
        </div>
        <div class="bodyleft bodyleft2">
          <h3>购买广告牌</h3>
          <h6>您需要支付1000 {{tokenType}} &nbsp;来获得广告牌的使用权</h6>
          <p class="buydetail">
            <span>出售价格：</span>
            <input type="number" ref="initprice"/>
          </p>
          <p class="buydetail">
            <span>预存款：</span>
            <input type="number" ref="initdeposit"/>
          </p>
          <p class="buydetail">
            <span class="artspan">广告牌内容：</span>
            <textarea class="artcontent" cols="40" rows="8" ref="initname" placeholder="请输入广告牌内容（100字以内）"></textarea>
          </p>
          <p class="buybtnclass">
            <button @click="buy">购买</button>
          </p>
        </div>
      </div>
      <div class="bodybox bodydetairight">
        <h3 class="manatitle">管理广告牌</h3>
        
        <p>
          <input type="number" ref = "newprice"/>
          <button @click="changePrice">修改出售价格</button>
        </p>
        <p>
          <input type="number"  ref = "depositbal"/>
          <button  @click="depositWei">充值预存款</button>
        </p>
        <p>
          <input type="number" ref="withdrawDeposit"/>
          <button @click="withdrawDeposit">取出预存款</button>
        </p>
        <p class="textareaclass">
          <textarea cols="30" rows="20" ref = "newName" placeholder="请输入广告牌内容（100字以内）"></textarea>
          <br/>
          <button @click="changeName">提交新的广告牌内容</button>
          <button class="exitclass" @click="exit">取出所有的预存款并放弃赎回权</button>
        </p>
        <p>
          <span>备注：</span>
          提交后需要等待区块链确认交易，请耐心等待，交易被确认后，将自动更新数据.
        </p>
      </div>
    </div>
   <!--  <div class="secfoot">
      <h2>关于本广告牌：</h2><a name="about"></a>
    <p>《一块广告牌》用崭新的方式探索数字艺术品所有权的问题。{{tokenType}}网络将确认数字艺术品所有权的稀缺性变为可能，同时用全新的方式定义了经济与虚拟内容所有权。受《极端状态市场》一书影响，这个作品遵循了稍作改动的哈勃格税物权体系，即仅由作品创作者征税。通过这一探索，我们试图提出以下问题：
    </p>
    <p>
    这个作品的物权体系是否改变了收藏家/资助人与艺术家之间的关系？这个作品的物权体系下，谁才是收藏家/资助人？谁才是艺术家？</p>

    <p>创造这样一个更显而易见的资助艺术家的方式是否给艺术家带来更多收入？收藏家/出资人在艺术品中扮演的角色是否被改变？</p>

    <p>该物权体系是否给创造性的作品提供了更有延续性的资金来源？</p>

    <p>这种广告牌永久可拍卖的市场体制和由此产生的投机和价格变化是否改变人们对艺术和艺术家的态度？</p>

    <p>艺术品提高的转手率和由此带来的艺术品被更多人拥有的可能性是否增加了艺术品的价值（经济价值与艺术价值）？作品的价值是由作品本身决定，还是由围绕作品产生的流量决定？</p>

    <p>这个永久可拍卖的广告牌是否能让人意识到人类生活的方方面面已经潜移默化地进入不断的可卖的过程？</p>

    <p>技术层面上来讲，运用了{{tokenType}}智能合约技术的本作品是开源的，它选择了适当的通证标准ERC721来展示和确权。你可以在如下网址随意产生本项目的分叉和创造你的艺术品。关于本作品的未来改动也会反映在该页面：</p>
    <p><a href="https://github.com/rooat/thisartworkisalwaysonsale">https://github.com/rooat/thisartworkisalwaysonsale</a></p>
    </div> -->
   
    <tips></tips>
  </section>
</template>

<script>
  import chainApi from '../../service/ChainApi'
  import Tips from './Tips';
  export default {
    name: 'ArtContent',
    components: {
    	"tips":Tips
    },
    props: ['language','artprice','etzprice','currentpatron','timeHeld','depositable','foreclosureTime','totalCollected','tokenType','artName'],
    computed: {
    },
    data(){
    	return {
    	}
    },
    methods:{
      test:function(){
        chainApi.test("test");

      },
      collectPatronage:  function(){
      	
      },
      buy: function(){
        let initname = this.$refs.initname.value;
        let initprice = this.$refs.initprice.value;
      	let initdeposit = this.$refs.initdeposit.value;
       	chainApi.buy(initprice,initdeposit,initname);
      },
      changePrice: function(){
      	let newprice = this.$refs.newprice.value;
       	chainApi.changePrice(newprice);
      },
      changeName:function(){
        let newName = this.$refs.newName.value;
        chainApi.changeName(newName);
      },
      depositWei: function(){
      	let depositbal = this.$refs.depositbal.value;
        chainApi.depositWei(depositbal);
      },
      exit: function(){
        chainApi.exit();
      },
      withdrawArtistFunds:  function(){
        chainApi.withdrawArtistFunds();
      },
      withdrawDeposit: function(){
      	let withdrawDeposit = this.$refs.withdrawDeposit.value;
        chainApi.withdrawDeposit(withdrawDeposit);
      },
      art_call:function(){
        return null;
      },
      artist_call:function(){
        return null;
      },
      artistFund_call:function(){
        return null;
      },
      currentCollected_call:function(){
        return null;
      },
      deposit_call:function(){
        return null;
      },
      depositAbleTowithdraw_call:function(){
        return null;
      },
      foreclosed_call:function(){
        return null;
      },
      foreclosureTime_call:function(){
        return null;
      },
      paid_call:function(){
        return null;
      },
      patronageOwed_call:function(){
        return null;
      },
      patronageOwedWithTimestamp_call:function(){
        return null;
      },
      patrons_call:function(){
        return null;
      },
      price_call:function(){
        return null;
      },
      state_call:function(){
        return null;
      },
      timeAcquired_call:function(){
        return null;
      },
      timeHeld_call:function(){
        return null;
      },
      timeLastCollected_call:function(){
        return null;
      },
      totalCollected_call:function(){
        return null;
      }
    }

      
  };
</script>

<style  lang="scss" scoped>
  @import '../../styles/util.scss';
  .section-wrapper{
    padding-top:20px;
  }
  h1 span{
    font-size:10px;
  }
  .sechead{
    width:70%;
    height:200px;
    border:1px solid grey;
    margin-bottom:28px;
  }
  .sechead p{
    margin-left:1%;
  }
  .sechead .headcontent{
    text-align:center;
  }
  .secbody{
    width:70%;
    height:630px;
  }
  .secbody .bodybox{
    float:left;
    width:48%;
    height:630px;
  }
  .bodyleft{
    width:96%;
    height:180px;
    border:1px solid grey;
    padding-left:1%;
    padding-left:4%;
  }
  ul li{
    list-style:none;
  }
  ul{
    margin:0;
    padding:0;
  }
  .bodyleft2{
    margin-top:35px;
    height:413px;
  }
  .secfoot{
    margin-top:28px;
    clear:both;
    width:62%;
    height:auto;
    border:1px solid grey;
    padding:20px 4% 15px 4%;
  }
  .buydetail span{
    display:inline-block;
    width:30%;
    text-align:right;
  }
  .artspan{
    float:left;
  }
  .artcontent{
    float:left;
    width:63%;
    margin-left:2%;
  }
  .bodydetairight{
    border:1px solid grey;
    margin-left:3.5%;
  }
  .bodydetairight p{
    width:88%;
    margin-left:5%;
  }
  .bodydetairight p textarea{
    width:100%;
    height:100px;
    margin-bottom:30px;
  }
  .textareaclass{
    text-align:center;
  }
  .exitclass{
    margin-top:30px;
    width:100%;
    margin-bottom:40px;
  }
  .buybtnclass{
    clear:both;
    margin-top:20px;
    text-align:center;
  }
  .buybtnclass button{
    margin-top:20px;
  }
  p button{
    background-color:lightblue;
    width:34%;
    height:35px;
    border-radius:8px;
    border:0;
    font-size:16px;
  }
  p textarea{
    border-radius:8px;
  }
  p input{
    padding-left:5px;
    height:30px;
    border:0;
    font-size:18px;
    border-bottom:1px solid grey;
  }
  .manatitle{
    margin-left:5%;
  }


</style>