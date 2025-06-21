// Babel configuration for transpiling modern JavaScript to compatible versions
export default {
    presets: [['@babel/preset-env', { targets: { node: 'current' } }]], // Use preset-env to target current Node.js version
};