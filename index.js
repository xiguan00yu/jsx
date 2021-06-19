function isFn(anyV) {
    return typeof anyV === 'function'
}

// pA:['a',fn,...] => {[string|fn.name]: xxx}
function sf2M(pA = []) {
    return pA.reduce(
        (m, p) => {
            m[isFn(p) ? p.name : p] = p
            return m
        },
        {}
    )
}

// s:['a=1','b=2'] => {a:1,b:2}
function sA2pM(sA = []) {
    return sA.reduce(
        (pM, s) => {
            if (s === E || !s.trim()) return pM
            let [k, v] = s.split(EFF)
            if (!v) throw Error(`${k}=empty?`)
            pM[k.trim()] = v
            return pM
        },
        {}
    )
}

// la:[a,b,c] ra:[e,d] => [a,e,b,d,c]
function insertLeftArr(la = [], ra = []) {
    let lL = la.length,
        rL = ra.length,
        lI = 0,
        rI = 0,
        sum = []
    while (lI < lL || rI < rL) {
        if (lI < lL) {
            sum.push(
                la[lI++]
            )
        }
        if (rI < rL) {
            sum.push(
                ra[rI++]
            )
        }
    }
    return sum
}

function pick(na = [], i = 0) {
    return na[i]
}

function sub(s = '', sI, eI) {
    return s.substring(sI, eI)
}

function pop(na = []) {
    return na.pop()
}
// find last no end node
function fNeN(na = []) {
    let total = na.length, cI = total - 1
    while (cI >= 0) {
        // no set eIe field
        if (na[cI] && !na[cI].eIe) {
            return na[cI]
        }
        cI--
    }
    return null
}

function cE(fxc) {
    let total = fxc.length
    if (total === 0)
        throw console.warn('empty?')
    if (pick(fxc) !== SF)
        throw Error('start error format')
    if (pick(fxc, total - 1) !== EF)
        throw Error('end error format')
    return null
}

const E = ' '
const EFF = '='
const SF = '<'
const SLF = '/'
const EF = '>'

function jsx(sA, ...pA) {
    const pM = sf2M(pA)
    const pMK = Object.keys(pM)
    const fxc = insertLeftArr(sA, pMK).join('').trim()
    cE(fxc)
    let cI = 0,
        cTL = fxc.length,
        cIo = '',
        sfI = -1,
        efI = -1,
        ucf = false,
        nsk = []
    while (cI < cTL) {
        cIo = pick(fxc, cI)
        switch (cIo) {
            case SF:
                // find < or </
                if (ucf !== false) {
                    // c ?
                    let ucn = fNeN(nsk)
                    if (!ucn.c) ucn.c = []
                    // find last cItem.eIe, or startTag.sIe
                    let ct = sub(fxc, (ucn.c.length > 0 ? pick(ucn.c, ucn.c.length - 1).eIe : ucn.sIe) + 1, cI).trim()
                    if (ct.length) ucn.c.push(ct)
                    ucf = false
                }
                pick(fxc, cI + 1) === SLF ? (efI = cI + 2) : (sfI = cI + 1)
                break;
            case EF:
                // find < and >
                if (sfI !== -1) {
                    let [t, ...tpA] = sub(fxc, sfI, cI).split(E),
                        n = jsx.h({ t, p: sA2pM(tpA), sIs: sfI, sIe: cI, c: [] })
                    n._jsx = true
                    nsk.push(n)
                    ucf = t
                    sfI = -1
                }
                // find </ adn >
                if (efI !== -1) {
                    let t = sub(fxc, efI, cI)
                    let n = pop(nsk)
                    if (!n) throw Error(`not found ${t} start tag`)
                    if (n.t !== t) throw Error(`start tag no eq end tag => ${n.t} !== ${t}`)
                    n.eIs = efI
                    n.eIe = cI
                    if (nsk.length === 0) {
                        nsk.push(n)
                    } else {
                        let fn = fNeN(nsk)
                        if (!fn.c) fn.c = []
                        fn.c.push(n)
                        ucf = fn.t
                    }
                    efI = -1
                }
                break;

            default:
            // TODO
        }
        cI++
    }
    return pick(nsk, 0)
}

jsx.h = (o = { t: 'div', c: [], p: [] }) => o

export default jsx