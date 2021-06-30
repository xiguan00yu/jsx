function isFn(anyV) {
    return typeof anyV === 'function'
}

function isSr(anyV) {
    return typeof anyV === 'string'
}

const RE = /^\s*$/
const SE = ''
const E = ' '
const EFF = '='
const SF = '<'
const SLF = '/'
const EF = '>'

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

function faR(cA = [], cI) {
    return cA.push(...(Array.isArray(cI) ? cI : [cI])) && cA
}
function jsx(sA = [], ...pA) {

    // sA = sA.map(s => s.trim())

    let cI = 0,
        cTA = [],
        cTL = 0,
        cIo = '',
        sfI = -1,
        efI = -1,
        ucf = false,
        nsk = []

    for (const s of sA) {
        cTL += s.length + 1
        cTA.push(cTL)
    }

    const pick = (i) => {
        let si = cTA.findIndex(cl => cl > i),
            csi = i - (cTA[si - 1] ?? 0)
        return sA[si][csi] ?? (() => pA[si])
    }

    const sub = (s, e) => {

        if (s > e) return ''

        let total = cTA.length,
            si = -1,
            ei = -1

        for (let i = 0; i < total; i++) {
            si === -1 && s < cTA[i] && (si = i)
            ei === -1 && e < cTA[i] && (ei = i)
        }

        let csi = s - (cTA[si - 1] ?? 0),
            cei = e - (cTA[ei - 1] ?? 0),
            lIsp = sA[ei][cei] === undefined,
            lcei = lIsp ? cei - 1 : cei,
            lcep = lIsp ? pA[ei] : '',
            ra = [], fra = [], isa = false

        if (si !== ei) {
            ra.push(sA[si].substring(csi), pA[si])

            for (si += 1; si < ei; si++) {
                ra.push(sA[si], pA[si])
            }

            ra.push(sA[ei].substring(0, lcei), lcep)
        } else {
            // si === ei
            ra.push(sA[si].substring(csi, lcei), lcep)
        }

        for (const r of ra) {
            if (!isa && Array.isArray(r)) {
                isa = true
                fra.push(...r)
                continue
            }
            if (!isSr(r)) {
                fra.push(r)
                continue
            }
            if (r && !r.match(RE)) {
                fra.push(r)
                continue
            }
        }

        return isa ? fra :
            fra.length === 1 ? fra[0] :
                fra.join(SE)
    }

    const subTps = (s, e) => {
        let t, p = {}, nsa = [], pI = null, lm = false

        const g = () => {
            let nl = nsa.length
            if (nl === 0) return
            if (nl === 1 && isFn(nsa[0])) {
                return nsa[0]()
            }
            return nsa.join(SE)
        }

        loop:
        while (s < e) {
            pI = pick(s++)
            if (pI === E) {
                if (!t) {
                    t = g()
                    nsa = []
                    continue loop
                }
                if (lm !== false) {
                    p[lm] = g()
                    lm = false
                    nsa = []
                }
                continue loop
            }
            if (pI === EFF) {
                lm = g()
                p[lm] = null
                nsa = []
                continue loop
            }
            nsa.push(pI)
        }

        if (nsa.length > 0) {
            let l = g()
            if (!t) t = l
            if (lm !== false) p[lm] = l
        }

        return { t, p }
    }

    while (cI < cTL) {
        cIo = pick(cI)
        switch (cIo) {
            case SF:
                // find < or </
                if (ucf !== false) {
                    // c ?
                    let ucn = fNeN(nsk),
                        // find last cItem.eIe, or startTag.sIe
                        ct = sub((ucn.c.length > 0 ? ucn.c[ucn.c.length - 1].eIe : ucn.sIe) + 1, cI)

                    ct = isSr(ct) ? ct.trim() : ct

                    if (ct) faR(ucn.c, ct)
                    ucf = false
                }
                pick(cI + 1) === SLF ? (efI = cI + 2) : (sfI = cI + 1)
                break;
            case SLF:
                // find <t />
                if (sfI !== -1 && pick(cI + 1) === EF) {
                    let { t, p } = subTps(sfI, cI),
                        n = jsx.h({
                            t, p, c: [],
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
                    let { t, p } = subTps(sfI, cI),
                        n = jsx.h({
                            t, p, c: [],
                            sIs: sfI, sIe: cI
                        })
                    n._jsx = true
                    nsk.push(n)
                    ucf = t
                    sfI = -1
                }
                // find </ adn >
                if (efI !== -1) {
                    let { t } = subTps(efI, cI),
                        n = nsk.pop()
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
        }
        cI++
    }
    return nsk[0]
}

jsx.h = (o = { t: 'div', c: [], p: [] }) => o

export default jsx