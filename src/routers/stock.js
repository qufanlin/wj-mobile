//库存管理
import stock from '../views/stock/stock'
import purchase from '../views/stock/purchase'
import storage from '../views/stock/storage'

import record from '../views/stock/record'
export default  [
  { path: '/stock', component: stock,  type: 'stock',name: '库存管理',},
  { path: '/stock/purchase', component:purchase, name: '采购入库'},
  { path: '/stock/storage', component:storage, name: '入库记录'},
  { path: '/stock/record', component:record, name: '库存盘点'},

];
