# DEMO

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
const ar = ["Hello", "World"];
jsx`
    <div>
        ${ar}
    </div>
`;
// {
//   t: 'div',
//   p: {},
//   c: [ 'Hello', 'World' ],
//   sIs: 1,
//   sIe: 4,
//   _jsx: true,
//   eIs: 36,
//   eIe: 39
// }
```

# Upgrade

### V1: 使用 String 的概念，对于整个 Args 都字符串化，以便于算法指针移动

> 优点：速度稍微快一些
>
> 缺点：需要对 Args 去字符串化处理存在 key 的处理

### V2: 使用 Array String 概念，对于两个 Item 间隔插入 Arg，动态的计算指针移动

> 优点：不用处理 Args 字符串化
>
> 缺点：速度可能会慢
