export function  numberformatDivided (row, column){
    var nuber = row[column.property];
    nuber = Number(nuber).toFixed(2);
    return nuber;
};

//除以100 数字
export function formatDivided (value) {
    var html, _val;
    value = Number(value).toFixed(2);
    return value;
};
