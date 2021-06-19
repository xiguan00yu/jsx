const jsx = require('../dist/jsx.js');

console.log(
    (jsx`
        <div a=1 b=c>
            Hello <strong>${'world'}</strong>
        </div>
    `).c
)