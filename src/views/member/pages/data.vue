<template>
  <div class="detail">
    <!--头部-->
    <mt-header title="会员资料">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="d_cont">
      <div class="m_details">
        <mt-cell title="姓名">
          <label>{{member.memberName}}</label>
        </mt-cell>
        <mt-cell title="卡号">
          <label>{{member.cardNo}}</label>
        </mt-cell>
        <mt-cell title="手机号">
          <label>{{member.mobile}}</label>
        </mt-cell>
        <mt-cell title="性别">
          <label>{{member.gender==0?'女':'男'}}</label>
        </mt-cell>
        <mt-cell title="生日">
          <label>{{member.birthday|formatDate}}</label>
        </mt-cell>
        <mt-cell title="地址">
          <label>{{member.memberAddr!=null?member.memberAddr:'无'}}</label>
        </mt-cell>
        <mt-cell title="注册渠道">
          <label v-if="member.wechat_id!=null"><i class="iconfont icon-weixin"></i></label>
          <label v-if="member.wechat_id==null">员工开卡</label>
        </mt-cell>
      </div>
      <div class="a_btn">
        <mt-button type="primary"@click="updateMember" >修改</mt-button>
        <mt-button type="primary"  @click="deleteMember">删除</mt-button>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../../style/member/detail";
</style>
<script>
  import { getMemberInfo ,deleteMember } from '../../../api/api';
  import {formatDate} from '../../../common/js/data.js'
  export default {
    data(){
      return{
        memberId:'',//会员id
        member:{},//会员信息
      }
    },
    filters:{
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      }
    },
    created:function(){
      this.memberId=this.$route.query.memberId;
      this.getMember();
    },
    methods:{
    getMember(){
      let params= {
        memberId:parseInt(this.memberId)
      };
      getMemberInfo(params).then((res)=>{
        this.member=res.data.member;
      });
    },
      updateMember(){
        this.$router.push({ path: '/member/updateMember',query:{
            memberId:this.memberId
          } });
      },
/*      fanhui(){
        this.$router.push({ path: '/member/detail',query:{
            memberId:this.memberId
          } });
      },*/
      deleteMember(){
      var params={memberId:this.memberId};
        deleteMember(params).then((res)=>{
          var code=res.data.code;
          if(code==100000){
            alert("成功");
          }
        });
      }
    }
  };
</script>
