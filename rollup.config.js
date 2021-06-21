export default {
    input: 'index.js',
    output: [
        { file: 'dist/jsx.js', format: 'cjs', exports: 'auto', sourcemap: true },
        { file: 'dist/jsx.umd.js', format: 'umd', name: 'jsx', sourcemap: true },
        { file: 'dist/jsx.esm.js', format: 'esm', sourcemap: true },
    ],
}