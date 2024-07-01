export default {
    namespaced: true,
    state () {
        return {
            mainPagefunctionalBtns: {
                "浏览": 0,
                "创建": 1,
            },
            selectedPage: 0,
            nestedCheckboxOptions: {},
            nestedCheckboxSelectedValue: '',

            // boolean
            is404: false,
        }
    },
    mutations: {
        updateSelectedPage (state, selectedPage) {
            state.selectedPage = selectedPage
        },
        setNestedCheckboxOptions (state, nestedCheckboxOptions) {
            state.nestedCheckboxOptions = nestedCheckboxOptions
        },
        setNestedCheckboxSelectedValue (state, nestedCheckboxSelectedValue) {
            state.nestedCheckboxSelectedValue = nestedCheckboxSelectedValue
        },
        set404 (state, is404) {
            state.is404 = is404
        }
    },
    actions: {},
    getters: {}
}