
var _excel =function(){

const workbook = $XLSX.readFile('/xmgc_main/www/upload/test.xlsx');
// 获取 Excel 中所有表名
const sheetNames = workbook.SheetNames; // 返回 ['sheet1', 'sheet2']
// 根据表名获取对应某张表
const worksheet = workbook.Sheets[sheetNames[0]];

const headers = {};
const data = [];
const keys = Object.keys(worksheet);
keys
// 过滤以 ! 开头的 key
    .filter(k => k[0] !== '!')
    // 遍历所有单元格
    .forEach(k => {
        // 如 A11 中的 A
        var col = k.substring(0, 1);
        // 如 A11 中的 11
        var row = parseInt(k.substring(1));
        // 当前单元格的值
        var value = worksheet[k].v;

        // 保存字段名
        if (row === 1) {
            headers[col] = value;
            return;
        }

        // 解析成 JSON
        if (!data[row]) {
            data[row] = {};
        }
        data[row][headers[col]] = value;
    });

//console.log(data); // [ { '姓名': 'test1', '年龄': 20 }, { '姓名': 'test2', '年龄': 10 } ... ]
    return data;

};

module.exports = _excel;