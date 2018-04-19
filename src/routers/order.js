//订单
import order from '../views/order/order.vue'
import analysis from '../views/order/analysis.vue'
import screen from '../views/order/screen.vue'
export default  [
  {
    path: '/order', component: order,  type: 'order',name: '订单管理',
    hidden: true,
    children: [
      { path: '/order/analysis', component:analysis, name: '订单分析'},
      { path: '/order/screen', component:screen, name: '订单筛选'},
    ]
  },
];
