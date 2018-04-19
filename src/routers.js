//杂项
import index from './routers/index'
//订单
import order from './routers/order'
//商品
import goods from './routers/goods'
//订单
import member from './routers/member'
//员工
import staff from './routers/staff'
//我的
import my from './routers/my'
//库存管理
import stock from './routers/stock'
export default index.concat(order).concat(goods).concat(member).concat(staff).concat(my).concat(stock);
