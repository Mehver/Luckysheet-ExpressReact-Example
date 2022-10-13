import React from 'react';

class Luckysheet extends React.Component {

    componentDidMount() {
        const luckysheet = window.luckysheet;

        // get the current hostname
        let host = window.location.hostname;
        // get the current port number
        let port = window.location.port;
        let url = "http://" + host + ":" + port + "/load/data.json";
        let options;
        options = {
            container: 'luckysheet', // 设定DOM容器的id
            title: 'Luckysheet Demo', // 设定表格名称
            lang: 'zh', // 设定表格语言
            allowCopy: true, // 是否允许复制
            showinfobar: false, // 是否显示信息栏
            // showtoolbar: false, // 是否显示工具栏
            // showsheetbar: false, // 是否显示工作表栏

        }
        // if port is 3000 (React dev), do not loadUrl
        if (port !== "3000" && port !== "3001") {
            options["loadUrl"] = url; // 设定数据加载地址
        }
        luckysheet.create(options);
    }

    render() {
        const luckyCss = {
            margin: 0,
            padding: 0,
            position: 'fixed',
            left: 0,
            top: 30,
            width: '100%',
            height: window.innerHeight - 30,
        }
        return (
            <div
                id="luckysheet"
                style={luckyCss}
            >
            </div>
        )
    }
}

export default Luckysheet
