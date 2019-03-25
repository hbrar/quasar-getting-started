import Vue from 'vue';
import App from './App.vue';
import './index.css';
import { Quasar, QLayout, QHeader, QDrawer, QPageContainer, QPage, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem, QItemSection, QItemLabel, Ripple, Notify, QCircularProgress } from 'quasar/dist/quasar.common';
import 'quasar/dist/quasar.css';
    
    Vue.use(Quasar, {
    config: {},
    components: { QLayout, QHeader, QDrawer, QPageContainer, QPage, QToolbar, QToolbarTitle, QBtn, QIcon, QList, QItem, QItemSection, QItemLabel, QCircularProgress },
    directives: { Ripple },
    plugins: { Notify }
})
new Vue({
    el: '#app',
    //render: h => h(App) //Use render or spread as below
    ...App
})