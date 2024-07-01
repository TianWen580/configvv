import Vue from 'vue'
import Vuex from 'vuex'
import settings from './modules/settings'
import visualize from './modules/visualize'
import builder from './modules/builder'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        settings,
        visualize,
        builder
    }
})