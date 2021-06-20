export default {
    input: 'index.js',
    output: [
        { file: 'dist/jsx.umd.js', format: 'umd', name: 'jsx', sourcemap: true },
        { file: 'dist/jsx.js', format: 'esm', sourcemap: true },
    ],
}