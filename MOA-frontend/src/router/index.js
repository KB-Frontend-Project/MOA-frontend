import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import LoginPage from '@/pages/LoginPage.vue'
import SignUpPage from '@/pages/SignUpPage.vue'
import ProfileSettingPage from '@/pages/ProfileSettingPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'
import LedgerDetailPage from '@/pages/LedgerDetailPage.vue'
import CalendarPage from '@/pages/CalendarPage.vue'
import InputLedgerPage from '@/pages/InputLedgerPage.vue'
import ResetPasswordPage from '@/pages/ResetPasswordPage.vue'
import AccountLinking from '@/pages/AccountLinking.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage,
      meta: { guest: true, noSideBar: true },
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUpPage,
      meta: { guest: true, noSideBar: true },
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileSettingPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticsPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/ledger/:id',
      name: 'ledger-detail',
      component: LedgerDetailPage,
      props: true,
      meta: { requiresAuth: true },
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: CalendarPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/ledger/input',
      name: 'input-ledger',
      component: InputLedgerPage,
      meta: { requiresAuth: true },
    },
    {
      path: '/password',
      name: 'password',
      component: ResetPasswordPage,
      meta: { requiresAuth: true, noSideBar: true },
    },
    {
      path: '/account',
      name: 'account',
      component: AccountLinking,
      meta: { requiresAuth: true },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      redirect: '/',
    },
  ],
})

export default router
