const postcss = require("postcss");

const getOutputVariables = postcss.plugin('getOutputVariables', function (options) {
    
    return function (css) {
        options = options || {};
        
        css.nodes = css.nodes.filter((node) => node.selector === ".output-variables" );
    }

});

module.exports = {
    getOutputVariables
}