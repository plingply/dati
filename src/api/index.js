import http from "../plugin/ajax/ajax"
class assign {

    // 获取题目详情
    static getTimuInfo(data, hideError) {
        return http.get("/api/ti/info", {
            data,
            hideError
        })
    }

    // 获取题目列表
    static getTimuList(data, hideError) {
        return http.get("/api/ti/list", {
            data,
            hideError
        })
    }

}

export default {
    install: function (Vue, name = '$net') {
        Object.defineProperty(Vue.prototype, name, { value: assign });
    }
}