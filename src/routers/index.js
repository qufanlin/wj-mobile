//主页
import main from '../views/main'
import Login from '../views/Login.vue'
import NotFound from '../views/404.vue'
//经营报表
import report from '../views/report/report'
//门店业绩
import achievement from '../views/achievement/achievement'
export default [
    {
      path: '/',
      name: 'main',
      component: main
    },
    {
      path: '/Login',
      component: Login,
      hidden: true
    },
    {
      path: '/404',
      component: NotFound,
      hidden: true
    },
    {
      path: '*',
      hidden: true,
      redirect: { path: '/404' }
    },
    //经营报表
    {
      path: '/report',
      component: report,
    },
    //门店业绩
    {
      path: '/achievement',
      component: achievement,
    },
  ]
