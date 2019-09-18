/*eslint-disable*/
/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
        content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
    if (!name) return;
    return window.localStorage.getItem(name);
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
    if (!name) return;
    window.localStorage.removeItem(name);
}

/**
 * 解析url参数 注意：只支持hash的参数
 * @example /#/?id=12345&a=b
 * @return Object {id:12345,a:b}
 */
export const urlParse = function () {
    let url = window.location.hash;
    let obj = {};
    let reg = /[?&][^?&]+=[^?&]+/g;
    let arr = url.match(reg);
    // ['?id=12345', '&a=b']
    if (arr) {
        arr.forEach((item) => {
            let tempArr = item.substring(1).split('=');
            let key = decodeURIComponent(tempArr[0]);
            let val = decodeURIComponent(tempArr[1]);
            obj[key] = val;
        });
    }
    return obj;
};

/**
 * 获取某个对象中某个属性为某个值的对象，返回这个对象
 * @param prop 需要获取的属性名称
 * @param name 被判断值的属性名称
 * @param val 被判断属性对应的值
 * @param arr 被遍历的数组
 * @returns {*}
 */
export const getObjPropByPop = (prop, name, val, arr) => {
    for (let item of arr) {
        if (item[name] === val) {
            return item[prop];
        }
    }
};
