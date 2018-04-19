<template>
  <div class="member">
    <!--固定头部-->
    <div class="m_header">
      <router-link to="/">
        <i class="iconfont icon-back"></i>
      </router-link>
      <div class="m_inp">
        <i class="mintui mintui-search"></i>
        <input type="search"  v-model="keywords" v-on:search="searchMembers()"  placeholder="卡号/姓名/手机号">
      </div>
    </div>
    <div class="m_cont">
      <div class="totle">
        <p>会员总数：<span>{{memberCount}}</span></p>
      </div>
      <slot>
      <mt-tab-container>
      <ul class="m_list"
          v-infinite-scroll="getMembers"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
        <li v-for="obj in members">
          <a @click="goDetail(obj.memberId)">
            <img src="" alt="">
            <div class="listcont">
              <p>{{obj.memberName}}</p>
              <p>{{obj.mobile}}</p>
            </div>
          </a>
        </li>
      </ul>
      </mt-tab-container>
      </slot>
    </div>
    <!--添加按钮-->
    <mt-button @click="addmember" id="addbtn"><i class="iconfont icon-i-add"></i></mt-button>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/member/member";
  @import "../../style/public";
</style>
<script>
  import { getMemberList  } from '../../api/api';
  export default {
    data() {
      return {
        value: '',
        members:[],
        keywords:'',
        loading:false,//
        totalPage:'',
        currentPage:1,
        showCount:10,
        memberCount:0,//会员总量
        defaultResult: [
          'Apple',
          'Banana',
          'Other'
        ],
        selected: '1',
      };
    },
    computed: {
      filterResult() {
        return this.defaultResult.filter(value => new RegExp(this.value, 'i').test(value));
      }
    },
    methods:{
      goDetail(memberId){
        this.$router.push({ path: '/member/detail',query:{
            memberId:memberId
          } });
      },
      getMembers () {
        let param = new URLSearchParams();
        param.append("keyword", this.keywords);
        param.append("page.currentPage",this.currentPage);
        param.append("page.showCount",this.showCount);
        getMemberList(param).then((res)=>{
          this.totalPage=res.data.page.totalPage;
          this.memberCount = res.data.page.totalResult;
          this.members=[...this.members,...res.data.memberList];
          if(this.currentPage>=res.data.page.totalPage){
            this.loading = true;
          }else{
            this.loading =false;
          }
          this.currentPage += 1;
        });
      },
      searchMembers () {
        this.currentPage=1;
        this.members=[];
        this.getMembers();
      },
      main_log(val) {
        console.log('main_log', val);
      },
      sub_log(val) {
        console.log('sub_log', val);
        this.$refs.target_1.collapse();
      },
      addmember(){
        this.$router.push({ path: '/member/add' });
      }
    }
  };
</script>
