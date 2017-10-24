import Router from 'vue-router'
import hots from './hots.vue'
import side from './side.vue'
import column from './column.vue'

Vue.use(Router)

function createColumn (id) {
  return {
    name: `column-${id}`,
    render (createElement) {
      return createElement(column, { props: { id }})
    }
  }
}

export default new Router({
  routes: [
      { path: '/', component:hots },
      { path: '/side', component: side},
      { path: '/column', component: createColumn('1') },
      { path: '/column', component: createColumn('2') },
      { path: '/column', component: createColumn('3') }
  ]
})
