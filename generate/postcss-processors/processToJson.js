const postcss = require("postcss");

const processToJson = postcss.plugin('processToJson', function (cb) {
    return function (css) {
        const decls = [];

        css.walkRules(function (rule) {
            rule.walkDecls((decl) => {
                decls.push(decl)
            });
        });

        const output = decls.reduce((prev, curr) => {
            const keyName = curr.prop.replace(/^--/, "");
            let newValue;
            if(keyName.indexOf("______") >= 0) {
                const parts = keyName.split("______");
                newValue = {[parts[0]]: Object.assign({}, prev[parts[0]], { [parts[1]]: curr.value })};
            } else {
                newValue = {[keyName]: curr.value};
            }
            return Object.assign({}, prev, newValue);
        }, {});

        cb(output);

    }

});

module.exports = {
    processToJson
}