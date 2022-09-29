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
                    <p style={ToolBarCSS.titleCss}>Luckysheet-ExpressReact-Example&nbsp;v0.1.0</p>
                    <icons.UndoOutlined id="toolbar-undoLoad" style={ToolBarCSS.undoLoadButtonCss} role='button'/>
                    <icons.SaveOutlined id="toolbar-save" style={ToolBarCSS.saveButtonCss} role='button'/>
                    <icons.RedoOutlined id="toolbar-redoLoad" style={ToolBarCSS.redoLoadButtonCss} role='button'/>
                    <icons.CaretLeftOutlined id="toolbar-ctrlZ" style={ToolBarCSS.ctrlZButtonCss} role='button'/>
                    <icons.CaretRightOutlined id="toolbar-ctrlY" style={ToolBarCSS.ctrlYButtonCss} role='button'/>
                    <icons.UnorderedListOutlined id="toolbar-list" style={ToolBarCSS.listButtonCss} role='button'/>
                    <icons.SettingOutlined id="toolbar-set" style={ToolBarCSS.setButtonCss} role='button'/>
                </div>
            </>
        )
    }
}

export default SaveData