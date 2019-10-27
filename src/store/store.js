import Vue from 'vue'

import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		name: '1',
		password: '',
		nowUrl: '',
		lessinfoAddress: '', // 承租人户籍地址
		lessinfoNowAddress: '', //承租人现住址
        lesseeinfoArr: []
	},

})

export default store
