### DEMO

```shell
npm install @link-hooks/jsx
```

```js
import jsx from "@link-hooks/jsx.esm";

const wf = "world";

jsx`
    <div a=1 b=c>
        Hello <strong>${wf}</strong>
    </div>
`;

// out:
// {
//   t: 'div',
//   p: { a: '1', b: 'c' },
//   sIs: 1,
//   sIe: 12,
//   c: [
//     'Hello',
//     {
//       t: 'strong',
//       p: {},
//       sIs: 33,
//       sIe: 39,
//       c: ['world'],
//       _jsx: true,
//       eIs: 47,
//       eIe: 53
//     }
//   ],
//   _jsx: true,
//   eIs: 65,
//   eIe: 68
// }

const R = ({ c }) => jsx`<div>${c}</div>`;
const o = { d: 1 };

jsx`
    <${R}>
        <div a=${o} />
        <div b=4/>
    </${R}>
`;
// out:
// {
//   t: [Function: R],
//   p: {},
//   c: [
//     {
//       t: 'div',
//       p: { a: { d: 1 } },
//       c: [],
//       sIs: 19,
//       sIe: 32,
//       eIs: 33,
//       eIe: 34,
//       _jsx: true
//     },
//     {
//       t: 'div',
//       p: { b: '4' },
//       c: [],
//       sIs: 49,
//       sIe: 55,
//       eIs: 56,
//       eIe: 57,
//       _jsx: true
//     }
//   ],
//   sIs: 1,
//   sIe: 4,
//   _jsx: true,
//   eIs: 69,
//   eIe: 72
// }
```
