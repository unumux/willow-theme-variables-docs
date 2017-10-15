const postcss = require("postcss");

const convertRemToPx = postcss.plugin('convertRemToPx', function (options) {
    
    return function (css) {
        options = options || {
            baseFontSize: 10
        };
        
        css.walkRules((rule) => {
            if(rule.selector !== ".output-variables") return;

            rule.walkDecls((decl) => {
                decl.value = decl.value.replace(/\d*\.?\d*rem/g, (substring) => {
                    return `${Math.round(parseFloat(substring) * options.baseFontSize * 100) / 100}px`;
                });
            });
        });
    }

});

module.exports = {
    convertRemToPx
}