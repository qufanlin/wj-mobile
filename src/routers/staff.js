//订单
import staff from '../views/staff/staff'
import addStaff from '../views/staff/addStaff'
import editors from '../views/staff/editors'
export default  [
  {path: '/staff', component: staff,  type: 'staff',name: '员工管理'},
  { path: '/staff/addStaff', component:addStaff, name: '添加员工'},
  { path: '/staff/editors', component:editors, name: '编辑员工'},
];
