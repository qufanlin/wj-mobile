<template>
  <div class="detail">
    <!--头部-->
    <mt-header title="新开会员">
      <router-link to="/member" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>
    <div class="d_cont">
      <!--添加商品表单-->
      <div class="add_form">
        <!--图片上传-->
        <div class="page-actionsheet">
          <div class="page-actionsheet-wrapper">
            <mt-button @click.native="sheetVisible = true"><i class="iconfont icon-i-add"></i></mt-button>
          </div>
          <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
        </div>
        <div class="f_list">
          <mt-field label="会员姓名" placeholder="必填" :attr="{ maxlength: 10 }" v-model="member.memberName" ></mt-field>
          <mt-field label="会员卡号" placeholder="必填" type="number" v-model="member.cardNo"></mt-field>
          <mt-cell title="会员等级" @click.native="popup1 = true">
            <input type="text" v-model="gradeName"><label>选择 <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-cell title="性别" @click.native="popup2 = true" >
            <input type="text" v-model="sexName" > <label>选择 <i class="iconfont icon-jiantou"></i></label>
          </mt-cell>
          <mt-field label="生日" placeholder="请输入生日" type="date" v-model="member.birthday"></mt-field>
          <mt-cell title="地址">
            <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="2"></mt-picker>
          </mt-cell>
        </div>
      </div>
      <div class="a_btn">
        <mt-button type="primary" @click="addmember(1)">保存</mt-button>
        <mt-button type="primary" @click="addmember(2)">继续保存</mt-button>
      </div>
      <!--底部弹出框-->
      <mt-popup v-model="popup1" position="bottom">
        <div class="popup">
          <div class="p_btn">
            <mt-button @click.native="popup1 = false">取消</mt-button>
            <mt-button class="confirm" @click.native="popup1 = false" >确定</mt-button>
          </div>
          <p v-for="obj in gradeList">
            <input type="radio" name="dengji" v-model="gradeName" :value="obj.gradeName" v-on:click="grade(obj)" >{{obj.gradeName}}</p>
        </div>
      </mt-popup>
      <mt-popup v-model="popup2" position="bottom">
        <div class="popup">
          <div class="p_btn">
            <mt-button @click.native="popup2 = false">取消</mt-button>
            <mt-button class="confirm" @click.native="popup2 = false">确定</mt-button>
          </div>
          <p><input type="radio" name="abc" v-model="sexName" v-on:click="genderName(1)" value="男" >男</p>
          <p><input type="radio" name="abc" v-model="sexName" v-on:click="genderName(0)" value="女">女</p>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<style lang="scss" scoped>
  @import "../../style/goods/detail";
  @import "../../style/public";
</style>
<script type="text/babel">
  import { addMember,getShopGrade,checkCardNo,saveMember } from '../../api/api';
  const address = {
    '北京': ['北京'],
    '广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '上海': ['上海'],
    '天津': ['天津'],
    '重庆': ['重庆'],
    '辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
    '江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
    '湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
    '四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
    '陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
    '河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
    '山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
    '河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
    '吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
    '黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
    '内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
    '山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
    '安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
    '浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
    '福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
    '湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
    '江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
    '贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
    '云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
    '西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
    '海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
    '甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
    '宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
    '青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
    '新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
    '香港': ['香港'],
    '澳门': ['澳门'],
    '台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
  };
  export default {
    data() {
      return {
        sheetVisible: false,
        actions: [],
        member: {
          memberName: '',//会员名称
          mobile: '',//电话
          memberAddr: '',//地址
          mGroupId: '',//等级id
          gender: 0,//性别
          cardNo: '',//卡号
          birthday: '',//生日
        },
        gradeList:[],//会员等级集合

        popup1: false,
        popup2: false,
        sexName: '',
        gradeName: '',
        addressSlots: [
          {
            flex: 1,
            values: Object.keys(address),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['北京'],
            className: 'slot3',
            textAlign: 'center'
          }
        ],
      };
    },
    created:function () {
      this.getaddMember();
    },
    methods: {
      genderName(gender) {
        this.member.gender=gender;
      },
      grade(obj) {
        this.member.mGroupId=obj.mGradeId;
      },
      addmember(type){
        if(this.member.memberName==null&&this.member.memberName==''){
          alert("请输入名称");
            return;
        }
        if(this.member.cardNo==null&&this.member.cardNo==''){
          alert("请输入卡号");
            return;
        }
        var para={cardNo:this.member.cardNo};
        checkCardNo (para).then(res => {
          if(res.code==100000){
            alert("会员卡已经存在请重新输入");
            this.member.cardNo=''
            return;
          }
          if(this.member.memberName==null||this.member.memberName==''){
            alert("请选择会员姓名");
            return;
          }
          if(this.member.mGroupId==null||this.member.mGroupId==''){
            alert("请选择会员卡类别");
            return;
          }
          this.member.mobile=this.member.cardNo;
          saveMember(this.member).then(res=>{
            if(res.code==100000){
              if(type==1){
                this.$router.push({ path: '/member',query:{}});
              }else{
                  this.member.memberName= '';//会员名称
                  this.member.mobile='';//电话
                  this.member.memberAddr= '';//地址
                  this.member.mGroupId= '';//等级id
                  this.member.gender= 0;//性别
                  this.member.cardNo= '';//卡号
                  this.member.birthday= '';//生日
              }
            }
          });
        });
      },
      getaddMember(){
        let params= {};
        addMember(params).then((res)=>{
          this.gradeList=res.data.gradeList;
        });
      },
      onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.addressProvince = values[0];
        this.addressCity = values[1];
        this.member.memberAddr=values[0]+','+values[1];
      }
    },

    mounted() {
      this.actions = [{
        name: '拍照',
        method: this.takePhoto
      }, {
        name: '从相册中选择',
        method: this.openAlbum
      }];
    },


  };
</script>
