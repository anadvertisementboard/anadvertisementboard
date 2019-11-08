
<template>
  <section class="section-wrapper">
    <div class="content-container text-left">
      <h2>现价：<span>{{artprice}}</span>&nbsp;&nbsp;<span>({{etzprice}})</span></h2>
      <p class="firstclass">
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名称： <span>{{artName}}</span>
      </p>
      <p class="firstclass">
        现任资助人： <span>{{currentpatron}}</span>
      </p>
      <p class="firstclass">
        已持有时间：<span>{{timeHeld}}</span>
      </p>
      <br/>
      <p class="firstclass">这是一块永远可以更新的广告牌。</p>
      <p class="firstclass">在这块广告牌上打广告前，你需要提供一个给下一任广告主从你手上购买广告牌的价格。任何人可以在任何时候从现任广告主手中用该价格购买下一任所有权。</p>
      <p class="firstclass">当现任广告主持有广告牌时，5%的手续费将被征收作为给广告牌维护的费用。</p>

      <h2>购买艺术品</h2>
      <p>你需要一个web3/支持{{tokenType}}的浏览器来购买。请下载metamask的chrome浏览器插件，或在{{tokenType}}移动浏览器中打开。</p>
      
      <h2>步骤</h2>
      <p>购买广告牌时，你需要给出你的拍卖标价并支付初始预存款（皆为{{tokenType}}计价）。</p>
      <p>任何人可以在任何时候以你的标价从你手中购买这个广告牌所有权。</p>
      <p>你持有广告牌时，每年将从你的预存款中扣取5%的你的标价作为给维护广告牌的费用。</p>
      <p>假如你的预存款无法支付资助所需费用，广告牌将会由智能合约强行取消赎回的权利以保障广告牌本身的安全。</p>
      <p>你可以随时增加或减少你的预存款。你也可以随时改变设定的拍卖价格。</p>
      <p>当别人从你手中买下广告牌所有权，你余下的预存款将被自动退还。</p>
      <p>注意：这个项目是非常实验性的项目。智能合约没有被第三方核查过。请在参加之前务必确保你能承担所带来的后果。</p>
      
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
      
      <h2>步骤：</h2>
      <p>为了正常地对广告牌的所有权进行购买，你需要一个&nbsp;web3/{{tokenType}}浏览器。请下载metamask的chrome浏览器插件，或在{{tokenType}}移动浏览器中打开。</p>
      
      <h2>其他相关数据：</h2>
      <p>广告牌维护总共已收取费用：{{totalCollected}}</p>
    </div>
  </section>
</template>

<script>
  import chainApi from '../../service/ChainApi'
  export default {
    name: 'ArtContent',
    components: {
    },
    props: ['language','artprice','etzprice','currentpatron','timeHeld','depositable','foreclosureTime','totalCollected','tokenType','artName'],
    computed: {
    },
    data(){
      return {
      }
    },
    methods:{
      
    }

      
  };
</script>

<style lang="scss" scoped>
  @import '../../styles/util.scss';
  .get-btn{
    width:20%;
    height:100px;
    
  }

</style>