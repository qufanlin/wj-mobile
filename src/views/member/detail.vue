<template>
  <div class="detail">
    <!--头部-->
    <mt-header title="会员详情">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="d_cont">
      <div class="m_details">
        <mt-cell title="基本资料" @click.native="data">
          <label>选择 <i class="iconfont icon-jiantou"></i></label>
        </mt-cell>
        <mt-cell title="历史消费" @click.native="consume">
         <label>选择 <i class="iconfont icon-jiantou"></i></label>
        </mt-cell>
        <mt-cell title="储值" @click.native="storedValue">
          <label>选择 <i class="iconfont icon-jiantou"></i></label>
        </mt-cell>
        <mt-cell title="会员积分" @click.native="integral">
          <label>选择 <i class="iconfont icon-jiantou"></i></label>
        </mt-cell>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/member/detail";
</style>
<script>
  import { getMemberInfo  } from '../../api/api';
  export default {
    data(){
      return{
        memberId:'',//
        member:{}
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
      data(){
        this.$router.push({ path: '/member/data',query:{memberId:this.memberId} });
      },
      consume(){
        this.$router.push({ path: '/member/consume',query:{memberId:this.memberId}  });
      },
      storedValue(){
        this.$router.push({ path: '/member/storedValue',query:{memberId:this.memberId}  });
      },
      integral(){
        this.$router.push({ path: '/member/integral',query:{memberId:this.memberId}  });
      },
      billing(){
        this.$router.push({ path: '/goods/publish',query:{memberId:this.memberId}  });
      }
    }
  };
</script>
