function isFn(anyV) {
    return typeof anyV === 'function'
}
function isO(anyV) {
    return typeof anyV === 'object'
}
function rc() {
    return `${typeof performance !== 'undefined' ? performance.now() : Date.now()}`.slice(-5)
}
// anyObj => string
function any2s(sf) {
    if (!isFn(sf) && !isO(sf)) return `S${sf})`
    let k = any2s.cs.get(sf),
        k2 = k ?? (isFn(sf) ? `F${sf.name})` : `O${sf.__k ?? rc()})`)
    if (k !== k2) {
        any2s.cs.set(sf, k2)
    }
    return k2
}
// cache Key
any2s.cs = new WeakMap()

// pA:['a',fn,...] => ['string','string', ...]
function sf2sA(pA = []) {
    return pA.map(
        p => any2s(p)
    )
}

// pA:['a',fn,...] => {[string|fn.name]: xxx}
function sf2M(pA = []) {
    return pA.reduce(
        (m, p) => {
            m[any2s(p)] = p
            return m
        },
        {}
    )
}

// s:['a=1','b=2'] => {a:1,b:2}
function sA2pM(sA = [], sM /** {sv:V} */) {
    return sA.reduce(
        (pM, s) => {
            if (s === E || !s.trim()) return pM
            let [k, v] = s.split(EFF)
            if (!v) throw Error(`${k}=empty?`)
            pM[k.trim()] = gV(sM, v)
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

function gV(map, k) {
    return map[k] ?? k
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
    const pMK = sf2sA(pA)
    const pM = sf2M(pA)
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
                    // find last cItem.eIe, or startTag.sIe
                    let ct = sub(fxc, (ucn.c.length > 0 ? pick(ucn.c, ucn.c.length - 1).eIe : ucn.sIe) + 1, cI).trim()
                    if (ct.length) ucn.c.push(ct)
                    ucf = false
                }
                pick(fxc, cI + 1) === SLF ? (efI = cI + 2) : (sfI = cI + 1)
                break;
            case SLF:
                // find <t />
                if (sfI !== -1 && pick(fxc, cI + 1) === EF) {
                    let [t, ...tpA] = sub(fxc, sfI, cI).split(E),
                        n = jsx.h({
                            t: gV(pM, t), p: sA2pM(tpA, pM), c: [],
                            sIs: sfI, sIe: cI - 1, eIs: cI, eIe: cI + 1
                        })
                    n._jsx = true
                    if (nsk.length === 0) {
                        nsk.push(n)
                    } else {
                        // insert parent node
                        let fn = fNeN(nsk)
                        if (!fn) throw Error('no parent node ?')
                        fn.c.push(n)
                        ucf = fn.t
                    }
                    sfI = -1
                }
                break;
            case EF:
                // find < and >
                if (sfI !== -1) {
                    let [t, ...tpA] = sub(fxc, sfI, cI).split(E),
                        n = jsx.h({
                            t: gV(pM, t), p: sA2pM(tpA, pM), c: [],
                            sIs: sfI, sIe: cI
                        })
                    n._jsx = true
                    nsk.push(n)
                    ucf = t
                    sfI = -1
                }
                // find </ adn >
                if (efI !== -1) {
                    let st = sub(fxc, efI, cI), t = gV(pM, st)
                    let n = pop(nsk)
                    if (!n) throw Error(`not found ${t} start tag`)
                    if (n.t !== t) throw Error(`start tag no eq end tag => ${n.t} !== ${t}`)
                    n.eIs = efI
                    n.eIe = cI
                    if (nsk.length === 0) {
                        nsk.push(n)
                    } else {
                        // insert parent node
                        let fn = fNeN(nsk)
                        if (!fn) throw Error('no parent node ?')
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