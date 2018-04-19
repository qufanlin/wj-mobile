//我的
import my from '../views/my/my'
import setting from '../views/my/setting'
// import screen from '../views/order/screen.vue'
export default  [
  { path: '/my', component: my,  type: 'my',name: '我的',},
  { path: '/my/setting', component:setting, name: '设置'},
  // { path: '/order/screen', component:screen, name: '订单筛选'},
];
