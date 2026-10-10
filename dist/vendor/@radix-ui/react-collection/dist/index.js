var $ = (r) => {
  throw TypeError(r);
};
var H = (r, i, e) => i.has(r) || $("Cannot " + e);
var m = (r, i, e) => (H(r, i, "read from private field"), e ? e.call(r) : i.get(r)), J = (r, i, e) => i.has(r) ? $("Cannot add the same private member more than once") : i instanceof WeakSet ? i.add(r) : i.set(r, e), q = (r, i, e, t) => (H(r, i, "write to private field"), t ? t.call(r, e) : i.set(r, e), e);
import * as h from "react";
import { createContextScope as X } from "../../react-context/dist/index.js";
import { useComposedRefs as _ } from "../../react-compose-refs/dist/index.js";
import { createSlot as b } from "../../react-slot/dist/index.js";
import { jsx as g } from "react/jsx-runtime";
var ne = Object.defineProperty, a = (r, i) => ne(r, "name", { value: i, configurable: !0 });
// @__NO_SIDE_EFFECTS__
function oe(r) {
  const i = r + "CollectionProvider", [e, t] = X(i), [o, n] = e(
    i,
    { collectionRef: { current: null }, itemMap: /* @__PURE__ */ new Map() }
  ), s = /* @__PURE__ */ a((d) => {
    const { scope: p, children: E } = d, P = h.useRef(null), l = h.useRef(/* @__PURE__ */ new Map()).current;
    return /* @__PURE__ */ g(o, { scope: p, itemMap: l, collectionRef: P, children: E });
  }, "CollectionProvider");
  s.displayName = i;
  const c = r + "CollectionSlot", C = b(c), v = h.forwardRef(
    (d, p) => {
      const { scope: E, children: P } = d, l = n(c, E), f = _(p, l.collectionRef);
      return /* @__PURE__ */ g(C, { ref: f, children: P });
    }
  );
  v.displayName = c;
  const D = r + "CollectionItemSlot", R = "data-radix-collection-item", M = b(D), w = h.forwardRef(
    (d, p) => {
      const { scope: E, children: P, ...l } = d, f = h.useRef(null), N = _(p, f), S = n(D, E);
      return h.useEffect(() => (S.itemMap.set(f, { ref: f, ...l }), () => void S.itemMap.delete(f))), /* @__PURE__ */ g(M, { [R]: "", ref: N, children: P });
    }
  );
  w.displayName = D;
  function y(d) {
    const p = n(r + "CollectionConsumer", d);
    return h.useCallback(() => {
      const P = p.collectionRef.current;
      if (!P) return [];
      const l = Array.from(P.querySelectorAll(`[${R}]`));
      return Array.from(p.itemMap.values()).sort(
        (S, O) => l.indexOf(S.ref.current) - l.indexOf(O.ref.current)
      );
    }, [p.collectionRef, p.itemMap]);
  }
  return a(y, "useCollection"), [
    { Provider: s, Slot: v, ItemSlot: w },
    y,
    t
  ];
}
a(oe, "createCollection");
var Q = /* @__PURE__ */ new WeakMap(), u, x, K = (x = class extends Map {
  constructor(e) {
    super(e);
    J(this, u);
    q(this, u, [...super.keys()]), Q.set(this, !0);
  }
  set(e, t) {
    return Q.get(this) && (this.has(e) ? m(this, u)[m(this, u).indexOf(e)] = e : m(this, u).push(e)), super.set(e, t), this;
  }
  insert(e, t, o) {
    const n = this.has(t), s = m(this, u).length, c = G(e);
    let C = c >= 0 ? c : s + c;
    const v = C < 0 || C >= s ? -1 : C;
    if (v === this.size || n && v === this.size - 1 || v === -1)
      return this.set(t, o), this;
    const D = this.size + (n ? 0 : 1);
    c < 0 && C++;
    const R = [...m(this, u)];
    let M, w = !1;
    for (let y = C; y < D; y++)
      if (C === y) {
        let d = R[y];
        R[y] === t && (d = R[y + 1]), n && this.delete(t), M = this.get(d), this.set(t, o);
      } else {
        !w && R[y - 1] === t && (w = !0);
        const d = R[w ? y : y - 1], p = M;
        M = this.get(d), this.delete(d), this.set(d, p);
      }
    return this;
  }
  with(e, t, o) {
    const n = new x(this);
    return n.insert(e, t, o), n;
  }
  before(e) {
    const t = m(this, u).indexOf(e) - 1;
    if (!(t < 0))
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position before the given key.
   */
  setBefore(e, t, o) {
    const n = m(this, u).indexOf(e);
    return n === -1 ? this : this.insert(n, t, o);
  }
  after(e) {
    let t = m(this, u).indexOf(e);
    if (t = t === -1 || t === this.size - 1 ? -1 : t + 1, t !== -1)
      return this.entryAt(t);
  }
  /**
   * Sets a new key-value pair at the position after the given key.
   */
  setAfter(e, t, o) {
    const n = m(this, u).indexOf(e);
    return n === -1 ? this : this.insert(n + 1, t, o);
  }
  first() {
    return this.entryAt(0);
  }
  last() {
    return this.entryAt(-1);
  }
  clear() {
    return q(this, u, []), super.clear();
  }
  delete(e) {
    const t = super.delete(e);
    return t && m(this, u).splice(m(this, u).indexOf(e), 1), t;
  }
  deleteAt(e) {
    const t = this.keyAt(e);
    return t !== void 0 ? this.delete(t) : !1;
  }
  at(e) {
    const t = k(m(this, u), e);
    if (t !== void 0)
      return this.get(t);
  }
  entryAt(e) {
    const t = k(m(this, u), e);
    if (t !== void 0)
      return [t, this.get(t)];
  }
  indexOf(e) {
    return m(this, u).indexOf(e);
  }
  keyAt(e) {
    return k(m(this, u), e);
  }
  from(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.at(n);
  }
  keyFrom(e, t) {
    const o = this.indexOf(e);
    if (o === -1)
      return;
    let n = o + t;
    return n < 0 && (n = 0), n >= this.size && (n = this.size - 1), this.keyAt(n);
  }
  find(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return n;
      o++;
    }
  }
  findIndex(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return o;
      o++;
    }
    return -1;
  }
  filter(e, t) {
    const o = [];
    let n = 0;
    for (const s of this)
      Reflect.apply(e, t, [s, n, this]) && o.push(s), n++;
    return new x(o);
  }
  map(e, t) {
    const o = [];
    let n = 0;
    for (const s of this)
      o.push([s[0], Reflect.apply(e, t, [s, n, this])]), n++;
    return new x(o);
  }
  reduce(...e) {
    const [t, o] = e;
    let n = 0, s = o ?? this.at(0);
    for (const c of this)
      n === 0 && e.length === 1 ? s = c : s = Reflect.apply(t, this, [s, c, n, this]), n++;
    return s;
  }
  reduceRight(...e) {
    const [t, o] = e;
    let n = o ?? this.at(-1);
    for (let s = this.size - 1; s >= 0; s--) {
      const c = this.at(s);
      s === this.size - 1 && e.length === 1 ? n = c : n = Reflect.apply(t, this, [n, c, s, this]);
    }
    return n;
  }
  toSorted(e) {
    const t = [...this.entries()].sort(e);
    return new x(t);
  }
  toReversed() {
    const e = new x();
    for (let t = this.size - 1; t >= 0; t--) {
      const o = this.keyAt(t), n = this.get(o);
      e.set(o, n);
    }
    return e;
  }
  toSpliced(...e) {
    const t = [...this.entries()];
    return t.splice(...e), new x(t);
  }
  slice(e, t) {
    const o = new x();
    let n = this.size - 1;
    if (e === void 0)
      return o;
    e < 0 && (e = e + this.size), t !== void 0 && t > 0 && (n = t - 1);
    for (let s = e; s <= n; s++) {
      const c = this.keyAt(s), C = this.get(c);
      o.set(c, C);
    }
    return o;
  }
  every(e, t) {
    let o = 0;
    for (const n of this) {
      if (!Reflect.apply(e, t, [n, o, this]))
        return !1;
      o++;
    }
    return !0;
  }
  some(e, t) {
    let o = 0;
    for (const n of this) {
      if (Reflect.apply(e, t, [n, o, this]))
        return !0;
      o++;
    }
    return !1;
  }
}, u = new WeakMap(), a(x, "OrderedDict"), x);
function k(r, i) {
  if ("at" in Array.prototype)
    return Array.prototype.at.call(r, i);
  const e = Y(r, i);
  return e === -1 ? void 0 : r[e];
}
a(k, "at");
function Y(r, i) {
  const e = r.length, t = G(i), o = t >= 0 ? t : e + t;
  return o < 0 || o >= e ? -1 : o;
}
a(Y, "toSafeIndex");
function G(r) {
  return r !== r || r === 0 ? 0 : Math.trunc(r);
}
a(G, "toSafeInteger");
// @__NO_SIDE_EFFECTS__
function re(r) {
  const i = r + "CollectionProvider", [e, t] = X(i), [o, n] = e(
    i,
    {
      collectionElement: null,
      collectionRef: { current: null },
      collectionRefObject: { current: null },
      itemMap: new K(),
      setItemMap: /* @__PURE__ */ a(() => {
      }, "setItemMap")
    }
  ), s = /* @__PURE__ */ a(({ state: l, ...f }) => l ? /* @__PURE__ */ g(C, { ...f, state: l }) : /* @__PURE__ */ g(c, { ...f }), "CollectionProvider");
  s.displayName = i;
  const c = /* @__PURE__ */ a((l) => {
    const f = p();
    return /* @__PURE__ */ g(C, { ...l, state: f });
  }, "CollectionInit");
  c.displayName = i + "Init";
  const C = /* @__PURE__ */ a((l) => {
    const { scope: f, children: N, state: S } = l, O = h.useRef(null), [T, I] = h.useState(
      null
    ), L = _(O, I), [j, V] = S;
    return h.useEffect(() => {
      if (!T) return;
      const z = te(() => {
      });
      return z.observe(T, {
        childList: !0,
        subtree: !0
      }), () => {
        z.disconnect();
      };
    }, [T]), /* @__PURE__ */ g(
      o,
      {
        scope: f,
        itemMap: j,
        setItemMap: V,
        collectionRef: L,
        collectionRefObject: O,
        collectionElement: T,
        children: N
      }
    );
  }, "CollectionProviderImpl");
  C.displayName = i + "Impl";
  const v = r + "CollectionSlot", D = b(v), R = h.forwardRef(
    (l, f) => {
      const { scope: N, children: S } = l, O = n(v, N), T = _(f, O.collectionRef);
      return /* @__PURE__ */ g(D, { ref: T, children: S });
    }
  );
  R.displayName = v;
  const M = r + "CollectionItemSlot", w = "data-radix-collection-item", y = b(M), d = h.forwardRef(
    (l, f) => {
      const { scope: N, children: S, ...O } = l, T = h.useRef(null), [I, L] = h.useState(null), j = _(f, T, L), V = n(M, N), { setItemMap: z } = V, B = h.useRef(O);
      Z(B.current, O) || (B.current = O);
      const U = B.current;
      return h.useEffect(() => {
        const W = U;
        return z((A) => I ? A.has(I) ? A.set(I, { ...W, element: I }).toSorted(F) : (A.set(I, { ...W, element: I }), A.toSorted(F)) : A), () => {
          z((A) => !I || !A.has(I) ? A : (A.delete(I), new K(A)));
        };
      }, [I, U, z]), /* @__PURE__ */ g(y, { [w]: "", ref: j, children: S });
    }
  );
  d.displayName = M;
  function p() {
    return h.useState(new K());
  }
  a(p, "useInitCollection");
  function E(l) {
    const { itemMap: f } = n(r + "CollectionConsumer", l);
    return f;
  }
  return a(E, "useCollection"), [
    { Provider: s, Slot: R, ItemSlot: d },
    {
      createCollectionScope: t,
      useCollection: E,
      useInitCollection: p
    }
  ];
}
a(re, "createCollection");
function Z(r, i) {
  if (r === i) return !0;
  if (typeof r != "object" || typeof i != "object" || r == null || i == null) return !1;
  const e = Object.keys(r), t = Object.keys(i);
  if (e.length !== t.length) return !1;
  for (const o of e)
    if (!Object.prototype.hasOwnProperty.call(i, o) || r[o] !== i[o]) return !1;
  return !0;
}
a(Z, "shallowEqual");
function ee(r, i) {
  return !!(i.compareDocumentPosition(r) & Node.DOCUMENT_POSITION_PRECEDING);
}
a(ee, "isElementPreceding");
function F(r, i) {
  return !r[1].element || !i[1].element ? 0 : ee(r[1].element, i[1].element) ? -1 : 1;
}
a(F, "sortByDocumentPosition");
function te(r) {
  return new MutationObserver((e) => {
    for (const t of e)
      if (t.type === "childList") {
        r();
        return;
      }
  });
}
a(te, "getChildListObserver");
export {
  oe as createCollection,
  re as unstable_createCollection
};
