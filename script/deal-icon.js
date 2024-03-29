const fs = require('fs');
const axios = require('axios');

// iconfont 的 地址
const ICON_FONT_URL = '//at.alicdn.com/t/font_1954226_p8b0nqsawe';

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
        fs.writeFileSync('./src/docs/icon.md', newIconMd);
    });
