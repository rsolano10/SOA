module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": "airbnb-base",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
        'template-curly-spacing': 0,
        indent: 0,
        semi: ['error', 'never'],
        'no-alert': 0,
        'import/prefer-default-export': 0,
        'react/destructuring-assignment': [2, 'always', { ignoreClassFields: true }],
        'react/jsx-filename-extension': 0,
        'global-require': 0,
        'no-useless-escape': 0,
        'template-curly-spacing': 0,
        indent: 0,
        'no-restricted-syntax': ["error", "ForInStatement", "LabeledStatement", "WithStatement"],
    }
};