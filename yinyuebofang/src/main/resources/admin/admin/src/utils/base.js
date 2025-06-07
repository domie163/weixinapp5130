const base = {
    get() {
        return {
            url : "http://localhost:8080/yinyuebofang/",
            name: "yinyuebofang",
            // 退出到首页链接
            indexUrl: 'http://localhost:8080/yinyuebofang/front/index.html'
        };
    },
    getProjectName(){
        return {
            projectName: "音乐播放器小程序"
        } 
    }
}
export default base
