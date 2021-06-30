const jsx = require('../dist/jsx.js');

console.time('log')

console.log(
    jsx`
        <div a=1 b=c>
            Hello <strong a=1>${'world'}</strong>
        </div>
    `.c
)

console.log(
    jsx`
        <div a=1 b=c>
            Hello <br /> World
        </div>
    `
)

console.log(
    jsx`
        <>
            <div/>
            <div/>
        </>
    `
)

const R = ({ c }) => jsx`<div>${c}</div>`
const o = { d: 1 }

console.log(
    jsx`
        <${R}>
            <div a=${o} />
            <div b=4></div>
        </${R}>
    `
)

console.log(
    jsx`
        <div a=${o}>
            ${['b', 'c']} hello
        </div>
    `
)


console.timeEnd('log')

// v1 log: 8 - 9ms
// v2 log: 9 - 11ms