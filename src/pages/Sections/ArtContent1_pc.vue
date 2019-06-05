
<template>
  <section class="section-wrapper">
    <div class="content-container text-left">
      <h2 class="titleclass">{{artTitle}}</h2>
      <div class="namecontentclass" :style="namecontentclassx">
        <p>{{artName}}</p>
      </div>
      <h2>现价：<span>{{artprice}}</span>&nbsp;&nbsp;<span>({{etzprice}})</span></h2>
      
      <p class="firstclass">
        现任资助人： <span>{{currentpatron}}</span>
      </p>
      <p class="firstclass">
        已持有时间：<span>{{timeHeld}}</span>
      </p>
      <br/>
      <p class="firstclass">这是一块永远可以更新的广告牌。</p>
      <p class="firstclass">在这块广告牌上打广告前，你需要提供一个给下一任广告主从你手上购买广告牌的价格。任何人可以在任何时候从现任广告主手中用该价格购买下一任所有权。</p>
      <p class="firstclass">当现任广告主持有广告牌时，&nbsp;5%的手续费将被征收作为给广告牌维护的费用。</p>

      <h2>购买艺术品</h2>
      <p>你需要一个&nbsp;web3/支持{{tokenType}}的浏览器来购买。请下载&nbsp;Metamask&nbsp;的&nbsp;Chrome&nbsp;浏览器插件，或在{{tokenType}}移动浏览器中打开。</p>
      
      <h2>步骤</h2>
      <p class="firstclass">购买广告牌时，你需要给出你的拍卖标价并支付初始预存款（皆为{{tokenType}}计价）。</p>
      <p class="firstclass">任何人可以在任何时候以你的标价从你手中购买这个广告牌所有权。</p>
      <p class="firstclass">你持有广告牌时，每年将从你的预存款中扣取&nbsp;5%的你的标价作为给维护广告牌的费用。</p>
      <p class="firstclass">假如你的预存款无法支付资助所需费用，广告牌将会由智能合约强行取消赎回的权利以保障广告牌本身的安全。</p>
      <p class="firstclass">你可以随时增加或减少你的预存款。你也可以随时改变设定的拍卖价格。</p>
      <p class="firstclass">当别人从你手中买下广告牌所有权，你余下的预存款将被自动退还。</p>
      <p class="firstclass">注意：这个项目是非常实验性的项目。智能合约没有被第三方核查过。请在参加之前务必确保你能承担所带来的后果。</p>
      
      <h2>现任广告主信息：</h2>
      <p class="firstclass">
        地址：<span>{{currentpatron}}</span>
      </p>
      <p class="firstclass">
        可用预存款：<span>{{depositable}}</span>
      </p>
      <p>拥有可赎回权利期限：
        <span>{{foreclosureTime}}</span>
      </p>
      <p>现有预存款将能支付广告维护费用直到上述时间。当到达该时间点时，智能合约会自动赎回该艺术品的所有权并将作品的价格重设为&nbsp;0。</p>
      <p>一旦过了该时间期限，原广告主将不能取出预存款，正式被取消赎回权利。</p>
      
      <h2>{{tips1}}：</h2>
      <p>为了正常地对广告牌的所有权进行购买，你需要一个&nbsp;web3/{{tokenType}}浏览器。请下载&nbsp;MetaMask&nbsp;的&nbsp;Chrome&nbsp;浏览器插件，或在{{tokenType}}移动浏览器中打开。</p>
      
      <h2>其他相关数据：</h2>
      <p>广告牌维护总共已收取费用：{{totalCollected}}</p>
      <h2>关于本广告牌：</h2>
    <p>《一块广告牌》用崭新的方式探索数字艺术品所有权的问题。{{tokenType}}网络将确认数字艺术品所有权的稀缺性变为可能，同时用全新的方式定义了经济与虚拟内容所有权。</p><!-- 受《极端状态市场》一书影响，这个作品遵循了稍作改动的哈勃格税物权体系，即仅由作品创作者征税。通过这一探索，我们试图提出以下问题：
    </p>
    <p>
    这个作品的物权体系是否改变了收藏家/资助人与艺术家之间的关系？这个作品的物权体系下，谁才是收藏家/资助人？谁才是艺术家？</p>

    <p>创造这样一个更显而易见的资助艺术家的方式是否给艺术家带来更多收入？收藏家/出资人在艺术品中扮演的角色是否被改变？</p>

    <p>该物权体系是否给创造性的作品提供了更有延续性的资金来源？</p>

    <p>这种广告牌永久可拍卖的市场体制和由此产生的投机和价格变化是否改变人们对艺术和艺术家的态度？</p>

    <p>艺术品提高的转手率和由此带来的艺术品被更多人拥有的可能性是否增加了艺术品的价值（经济价值与艺术价值）？作品的价值是由作品本身决定，还是由围绕作品产生的流量决定？</p>

    <p>这个永久可拍卖的广告牌是否能让人意识到人类生活的方方面面已经潜移默化地进入不断的可卖的过程？</p> -->

    <p>技术层面上来讲，运用了{{tokenType}}智能合约技术的本作品是开源的，它选择了适当的通证标准ERC721来展示和确权。你可以在如下网址随意产生本项目的分叉和创造你的艺术品。关于本作品的未来改动也会反映在该页面：</p>
    <p>
      <a href="https://github.com/anadvertisementboard/anadvertisementboard">https://github.com/anadvertisementboard/anadvertisementboard</a>
    </p>
    </div>
  </section>
</template>

<script>
  import chainApi from '../../service/ChainApi'
  export default {
    name: 'ArtContent',
    components: {
    },
    props: [
    'language',
    'artprice',
    'etzprice',
    'currentpatron',
    'timeHeld',
    'depositable',
    'foreclosureTime',
    'totalCollected',
    'tokenType',
    'artName',
    'artTitle',
    'tips1'],
    computed: {
    },
    data(){
      return {
        namecontentclassx:{
          height:''
        }
      }
    },
    created(){
      this.getHeight();
      window.addEventListener('resize',this.getHeight);
    },
    destoryed(){
      window.removeEventListener('resize',this.getHeight)
    },
    methods:{
      getHeight:function(){
        this.namecontentclassx.height = window.innerHeight * 0.65 +'px'
      },
    },


      
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/util.scss';
  .get-btn{
    width:20%;
    height:100px;
    
  }
  .namecontentclass{
    width: 100%;
    border:1px solid grey;
    margin-bottom: 20px;
    border-radius: 7px;
    padding-top: 5px;
  }
  .titleclass{
    text-align:center;
  }
  .namecontentclass{
    font-size:59px;
    width: 100%;
    display:flex;
    align-items:center;
    justify-content:center;
    border:1px solid grey;
    margin-bottom: 20px;
    border-radius: 7px;
    padding-top: 5px;
    text-align:center;
  }
  .namecontentclass p{
    text-align:center;
  }

</style>