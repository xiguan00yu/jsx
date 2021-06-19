### DEMO

```shell
npm install jsx
```

```js
import jsx from "jsx";

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
```
