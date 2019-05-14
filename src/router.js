import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)


export default new Router({
 
  // mode: 'history',
  base: '/meeting/',
  routes: [{
      path: '/',
      name: 'home',
      component: Home,
      children: [

        // loading status === 4 的显示页面

        {
          path: 'loading',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/loading/loading.vue')
          },
          props: true,
        },

        {
          path: 'home',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/video.vue')
          },
          props: true,
        },
        // 投票计票
        {
          path: 'voteCount',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/voteCount/voteCount.vue')
          },

          props: true
        },

        // 九严禁
        {
          path: 'nineStrictness',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/nineStrictness/nineStrictness.vue')
          },

          props: true
        },
        // 候选名单
        {
          path: 'candidateApproval',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/candidateApproval/candidateApproval.vue')
          },

          props: true
        },
        // 候选人介绍
        {
          path: 'candidateIntroduction',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/candidateIntroduction/candidateIntroduction.vue')
          },

          props: true
        },
        // 选举办法
        {
          path: 'scrutellers',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/scrutellers/scrutellers.vue')
          },

          props: true
        },
        // 监票人名单
        {
          path: 'CheckList',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/CheckList/CheckList.vue')
          },

          props: true
        },
        // 投票说明
        {
          path: 'votingInstructions',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/votingInstructions/votingInstructions.vue')
          },

          props: true
        },
        // 选举结果
        {
          path: 'votingResults',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/votingResults/votingResults.vue')
          },

          props: true
        },
        // 表态发言
        {
          path: 'Statement',
          components: {
            default: Home,
            left: () => import('./views/left/process.vue'),
            center: () => import('./views/center/show.vue'),
            right: () => import('./views/right/Statement/Statement.vue')
          },

          props: true
        },

      ]


    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import( /* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})