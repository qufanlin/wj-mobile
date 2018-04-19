//会员
import member from '../views/member/member'
import detail from '../views/member/detail'
//详情
import data from '../views/member/pages/data'
import consume from '../views/member/pages/consume'
import storedValue from '../views/member/pages/storedValue'
import integral from '../views/member/pages/integral'
import updateMember from '../views/member/pages/updateMember'
// //添加会员
import add from '../views/member/addMember'
export default  [
  {path: '/member', component: member,  type: 'member',name: '会员管理'},
  { path: '/member/add', component:add, name: '添加会员'},
  { path: '/member/detail', component:detail, name: '会员详情'},
  { path: '/member/data', component:data, name: '基本资料'},
  { path: '/member/consume', component:consume, name: '历史消费'},
  { path: '/member/storedValue', component:storedValue, name: '储值'},
  { path: '/member/integral', component:integral, name: '会员积分'},
  { path: '/member/updateMember', component:updateMember, name: '会员修改'},
];
