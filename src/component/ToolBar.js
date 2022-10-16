import React from 'react';
import * as icons from '@ant-design/icons';
import * as ToolBarCSS from './ToolBarCSS';

class SaveData extends React.Component {

    componentDidMount() {
        const luckysheet = window.luckysheet;

        // get the current hostname
        let host = window.location.hostname;
        // get the current port number
        let port = window.location.port;

        let save = function (filename) {
            let data = luckysheet.getAllSheets();
            // send data by ajax
            let xhr = new XMLHttpRequest();
            let url = "http://" + host + ":" + port + "/save/" + filename + ".json";
            xhr.open("POST", url, true);
            xhr.setRequestHeader("Content-Type", "text/plain; charset=utf-8");
            xhr.send(JSON.stringify(data));
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    console.log(xhr.responseText);
                }
            }
        }

        let load = function (filename) {
            let url = "http://" + host + ":" + port + "/load/" + filename + ".json";
            const luckysheet = window.luckysheet;
            luckysheet.create({
                container: 'luckysheet', // 设定DOM容器的id
                title: 'Luckysheet Demo', // 设定表格名称
                lang: 'zh', // 设定表格语言
                allowCopy: true, // 是否允许复制
                showinfobar: false, // 是否显示信息栏
                showtoolbar: false, // 是否显示工具栏
                showsheetbar: false, // 是否显示工作表栏
                loadUrl: url, // 设定数据加载地址
            });
            let work_area = document.querySelector("#luckysheet > div > div.luckysheet-work-area.luckysheet-noselected-text");
            work_area.style.display = "none";
            let copy_btn = document.querySelector("#luckysheet-copy-btn");
            copy_btn.style.display = "none";
        }

        // undo load button
        document.getElementById("toolbar-undoLoad").addEventListener("click", function () {
            save("data");
            load("data_auto-save");
        });

        // redo load button
        document.getElementById("toolbar-redoLoad").addEventListener("click", function () {
            load("data");
        });

        // save button
        document.getElementById("toolbar-save").addEventListener("click", function () {
            save("data");
        });

        // undo ctrlZ button
        document.getElementById("toolbar-ctrlZ").addEventListener("click", function () {
            luckysheet.undo();
        });

        // redo ctrlY button
        document.getElementById("toolbar-ctrlY").addEventListener("click", function () {
            luckysheet.redo();
        });
    }

    render() {
        return (
            <>
                <div id="toolbar" style={ToolBarCSS.toolBarCss}>
                    <p style={ToolBarCSS.titleCss}>Luckysheet-ExpressReact-Example&nbsp;v0.1.2</p>
                </div>
                <div id="buttonBar" style={ToolBarCSS.barCss}>
                    <button id="toolbar-undoLoad" style={ToolBarCSS.buttonCss}>
                        <icons.UndoOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-save" style={ToolBarCSS.buttonCss}>
                        <icons.SaveOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-redoLoad" style={ToolBarCSS.buttonCss}>
                        <icons.RedoOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-ctrlZ" style={ToolBarCSS.buttonCss}>
                        <icons.CaretLeftOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-ctrlY" style={ToolBarCSS.buttonCss}>
                        <icons.CaretRightOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-list" style={ToolBarCSS.buttonCss}>
                        <icons.UnorderedListOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                    <button id="toolbar-set" style={ToolBarCSS.buttonCss}>
                        <icons.SettingOutlined style={ToolBarCSS.iconCss}/>
                    </button>
                </div>
            </>
        )
    }
}

export default SaveData