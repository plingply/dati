
export default function (vue) {
    vue.filter("yy_mm_dd", function (val) { //1989-01-11
        if (!val || val == 0 || val == '') return "--";
        var date = new Date(val * 1000);
        return date.getFullYear() + "-" + ((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate());
    })
}