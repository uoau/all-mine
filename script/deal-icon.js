const fs = require('fs');
const axios = require('axios');

// iconfont 的 地址
const ICON_FONT_URL = '//at.alicdn.com/t/font_1954226_pxozou3jcb';

const iconJsUrl = `http:${ICON_FONT_URL}.js`;

axios.get(iconJsUrl)
    .then((res) => {
        // 将文件写入目标地址
        fs.writeFileSync('./packages/iconfont/default.js', res.data);
        // 将文件里的id抓出来
        const ids = res.data
            .match(/symbol id="([^"]+)"/g)
            .map((item) => item.match(/symbol id="([^"]+)"/)[1]);
        const iconMd = fs.readFileSync('./src/docs/icon.md').toString();
        const newIconMd = iconMd.replace(/iconList:\[[^\]]*\]/, `iconList:${JSON.stringify(ids)}`);
        console.log(newIconMd);
        fs.writeFileSync('./src/docs/icon.md', newIconMd);
    });
