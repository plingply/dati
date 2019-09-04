export default {
    setmsg(state, data) {
        state.msg = data
    },
    setm(state, data) {
        state.m = data
    },
    setd(state, data) {
        state.d = data
    },
    setd1(state, data) {
        state.d[data.index].select = data.val
    },
    setList(state, data) {
        state.list = data;
    },
    setSchool(state, data) {
        state.school = data;
    }
}