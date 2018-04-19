import Vue from 'vue';
import axios from "axios";
let base = 'http://192.168.2.209:8080/';

export const requestLogin = params => { return axios.post(`${base}/shop/login`, params); };

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

export const getUserListPage = params => { return axios.get(`${base}/user/listpage`, { params: params }); };

export const removeUser = params => { return axios.get(`${base}/user/remove`, { params: params }); };

export const batchRemoveUser = params => { return axios.get(`${base}/user/batchremove`, { params: params }); };

export const editUser = params => { return axios.get(`${base}/user/edit`, { params: params }); };

export const addUser = params => { return axios.get(`${base}/user/add`, { params: params }); };

//商品相关

//普通商品列表
export const getGoodsListPage = params => { return axios.get(`${base}/shop/goods/listGoods`, { params: params }); };

//带商品规格的商品列表
export const getGoodsAndOptionsListPage = params => { return axios.get(`${base}/shop/goods/listGoodsAndOptions`, { params: params }); };

export const getColorList = params => {
  if(!Vue.prototype.$global.colorData){
    Vue.prototype.$global.colorData  = axios.get(`${base}/shop/goods/listColor`, { params: params });
  }
  return   Vue.prototype.$global.colorData;

};

export const getGoodsOptions = params => { return axios.get(`${base}/shop/goods/getGoodsOptions`, { params: params }); };

export const saveColor = params => { return axios.post(`${base}/shop/goods/saveColor`, params); };
export const delColor = params => { return axios.post(`${base}/shop/goods/delColor`, params); };


export const getSizeList = params => {
  if(!Vue.prototype.$global.sizeData){
    Vue.prototype.$global.sizeData  = axios.get(`${base}/shop/goods/listSize`, { params: params });
  }
  return  Vue.prototype.$global.sizeData;
};
export const saveSize = params => { return axios.post(`${base}/shop/goods/saveSize`, params); };
export const delSize = params => { return axios.post(`${base}/shop/goods/delSize`, params); };

export const getBrandList = params => {
  if(!Vue.prototype.$global.brandData){
    Vue.prototype.$global.brandData =  axios.get(`${base}/shop/goods/listBrand`, { params: params });
  }
  return  Vue.prototype.$global.brandData;
};
export const saveBrand = params => { return axios.post(`${base}/shop/goods/saveBrand`, params); };
export const delBrand = params => { return axios.post(`${base}/shop/goods/delBrand`, params); };


export const getSupplierList = params => {
  if(!Vue.prototype.$global.supplierData){
    Vue.prototype.$global.supplierData =  axios.get(`${base}/shop/goods/listSupplier`, { params: params });
  }
  return  Vue.prototype.$global.supplierData ;
};
export const saveSupplier = params => { return axios.post(`${base}/shop/goods/saveSupplier`, params); };
export const delSupplier = params => { return axios.post(`${base}/shop/goods/delSupplier`, params); };


export const getCategoryList = params => {
  if(!Vue.prototype.$global.categoryData){
    Vue.prototype.$global.categoryData =  axios.get(`${base}/shop/goods/listCategory`, { params: params });
  }
  return   Vue.prototype.$global.categoryData;
};
export const saveCategory = params => { return axios.post(`${base}/shop/goods/saveCategory`, params); };
export const delCategory = params => { return axios.post(`${base}/shop/goods/delCategory`, params); };


export const saveGoods = params => { return axios.post(`${base}/shop/goods/saveGoods`, params); };
export const getGoods = params => { return axios.get(`${base}/shop/goods/getGoods`, { params: params }); };

//采购入库
export const savePurchase = params => { return axios.post(`${base}/shop/goods/savePurchase`, params); };
//采购入库单
export const getPurchaseList = params => { return axios.get(`${base}/shop/goods/listPurchase`, { params: params }); };
//入库单明细
export const getPurchaseDetailList = params => { return axios.get(`${base}/shop/goods/listPurchaseDetail`, { params: params }); };


//盘点入库
export const saveInventory = params => { return axios.post(`${base}/shop/goods/saveInventory`, params); };
//获取单条盘点单
export const getInventoryList = params => { return axios.get(`${base}/shop/goods/listInventory`, { params: params }); };
//获取盘点单明细
export const getInventoryDetailList = params => { return axios.get(`${base}/shop/goods/listInventoryDetail`, { params: params }); };

//生成调拨单
export const saveAllocation = params => { return axios.post(`${base}/shop/goods/saveAllocation`, params); };
//获取调拨单
export const getAllocationList = params => { return axios.get(`${base}/shop/goods/listAllocation`, { params: params }); };
export const getAllocationDetailList = params => { return axios.get(`${base}/shop/goods/listAllocationDetail`, { params: params }); };

//待确认调拨单
export const getAllocationReceiveList = params => { return axios.get(`${base}/shop/goods/listAllocationReceive`, { params: params }); };
export const updateAllocationStatus = params => { return axios.post(`${base}/shop/goods/updateAllocationStatus`, params); };
//删除调拨单
export const deleteAllocation = params => { return axios.post(`${base}/shop/goods/deleteAllocation`, params); };



//商品相关结束
// 会员相关
// 获取会员列表
export const getMemberList = params => { return axios.post(`${base}/shop/member/listMemberAdmin`, params);};
// 获取会员信息 进行修改
export const getMemberDetail = params => { return axios.post(`${base}/shop/member/editMember`,params);};
// 获取会员详细信息
export const getMemberInfo = params => { return axios.post(`${base}/shop/member/detailMember`,params);};
// 会员消费,充值记录列表
export const getMemberBalanceLog = params => {return axios.post(`${base}/shop/balance/listMemberBalanceLog`,params);};
//会员充值记录
export const getTopUpMemberOrder = params => {return axios.post(`${base}/shop/order/getTopUpMemberOrder`,params);};
//会员充值总额
export const getTopUpCountMemberOrder = params => {return axios.post(`${base}/shop/order/getTopUpCountMemberOrder`,params);};
//获取会员消费总额
export const getCountMemberOrder = params => {return axios.post(`${base}/shop/order/getCountMemberOrder`,params);};
//获取会员订单
export const getMemberOrder = params => {return axios.post(`${base}/shop/order/getMemberOrder`,params);};
//获取会员等级
export const addMember  = params => { return axios.post(`${base}/shop/member/addMember`, params);};
// 会员积分记录
export const getMemberPointsLog = params => { return axios.post(`${base}/shop/points/memberPointsLog`,params);};
// 会员优惠券列表
export const getMemberCoupon = params => {return axios.post(`${base}/shop/coupon/memberCoupons`,params);};

//会员卡号判断是否存在
export const checkCardNo = params => {return axios.post(`${base}/shop/member/checkCardNo`,params);};

//会员卡添加
export const saveMember = params => {return axios.post(`${base}/shop/member/saveMember`,params);};

//删除会员
export const deleteMember = params => {return axios.post(`${base}/shop/member/deleteMember`,params);};



// 会员相关 end

// 促销工具 start
// 获取店铺会员卡列表
export const getShopGrade = params => {return axios.post(`${base}/shop/grade/getShopGrade`,params);};
// 保存店铺会员卡
export const saveShopGrade = params => {return axios.post(`${base}/shop/grade/saveShopGrade`,params);};
// 获取会员卡详情
export const getShopGradeDetail = params => {return axios.post(`${base}/shop/grade/getShopGradeDetail`,params);};
// 获取店铺优惠券列表
export const listCouponForShop = params => {return axios.post(`${base}/shop/coupon/listCouponForShop`,params);};
// 保存或修改优惠券
export const saveCoupon = params => {return axios.post(`${base}/shop/coupon/saveCoupon`,params);};
// 优惠券规则详情
export const detailCoupon = params => {return axios.post(`${base}/shop/coupon/detailCoupon`,params);};
// 删除某个优惠券规则 已领取的可以继续使用
export const deleteCoupon = params => {return axios.post(`${base}/shop/coupon/deleteCoupon`,params);};
// 促销工具 end

//门店相关接口
//获取可选门店
export const getBranchList = params => {
  if(!Vue.prototype.$global.branchData){
    Vue.prototype.$global.branchData =  axios.get(`${base}/shop/branch/listBranch`, { params: params });
  }
  return  Vue.prototype.$global.branchData ;
};

//获取单个门店
export const getBranch   = params => { return axios.get(`${base}/shop/branch/getBranch`, { params: params }); };
//保存门店
export const saveBranch  = params => { return axios.post(`${base}/shop/branch/saveBranch`, params); };
//删除门店
export const deleteBranch  = params => { return axios.post(`${base}/shop/branch/deleteBranch`, params); };



//商家信息
export const getShopUser = params => {
  if(!Vue.prototype.$global.shopUserData){
    Vue.prototype.$global.shopUserData =  axios.get(`${base}/shop/setup/getShopUser`, { params: params });
  }
  return  Vue.prototype.$global.shopUserData ;
};

//自有门店信息
export const getOwnerBranch = params => {
  if(!Vue.prototype.$global.ownerBranchData){
    Vue.prototype.$global.ownerBranchData =  axios.get(`${base}/shop/setup/getOwnerBranch`, { params: params });
  }
  return  Vue.prototype.$global.ownerBranchData ;
};


export const saveShopInfo = params => { return axios.post(`${base}/shop/setup/saveShopInfo`, params); };


//门店接口结束

//员工接口
export const getStaffList = params => {
  return   axios.get(`${base}/shop/setup/listShopStaff`, { params: params });
};
//保存员工
export const saveStaff  = params => { return axios.post(`${base}/shop/setup/saveShopStaff`, params); };



//角色接口

export const getRoleList = params => {
  return   axios.get(`${base}/shop/setup/listRole`, { params: params });
};


//保存员工
export const saveRole  = params => { return axios.post(`${base}/shop/setup/saveRole`, params); };


//权限接口
export const getMenuList = params => {
  return   axios.get(`${base}/shop/setup/listMenu`, { params: params });
};

//公共接口
export const getAddress = params => {
  return  axios.get(`${base}/address/getAddress`, { params: params });
};


//-----------------------------------------------收银开始----------------------------------------------
//获取会员信息
export const membersdata = params => {return axios.post(`${base}/shop/order/getmembersdata`,params);};
//获取优惠卷
export const getcoupondatalist = params => {return axios.post(`${base}/shop/order/getcoupondata`,params);};
//获取商品订单
export const getGoodsDatalist = params => {
  if(!Vue.prototype.$global.GoodsDatalist){
    Vue.prototype.$global.GoodsDatalist  = axios.get(`${base}/shop/order/getGoodsData`, { params: params });
  }
  return   Vue.prototype.$global.GoodsDatalist;
};
//提交订单
export const postorderSave = params => { return axios.post(`${base}/shop/order/orderSave`, params); };
//-----------------------------------------------结束----------------------------------------------


//-----------------------------------------------订单分析开始----------------------------------------------
//订单列表
export const orderlist = params => {return axios.post(`${base}/shop/order/getorderlist`,params);};
//订单详情
export const orderitemlist = params => {return axios.post(`${base}/shop/order/getorderitemlist`,params);};
//整单退款
export const postbackReason = params => { return axios.post(`${base}/shop/order/backReason`, params); };
//子订单退款
export const postbackOrderitem = params => { return axios.post(`${base}/shop/order/backOrderitem`, params); };
//获取商家信息
export const getbranchList = params => { return axios.post(`${base}/shop/order/branchList`, params); };
//获取某个店面的所有员工
export const getsalesClerk = params => { return axios.post(`${base}/shop/order/salesClerk`, params); };
//-----------------------------------------------订单分析结束----------------------------------------------



//-----------------------------------------------统计开始--------------------------------------------------
//首页统计----商品统计  --
export const countGoodsSalse = params => { return axios.post(`${base}/shop/stat/countGoodsSalse`, params); };

//首页统计----本月销售统计
export const toMonthOrder = params => { return axios.post(`${base}/shop/stat/toMonthOrder`, params); };


//数据总览
export const statOrder = params => { return axios.post(`${base}/shop/stat/statOrder`, params); };
//销售目标--统计图
export const statOrderweek = params => { return axios.post(`${base}/shop/stat/statOrderweek`, params); };
//销售目标--目标
export const salesTarget = params => { return axios.post(`${base}/shop/stat/salesTarget`, params); };
//销售目标--日期统计
export const dateStat = params => { return axios.post(`${base}/shop/stat/dateStat`, params); };

//门店业绩---报表
export const storesStat = params => { return axios.post(`${base}/shop/stat/storesStat`, params); };

//销售分析
export const statGoodsSales = params => { return axios.post(`${base}/shop/stat/statGoodsSales`, params); };

//客户分析
export const customer = params => { return axios.post(`${base}/shop/stat/customer`, params); };
//客户分析  ---编辑进店数
export const editorModify = params => { return axios.post(`${base}/shop/stat/editorModify`, params); };

//单品分析
export const goodsSales = params => { return axios.post(`${base}/shop/stat/goodsSales`, params); };

//员工业绩--员工业绩
export const staffStatCommission = params => { return axios.post(`${base}/shop/stat/staffStatCommission`, params); };

//员工业绩--获取商家员工
export const  staffTarget  = params => { return axios.post(`${base}/shop/stat/staffTarget`, params); };


//员工业绩---设置员工目标
export const  staffSetUpTarget  = params => { return axios.post(`${base}/shop/stat/staffSetUpTarget`, params);};

//员工业绩---设置员工目标
export const  goods  = params => { return axios.post(`${base}/shop/stat/goods`, params);};

//----手机经营日报
//图标
export const  toOneDayOrder  = params => { return axios.post(`${base}/shop/stat/toOneDayOrder`, params);};
//表格
export const  toOneDayStat  = params => { return axios.post(`${base}/shop/stat/toOneDayStat`, params);};



//-----------------------------------------------统计结束----------------------------------------------------=======

//获取商家绑定的微信公众号
export const getShopPublic = params => {
  if(!Vue.prototype.$global.shopPublicData){
    Vue.prototype.$global.shopPublicData =  axios.get(`${base}/wechat/getShopPublic`, { params: params });
  }
  return  Vue.prototype.$global.shopPublicData ;
};
//获得预授权码
export const getPreAuthCode = params => {
  return  axios.get(`${base}/wechat/getPreAuthCode`, { params: params });
};
//授权成功后回调
export const authCallback  = params => { return axios.post(`${base}/wechat/authCallback`, params); };

//获取门店二维码
export const getBranchQrCode = params => { return axios.post(`${base}/wechat/getBranchQrCode`, params); };


//短消息提醒设置
//获取可选短信模板
export const getSmsTemplateList = params => { return axios.post(`${base}/shop/sms/listSmsTemplate`, params); };
//获取商家短信模板列表
export const getShopSmsTemplateList = params => { return axios.post(`${base}/shop/sms/listShopSmsTemplate`, params); };
//保存商家短信模板
export const saveShopSmsTemplate = params => { return axios.post(`${base}/shop/sms/saveShopSmsTemplate`, params); };


//上传拍照图
export const saveCameraPhoto  = params => {
  return axios.post('http://www.wangjia100.cn/upload/uploadCamera', params,{
    headers:  {
      "access_token":sessionStorage.getItem('access_token'),
      "refresh_token":sessionStorage.getItem('refresh_token')
    }
  });
};
