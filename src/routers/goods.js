//商品
import manager from '../views/goods/manager'
import detail from '../views/goods/detail'
import classify from '../views/goods/pages/classify'
import color from '../views/goods/pages/color'
import size from '../views/goods/pages/size'
import stock from '../views/goods/pages/stock'
import supplier from '../views/goods/pages/supplier'
import brand from '../views/goods/pages/brand'
//添加商品
import publish from '../views/goods/publish'
export default  [
  {
    path: '/goods/manager', component: manager,  type: 'goods',name: '商品管理',
    hidden: true,

  },
  { path: '/goods/detail', component:detail, name: '商品详情'},
  { path: '/goods/publish', component:publish, name: '添加商品',
    children: [
      { path: '/goods/classify', component:classify, name: '分类'},
      { path: '/goods/color', component:color, name: '颜色'},
      { path: '/goods/size', component:size, name: '尺码'},
      { path: '/goods/stock', component:stock, name: '库存'},
      { path: '/goods/supplier', component:supplier, name: '供应商'},
      { path: '/goods/brand', component:brand, name: '品牌'},
    ]
  },
];
