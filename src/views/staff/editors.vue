<template>
  <div class="field">
    <!--头部-->
    <mt-header title="编辑员工">
      <router-link to="/staff" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="part">
      <!--<mt-field label="门店" placeholder="选择"></mt-field>-->
      <mt-cell title="门店" @click.native="popup1 = true">
        <input type="text"><label>选择 <i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-field label="姓名" placeholder="请输入用户名" :attr="{ maxlength: 10 }"></mt-field>
      <mt-field label="工号" placeholder="请输入数字" type="number"></mt-field>
      <mt-field label="密码" placeholder="请输入密码" type="password"></mt-field>
      <mt-field label="确认密码" placeholder="请输入密码" type="password"></mt-field>
      <!--<mt-field label="职务" placeholder="选择"></mt-field>-->
      <mt-cell title="职务" @click.native="popup2 = true">
        <input type="text"><label>选择 <i class="iconfont icon-jiantou"></i></label>
      </mt-cell>
      <mt-field label="手机号" placeholder="请输入手机号" type="tel"></mt-field>
    </div>
    <!--按钮-->
    <div class="a_btn">
      <mt-button type="primary">保存</mt-button>
    </div>
    <!--底部弹出框-->
    <mt-popup v-model="popup1" position="bottom">
      <div class="popup">
        <div class="p_btn">
          <mt-button @click.native="popup1 = false">取消</mt-button><mt-button class="confirm">确定</mt-button>
        </div>
        <mt-checklist
          align="right"
          class="part"
          title="右对齐"
          v-model="value1"
          :options="options1">
        </mt-checklist>
      </div>
    </mt-popup>
    <mt-popup v-model="popup2" position="bottom">
      <div class="popup">
        <div class="p_btn">
          <mt-button @click.native="popup2 = false">取消</mt-button><mt-button class="confirm">确定</mt-button>
        </div>
        <mt-checklist
          align="right"
          class="part"
          title="右对齐"
          v-model="value2"
          :options="options2">
        </mt-checklist>
      </div>
    </mt-popup>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/public";
  .field{
    .mint-popup{
      width: 100%;
    }

  }
</style>
<script>
  export default {
    data(){
      return{
        popup1: false,
        popup2: false,
        value1: [],
        value2: [],
      }
    },
    created() {
      this.options1 = ['等级一', '等级二', '等级三'];
      this.options2 = ['职务一', '职务二', '职务三'];
    }
  };
</script>
