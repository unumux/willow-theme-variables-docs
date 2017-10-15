const postcss = require("postcss");

const getVariables = postcss.plugin('getVariables', function (options) {
    
    return function (css) {
        options = options || {additionalImports: []};
        const decls = [];

        css.walkDecls(function (decl) {
            if(decl.prop.indexOf("$") === 0) {
                decls.push(decl);
            }

            decl.remove();
        });

        css.removeAll();
        css.append(postcss.atRule({ name: `import "node_modules/@unumux/theme-coloniallife-default/styles"` }));
        css.append(postcss.atRule({ name: `import "node_modules/@unumux/willow/styles"` }));

        options.additionalImports.forEach((file) => {
            css.append(postcss.atRule({ name: `import "${file}"` }));
        });

        const rule = postcss.rule({ selector: ".output-variables" });
        
        decls.forEach((decl) => {
            if(decl.value.indexOf("(") === 0) {
                rule.append(convertMap(decl));
            } else {
                const prop = convertSassVariableNameToCss(decl.prop);
                const value = decl.prop;
                rule.append(postcss.decl({ prop, value }));
            }
        });
        
        css.append(rule);
    }
});

function convertMap(mapDecl) {
    const parts = mapDecl.value.match(/^\(([\s\S]*)\).*/)[1].split(",").map(line => line.trim());
    return parts.map((part) => {
        const lineParts = part.split(/\s*:\s*/);
        return postcss.decl({
            prop: convertSassVariableNameToCss(mapDecl.prop + "______" + lineParts[0]),
            value: lineParts[1]
        });
    });
}

function convertSassVariableNameToCss(sassVariableName) {
    return `--${sassVariableName.substr(1)}`;
}

module.exports = {
    getVariables
}