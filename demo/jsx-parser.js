const jsx = require('../dist/jsx.js');

console.log(
    jsx`
        <div a=1 b=c>
            Hello <strong>${'world'}</strong>
        </div>
    `
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
            <div b=4/>
        </${R}>
    `
)

