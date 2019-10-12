import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		name: '1',
		password: '',
		nowUrl: '',
        lesseeinfoArr: []
	},

})

export default store
