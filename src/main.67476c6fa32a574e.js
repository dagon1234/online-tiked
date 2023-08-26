"use strict";
(self.webpackChunkonline_tickets = self.webpackChunkonline_tickets || []).push([
  [179],
  {
    829: () => {
      function K(e) {
        return "function" == typeof e;
      }
      function co(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack);
        });
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        );
      }
      const Ps = co(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join("\n  ")}`
                : ""),
              (this.name = "UnsubscriptionError"),
              (this.errors = n);
          }
      );
      function lo(e, t) {
        if (e) {
          const n = e.indexOf(t);
          0 <= n && e.splice(n, 1);
        }
      }
      class lt {
        constructor(t) {
          (this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null);
        }
        unsubscribe() {
          let t;
          if (!this.closed) {
            this.closed = !0;
            const { _parentage: n } = this;
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const s of n) s.remove(this);
              else n.remove(this);
            const { initialTeardown: r } = this;
            if (K(r))
              try {
                r();
              } catch (s) {
                t = s instanceof Ps ? s.errors : [s];
              }
            const { _finalizers: o } = this;
            if (o) {
              this._finalizers = null;
              for (const s of o)
                try {
                  Df(s);
                } catch (i) {
                  (t = t ?? []),
                    i instanceof Ps ? (t = [...t, ...i.errors]) : t.push(i);
                }
            }
            if (t) throw new Ps(t);
          }
        }
        add(t) {
          var n;
          if (t && t !== this)
            if (this.closed) Df(t);
            else {
              if (t instanceof lt) {
                if (t.closed || t._hasParent(this)) return;
                t._addParent(this);
              }
              (this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              );
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this;
          return n === t || (Array.isArray(n) && n.includes(t));
        }
        _addParent(t) {
          const { _parentage: n } = this;
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t;
        }
        _removeParent(t) {
          const { _parentage: n } = this;
          n === t ? (this._parentage = null) : Array.isArray(n) && lo(n, t);
        }
        remove(t) {
          const { _finalizers: n } = this;
          n && lo(n, t), t instanceof lt && t._removeParent(this);
        }
      }
      lt.EMPTY = (() => {
        const e = new lt();
        return (e.closed = !0), e;
      })();
      const vf = lt.EMPTY;
      function yf(e) {
        return (
          e instanceof lt ||
          (e && "closed" in e && K(e.remove) && K(e.add) && K(e.unsubscribe))
        );
      }
      function Df(e) {
        K(e) ? e() : e.unsubscribe();
      }
      const An = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        Fs = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = Fs;
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n);
          },
          clearTimeout(e) {
            const { delegate: t } = Fs;
            return (t?.clearTimeout || clearTimeout)(e);
          },
          delegate: void 0,
        };
      function wf(e) {
        Fs.setTimeout(() => {
          const { onUnhandledError: t } = An;
          if (!t) throw e;
          t(e);
        });
      }
      function _f() {}
      const q_ = su("C", void 0, void 0);
      function su(e, t, n) {
        return { kind: e, value: t, error: n };
      }
      let Rn = null;
      function ks(e) {
        if (An.useDeprecatedSynchronousErrorHandling) {
          const t = !Rn;
          if ((t && (Rn = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Rn;
            if (((Rn = null), n)) throw r;
          }
        } else e();
      }
      class iu extends lt {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), yf(t) && t.add(this))
              : (this.destination = J_);
        }
        static create(t, n, r) {
          return new fo(t, n, r);
        }
        next(t) {
          this.isStopped
            ? uu(
                (function W_(e) {
                  return su("N", e, void 0);
                })(t),
                this
              )
            : this._next(t);
        }
        error(t) {
          this.isStopped
            ? uu(
                (function G_(e) {
                  return su("E", void 0, e);
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t));
        }
        complete() {
          this.isStopped
            ? uu(q_, this)
            : ((this.isStopped = !0), this._complete());
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null));
        }
        _next(t) {
          this.destination.next(t);
        }
        _error(t) {
          try {
            this.destination.error(t);
          } finally {
            this.unsubscribe();
          }
        }
        _complete() {
          try {
            this.destination.complete();
          } finally {
            this.unsubscribe();
          }
        }
      }
      const Y_ = Function.prototype.bind;
      function au(e, t) {
        return Y_.call(e, t);
      }
      class Q_ {
        constructor(t) {
          this.partialObserver = t;
        }
        next(t) {
          const { partialObserver: n } = this;
          if (n.next)
            try {
              n.next(t);
            } catch (r) {
              Ls(r);
            }
        }
        error(t) {
          const { partialObserver: n } = this;
          if (n.error)
            try {
              n.error(t);
            } catch (r) {
              Ls(r);
            }
          else Ls(t);
        }
        complete() {
          const { partialObserver: t } = this;
          if (t.complete)
            try {
              t.complete();
            } catch (n) {
              Ls(n);
            }
        }
      }
      class fo extends iu {
        constructor(t, n, r) {
          let o;
          if ((super(), K(t) || !t))
            o = {
              next: t ?? void 0,
              error: n ?? void 0,
              complete: r ?? void 0,
            };
          else {
            let s;
            this && An.useDeprecatedNextContext
              ? ((s = Object.create(t)),
                (s.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && au(t.next, s),
                  error: t.error && au(t.error, s),
                  complete: t.complete && au(t.complete, s),
                }))
              : (o = t);
          }
          this.destination = new Q_(o);
        }
      }
      function Ls(e) {
        An.useDeprecatedSynchronousErrorHandling
          ? (function Z_(e) {
              An.useDeprecatedSynchronousErrorHandling &&
                Rn &&
                ((Rn.errorThrown = !0), (Rn.error = e));
            })(e)
          : wf(e);
      }
      function uu(e, t) {
        const { onStoppedNotification: n } = An;
        n && Fs.setTimeout(() => n(e, t));
      }
      const J_ = {
          closed: !0,
          next: _f,
          error: function X_(e) {
            throw e;
          },
          complete: _f,
        },
        cu =
          ("function" == typeof Symbol && Symbol.observable) || "@@observable";
      function hn(e) {
        return e;
      }
      function Cf(e) {
        return 0 === e.length
          ? hn
          : 1 === e.length
          ? e[0]
          : function (n) {
              return e.reduce((r, o) => o(r), n);
            };
      }
      let pe = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n);
          }
          lift(n) {
            const r = new e();
            return (r.source = this), (r.operator = n), r;
          }
          subscribe(n, r, o) {
            const s = (function tC(e) {
              return (
                (e && e instanceof iu) ||
                ((function eC(e) {
                  return e && K(e.next) && K(e.error) && K(e.complete);
                })(e) &&
                  yf(e))
              );
            })(n)
              ? n
              : new fo(n, r, o);
            return (
              ks(() => {
                const { operator: i, source: a } = this;
                s.add(
                  i
                    ? i.call(s, a)
                    : a
                    ? this._subscribe(s)
                    : this._trySubscribe(s)
                );
              }),
              s
            );
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n);
            } catch (r) {
              n.error(r);
            }
          }
          forEach(n, r) {
            return new (r = Ef(r))((o, s) => {
              const i = new fo({
                next: (a) => {
                  try {
                    n(a);
                  } catch (u) {
                    s(u), i.unsubscribe();
                  }
                },
                error: s,
                complete: o,
              });
              this.subscribe(i);
            });
          }
          _subscribe(n) {
            var r;
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n);
          }
          [cu]() {
            return this;
          }
          pipe(...n) {
            return Cf(n)(this);
          }
          toPromise(n) {
            return new (n = Ef(n))((r, o) => {
              let s;
              this.subscribe(
                (i) => (s = i),
                (i) => o(i),
                () => r(s)
              );
            });
          }
        }
        return (e.create = (t) => new e(t)), e;
      })();
      function Ef(e) {
        var t;
        return null !== (t = e ?? An.Promise) && void 0 !== t ? t : Promise;
      }
      const nC = co(
        (e) =>
          function () {
            e(this),
              (this.name = "ObjectUnsubscribedError"),
              (this.message = "object unsubscribed");
          }
      );
      let Gt = (() => {
        class e extends pe {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null);
          }
          lift(n) {
            const r = new bf(this, this);
            return (r.operator = n), r;
          }
          _throwIfClosed() {
            if (this.closed) throw new nC();
          }
          next(n) {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers));
                for (const r of this.currentObservers) r.next(n);
              }
            });
          }
          error(n) {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                (this.hasError = this.isStopped = !0), (this.thrownError = n);
                const { observers: r } = this;
                for (; r.length; ) r.shift().error(n);
              }
            });
          }
          complete() {
            ks(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0;
                const { observers: n } = this;
                for (; n.length; ) n.shift().complete();
              }
            });
          }
          unsubscribe() {
            (this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null);
          }
          get observed() {
            var n;
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            );
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n);
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            );
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: s } = this;
            return r || o
              ? vf
              : ((this.currentObservers = null),
                s.push(n),
                new lt(() => {
                  (this.currentObservers = null), lo(s, n);
                }));
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: s } = this;
            r ? n.error(o) : s && n.complete();
          }
          asObservable() {
            const n = new pe();
            return (n.source = this), n;
          }
        }
        return (e.create = (t, n) => new bf(t, n)), e;
      })();
      class bf extends Gt {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n);
        }
        next(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t);
        }
        error(t) {
          var n, r;
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t);
        }
        complete() {
          var t, n;
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t);
        }
        _subscribe(t) {
          var n, r;
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : vf;
        }
      }
      class dt extends Gt {
        constructor(t) {
          super(), (this._value = t);
        }
        get value() {
          return this.getValue();
        }
        _subscribe(t) {
          const n = super._subscribe(t);
          return !n.closed && t.next(this._value), n;
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this;
          if (t) throw n;
          return this._throwIfClosed(), r;
        }
        next(t) {
          super.next((this._value = t));
        }
      }
      function If(e) {
        return K(e?.lift);
      }
      function we(e) {
        return (t) => {
          if (If(t))
            return t.lift(function (n) {
              try {
                return e(n, this);
              } catch (r) {
                this.error(r);
              }
            });
          throw new TypeError("Unable to lift unknown Observable type");
        };
      }
      function _e(e, t, n, r, o) {
        return new rC(e, t, n, r, o);
      }
      class rC extends iu {
        constructor(t, n, r, o, s, i) {
          super(t),
            (this.onFinalize = s),
            (this.shouldUnsubscribe = i),
            (this._next = n
              ? function (a) {
                  try {
                    n(a);
                  } catch (u) {
                    t.error(u);
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a);
                  } catch (u) {
                    t.error(u);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r();
                  } catch (a) {
                    t.error(a);
                  } finally {
                    this.unsubscribe();
                  }
                }
              : super._complete);
        }
        unsubscribe() {
          var t;
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this;
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) ||
                  void 0 === t ||
                  t.call(this));
          }
        }
      }
      function Z(e, t) {
        return we((n, r) => {
          let o = 0;
          n.subscribe(
            _e(r, (s) => {
              r.next(e.call(t, s, o++));
            })
          );
        });
      }
      function pn(e) {
        return this instanceof pn ? ((this.v = e), this) : new pn(e);
      }
      function Af(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError("Symbol.asyncIterator is not defined.");
        var n,
          t = e[Symbol.asyncIterator];
        return t
          ? t.call(e)
          : ((e = (function hu(e) {
              var t = "function" == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0;
              if (n) return n.call(e);
              if (e && "number" == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    );
                  },
                };
              throw new TypeError(
                t
                  ? "Object is not iterable."
                  : "Symbol.iterator is not defined."
              );
            })(e)),
            (n = {}),
            r("next"),
            r("throw"),
            r("return"),
            (n[Symbol.asyncIterator] = function () {
              return this;
            }),
            n);
        function r(s) {
          n[s] =
            e[s] &&
            function (i) {
              return new Promise(function (a, u) {
                !(function o(s, i, a, u) {
                  Promise.resolve(u).then(function (c) {
                    s({ value: c, done: a });
                  }, i);
                })(a, u, (i = e[s](i)).done, i.value);
              });
            };
        }
      }
      "function" == typeof SuppressedError && SuppressedError;
      const Rf = (e) =>
        e && "number" == typeof e.length && "function" != typeof e;
      function Nf(e) {
        return K(e?.then);
      }
      function xf(e) {
        return K(e[cu]);
      }
      function Of(e) {
        return Symbol.asyncIterator && K(e?.[Symbol.asyncIterator]);
      }
      function Pf(e) {
        return new TypeError(
          `You provided ${
            null !== e && "object" == typeof e ? "an invalid object" : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        );
      }
      const Ff = (function IC() {
        return "function" == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : "@@iterator";
      })();
      function kf(e) {
        return K(e?.[Ff]);
      }
      function Lf(e) {
        return (function Tf(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
          var o,
            r = n.apply(e, t || []),
            s = [];
          return (
            (o = {}),
            i("next"),
            i("throw"),
            i("return"),
            (o[Symbol.asyncIterator] = function () {
              return this;
            }),
            o
          );
          function i(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  s.push([f, h, p, g]) > 1 || a(f, h);
                });
              });
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof pn
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(s[0][2], f);
              })(r[f](h));
            } catch (p) {
              d(s[0][3], p);
            }
          }
          function c(f) {
            a("next", f);
          }
          function l(f) {
            a("throw", f);
          }
          function d(f, h) {
            f(h), s.shift(), s.length && a(s[0][0], s[0][1]);
          }
        })(this, arguments, function* () {
          const n = e.getReader();
          try {
            for (;;) {
              const { value: r, done: o } = yield pn(n.read());
              if (o) return yield pn(void 0);
              yield yield pn(r);
            }
          } finally {
            n.releaseLock();
          }
        });
      }
      function jf(e) {
        return K(e?.getReader);
      }
      function yt(e) {
        if (e instanceof pe) return e;
        if (null != e) {
          if (xf(e))
            return (function SC(e) {
              return new pe((t) => {
                const n = e[cu]();
                if (K(n.subscribe)) return n.subscribe(t);
                throw new TypeError(
                  "Provided object does not correctly implement Symbol.observable"
                );
              });
            })(e);
          if (Rf(e))
            return (function MC(e) {
              return new pe((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n]);
                t.complete();
              });
            })(e);
          if (Nf(e))
            return (function TC(e) {
              return new pe((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete());
                  },
                  (n) => t.error(n)
                ).then(null, wf);
              });
            })(e);
          if (Of(e)) return Bf(e);
          if (kf(e))
            return (function AC(e) {
              return new pe((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return;
                t.complete();
              });
            })(e);
          if (jf(e))
            return (function RC(e) {
              return Bf(Lf(e));
            })(e);
        }
        throw Pf(e);
      }
      function Bf(e) {
        return new pe((t) => {
          (function NC(e, t) {
            var n, r, o, s;
            return (function Sf(e, t, n, r) {
              return new (n || (n = Promise))(function (s, i) {
                function a(l) {
                  try {
                    c(r.next(l));
                  } catch (d) {
                    i(d);
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l));
                  } catch (d) {
                    i(d);
                  }
                }
                function c(l) {
                  l.done
                    ? s(l.value)
                    : (function o(s) {
                        return s instanceof n
                          ? s
                          : new n(function (i) {
                              i(s);
                            });
                      })(l.value).then(a, u);
                }
                c((r = r.apply(e, t || [])).next());
              });
            })(this, void 0, void 0, function* () {
              try {
                for (n = Af(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return;
              } catch (i) {
                o = { error: i };
              } finally {
                try {
                  r && !r.done && (s = n.return) && (yield s.call(n));
                } finally {
                  if (o) throw o.error;
                }
              }
              t.complete();
            });
          })(e, t).catch((n) => t.error(n));
        });
      }
      function Wt(e, t, n, r = 0, o = !1) {
        const s = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe();
        }, r);
        if ((e.add(s), !o)) return s;
      }
      function Ee(e, t, n = 1 / 0) {
        return K(t)
          ? Ee((r, o) => Z((s, i) => t(r, s, o, i))(yt(e(r, o))), n)
          : ("number" == typeof t && (n = t),
            we((r, o) =>
              (function xC(e, t, n, r, o, s, i, a) {
                const u = [];
                let c = 0,
                  l = 0,
                  d = !1;
                const f = () => {
                    d && !u.length && !c && t.complete();
                  },
                  h = (g) => (c < r ? p(g) : u.push(g)),
                  p = (g) => {
                    s && t.next(g), c++;
                    let v = !1;
                    yt(n(g, l++)).subscribe(
                      _e(
                        t,
                        (y) => {
                          o?.(y), s ? h(y) : t.next(y);
                        },
                        () => {
                          v = !0;
                        },
                        void 0,
                        () => {
                          if (v)
                            try {
                              for (c--; u.length && c < r; ) {
                                const y = u.shift();
                                i ? Wt(t, i, () => p(y)) : p(y);
                              }
                              f();
                            } catch (y) {
                              t.error(y);
                            }
                        }
                      )
                    );
                  };
                return (
                  e.subscribe(
                    _e(t, h, () => {
                      (d = !0), f();
                    })
                  ),
                  () => {
                    a?.();
                  }
                );
              })(r, o, e, n)
            ));
      }
      function rr(e = 1 / 0) {
        return Ee(hn, e);
      }
      const Rt = new pe((e) => e.complete());
      function pu(e) {
        return e[e.length - 1];
      }
      function ho(e) {
        return (function PC(e) {
          return e && K(e.schedule);
        })(pu(e))
          ? e.pop()
          : void 0;
      }
      function $f(e, t = 0) {
        return we((n, r) => {
          n.subscribe(
            _e(
              r,
              (o) => Wt(r, e, () => r.next(o), t),
              () => Wt(r, e, () => r.complete(), t),
              (o) => Wt(r, e, () => r.error(o), t)
            )
          );
        });
      }
      function Vf(e, t = 0) {
        return we((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t));
        });
      }
      function Hf(e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new pe((n) => {
          Wt(n, t, () => {
            const r = e[Symbol.asyncIterator]();
            Wt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value);
                });
              },
              0,
              !0
            );
          });
        });
      }
      function ge(e, t) {
        return t
          ? (function HC(e, t) {
              if (null != e) {
                if (xf(e))
                  return (function LC(e, t) {
                    return yt(e).pipe(Vf(t), $f(t));
                  })(e, t);
                if (Rf(e))
                  return (function BC(e, t) {
                    return new pe((n) => {
                      let r = 0;
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule());
                      });
                    });
                  })(e, t);
                if (Nf(e))
                  return (function jC(e, t) {
                    return yt(e).pipe(Vf(t), $f(t));
                  })(e, t);
                if (Of(e)) return Hf(e, t);
                if (kf(e))
                  return (function $C(e, t) {
                    return new pe((n) => {
                      let r;
                      return (
                        Wt(n, t, () => {
                          (r = e[Ff]()),
                            Wt(
                              n,
                              t,
                              () => {
                                let o, s;
                                try {
                                  ({ value: o, done: s } = r.next());
                                } catch (i) {
                                  return void n.error(i);
                                }
                                s ? n.complete() : n.next(o);
                              },
                              0,
                              !0
                            );
                        }),
                        () => K(r?.return) && r.return()
                      );
                    });
                  })(e, t);
                if (jf(e))
                  return (function VC(e, t) {
                    return Hf(Lf(e), t);
                  })(e, t);
              }
              throw Pf(e);
            })(e, t)
          : yt(e);
      }
      function A(...e) {
        return ge(e, ho(e));
      }
      function Uf(e = {}) {
        const {
          connector: t = () => new Gt(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e;
        return (s) => {
          let i,
            a,
            u,
            c = 0,
            l = !1,
            d = !1;
          const f = () => {
              a?.unsubscribe(), (a = void 0);
            },
            h = () => {
              f(), (i = u = void 0), (l = d = !1);
            },
            p = () => {
              const g = i;
              h(), g?.unsubscribe();
            };
          return we((g, v) => {
            c++, !d && !l && f();
            const y = (u = u ?? t());
            v.add(() => {
              c--, 0 === c && !d && !l && (a = gu(p, o));
            }),
              y.subscribe(v),
              !i &&
                c > 0 &&
                ((i = new fo({
                  next: (m) => y.next(m),
                  error: (m) => {
                    (d = !0), f(), (a = gu(h, n, m)), y.error(m);
                  },
                  complete: () => {
                    (l = !0), f(), (a = gu(h, r)), y.complete();
                  },
                })),
                yt(g).subscribe(i));
          })(s);
        };
      }
      function gu(e, t, ...n) {
        if (!0 === t) return void e();
        if (!1 === t) return;
        const r = new fo({
          next: () => {
            r.unsubscribe(), e();
          },
        });
        return yt(t(...n)).subscribe(r);
      }
      function Dt(e, t) {
        return we((n, r) => {
          let o = null,
            s = 0,
            i = !1;
          const a = () => i && !o && r.complete();
          n.subscribe(
            _e(
              r,
              (u) => {
                o?.unsubscribe();
                let c = 0;
                const l = s++;
                yt(e(u, l)).subscribe(
                  (o = _e(
                    r,
                    (d) => r.next(t ? t(u, d, l, c++) : d),
                    () => {
                      (o = null), a();
                    }
                  ))
                );
              },
              () => {
                (i = !0), a();
              }
            )
          );
        });
      }
      function qC(e, t) {
        return e === t;
      }
      function Q(e) {
        for (let t in e) if (e[t] === Q) return t;
        throw Error("Could not find renamed property on target object.");
      }
      function ve(e) {
        if ("string" == typeof e) return e;
        if (Array.isArray(e)) return "[" + e.map(ve).join(", ") + "]";
        if (null == e) return "" + e;
        if (e.overriddenName) return `${e.overriddenName}`;
        if (e.name) return `${e.name}`;
        const t = e.toString();
        if (null == t) return "" + t;
        const n = t.indexOf("\n");
        return -1 === n ? t : t.substring(0, n);
      }
      function mu(e, t) {
        return null == e || "" === e
          ? null === t
            ? ""
            : t
          : null == t || "" === t
          ? e
          : e + " " + t;
      }
      const GC = Q({ __forward_ref__: Q });
      function vu(e) {
        return (
          (e.__forward_ref__ = vu),
          (e.toString = function () {
            return ve(this());
          }),
          e
        );
      }
      function x(e) {
        return yu(e) ? e() : e;
      }
      function yu(e) {
        return (
          "function" == typeof e &&
          e.hasOwnProperty(GC) &&
          e.__forward_ref__ === vu
        );
      }
      function Du(e) {
        return e && !!e.ɵproviders;
      }
      const zf = "https://g.co/ng/security#xss";
      class w extends Error {
        constructor(t, n) {
          super(
            (function Bs(e, t) {
              return `NG0${Math.abs(e)}${t ? ": " + t : ""}`;
            })(t, n)
          ),
            (this.code = t);
        }
      }
      function O(e) {
        return "string" == typeof e ? e : null == e ? "" : String(e);
      }
      function wu(e, t) {
        throw new w(-201, !1);
      }
      function ft(e, t) {
        null == e &&
          (function R(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? "" : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            );
          })(t, e, null, "!=");
      }
      function M(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        };
      }
      function Nt(e) {
        return { providers: e.providers || [], imports: e.imports || [] };
      }
      function $s(e) {
        return qf(e, Hs) || qf(e, Gf);
      }
      function qf(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null;
      }
      function Vs(e) {
        return e && (e.hasOwnProperty(_u) || e.hasOwnProperty(eE))
          ? e[_u]
          : null;
      }
      const Hs = Q({ ɵprov: Q }),
        _u = Q({ ɵinj: Q }),
        Gf = Q({ ngInjectableDef: Q }),
        eE = Q({ ngInjectorDef: Q });
      var B = (function (e) {
        return (
          (e[(e.Default = 0)] = "Default"),
          (e[(e.Host = 1)] = "Host"),
          (e[(e.Self = 2)] = "Self"),
          (e[(e.SkipSelf = 4)] = "SkipSelf"),
          (e[(e.Optional = 8)] = "Optional"),
          e
        );
      })(B || {});
      let Cu;
      function He(e) {
        const t = Cu;
        return (Cu = e), t;
      }
      function Zf(e, t, n) {
        const r = $s(e);
        return r && "root" == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & B.Optional
          ? null
          : void 0 !== t
          ? t
          : void wu(ve(e));
      }
      const ee = globalThis,
        po = {},
        Mu = "__NG_DI_FLAG__",
        Us = "ngTempTokenPath",
        rE = /\n/gm,
        Qf = "__source";
      let or;
      function gn(e) {
        const t = or;
        return (or = e), t;
      }
      function iE(e, t = B.Default) {
        if (void 0 === or) throw new w(-203, !1);
        return null === or
          ? Zf(e, void 0, t)
          : or.get(e, t & B.Optional ? null : void 0, t);
      }
      function I(e, t = B.Default) {
        return (
          (function Wf() {
            return Cu;
          })() || iE
        )(x(e), t);
      }
      function C(e, t = B.Default) {
        return I(e, zs(t));
      }
      function zs(e) {
        return typeof e > "u" || "number" == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4);
      }
      function Tu(e) {
        const t = [];
        for (let n = 0; n < e.length; n++) {
          const r = x(e[n]);
          if (Array.isArray(r)) {
            if (0 === r.length) throw new w(900, !1);
            let o,
              s = B.Default;
            for (let i = 0; i < r.length; i++) {
              const a = r[i],
                u = aE(a);
              "number" == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (s |= u)
                : (o = a);
            }
            t.push(I(o, s));
          } else t.push(I(r));
        }
        return t;
      }
      function go(e, t) {
        return (e[Mu] = t), (e.prototype[Mu] = t), e;
      }
      function aE(e) {
        return e[Mu];
      }
      function Zt(e) {
        return { toString: e }.toString();
      }
      var qs = (function (e) {
          return (
            (e[(e.OnPush = 0)] = "OnPush"), (e[(e.Default = 1)] = "Default"), e
          );
        })(qs || {}),
        wt = (function (e) {
          return (
            (e[(e.Emulated = 0)] = "Emulated"),
            (e[(e.None = 2)] = "None"),
            (e[(e.ShadowDom = 3)] = "ShadowDom"),
            e
          );
        })(wt || {});
      const xt = {},
        q = [],
        Gs = Q({ ɵcmp: Q }),
        Au = Q({ ɵdir: Q }),
        Ru = Q({ ɵpipe: Q }),
        Jf = Q({ ɵmod: Q }),
        Yt = Q({ ɵfac: Q }),
        mo = Q({ __NG_ELEMENT_ID__: Q }),
        Kf = Q({ __NG_ENV_ID__: Q });
      function eh(e, t, n) {
        let r = e.length;
        for (;;) {
          const o = e.indexOf(t, n);
          if (-1 === o) return o;
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const s = t.length;
            if (o + s === r || e.charCodeAt(o + s) <= 32) return o;
          }
          n = o + 1;
        }
      }
      function Nu(e, t, n) {
        let r = 0;
        for (; r < n.length; ) {
          const o = n[r];
          if ("number" == typeof o) {
            if (0 !== o) break;
            r++;
            const s = n[r++],
              i = n[r++],
              a = n[r++];
            e.setAttribute(t, i, a, s);
          } else {
            const s = o,
              i = n[++r];
            nh(s) ? e.setProperty(t, s, i) : e.setAttribute(t, s, i), r++;
          }
        }
        return r;
      }
      function th(e) {
        return 3 === e || 4 === e || 6 === e;
      }
      function nh(e) {
        return 64 === e.charCodeAt(0);
      }
      function vo(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice();
          else {
            let n = -1;
            for (let r = 0; r < t.length; r++) {
              const o = t[r];
              "number" == typeof o
                ? (n = o)
                : 0 === n ||
                  rh(e, n, o, null, -1 === n || 2 === n ? t[++r] : null);
            }
          }
        return e;
      }
      function rh(e, t, n, r, o) {
        let s = 0,
          i = e.length;
        if (-1 === t) i = -1;
        else
          for (; s < e.length; ) {
            const a = e[s++];
            if ("number" == typeof a) {
              if (a === t) {
                i = -1;
                break;
              }
              if (a > t) {
                i = s - 1;
                break;
              }
            }
          }
        for (; s < e.length; ) {
          const a = e[s];
          if ("number" == typeof a) break;
          if (a === n) {
            if (null === r) return void (null !== o && (e[s + 1] = o));
            if (r === e[s + 1]) return void (e[s + 2] = o);
          }
          s++, null !== r && s++, null !== o && s++;
        }
        -1 !== i && (e.splice(i, 0, t), (s = i + 1)),
          e.splice(s++, 0, n),
          null !== r && e.splice(s++, 0, r),
          null !== o && e.splice(s++, 0, o);
      }
      const oh = "ng-template";
      function lE(e, t, n) {
        let r = 0,
          o = !0;
        for (; r < e.length; ) {
          let s = e[r++];
          if ("string" == typeof s && o) {
            const i = e[r++];
            if (n && "class" === s && -1 !== eh(i.toLowerCase(), t, 0))
              return !0;
          } else {
            if (1 === s) {
              for (; r < e.length && "string" == typeof (s = e[r++]); )
                if (s.toLowerCase() === t) return !0;
              return !1;
            }
            "number" == typeof s && (o = !1);
          }
        }
        return !1;
      }
      function sh(e) {
        return 4 === e.type && e.value !== oh;
      }
      function dE(e, t, n) {
        return t === (4 !== e.type || n ? e.value : oh);
      }
      function fE(e, t, n) {
        let r = 4;
        const o = e.attrs || [],
          s = (function gE(e) {
            for (let t = 0; t < e.length; t++) if (th(e[t])) return t;
            return e.length;
          })(o);
        let i = !1;
        for (let a = 0; a < t.length; a++) {
          const u = t[a];
          if ("number" != typeof u) {
            if (!i)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ("" !== u && !dE(e, u, n)) || ("" === u && 1 === t.length))
                ) {
                  if (_t(r)) return !1;
                  i = !0;
                }
              } else {
                const c = 8 & r ? u : t[++a];
                if (8 & r && null !== e.attrs) {
                  if (!lE(e.attrs, c, n)) {
                    if (_t(r)) return !1;
                    i = !0;
                  }
                  continue;
                }
                const d = hE(8 & r ? "class" : u, o, sh(e), n);
                if (-1 === d) {
                  if (_t(r)) return !1;
                  i = !0;
                  continue;
                }
                if ("" !== c) {
                  let f;
                  f = d > s ? "" : o[d + 1].toLowerCase();
                  const h = 8 & r ? f : null;
                  if ((h && -1 !== eh(h, c, 0)) || (2 & r && c !== f)) {
                    if (_t(r)) return !1;
                    i = !0;
                  }
                }
              }
          } else {
            if (!i && !_t(r) && !_t(u)) return !1;
            if (i && _t(u)) continue;
            (i = !1), (r = u | (1 & r));
          }
        }
        return _t(r) || i;
      }
      function _t(e) {
        return 0 == (1 & e);
      }
      function hE(e, t, n, r) {
        if (null === t) return -1;
        let o = 0;
        if (r || !n) {
          let s = !1;
          for (; o < t.length; ) {
            const i = t[o];
            if (i === e) return o;
            if (3 === i || 6 === i) s = !0;
            else {
              if (1 === i || 2 === i) {
                let a = t[++o];
                for (; "string" == typeof a; ) a = t[++o];
                continue;
              }
              if (4 === i) break;
              if (0 === i) {
                o += 4;
                continue;
              }
            }
            o += s ? 1 : 2;
          }
          return -1;
        }
        return (function mE(e, t) {
          let n = e.indexOf(4);
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n];
              if ("number" == typeof r) return -1;
              if (r === t) return n;
              n++;
            }
          return -1;
        })(t, e);
      }
      function ih(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (fE(e, t[r], n)) return !0;
        return !1;
      }
      function ah(e, t) {
        return e ? ":not(" + t.trim() + ")" : t;
      }
      function yE(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = "",
          s = !1;
        for (; n < e.length; ) {
          let i = e[n];
          if ("string" == typeof i)
            if (2 & r) {
              const a = e[++n];
              o += "[" + i + (a.length > 0 ? '="' + a + '"' : "") + "]";
            } else 8 & r ? (o += "." + i) : 4 & r && (o += " " + i);
          else
            "" !== o && !_t(i) && ((t += ah(s, o)), (o = "")),
              (r = i),
              (s = s || !_t(r));
          n++;
        }
        return "" !== o && (t += ah(s, o)), t;
      }
      function xn(e) {
        return Zt(() => {
          const t = ch(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === qs.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || wt.Emulated,
              styles: e.styles || q,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: "",
            };
          lh(n);
          const r = e.dependencies;
          return (
            (n.directiveDefs = Ws(r, !1)),
            (n.pipeDefs = Ws(r, !0)),
            (n.id = (function SE(e) {
              let t = 0;
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join("|");
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0;
              return (t += 2147483648), "c" + t;
            })(n)),
            n
          );
        });
      }
      function CE(e) {
        return U(e) || be(e);
      }
      function EE(e) {
        return null !== e;
      }
      function Qt(e) {
        return Zt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || q,
          declarations: e.declarations || q,
          imports: e.imports || q,
          exports: e.exports || q,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }));
      }
      function uh(e, t) {
        if (null == e) return xt;
        const n = {};
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              s = o;
            Array.isArray(o) && ((s = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = s);
          }
        return n;
      }
      function Ne(e) {
        return Zt(() => {
          const t = ch(e);
          return lh(t), t;
        });
      }
      function U(e) {
        return e[Gs] || null;
      }
      function be(e) {
        return e[Au] || null;
      }
      function xe(e) {
        return e[Ru] || null;
      }
      function tt(e, t) {
        const n = e[Jf] || null;
        if (!n && !0 === t)
          throw new Error(`Type ${ve(e)} does not have '\u0275mod' property.`);
        return n;
      }
      function ch(e) {
        const t = {};
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || xt,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || q,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: uh(e.inputs, t),
          outputs: uh(e.outputs),
        };
      }
      function lh(e) {
        e.features?.forEach((t) => t(e));
      }
      function Ws(e, t) {
        if (!e) return null;
        const n = t ? xe : CE;
        return () =>
          ("function" == typeof e ? e() : e).map((r) => n(r)).filter(EE);
      }
      const le = 0,
        _ = 1,
        F = 2,
        ie = 3,
        Ct = 4,
        yo = 5,
        Te = 6,
        ir = 7,
        de = 8,
        mn = 9,
        ar = 10,
        P = 11,
        Do = 12,
        dh = 13,
        ur = 14,
        fe = 15,
        wo = 16,
        cr = 17,
        Ot = 18,
        _o = 19,
        fh = 20,
        vn = 21,
        Xt = 22,
        Zs = 23,
        Ys = 24,
        $ = 25,
        xu = 1,
        hh = 2,
        Pt = 7,
        lr = 9,
        Ie = 11;
      function ze(e) {
        return Array.isArray(e) && "object" == typeof e[xu];
      }
      function qe(e) {
        return Array.isArray(e) && !0 === e[xu];
      }
      function Ou(e) {
        return 0 != (4 & e.flags);
      }
      function On(e) {
        return e.componentOffset > -1;
      }
      function Xs(e) {
        return 1 == (1 & e.flags);
      }
      function Et(e) {
        return !!e.template;
      }
      function Pu(e) {
        return 0 != (512 & e[F]);
      }
      function Pn(e, t) {
        return e.hasOwnProperty(Yt) ? e[Yt] : null;
      }
      let xE =
          ee.WeakRef ??
          class NE {
            constructor(t) {
              this.ref = t;
            }
            deref() {
              return this.ref;
            }
          },
        PE = 0,
        Ft = null,
        Js = !1;
      function Ce(e) {
        const t = Ft;
        return (Ft = e), t;
      }
      class yh {
        constructor() {
          (this.id = PE++),
            (this.ref = (function OE(e) {
              return new xE(e);
            })(this)),
            (this.producers = new Map()),
            (this.consumers = new Map()),
            (this.trackingVersion = 0),
            (this.valueVersion = 0);
        }
        consumerPollProducersForChange() {
          for (const [t, n] of this.producers) {
            const r = n.producerNode.deref();
            if (null != r && n.atTrackingVersion === this.trackingVersion) {
              if (r.producerPollStatus(n.seenValueVersion)) return !0;
            } else this.producers.delete(t), r?.consumers.delete(this.id);
          }
          return !1;
        }
        producerMayHaveChanged() {
          const t = Js;
          Js = !0;
          try {
            for (const [n, r] of this.consumers) {
              const o = r.consumerNode.deref();
              null != o && o.trackingVersion === r.atTrackingVersion
                ? o.onConsumerDependencyMayHaveChanged()
                : (this.consumers.delete(n), o?.producers.delete(this.id));
            }
          } finally {
            Js = t;
          }
        }
        producerAccessed() {
          if (Js) throw new Error("");
          if (null === Ft) return;
          let t = Ft.producers.get(this.id);
          void 0 === t
            ? ((t = {
                consumerNode: Ft.ref,
                producerNode: this.ref,
                seenValueVersion: this.valueVersion,
                atTrackingVersion: Ft.trackingVersion,
              }),
              Ft.producers.set(this.id, t),
              this.consumers.set(Ft.id, t))
            : ((t.seenValueVersion = this.valueVersion),
              (t.atTrackingVersion = Ft.trackingVersion));
        }
        get hasProducers() {
          return this.producers.size > 0;
        }
        get producerUpdatesAllowed() {
          return !1 !== Ft?.consumerAllowSignalWrites;
        }
        producerPollStatus(t) {
          return (
            this.valueVersion !== t ||
            (this.onProducerUpdateValueVersion(), this.valueVersion !== t)
          );
        }
      }
      let Dh = null;
      const _h = () => {};
      class jE extends yh {
        constructor(t, n, r) {
          super(),
            (this.watch = t),
            (this.schedule = n),
            (this.dirty = !1),
            (this.cleanupFn = _h),
            (this.registerOnCleanup = (o) => {
              this.cleanupFn = o;
            }),
            (this.consumerAllowSignalWrites = r);
        }
        notify() {
          this.dirty || this.schedule(this), (this.dirty = !0);
        }
        onConsumerDependencyMayHaveChanged() {
          this.notify();
        }
        onProducerUpdateValueVersion() {}
        run() {
          if (
            ((this.dirty = !1),
            0 !== this.trackingVersion &&
              !this.consumerPollProducersForChange())
          )
            return;
          const t = Ce(this);
          this.trackingVersion++;
          try {
            this.cleanupFn(),
              (this.cleanupFn = _h),
              this.watch(this.registerOnCleanup);
          } finally {
            Ce(t);
          }
        }
        cleanup() {
          this.cleanupFn();
        }
      }
      class BE {
        constructor(t, n, r) {
          (this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r);
        }
        isFirstChange() {
          return this.firstChange;
        }
      }
      function Fn() {
        return Ch;
      }
      function Ch(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = VE), $E;
      }
      function $E() {
        const e = bh(this),
          t = e?.current;
        if (t) {
          const n = e.previous;
          if (n === xt) e.previous = t;
          else for (let r in t) n[r] = t[r];
          (e.current = null), this.ngOnChanges(t);
        }
      }
      function VE(e, t, n, r) {
        const o = this.declaredInputs[n],
          s =
            bh(e) ||
            (function HE(e, t) {
              return (e[Eh] = t);
            })(e, { previous: xt, current: null }),
          i = s.current || (s.current = {}),
          a = s.previous,
          u = a[o];
        (i[o] = new BE(u && u.currentValue, t, a === xt)), (e[r] = t);
      }
      Fn.ngInherit = !0;
      const Eh = "__ngSimpleChanges__";
      function bh(e) {
        return e[Eh] || null;
      }
      const kt = function (e, t, n) {};
      function ne(e) {
        for (; Array.isArray(e); ) e = e[le];
        return e;
      }
      function ti(e, t) {
        return ne(t[e]);
      }
      function Ge(e, t) {
        return ne(t[e.index]);
      }
      function Mh(e, t) {
        return e.data[t];
      }
      function nt(e, t) {
        const n = t[e];
        return ze(n) ? n : n[le];
      }
      function yn(e, t) {
        return null == t ? null : e[t];
      }
      function Th(e) {
        e[cr] = 0;
      }
      function YE(e) {
        1024 & e[F] || ((e[F] |= 1024), Rh(e, 1));
      }
      function Ah(e) {
        1024 & e[F] && ((e[F] &= -1025), Rh(e, -1));
      }
      function Rh(e, t) {
        let n = e[ie];
        if (null === n) return;
        n[yo] += t;
        let r = n;
        for (
          n = n[ie];
          null !== n && ((1 === t && 1 === r[yo]) || (-1 === t && 0 === r[yo]));

        )
          (n[yo] += t), (r = n), (n = n[ie]);
      }
      const N = {
        lFrame: Vh(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      };
      function Oh() {
        return N.bindingsEnabled;
      }
      function D() {
        return N.lFrame.lView;
      }
      function z() {
        return N.lFrame.tView;
      }
      function Eo(e) {
        return (N.lFrame.contextLView = e), e[de];
      }
      function bo(e) {
        return (N.lFrame.contextLView = null), e;
      }
      function Se() {
        let e = Ph();
        for (; null !== e && 64 === e.type; ) e = e.parent;
        return e;
      }
      function Ph() {
        return N.lFrame.currentTNode;
      }
      function Lt(e, t) {
        const n = N.lFrame;
        (n.currentTNode = e), (n.isParent = t);
      }
      function $u() {
        return N.lFrame.isParent;
      }
      function hr() {
        return N.lFrame.bindingIndex++;
      }
      function ab(e, t) {
        const n = N.lFrame;
        (n.bindingIndex = n.bindingRootIndex = e), Hu(t);
      }
      function Hu(e) {
        N.lFrame.currentDirectiveIndex = e;
      }
      function zu(e) {
        N.lFrame.currentQueryIndex = e;
      }
      function cb(e) {
        const t = e[_];
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[Te] : null;
      }
      function Bh(e, t, n) {
        if (n & B.SkipSelf) {
          let o = t,
            s = e;
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & B.Host ||
              ((o = cb(s)), null === o || ((s = s[ur]), 10 & o.type)));

          );
          if (null === o) return !1;
          (t = o), (e = s);
        }
        const r = (N.lFrame = $h());
        return (r.currentTNode = t), (r.lView = e), !0;
      }
      function qu(e) {
        const t = $h(),
          n = e[_];
        (N.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1);
      }
      function $h() {
        const e = N.lFrame,
          t = null === e ? null : e.child;
        return null === t ? Vh(e) : t;
      }
      function Vh(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        };
        return null !== e && (e.child = t), t;
      }
      function Hh() {
        const e = N.lFrame;
        return (
          (N.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        );
      }
      const Uh = Hh;
      function Gu() {
        const e = Hh();
        (e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0);
      }
      function Pe() {
        return N.lFrame.selectedIndex;
      }
      function kn(e) {
        N.lFrame.selectedIndex = e;
      }
      let qh = !0;
      function ni() {
        return qh;
      }
      function Dn(e) {
        qh = e;
      }
      function ri(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const s = e.data[n].type.prototype,
            {
              ngAfterContentInit: i,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = s;
          i && (e.contentHooks ??= []).push(-n, i),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l);
        }
      }
      function oi(e, t, n) {
        Gh(e, t, 3, n);
      }
      function si(e, t, n, r) {
        (3 & e[F]) === n && Gh(e, t, n, r);
      }
      function Wu(e, t) {
        let n = e[F];
        (3 & n) === t && ((n &= 8191), (n += 1), (e[F] = n));
      }
      function Gh(e, t, n, r) {
        const s = r ?? -1,
          i = t.length - 1;
        let a = 0;
        for (let u = void 0 !== r ? 65535 & e[cr] : 0; u < i; u++)
          if ("number" == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break;
          } else
            t[u] < 0 && (e[cr] += 65536),
              (a < s || -1 == s) &&
                (vb(e, n, t, u), (e[cr] = (4294901760 & e[cr]) + u + 2)),
              u++;
      }
      function Wh(e, t) {
        kt(4, e, t);
        const n = Ce(null);
        try {
          t.call(e);
        } finally {
          Ce(n), kt(5, e, t);
        }
      }
      function vb(e, t, n, r) {
        const o = n[r] < 0,
          s = n[r + 1],
          a = e[o ? -n[r] : n[r]];
        o
          ? e[F] >> 13 < e[cr] >> 16 &&
            (3 & e[F]) === t &&
            ((e[F] += 8192), Wh(a, s))
          : Wh(a, s);
      }
      const pr = -1;
      class So {
        constructor(t, n, r) {
          (this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r);
        }
      }
      function Yu(e) {
        return e !== pr;
      }
      function Mo(e) {
        return 32767 & e;
      }
      function To(e, t) {
        let n = (function _b(e) {
            return e >> 16;
          })(e),
          r = t;
        for (; n > 0; ) (r = r[ur]), n--;
        return r;
      }
      let Qu = !0;
      function ii(e) {
        const t = Qu;
        return (Qu = e), t;
      }
      const Zh = 255,
        Yh = 5;
      let Cb = 0;
      const jt = {};
      function ai(e, t) {
        const n = Qh(e, t);
        if (-1 !== n) return n;
        const r = t[_];
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          Xu(r.data, e),
          Xu(t, null),
          Xu(r.blueprint, null));
        const o = ui(e, t),
          s = e.injectorIndex;
        if (Yu(o)) {
          const i = Mo(o),
            a = To(o, t),
            u = a[_].data;
          for (let c = 0; c < 8; c++) t[s + c] = a[i + c] | u[i + c];
        }
        return (t[s + 8] = o), s;
      }
      function Xu(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t);
      }
      function Qh(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex;
      }
      function ui(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex;
        let n = 0,
          r = null,
          o = t;
        for (; null !== o; ) {
          if (((r = op(o)), null === r)) return pr;
          if ((n++, (o = o[ur]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16);
        }
        return pr;
      }
      function Ju(e, t, n) {
        !(function Eb(e, t, n) {
          let r;
          "string" == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(mo) && (r = n[mo]),
            null == r && (r = n[mo] = Cb++);
          const o = r & Zh;
          t.data[e + (o >> Yh)] |= 1 << o;
        })(e, t, n);
      }
      function Xh(e, t, n) {
        if (n & B.Optional || void 0 !== e) return e;
        wu();
      }
      function Jh(e, t, n, r) {
        if (
          (n & B.Optional && void 0 === r && (r = null),
          !(n & (B.Self | B.Host)))
        ) {
          const o = e[mn],
            s = He(void 0);
          try {
            return o ? o.get(t, r, n & B.Optional) : Zf(t, r, n & B.Optional);
          } finally {
            He(s);
          }
        }
        return Xh(r, 0, n);
      }
      function Kh(e, t, n, r = B.Default, o) {
        if (null !== e) {
          if (2048 & t[F] && !(r & B.Self)) {
            const i = (function Ab(e, t, n, r, o) {
              let s = e,
                i = t;
              for (
                ;
                null !== s && null !== i && 2048 & i[F] && !(512 & i[F]);

              ) {
                const a = ep(s, i, n, r | B.Self, jt);
                if (a !== jt) return a;
                let u = s.parent;
                if (!u) {
                  const c = i[fh];
                  if (c) {
                    const l = c.get(n, jt, r);
                    if (l !== jt) return l;
                  }
                  (u = op(i)), (i = i[ur]);
                }
                s = u;
              }
              return o;
            })(e, t, n, r, jt);
            if (i !== jt) return i;
          }
          const s = ep(e, t, n, r, jt);
          if (s !== jt) return s;
        }
        return Jh(t, n, r, o);
      }
      function ep(e, t, n, r, o) {
        const s = (function Sb(e) {
          if ("string" == typeof e) return e.charCodeAt(0) || 0;
          const t = e.hasOwnProperty(mo) ? e[mo] : void 0;
          return "number" == typeof t ? (t >= 0 ? t & Zh : Tb) : t;
        })(n);
        if ("function" == typeof s) {
          if (!Bh(t, e, r)) return r & B.Host ? Xh(o, 0, r) : Jh(t, n, r, o);
          try {
            let i;
            if (((i = s(r)), null != i || r & B.Optional)) return i;
            wu();
          } finally {
            Uh();
          }
        } else if ("number" == typeof s) {
          let i = null,
            a = Qh(e, t),
            u = pr,
            c = r & B.Host ? t[fe][Te] : null;
          for (
            (-1 === a || r & B.SkipSelf) &&
            ((u = -1 === a ? ui(e, t) : t[a + 8]),
            u !== pr && np(r, !1)
              ? ((i = t[_]), (a = Mo(u)), (t = To(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[_];
            if (tp(s, a, l.data)) {
              const d = Ib(a, t, n, i, r, c);
              if (d !== jt) return d;
            }
            (u = t[a + 8]),
              u !== pr && np(r, t[_].data[a + 8] === c) && tp(s, a, t)
                ? ((i = l), (a = Mo(u)), (t = To(u, t)))
                : (a = -1);
          }
        }
        return o;
      }
      function Ib(e, t, n, r, o, s) {
        const i = t[_],
          a = i.data[e + 8],
          l = (function ci(e, t, n, r, o) {
            const s = e.providerIndexes,
              i = t.data,
              a = 1048575 & s,
              u = e.directiveStart,
              l = s >> 20,
              f = o ? a + l : e.directiveEnd;
            for (let h = r ? a : a + l; h < f; h++) {
              const p = i[h];
              if ((h < u && n === p) || (h >= u && p.type === n)) return h;
            }
            if (o) {
              const h = i[u];
              if (h && Et(h) && h.type === n) return u;
            }
            return null;
          })(
            a,
            i,
            n,
            null == r ? On(a) && Qu : r != i && 0 != (3 & a.type),
            o & B.Host && s === a
          );
        return null !== l ? Ln(t, i, l, a) : jt;
      }
      function Ln(e, t, n, r) {
        let o = e[n];
        const s = t.data;
        if (
          (function yb(e) {
            return e instanceof So;
          })(o)
        ) {
          const i = o;
          i.resolving &&
            (function WC(e, t) {
              const n = t ? `. Dependency path: ${t.join(" > ")} > ${e}` : "";
              throw new w(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              );
            })(
              (function Y(e) {
                return "function" == typeof e
                  ? e.name || e.toString()
                  : "object" == typeof e &&
                    null != e &&
                    "function" == typeof e.type
                  ? e.type.name || e.type.toString()
                  : O(e);
              })(s[n])
            );
          const a = ii(i.canSeeViewProviders);
          i.resolving = !0;
          const c = i.injectImpl ? He(i.injectImpl) : null;
          Bh(e, r, B.Default);
          try {
            (o = e[n] = i.factory(void 0, s, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function mb(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: s,
                  } = t.type.prototype;
                  if (r) {
                    const i = Ch(t);
                    (n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i);
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    s &&
                      ((n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s));
                })(n, s[n], t);
          } finally {
            null !== c && He(c), ii(a), (i.resolving = !1), Uh();
          }
        }
        return o;
      }
      function tp(e, t, n) {
        return !!(n[t + (e >> Yh)] & (1 << e));
      }
      function np(e, t) {
        return !(e & B.Self || (e & B.Host && t));
      }
      class Fe {
        constructor(t, n) {
          (this._tNode = t), (this._lView = n);
        }
        get(t, n, r) {
          return Kh(this._tNode, this._lView, t, zs(r), n);
        }
      }
      function Tb() {
        return new Fe(Se(), D());
      }
      function Ku(e) {
        return yu(e)
          ? () => {
              const t = Ku(x(e));
              return t && t();
            }
          : Pn(e);
      }
      function op(e) {
        const t = e[_],
          n = t.type;
        return 2 === n ? t.declTNode : 1 === n ? e[Te] : null;
      }
      const mr = "__parameters__";
      function yr(e, t, n) {
        return Zt(() => {
          const r = (function ec(e) {
            return function (...n) {
              if (e) {
                const r = e(...n);
                for (const o in r) this[o] = r[o];
              }
            };
          })(t);
          function o(...s) {
            if (this instanceof o) return r.apply(this, s), this;
            const i = new o(...s);
            return (a.annotation = i), a;
            function a(u, c, l) {
              const d = u.hasOwnProperty(mr)
                ? u[mr]
                : Object.defineProperty(u, mr, { value: [] })[mr];
              for (; d.length <= l; ) d.push(null);
              return (d[l] = d[l] || []).push(i), u;
            }
          }
          return (
            n && (o.prototype = Object.create(n.prototype)),
            (o.prototype.ngMetadataName = e),
            (o.annotationCls = o),
            o
          );
        });
      }
      function wr(e, t) {
        e.forEach((n) => (Array.isArray(n) ? wr(n, t) : t(n)));
      }
      function ip(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n);
      }
      function di(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0];
      }
      function rt(e, t, n) {
        let r = _r(e, t);
        return (
          r >= 0
            ? (e[1 | r] = n)
            : ((r = ~r),
              (function kb(e, t, n, r) {
                let o = e.length;
                if (o == t) e.push(n, r);
                else if (1 === o) e.push(r, e[0]), (e[0] = n);
                else {
                  for (o--, e.push(e[o - 1], e[o]); o > t; )
                    (e[o] = e[o - 2]), o--;
                  (e[t] = n), (e[t + 1] = r);
                }
              })(e, r, t, n)),
          r
        );
      }
      function tc(e, t) {
        const n = _r(e, t);
        if (n >= 0) return e[1 | n];
      }
      function _r(e, t) {
        return (function ap(e, t, n) {
          let r = 0,
            o = e.length >> n;
          for (; o !== r; ) {
            const s = r + ((o - r) >> 1),
              i = e[s << n];
            if (t === i) return s << n;
            i > t ? (o = s) : (r = s + 1);
          }
          return ~(o << n);
        })(e, t, 1);
      }
      const hi = go(yr("Optional"), 8),
        pi = go(yr("SkipSelf"), 4);
      function Di(e) {
        return 128 == (128 & e.flags);
      }
      var wn = (function (e) {
        return (
          (e[(e.Important = 1)] = "Important"),
          (e[(e.DashCase = 2)] = "DashCase"),
          e
        );
      })(wn || {});
      const ic = new Map();
      let iI = 0;
      const uc = "__ngContext__";
      function Ae(e, t) {
        ze(t)
          ? ((e[uc] = t[_o]),
            (function uI(e) {
              ic.set(e[_o], e);
            })(t))
          : (e[uc] = t);
      }
      let cc;
      function lc(e, t) {
        return cc(e, t);
      }
      function Po(e) {
        const t = e[ie];
        return qe(t) ? t[ie] : t;
      }
      function Mp(e) {
        return Ap(e[Do]);
      }
      function Tp(e) {
        return Ap(e[Ct]);
      }
      function Ap(e) {
        for (; null !== e && !qe(e); ) e = e[Ct];
        return e;
      }
      function br(e, t, n, r, o) {
        if (null != r) {
          let s,
            i = !1;
          qe(r) ? (s = r) : ze(r) && ((i = !0), (r = r[le]));
          const a = ne(r);
          0 === e && null !== n
            ? null == o
              ? Op(t, n, a)
              : jn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? jn(t, n, a, o || null, !0)
            : 2 === e
            ? (function Si(e, t, n) {
                const r = bi(e, t);
                r &&
                  (function MI(e, t, n, r) {
                    e.removeChild(t, n, r);
                  })(e, r, t, n);
              })(t, a, i)
            : 3 === e && t.destroyNode(a),
            null != s &&
              (function RI(e, t, n, r, o) {
                const s = n[Pt];
                s !== ne(n) && br(t, e, r, s, o);
                for (let a = Ie; a < n.length; a++) {
                  const u = n[a];
                  ko(u[_], u, e, t, r, s);
                }
              })(t, e, s, n, o);
        }
      }
      function Ci(e, t, n) {
        return e.createElement(t, n);
      }
      function Np(e, t) {
        const n = e[lr],
          r = n.indexOf(t);
        Ah(t), n.splice(r, 1);
      }
      function Ei(e, t) {
        if (e.length <= Ie) return;
        const n = Ie + t,
          r = e[n];
        if (r) {
          const o = r[wo];
          null !== o && o !== e && Np(o, r), t > 0 && (e[n - 1][Ct] = r[Ct]);
          const s = di(e, Ie + t);
          !(function DI(e, t) {
            ko(e, t, t[P], 2, null, null), (t[le] = null), (t[Te] = null);
          })(r[_], r);
          const i = s[Ot];
          null !== i && i.detachView(s[_]),
            (r[ie] = null),
            (r[Ct] = null),
            (r[F] &= -129);
        }
        return r;
      }
      function fc(e, t) {
        if (!(256 & t[F])) {
          const n = t[P];
          t[Zs]?.destroy(),
            t[Ys]?.destroy(),
            n.destroyNode && ko(e, t, n, 3, null, null),
            (function CI(e) {
              let t = e[Do];
              if (!t) return hc(e[_], e);
              for (; t; ) {
                let n = null;
                if (ze(t)) n = t[Do];
                else {
                  const r = t[Ie];
                  r && (n = r);
                }
                if (!n) {
                  for (; t && !t[Ct] && t !== e; )
                    ze(t) && hc(t[_], t), (t = t[ie]);
                  null === t && (t = e), ze(t) && hc(t[_], t), (n = t && t[Ct]);
                }
                t = n;
              }
            })(t);
        }
      }
      function hc(e, t) {
        if (!(256 & t[F])) {
          (t[F] &= -129),
            (t[F] |= 256),
            (function SI(e, t) {
              let n;
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]];
                  if (!(o instanceof So)) {
                    const s = n[r + 1];
                    if (Array.isArray(s))
                      for (let i = 0; i < s.length; i += 2) {
                        const a = o[s[i]],
                          u = s[i + 1];
                        kt(4, a, u);
                        try {
                          u.call(a);
                        } finally {
                          kt(5, a, u);
                        }
                      }
                    else {
                      kt(4, o, s);
                      try {
                        s.call(o);
                      } finally {
                        kt(5, o, s);
                      }
                    }
                  }
                }
            })(e, t),
            (function II(e, t) {
              const n = e.cleanup,
                r = t[ir];
              if (null !== n)
                for (let s = 0; s < n.length - 1; s += 2)
                  if ("string" == typeof n[s]) {
                    const i = n[s + 3];
                    i >= 0 ? r[i]() : r[-i].unsubscribe(), (s += 2);
                  } else n[s].call(r[n[s + 1]]);
              null !== r && (t[ir] = null);
              const o = t[vn];
              if (null !== o) {
                t[vn] = null;
                for (let s = 0; s < o.length; s++) (0, o[s])();
              }
            })(e, t),
            1 === t[_].type && t[P].destroy();
          const n = t[wo];
          if (null !== n && qe(t[ie])) {
            n !== t[ie] && Np(n, t);
            const r = t[Ot];
            null !== r && r.detachView(e);
          }
          !(function cI(e) {
            ic.delete(e[_o]);
          })(t);
        }
      }
      function pc(e, t, n) {
        return (function xp(e, t, n) {
          let r = t;
          for (; null !== r && 40 & r.type; ) r = (t = r).parent;
          if (null === r) return n[le];
          {
            const { componentOffset: o } = r;
            if (o > -1) {
              const { encapsulation: s } = e.data[r.directiveStart + o];
              if (s === wt.None || s === wt.Emulated) return null;
            }
            return Ge(r, n);
          }
        })(e, t.parent, n);
      }
      function jn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o);
      }
      function Op(e, t, n) {
        e.appendChild(t, n);
      }
      function Pp(e, t, n, r, o) {
        null !== r ? jn(e, t, n, r, o) : Op(e, t, n);
      }
      function bi(e, t) {
        return e.parentNode(t);
      }
      let gc,
        Dc,
        Lp = function kp(e, t, n) {
          return 40 & e.type ? Ge(e, n) : null;
        };
      function Ii(e, t, n, r) {
        const o = pc(e, r, t),
          s = t[P],
          a = (function Fp(e, t, n) {
            return Lp(e, t, n);
          })(r.parent || t[Te], r, t);
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) Pp(s, o, n[u], a, !1);
          else Pp(s, o, n, a, !1);
        void 0 !== gc && gc(s, r, t, n, o);
      }
      function Fo(e, t) {
        if (null !== t) {
          const n = t.type;
          if (3 & n) return Ge(t, e);
          if (4 & n) return mc(-1, e[t.index]);
          if (8 & n) {
            const r = t.child;
            if (null !== r) return Fo(e, r);
            {
              const o = e[t.index];
              return qe(o) ? mc(-1, o) : ne(o);
            }
          }
          if (32 & n) return lc(t, e)() || ne(e[t.index]);
          {
            const r = Bp(e, t);
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Fo(Po(e[fe]), r)
              : Fo(e, t.next);
          }
        }
        return null;
      }
      function Bp(e, t) {
        return null !== t ? e[fe][Te].projection[t.projection] : null;
      }
      function mc(e, t) {
        const n = Ie + e + 1;
        if (n < t.length) {
          const r = t[n],
            o = r[_].firstChild;
          if (null !== o) return Fo(r, o);
        }
        return t[Pt];
      }
      function vc(e, t, n, r, o, s, i) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type;
          if (
            (i && 0 === t && (a && Ae(ne(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) vc(e, t, n.child, r, o, s, !1), br(t, e, o, a, s);
            else if (32 & u) {
              const c = lc(n, r);
              let l;
              for (; (l = c()); ) br(t, e, o, l, s);
              br(t, e, o, a, s);
            } else 16 & u ? Vp(e, t, r, n, o, s) : br(t, e, o, a, s);
          n = i ? n.projectionNext : n.next;
        }
      }
      function ko(e, t, n, r, o, s) {
        vc(n, r, e.firstChild, t, o, s, !1);
      }
      function Vp(e, t, n, r, o, s) {
        const i = n[fe],
          u = i[Te].projection[r.projection];
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) br(t, e, o, u[c], s);
        else {
          let c = u;
          const l = i[ie];
          Di(r) && (c.flags |= 128), vc(e, t, c, l, o, s, !0);
        }
      }
      function Hp(e, t, n) {
        "" === n
          ? e.removeAttribute(t, "class")
          : e.setAttribute(t, "class", n);
      }
      function Up(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: s } = n;
        null !== r && Nu(e, t, r),
          null !== o && Hp(e, t, o),
          null !== s &&
            (function xI(e, t, n) {
              e.setAttribute(t, "style", n);
            })(e, t, s);
      }
      class Wp {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t;
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${zf})`;
        }
      }
      function _n(e) {
        return e instanceof Wp ? e.changingThisBreaksApplicationSecurity : e;
      }
      const GI = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i;
      var Mr = (function (e) {
        return (
          (e[(e.NONE = 0)] = "NONE"),
          (e[(e.HTML = 1)] = "HTML"),
          (e[(e.STYLE = 2)] = "STYLE"),
          (e[(e.SCRIPT = 3)] = "SCRIPT"),
          (e[(e.URL = 4)] = "URL"),
          (e[(e.RESOURCE_URL = 5)] = "RESOURCE_URL"),
          e
        );
      })(Mr || {});
      function Ic(e) {
        const t = (function Bo() {
          const e = D();
          return e && e[ar].sanitizer;
        })();
        return t
          ? t.sanitize(Mr.URL, e) || ""
          : (function Lo(e, t) {
              const n = (function HI(e) {
                return (e instanceof Wp && e.getTypeName()) || null;
              })(e);
              if (null != n && n !== t) {
                if ("ResourceURL" === n && "URL" === t) return !0;
                throw new Error(`Required a safe ${t}, got a ${n} (see ${zf})`);
              }
              return n === t;
            })(e, "URL")
          ? _n(e)
          : (function _c(e) {
              return (e = String(e)).match(GI) ? e : "unsafe:" + e;
            })(O(e));
      }
      class b {
        constructor(t, n) {
          (this._desc = t),
            (this.ngMetadataName = "InjectionToken"),
            (this.ɵprov = void 0),
            "number" == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = M({
                  token: this,
                  providedIn: n.providedIn || "root",
                  factory: n.factory,
                }));
        }
        get multi() {
          return this;
        }
        toString() {
          return `InjectionToken ${this._desc}`;
        }
      }
      const $o = new b("ENVIRONMENT_INITIALIZER"),
        ng = new b("INJECTOR", -1),
        rg = new b("INJECTOR_DEF_TYPES");
      class Sc {
        get(t, n = po) {
          if (n === po) {
            const r = new Error(`NullInjectorError: No provider for ${ve(t)}!`);
            throw ((r.name = "NullInjectorError"), r);
          }
          return n;
        }
      }
      function s0(...e) {
        return { ɵproviders: og(0, e), ɵfromNgModule: !0 };
      }
      function og(e, ...t) {
        const n = [],
          r = new Set();
        let o;
        const s = (i) => {
          n.push(i);
        };
        return (
          wr(t, (i) => {
            const a = i;
            Ri(a, s, [], r) && ((o ||= []), o.push(a));
          }),
          void 0 !== o && sg(o, s),
          n
        );
      }
      function sg(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n];
          Tc(o, (s) => {
            t(s, r);
          });
        }
      }
      function Ri(e, t, n, r) {
        if (!(e = x(e))) return !1;
        let o = null,
          s = Vs(e);
        const i = !s && U(e);
        if (s || i) {
          if (i && !i.standalone) return !1;
          o = e;
        } else {
          const u = e.ngModule;
          if (((s = Vs(u)), !s)) return !1;
          o = u;
        }
        const a = r.has(o);
        if (i) {
          if (a) return !1;
          if ((r.add(o), i.dependencies)) {
            const u =
              "function" == typeof i.dependencies
                ? i.dependencies()
                : i.dependencies;
            for (const c of u) Ri(c, t, n, r);
          }
        } else {
          if (!s) return !1;
          {
            if (null != s.imports && !a) {
              let c;
              r.add(o);
              try {
                wr(s.imports, (l) => {
                  Ri(l, t, n, r) && ((c ||= []), c.push(l));
                });
              } finally {
              }
              void 0 !== c && sg(c, t);
            }
            if (!a) {
              const c = Pn(o) || (() => new o());
              t({ provide: o, useFactory: c, deps: q }, o),
                t({ provide: rg, useValue: o, multi: !0 }, o),
                t({ provide: $o, useValue: () => I(o), multi: !0 }, o);
            }
            const u = s.providers;
            if (null != u && !a) {
              const c = e;
              Tc(u, (l) => {
                t(l, c);
              });
            }
          }
        }
        return o !== e && void 0 !== e.providers;
      }
      function Tc(e, t) {
        for (let n of e)
          Du(n) && (n = n.ɵproviders), Array.isArray(n) ? Tc(n, t) : t(n);
      }
      const a0 = Q({ provide: String, useValue: Q });
      function Ac(e) {
        return null !== e && "object" == typeof e && a0 in e;
      }
      function Bn(e) {
        return "function" == typeof e;
      }
      const Rc = new b("Set Injector scope."),
        Ni = {},
        c0 = {};
      let Nc;
      function xi() {
        return void 0 === Nc && (Nc = new Sc()), Nc;
      }
      class ot {}
      class Oi extends ot {
        get destroyed() {
          return this._destroyed;
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Oc(t, (i) => this.processProvider(i)),
            this.records.set(ng, Tr(void 0, this)),
            o.has("environment") && this.records.set(ot, Tr(void 0, this));
          const s = this.records.get(Rc);
          null != s && "string" == typeof s.value && this.scopes.add(s.value),
            (this.injectorDefTypes = new Set(this.get(rg.multi, q, B.Self)));
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0);
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy();
            const t = this._onDestroyHooks;
            this._onDestroyHooks = [];
            for (const n of t) n();
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear();
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          );
        }
        runInContext(t) {
          this.assertNotDestroyed();
          const n = gn(this),
            r = He(void 0);
          try {
            return t();
          } finally {
            gn(n), He(r);
          }
        }
        get(t, n = po, r = B.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Kf)))
            return t[Kf](this);
          r = zs(r);
          const s = gn(this),
            i = He(void 0);
          try {
            if (!(r & B.SkipSelf)) {
              let u = this.records.get(t);
              if (void 0 === u) {
                const c =
                  (function p0(e) {
                    return (
                      "function" == typeof e ||
                      ("object" == typeof e && e instanceof b)
                    );
                  })(t) && $s(t);
                (u = c && this.injectableDefInScope(c) ? Tr(xc(t), Ni) : null),
                  this.records.set(t, u);
              }
              if (null != u) return this.hydrate(t, u);
            }
            return (r & B.Self ? xi() : this.parent).get(
              t,
              (n = r & B.Optional && n === po ? null : n)
            );
          } catch (a) {
            if ("NullInjectorError" === a.name) {
              if (((a[Us] = a[Us] || []).unshift(ve(t)), s)) throw a;
              return (function uE(e, t, n, r) {
                const o = e[Us];
                throw (
                  (t[Qf] && o.unshift(t[Qf]),
                  (e.message = (function cE(e, t, n, r = null) {
                    e =
                      e && "\n" === e.charAt(0) && "\u0275" == e.charAt(1)
                        ? e.slice(2)
                        : e;
                    let o = ve(t);
                    if (Array.isArray(t)) o = t.map(ve).join(" -> ");
                    else if ("object" == typeof t) {
                      let s = [];
                      for (let i in t)
                        if (t.hasOwnProperty(i)) {
                          let a = t[i];
                          s.push(
                            i +
                              ":" +
                              ("string" == typeof a ? JSON.stringify(a) : ve(a))
                          );
                        }
                      o = `{${s.join(", ")}}`;
                    }
                    return `${n}${r ? "(" + r + ")" : ""}[${o}]: ${e.replace(
                      rE,
                      "\n  "
                    )}`;
                  })("\n" + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Us] = null),
                  e)
                );
              })(a, t, "R3InjectorError", this.source);
            }
            throw a;
          } finally {
            He(i), gn(s);
          }
        }
        resolveInjectorInitializers() {
          const t = gn(this),
            n = He(void 0);
          try {
            const o = this.get($o.multi, q, B.Self);
            for (const s of o) s();
          } finally {
            gn(t), He(n);
          }
        }
        toString() {
          const t = [],
            n = this.records;
          for (const r of n.keys()) t.push(ve(r));
          return `R3Injector[${t.join(", ")}]`;
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new w(205, !1);
        }
        processProvider(t) {
          let n = Bn((t = x(t))) ? t : x(t && t.provide);
          const r = (function d0(e) {
            return Ac(e)
              ? Tr(void 0, e.useValue)
              : Tr(
                  (function ug(e, t, n) {
                    let r;
                    if (Bn(e)) {
                      const o = x(e);
                      return Pn(o) || xc(o);
                    }
                    if (Ac(e)) r = () => x(e.useValue);
                    else if (
                      (function ag(e) {
                        return !(!e || !e.useFactory);
                      })(e)
                    )
                      r = () => e.useFactory(...Tu(e.deps || []));
                    else if (
                      (function ig(e) {
                        return !(!e || !e.useExisting);
                      })(e)
                    )
                      r = () => I(x(e.useExisting));
                    else {
                      const o = x(e && (e.useClass || e.provide));
                      if (
                        !(function f0(e) {
                          return !!e.deps;
                        })(e)
                      )
                        return Pn(o) || xc(o);
                      r = () => new o(...Tu(e.deps));
                    }
                    return r;
                  })(e),
                  Ni
                );
          })(t);
          if (Bn(t) || !0 !== t.multi) this.records.get(n);
          else {
            let o = this.records.get(n);
            o ||
              ((o = Tr(void 0, Ni, !0)),
              (o.factory = () => Tu(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t);
          }
          this.records.set(n, r);
        }
        hydrate(t, n) {
          return (
            n.value === Ni && ((n.value = c0), (n.value = n.factory())),
            "object" == typeof n.value &&
              n.value &&
              (function h0(e) {
                return (
                  null !== e &&
                  "object" == typeof e &&
                  "function" == typeof e.ngOnDestroy
                );
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          );
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1;
          const n = x(t.providedIn);
          return "string" == typeof n
            ? "any" === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n);
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t);
          -1 !== n && this._onDestroyHooks.splice(n, 1);
        }
      }
      function xc(e) {
        const t = $s(e),
          n = null !== t ? t.factory : Pn(e);
        if (null !== n) return n;
        if (e instanceof b) throw new w(204, !1);
        if (e instanceof Function)
          return (function l0(e) {
            const t = e.length;
            if (t > 0)
              throw (
                ((function No(e, t) {
                  const n = [];
                  for (let r = 0; r < e; r++) n.push(t);
                  return n;
                })(t, "?"),
                new w(204, !1))
              );
            const n = (function KC(e) {
              return (e && (e[Hs] || e[Gf])) || null;
            })(e);
            return null !== n ? () => n.factory(e) : () => new e();
          })(e);
        throw new w(204, !1);
      }
      function Tr(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 };
      }
      function Oc(e, t) {
        for (const n of e)
          Array.isArray(n) ? Oc(n, t) : n && Du(n) ? Oc(n.ɵproviders, t) : t(n);
      }
      const Pi = new b("AppId", { providedIn: "root", factory: () => g0 }),
        g0 = "ng",
        cg = new b("Platform Initializer"),
        $n = new b("Platform ID", {
          providedIn: "platform",
          factory: () => "unknown",
        }),
        lg = new b("CSP nonce", {
          providedIn: "root",
          factory: () =>
            (function Sr() {
              if (void 0 !== Dc) return Dc;
              if (typeof document < "u") return document;
              throw new w(210, !1);
            })()
              .body?.querySelector("[ngCspNonce]")
              ?.getAttribute("ngCspNonce") || null,
        });
      let fg = (e, t, n) => null;
      function $c(e, t, n = !1) {
        return fg(e, t, n);
      }
      class I0 {}
      class gg {}
      class M0 {
        resolveComponentFactory(t) {
          throw (function S0(e) {
            const t = Error(`No component factory found for ${ve(e)}.`);
            return (t.ngComponent = e), t;
          })(t);
        }
      }
      let $i = (() => {
        class t {}
        return (t.NULL = new M0()), t;
      })();
      function T0() {
        return Rr(Se(), D());
      }
      function Rr(e, t) {
        return new Cn(Ge(e, t));
      }
      let Cn = (() => {
        class t {
          constructor(r) {
            this.nativeElement = r;
          }
        }
        return (t.__NG_ELEMENT_ID__ = T0), t;
      })();
      class vg {}
      let Vi = (() => {
          class t {
            constructor() {
              this.destroyNode = null;
            }
          }
          return (
            (t.__NG_ELEMENT_ID__ = () =>
              (function R0() {
                const e = D(),
                  n = nt(Se().index, e);
                return (ze(n) ? n : e)[P];
              })()),
            t
          );
        })(),
        N0 = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵprov = M({
              token: e,
              providedIn: "root",
              factory: () => null,
            })),
            t
          );
        })();
      class Hi {
        constructor(t) {
          (this.full = t),
            (this.major = t.split(".")[0]),
            (this.minor = t.split(".")[1]),
            (this.patch = t.split(".").slice(2).join("."));
        }
      }
      const x0 = new Hi("16.2.1"),
        Uc = {};
      function _g(e, t = null, n = null, r) {
        const o = Cg(e, t, n, r);
        return o.resolveInjectorInitializers(), o;
      }
      function Cg(e, t = null, n = null, r, o = new Set()) {
        const s = [n || q, s0(e)];
        return (
          (r = r || ("object" == typeof e ? void 0 : ve(e))),
          new Oi(s, t || xi(), r || null, o)
        );
      }
      let pt = (() => {
        var e;
        class t {
          static create(r, o) {
            if (Array.isArray(r)) return _g({ name: "" }, o, r, "");
            {
              const s = r.name ?? "";
              return _g({ name: s }, r.parent, r.providers, s);
            }
          }
        }
        return (
          ((e = t).THROW_IF_NOT_FOUND = po),
          (e.NULL = new Sc()),
          (e.ɵprov = M({ token: e, providedIn: "any", factory: () => I(ng) })),
          (e.__NG_ELEMENT_ID__ = -1),
          t
        );
      })();
      function tn(e) {
        return e instanceof Function ? e() : e;
      }
      let Gc = (() => {
        var e;
        class t {
          constructor() {
            (this.callbacks = new Set()),
              (this.deferredCallbacks = new Set()),
              (this.renderDepth = 0),
              (this.runningCallbacks = !1);
          }
          begin() {
            if (this.runningCallbacks) throw new w(102, !1);
            this.renderDepth++;
          }
          end() {
            if ((this.renderDepth--, 0 === this.renderDepth))
              try {
                this.runningCallbacks = !0;
                for (const r of this.callbacks) r.invoke();
              } finally {
                this.runningCallbacks = !1;
                for (const r of this.deferredCallbacks) this.callbacks.add(r);
                this.deferredCallbacks.clear();
              }
          }
          register(r) {
            (this.runningCallbacks
              ? this.deferredCallbacks
              : this.callbacks
            ).add(r);
          }
          unregister(r) {
            this.callbacks.delete(r), this.deferredCallbacks.delete(r);
          }
          ngOnDestroy() {
            this.callbacks.clear(), this.deferredCallbacks.clear();
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function zo(e) {
        for (; e; ) {
          e[F] |= 64;
          const t = Po(e);
          if (Pu(e) && !t) return e;
          e = t;
        }
        return null;
      }
      function Wc(e) {
        return e.ngOriginalError;
      }
      class Vn {
        constructor() {
          this._console = console;
        }
        handleError(t) {
          const n = this._findOriginalError(t);
          this._console.error("ERROR", t),
            n && this._console.error("ORIGINAL ERROR", n);
        }
        _findOriginalError(t) {
          let n = t && Wc(t);
          for (; n && Wc(n); ) n = Wc(n);
          return n || null;
        }
      }
      const Mg = new b("", { providedIn: "root", factory: () => !1 });
      class Ng extends yh {
        constructor() {
          super(...arguments),
            (this.consumerAllowSignalWrites = !1),
            (this._lView = null);
        }
        set lView(t) {
          this._lView = t;
        }
        onConsumerDependencyMayHaveChanged() {
          zo(this._lView);
        }
        onProducerUpdateValueVersion() {}
        get hasReadASignal() {
          return this.hasProducers;
        }
        runInContext(t, n, r) {
          const o = Ce(this);
          this.trackingVersion++;
          try {
            t(n, r);
          } finally {
            Ce(o);
          }
        }
        destroy() {
          this.trackingVersion++;
        }
      }
      let zi = null;
      function xg() {
        return (zi ??= new Ng()), zi;
      }
      function Og(e, t) {
        return e[t] ?? xg();
      }
      function Pg(e, t) {
        const n = xg();
        n.hasReadASignal && ((e[t] = zi), (n.lView = e), (zi = new Ng()));
      }
      const k = {};
      function X(e) {
        Fg(z(), D(), Pe() + e, !1);
      }
      function Fg(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[F])) {
            const s = e.preOrderCheckHooks;
            null !== s && oi(t, s, n);
          } else {
            const s = e.preOrderHooks;
            null !== s && si(t, s, 0, n);
          }
        kn(n);
      }
      function T(e, t = B.Default) {
        const n = D();
        return null === n ? I(e, t) : Kh(Se(), n, x(e), t);
      }
      function qi(e, t, n, r, o, s, i, a, u, c, l) {
        const d = t.blueprint.slice();
        return (
          (d[le] = o),
          (d[F] = 140 | r),
          (null !== c || (e && 2048 & e[F])) && (d[F] |= 2048),
          Th(d),
          (d[ie] = d[ur] = e),
          (d[de] = n),
          (d[ar] = i || (e && e[ar])),
          (d[P] = a || (e && e[P])),
          (d[mn] = u || (e && e[mn]) || null),
          (d[Te] = s),
          (d[_o] = (function aI() {
            return iI++;
          })()),
          (d[Xt] = l),
          (d[fh] = c),
          (d[fe] = 2 == t.type ? e[fe] : d),
          d
        );
      }
      function Or(e, t, n, r, o) {
        let s = e.data[t];
        if (null === s)
          (s = (function Zc(e, t, n, r, o) {
            const s = Ph(),
              i = $u(),
              u = (e.data[t] = (function tS(e, t, n, r, o, s) {
                let i = t ? t.injectorIndex : -1,
                  a = 0;
                return (
                  (function fr() {
                    return null !== N.skipHydrationRootTNode;
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: i,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: s,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                );
              })(0, i ? s : s && s.parent, n, t, r, o));
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== s &&
                (i
                  ? null == s.child && null !== u.parent && (s.child = u)
                  : null === s.next && ((s.next = u), (u.prev = s))),
              u
            );
          })(e, t, n, r, o)),
            (function ib() {
              return N.lFrame.inI18n;
            })() && (s.flags |= 32);
        else if (64 & s.type) {
          (s.type = n), (s.value = r), (s.attrs = o);
          const i = (function Io() {
            const e = N.lFrame,
              t = e.currentTNode;
            return e.isParent ? t : t.parent;
          })();
          s.injectorIndex = null === i ? -1 : i.injectorIndex;
        }
        return Lt(s, !0), s;
      }
      function qo(e, t, n, r) {
        if (0 === n) return -1;
        const o = t.length;
        for (let s = 0; s < n; s++)
          t.push(r), e.blueprint.push(r), e.data.push(null);
        return o;
      }
      function Lg(e, t, n, r, o) {
        const s = Og(t, Zs),
          i = Pe(),
          a = 2 & r;
        try {
          if (
            (kn(-1), a && t.length > $ && Fg(e, t, $, !1), kt(a ? 2 : 0, o), a)
          )
            s.runInContext(n, r, o);
          else {
            const c = Ce(null);
            try {
              n(r, o);
            } finally {
              Ce(c);
            }
          }
        } finally {
          a && null === t[Zs] && Pg(t, Zs), kn(i), kt(a ? 3 : 1, o);
        }
      }
      function Yc(e, t, n) {
        if (Ou(t)) {
          const r = Ce(null);
          try {
            const s = t.directiveEnd;
            for (let i = t.directiveStart; i < s; i++) {
              const a = e.data[i];
              a.contentQueries && a.contentQueries(1, n[i], i);
            }
          } finally {
            Ce(r);
          }
        }
      }
      function Qc(e, t, n) {
        Oh() &&
          ((function uS(e, t, n, r) {
            const o = n.directiveStart,
              s = n.directiveEnd;
            On(n) &&
              (function gS(e, t, n) {
                const r = Ge(t, e),
                  o = jg(n);
                let i = 16;
                n.signals ? (i = 4096) : n.onPush && (i = 64);
                const a = Gi(
                  e,
                  qi(
                    e,
                    o,
                    null,
                    i,
                    r,
                    t,
                    null,
                    e[ar].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                );
                e[t.index] = a;
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || ai(n, t),
              Ae(r, t);
            const i = n.initialInputs;
            for (let a = o; a < s; a++) {
              const u = e.data[a],
                c = Ln(t, e, a, n);
              Ae(c, t),
                null !== i && mS(0, a - o, c, u, 0, i),
                Et(u) && (nt(n.index, t)[de] = Ln(t, e, a, n));
            }
          })(e, t, n, Ge(n, t)),
          64 == (64 & n.flags) && Ug(e, t, n));
      }
      function Xc(e, t, n = Ge) {
        const r = t.localNames;
        if (null !== r) {
          let o = t.index + 1;
          for (let s = 0; s < r.length; s += 2) {
            const i = r[s + 1],
              a = -1 === i ? n(t, e) : e[i];
            e[o++] = a;
          }
        }
      }
      function jg(e) {
        const t = e.tView;
        return null === t || t.incompleteFirstPass
          ? (e.tView = Jc(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t;
      }
      function Jc(e, t, n, r, o, s, i, a, u, c, l) {
        const d = $ + r,
          f = d + o,
          h = (function Y0(e, t) {
            const n = [];
            for (let r = 0; r < t; r++) n.push(r < e ? null : k);
            return n;
          })(d, f),
          p = "function" == typeof c ? c() : c;
        return (h[_] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: "function" == typeof s ? s() : s,
          pipeRegistry: "function" == typeof i ? i() : i,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        });
      }
      let Bg = (e) => null;
      function $g(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n;
            const s = e[o];
            null === r
              ? Vg(n, t, o, s)
              : r.hasOwnProperty(o) && Vg(n, t, r[o], s);
          }
        return n;
      }
      function Vg(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r]);
      }
      function Kc(e, t, n, r) {
        if (Oh()) {
          const o = null === r ? null : { "": -1 },
            s = (function lS(e, t) {
              const n = e.directiveRegistry;
              let r = null,
                o = null;
              if (n)
                for (let s = 0; s < n.length; s++) {
                  const i = n[s];
                  if (ih(t, i.selectors, !1))
                    if ((r || (r = []), Et(i)))
                      if (null !== i.findHostDirectiveDefs) {
                        const a = [];
                        (o = o || new Map()),
                          i.findHostDirectiveDefs(i, a, o),
                          r.unshift(...a, i),
                          el(e, t, a.length);
                      } else r.unshift(i), el(e, t, 0);
                    else
                      (o = o || new Map()),
                        i.findHostDirectiveDefs?.(i, r, o),
                        r.push(i);
                }
              return null === r ? null : [r, o];
            })(e, n);
          let i, a;
          null === s ? (i = a = null) : ([i, a] = s),
            null !== i && Hg(e, t, n, i, o, a),
            o &&
              (function dS(e, t, n) {
                if (t) {
                  const r = (e.localNames = []);
                  for (let o = 0; o < t.length; o += 2) {
                    const s = n[t[o + 1]];
                    if (null == s) throw new w(-301, !1);
                    r.push(t[o], s);
                  }
                }
              })(n, r, o);
        }
        n.mergedAttrs = vo(n.mergedAttrs, n.attrs);
      }
      function Hg(e, t, n, r, o, s) {
        for (let c = 0; c < r.length; c++) Ju(ai(n, t), e, r[c].type);
        !(function hS(e, t, n) {
          (e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t);
        })(n, e.data.length, r.length);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          l.providersResolver && l.providersResolver(l);
        }
        let i = !1,
          a = !1,
          u = qo(e, t, r.length, null);
        for (let c = 0; c < r.length; c++) {
          const l = r[c];
          (n.mergedAttrs = vo(n.mergedAttrs, l.hostAttrs)),
            pS(e, n, t, u, l),
            fS(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64);
          const d = l.type.prototype;
          !i &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (i = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++;
        }
        !(function nS(e, t, n) {
          const o = t.directiveEnd,
            s = e.data,
            i = t.attrs,
            a = [];
          let u = null,
            c = null;
          for (let l = t.directiveStart; l < o; l++) {
            const d = s[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null;
            (u = $g(d.inputs, l, u, f ? f.inputs : null)),
              (c = $g(d.outputs, l, c, p));
            const g = null === u || null === i || sh(t) ? null : vS(u, l, i);
            a.push(g);
          }
          null !== u &&
            (u.hasOwnProperty("class") && (t.flags |= 8),
            u.hasOwnProperty("style") && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c);
        })(e, n, s);
      }
      function Ug(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          s = n.index,
          i = (function ub() {
            return N.lFrame.currentDirectiveIndex;
          })();
        try {
          kn(s);
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a];
            Hu(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                cS(u, c);
          }
        } finally {
          kn(-1), Hu(i);
        }
      }
      function cS(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t);
      }
      function el(e, t, n) {
        (t.componentOffset = n), (e.components ??= []).push(t.index);
      }
      function fS(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e;
          Et(t) && (n[""] = e);
        }
      }
      function pS(e, t, n, r, o) {
        e.data[r] = o;
        const s = o.factory || (o.factory = Pn(o.type)),
          i = new So(s, Et(o), T);
        (e.blueprint[r] = i),
          (n[r] = i),
          (function iS(e, t, n, r, o) {
            const s = o.hostBindings;
            if (s) {
              let i = e.hostBindingOpCodes;
              null === i && (i = e.hostBindingOpCodes = []);
              const a = ~t.index;
              (function aS(e) {
                let t = e.length;
                for (; t > 0; ) {
                  const n = e[--t];
                  if ("number" == typeof n && n < 0) return n;
                }
                return 0;
              })(i) != a && i.push(a),
                i.push(n, r, s);
            }
          })(e, t, r, qo(e, n, o.hostVars, k), o);
      }
      function mS(e, t, n, r, o, s) {
        const i = s[t];
        if (null !== i)
          for (let a = 0; a < i.length; ) zg(r, n, i[a++], i[a++], i[a++]);
      }
      function zg(e, t, n, r, o) {
        const s = Ce(null);
        try {
          const i = e.inputTransforms;
          null !== i && i.hasOwnProperty(r) && (o = i[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o);
        } finally {
          Ce(s);
        }
      }
      function vS(e, t, n) {
        let r = null,
          o = 0;
        for (; o < n.length; ) {
          const s = n[o];
          if (0 !== s)
            if (5 !== s) {
              if ("number" == typeof s) break;
              if (e.hasOwnProperty(s)) {
                null === r && (r = []);
                const i = e[s];
                for (let a = 0; a < i.length; a += 2)
                  if (i[a] === t) {
                    r.push(s, i[a + 1], n[o + 1]);
                    break;
                  }
              }
              o += 2;
            } else o += 2;
          else o += 4;
        }
        return r;
      }
      function qg(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null];
      }
      function Gg(e, t) {
        const n = e.contentQueries;
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const s = n[r + 1];
            if (-1 !== s) {
              const i = e.data[s];
              zu(n[r]), i.contentQueries(2, t[s], s);
            }
          }
      }
      function Gi(e, t) {
        return e[Do] ? (e[dh][Ct] = t) : (e[Do] = t), (e[dh] = t), t;
      }
      function nl(e, t, n) {
        zu(0);
        const r = Ce(null);
        try {
          t(e, n);
        } finally {
          Ce(r);
        }
      }
      function Qg(e, t) {
        const n = e[mn],
          r = n ? n.get(Vn, null) : null;
        r && r.handleError(t);
      }
      function rl(e, t, n, r, o) {
        for (let s = 0; s < n.length; ) {
          const i = n[s++],
            a = n[s++];
          zg(e.data[i], t[i], r, a, o);
        }
      }
      function yS(e, t) {
        const n = nt(t, e),
          r = n[_];
        !(function DS(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n]);
        })(r, n);
        const o = n[le];
        null !== o && null === n[Xt] && (n[Xt] = $c(o, n[mn])), ol(r, n, n[de]);
      }
      function ol(e, t, n) {
        qu(t);
        try {
          const r = e.viewQuery;
          null !== r && nl(1, r, n);
          const o = e.template;
          null !== o && Lg(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && Gg(e, t),
            e.staticViewQueries && nl(2, e.viewQuery, n);
          const s = e.components;
          null !== s &&
            (function wS(e, t) {
              for (let n = 0; n < t.length; n++) yS(e, t[n]);
            })(t, s);
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          );
        } finally {
          (t[F] &= -5), Gu();
        }
      }
      let Xg = (() => {
        var e;
        class t {
          constructor() {
            (this.all = new Set()), (this.queue = new Map());
          }
          create(r, o, s) {
            const i = typeof Zone > "u" ? null : Zone.current,
              a = new jE(
                r,
                (l) => {
                  this.all.has(l) && this.queue.set(l, i);
                },
                s
              );
            let u;
            this.all.add(a), a.notify();
            const c = () => {
              a.cleanup(), u?.(), this.all.delete(a), this.queue.delete(a);
            };
            return (u = o?.onDestroy(c)), { destroy: c };
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [r, o] of this.queue)
                this.queue.delete(r), o ? o.run(() => r.run()) : r.run();
          }
          get isQueueEmpty() {
            return 0 === this.queue.size;
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new e(),
          })),
          t
        );
      })();
      function Wi(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          s = 0;
        if (null !== t)
          for (let i = 0; i < t.length; i++) {
            const a = t[i];
            "number" == typeof a
              ? (s = a)
              : 1 == s
              ? (o = mu(o, a))
              : 2 == s && (r = mu(r, a + ": " + t[++i] + ";"));
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o);
      }
      function Go(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const s = t[n.index];
          if ((null !== s && r.push(ne(s)), qe(s))) {
            for (let a = Ie; a < s.length; a++) {
              const u = s[a],
                c = u[_].firstChild;
              null !== c && Go(u[_], u, c, r);
            }
            s[Pt] !== s[le] && r.push(s[Pt]);
          }
          const i = n.type;
          if (8 & i) Go(e, t, n.child, r);
          else if (32 & i) {
            const a = lc(n, t);
            let u;
            for (; (u = a()); ) r.push(u);
          } else if (16 & i) {
            const a = Bp(t, n);
            if (Array.isArray(a)) r.push(...a);
            else {
              const u = Po(t[fe]);
              Go(u[_], u, a, r, !0);
            }
          }
          n = o ? n.projectionNext : n.next;
        }
        return r;
      }
      function Zi(e, t, n, r = !0) {
        const o = t[ar],
          s = o.rendererFactory,
          i = o.afterRenderEventManager;
        s.begin?.(), i?.begin();
        try {
          Jg(e, t, e.template, n);
        } catch (u) {
          throw (r && Qg(t, u), u);
        } finally {
          s.end?.(), o.effectManager?.flush(), i?.end();
        }
      }
      function Jg(e, t, n, r) {
        const o = t[F];
        if (256 != (256 & o)) {
          t[ar].effectManager?.flush(), qu(t);
          try {
            Th(t),
              (function kh(e) {
                return (N.lFrame.bindingIndex = e);
              })(e.bindingStartIndex),
              null !== n && Lg(e, t, n, 2, r);
            const i = 3 == (3 & o);
            if (i) {
              const c = e.preOrderCheckHooks;
              null !== c && oi(t, c, null);
            } else {
              const c = e.preOrderHooks;
              null !== c && si(t, c, 0, null), Wu(t, 0);
            }
            if (
              ((function ES(e) {
                for (let t = Mp(e); null !== t; t = Tp(t)) {
                  if (!t[hh]) continue;
                  const n = t[lr];
                  for (let r = 0; r < n.length; r++) {
                    YE(n[r]);
                  }
                }
              })(t),
              Kg(t, 2),
              null !== e.contentQueries && Gg(e, t),
              i)
            ) {
              const c = e.contentCheckHooks;
              null !== c && oi(t, c);
            } else {
              const c = e.contentHooks;
              null !== c && si(t, c, 1), Wu(t, 1);
            }
            !(function Z0(e, t) {
              const n = e.hostBindingOpCodes;
              if (null === n) return;
              const r = Og(t, Ys);
              try {
                for (let o = 0; o < n.length; o++) {
                  const s = n[o];
                  if (s < 0) kn(~s);
                  else {
                    const i = s,
                      a = n[++o],
                      u = n[++o];
                    ab(a, i), r.runInContext(u, 2, t[i]);
                  }
                }
              } finally {
                null === t[Ys] && Pg(t, Ys), kn(-1);
              }
            })(e, t);
            const a = e.components;
            null !== a && tm(t, a, 0);
            const u = e.viewQuery;
            if ((null !== u && nl(2, u, r), i)) {
              const c = e.viewCheckHooks;
              null !== c && oi(t, c);
            } else {
              const c = e.viewHooks;
              null !== c && si(t, c, 2), Wu(t, 2);
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[F] &= -73),
              Ah(t);
          } finally {
            Gu();
          }
        }
      }
      function Kg(e, t) {
        for (let n = Mp(e); null !== n; n = Tp(n))
          for (let r = Ie; r < n.length; r++) em(n[r], t);
      }
      function bS(e, t, n) {
        em(nt(t, e), n);
      }
      function em(e, t) {
        if (
          !(function WE(e) {
            return 128 == (128 & e[F]);
          })(e)
        )
          return;
        const n = e[_];
        if ((80 & e[F] && 0 === t) || 1024 & e[F] || 2 === t)
          Jg(n, e, n.template, e[de]);
        else if (e[yo] > 0) {
          Kg(e, 1);
          const o = e[_].components;
          null !== o && tm(e, o, 1);
        }
      }
      function tm(e, t, n) {
        for (let r = 0; r < t.length; r++) bS(e, t[r], n);
      }
      class Wo {
        get rootNodes() {
          const t = this._lView,
            n = t[_];
          return Go(n, t, n.firstChild, []);
        }
        constructor(t, n) {
          (this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1);
        }
        get context() {
          return this._lView[de];
        }
        set context(t) {
          this._lView[de] = t;
        }
        get destroyed() {
          return 256 == (256 & this._lView[F]);
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this);
          else if (this._attachedToViewContainer) {
            const t = this._lView[ie];
            if (qe(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1;
              r > -1 && (Ei(t, r), di(n, r));
            }
            this._attachedToViewContainer = !1;
          }
          fc(this._lView[_], this._lView);
        }
        onDestroy(t) {
          !(function Nh(e, t) {
            if (256 == (256 & e[F])) throw new w(911, !1);
            null === e[vn] && (e[vn] = []), e[vn].push(t);
          })(this._lView, t);
        }
        markForCheck() {
          zo(this._cdRefInjectingView || this._lView);
        }
        detach() {
          this._lView[F] &= -129;
        }
        reattach() {
          this._lView[F] |= 128;
        }
        detectChanges() {
          Zi(this._lView[_], this._lView, this.context);
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new w(902, !1);
          this._attachedToViewContainer = !0;
        }
        detachFromAppRef() {
          (this._appRef = null),
            (function _I(e, t) {
              ko(e, t, t[P], 2, null, null);
            })(this._lView[_], this._lView);
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new w(902, !1);
          this._appRef = t;
        }
      }
      class IS extends Wo {
        constructor(t) {
          super(t), (this._view = t);
        }
        detectChanges() {
          const t = this._view;
          Zi(t[_], t, t[de], !1);
        }
        checkNoChanges() {}
        get context() {
          return null;
        }
      }
      class nm extends $i {
        constructor(t) {
          super(), (this.ngModule = t);
        }
        resolveComponentFactory(t) {
          const n = U(t);
          return new Zo(n, this.ngModule);
        }
      }
      function rm(e) {
        const t = [];
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n });
        return t;
      }
      class MS {
        constructor(t, n) {
          (this.injector = t), (this.parentInjector = n);
        }
        get(t, n, r) {
          r = zs(r);
          const o = this.injector.get(t, Uc, r);
          return o !== Uc || n === Uc ? o : this.parentInjector.get(t, n, r);
        }
      }
      class Zo extends gg {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = rm(t.inputs);
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName]);
          return r;
        }
        get outputs() {
          return rm(this.componentDef.outputs);
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function DE(e) {
              return e.map(yE).join(",");
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n);
        }
        create(t, n, r, o) {
          let s = (o = o || this.ngModule) instanceof ot ? o : o?.injector;
          s &&
            null !== this.componentDef.getStandaloneInjector &&
            (s = this.componentDef.getStandaloneInjector(s) || s);
          const i = s ? new MS(t, s) : t,
            a = i.get(vg, null);
          if (null === a) throw new w(407, !1);
          const d = {
              rendererFactory: a,
              sanitizer: i.get(N0, null),
              effectManager: i.get(Xg, null),
              afterRenderEventManager: i.get(Gc, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || "div",
            p = r
              ? (function Q0(e, t, n, r) {
                  const s = r.get(Mg, !1) || n === wt.ShadowDom,
                    i = e.selectRootElement(t, s);
                  return (
                    (function X0(e) {
                      Bg(e);
                    })(i),
                    i
                  );
                })(f, r, this.componentDef.encapsulation, i)
              : Ci(
                  f,
                  h,
                  (function SS(e) {
                    const t = e.toLowerCase();
                    return "svg" === t ? "svg" : "math" === t ? "math" : null;
                  })(h)
                ),
            y = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528;
          let m = null;
          null !== p && (m = $c(p, i, !0));
          const S = Jc(0, null, null, 1, 0, null, null, null, null, null, null),
            E = qi(null, S, null, y, null, null, d, f, i, null, m);
          let j, Me;
          qu(E);
          try {
            const ct = this.componentDef;
            let nr,
              ou = null;
            ct.findHostDirectiveDefs
              ? ((nr = []),
                (ou = new Map()),
                ct.findHostDirectiveDefs(ct, nr, ou),
                nr.push(ct))
              : (nr = [ct]);
            const Vk = (function AS(e, t) {
                const n = e[_],
                  r = $;
                return (e[r] = t), Or(n, r, 2, "#host", null);
              })(E, p),
              Hk = (function RS(e, t, n, r, o, s, i) {
                const a = o[_];
                !(function NS(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = vo(t.mergedAttrs, o.hostAttrs);
                  null !== t.mergedAttrs &&
                    (Wi(t, t.mergedAttrs, !0), null !== n && Up(r, n, t));
                })(r, e, t, i);
                let u = null;
                null !== t && (u = $c(t, o[mn]));
                const c = s.rendererFactory.createRenderer(t, n);
                let l = 16;
                n.signals ? (l = 4096) : n.onPush && (l = 64);
                const d = qi(
                  o,
                  jg(n),
                  null,
                  l,
                  o[e.index],
                  e,
                  s,
                  c,
                  null,
                  null,
                  u
                );
                return (
                  a.firstCreatePass && el(a, e, r.length - 1),
                  Gi(o, d),
                  (o[e.index] = d)
                );
              })(Vk, p, ct, nr, E, d, f);
            (Me = Mh(S, $)),
              p &&
                (function OS(e, t, n, r) {
                  if (r) Nu(e, n, ["ng-version", x0.full]);
                  else {
                    const { attrs: o, classes: s } = (function wE(e) {
                      const t = [],
                        n = [];
                      let r = 1,
                        o = 2;
                      for (; r < e.length; ) {
                        let s = e[r];
                        if ("string" == typeof s)
                          2 === o
                            ? "" !== s && t.push(s, e[++r])
                            : 8 === o && n.push(s);
                        else {
                          if (!_t(o)) break;
                          o = s;
                        }
                        r++;
                      }
                      return { attrs: t, classes: n };
                    })(t.selectors[0]);
                    o && Nu(e, n, o),
                      s && s.length > 0 && Hp(e, n, s.join(" "));
                  }
                })(f, ct, p, r),
              void 0 !== n &&
                (function PS(e, t, n) {
                  const r = (e.projection = []);
                  for (let o = 0; o < t.length; o++) {
                    const s = n[o];
                    r.push(null != s ? Array.from(s) : null);
                  }
                })(Me, this.ngContentSelectors, n),
              (j = (function xS(e, t, n, r, o, s) {
                const i = Se(),
                  a = o[_],
                  u = Ge(i, o);
                Hg(a, o, i, n, null, r);
                for (let l = 0; l < n.length; l++)
                  Ae(Ln(o, a, i.directiveStart + l, i), o);
                Ug(a, o, i), u && Ae(u, o);
                const c = Ln(o, a, i.directiveStart + i.componentOffset, i);
                if (((e[de] = o[de] = c), null !== s))
                  for (const l of s) l(c, t);
                return Yc(a, i, e), c;
              })(Hk, ct, nr, ou, E, [FS])),
              ol(S, E, null);
          } finally {
            Gu();
          }
          return new TS(this.componentType, j, Rr(Me, E), E, Me);
        }
      }
      class TS extends I0 {
        constructor(t, n, r, o, s) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = s),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new IS(o)),
            (this.componentType = t);
        }
        setInput(t, n) {
          const r = this._tNode.inputs;
          let o;
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return;
            const s = this._rootLView;
            rl(s[_], s, o, t, n),
              this.previousInputValues.set(t, n),
              zo(nt(this._tNode.index, s));
          }
        }
        get injector() {
          return new Fe(this._tNode, this._rootLView);
        }
        destroy() {
          this.hostView.destroy();
        }
        onDestroy(t) {
          this.hostView.onDestroy(t);
        }
      }
      function FS() {
        const e = Se();
        ri(D()[_], e);
      }
      function Qi(e) {
        return (
          !!sl(e) &&
          (Array.isArray(e) || (!(e instanceof Map) && Symbol.iterator in e))
        );
      }
      function sl(e) {
        return null !== e && ("function" == typeof e || "object" == typeof e);
      }
      function Re(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0);
      }
      function rn(e, t, n, r, o, s, i, a) {
        const u = D(),
          c = z(),
          l = e + $,
          d = c.firstCreatePass
            ? (function lM(e, t, n, r, o, s, i, a, u) {
                const c = t.consts,
                  l = Or(t, e, 4, i || null, yn(c, a));
                Kc(t, n, l, yn(c, u)), ri(t, l);
                const d = (l.tView = Jc(
                  2,
                  l,
                  r,
                  o,
                  s,
                  t.directiveRegistry,
                  t.pipeRegistry,
                  null,
                  t.schemas,
                  c,
                  null
                ));
                return (
                  null !== t.queries &&
                    (t.queries.template(t, l),
                    (d.queries = t.queries.embeddedTView(l))),
                  l
                );
              })(l, c, u, t, n, r, o, s, i)
            : c.data[l];
        Lt(d, !1);
        const f = Cm(c, u, d, e);
        ni() && Ii(c, u, f, d),
          Ae(f, u),
          Gi(u, (u[l] = qg(f, u, f, d))),
          Xs(d) && Qc(c, u, d),
          null != i && Xc(u, d, a);
      }
      let Cm = function Em(e, t, n, r) {
        return Dn(!0), t[P].createComment("");
      };
      function Ze(e, t, n) {
        const r = D();
        return (
          Re(r, hr(), t) &&
            (function st(e, t, n, r, o, s, i, a) {
              const u = Ge(t, n);
              let l,
                c = t.inputs;
              !a && null != c && (l = c[r])
                ? (rl(e, n, l, r, o),
                  On(t) &&
                    (function oS(e, t) {
                      const n = nt(t, e);
                      16 & n[F] || (n[F] |= 64);
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function rS(e) {
                    return "class" === e
                      ? "className"
                      : "for" === e
                      ? "htmlFor"
                      : "formaction" === e
                      ? "formAction"
                      : "innerHtml" === e
                      ? "innerHTML"
                      : "readonly" === e
                      ? "readOnly"
                      : "tabindex" === e
                      ? "tabIndex"
                      : e;
                  })(r)),
                  (o = null != i ? i(o, t.value || "", r) : o),
                  s.setProperty(u, r, o));
            })(
              z(),
              (function ue() {
                const e = N.lFrame;
                return Mh(e.tView, e.selectedIndex);
              })(),
              r,
              e,
              t,
              r[P],
              n,
              !1
            ),
          Ze
        );
      }
      function fl(e, t, n, r, o) {
        const i = o ? "class" : "style";
        rl(e, n, t.inputs[i], i, r);
      }
      function V(e, t, n, r) {
        const o = D(),
          s = z(),
          i = $ + e,
          a = o[P],
          u = s.firstCreatePass
            ? (function gM(e, t, n, r, o, s) {
                const i = t.consts,
                  u = Or(t, e, 2, r, yn(i, o));
                return (
                  Kc(t, n, u, yn(i, s)),
                  null !== u.attrs && Wi(u, u.attrs, !1),
                  null !== u.mergedAttrs && Wi(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                );
              })(i, s, o, t, n, r)
            : s.data[i],
          c = bm(s, o, u, a, t, e);
        o[i] = c;
        const l = Xs(u);
        return (
          Lt(u, !0),
          Up(a, c, u),
          32 != (32 & u.flags) && ni() && Ii(s, o, c, u),
          0 ===
            (function XE() {
              return N.lFrame.elementDepthCount;
            })() && Ae(c, o),
          (function JE() {
            N.lFrame.elementDepthCount++;
          })(),
          l && (Qc(s, o, u), Yc(s, u, o)),
          null !== r && Xc(o, u),
          V
        );
      }
      function H() {
        let e = Se();
        $u()
          ? (function Vu() {
              N.lFrame.isParent = !1;
            })()
          : ((e = e.parent), Lt(e, !1));
        const t = e;
        (function eb(e) {
          return N.skipHydrationRootTNode === e;
        })(t) &&
          (function ob() {
            N.skipHydrationRootTNode = null;
          })(),
          (function KE() {
            N.lFrame.elementDepthCount--;
          })();
        const n = z();
        return (
          n.firstCreatePass && (ri(n, e), Ou(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Db(e) {
              return 0 != (8 & e.flags);
            })(t) &&
            fl(n, t, D(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function wb(e) {
              return 0 != (16 & e.flags);
            })(t) &&
            fl(n, t, D(), t.stylesWithoutHost, !1),
          H
        );
      }
      function ke(e, t, n, r) {
        return V(e, t, n, r), H(), ke;
      }
      let bm = (e, t, n, r, o, s) => (
        Dn(!0),
        Ci(
          r,
          o,
          (function zh() {
            return N.lFrame.currentNamespace;
          })()
        )
      );
      function Ko() {
        return D();
      }
      function ta(e) {
        return !!e && "function" == typeof e.then;
      }
      function Mm(e) {
        return !!e && "function" == typeof e.subscribe;
      }
      function Un(e, t, n, r) {
        const o = D(),
          s = z(),
          i = Se();
        return (
          (function Am(e, t, n, r, o, s, i) {
            const a = Xs(r),
              c =
                e.firstCreatePass &&
                (function Zg(e) {
                  return e.cleanup || (e.cleanup = []);
                })(e),
              l = t[de],
              d = (function Wg(e) {
                return e[ir] || (e[ir] = []);
              })(t);
            let f = !0;
            if (3 & r.type || i) {
              const g = Ge(r, t),
                v = i ? i(g) : g,
                y = d.length,
                m = i ? (E) => i(ne(E[r.index])) : r.index;
              let S = null;
              if (
                (!i &&
                  a &&
                  (S = (function _M(e, t, n, r) {
                    const o = e.cleanup;
                    if (null != o)
                      for (let s = 0; s < o.length - 1; s += 2) {
                        const i = o[s];
                        if (i === n && o[s + 1] === r) {
                          const a = t[ir],
                            u = o[s + 2];
                          return a.length > u ? a[u] : null;
                        }
                        "string" == typeof i && (s += 2);
                      }
                    return null;
                  })(e, t, o, r.index)),
                null !== S)
              )
                ((S.__ngLastListenerFn__ || S).__ngNextListenerFn__ = s),
                  (S.__ngLastListenerFn__ = s),
                  (f = !1);
              else {
                s = Nm(r, t, l, s, !1);
                const E = n.listen(v, o, s);
                d.push(s, E), c && c.push(o, m, y, y + 1);
              }
            } else s = Nm(r, t, l, s, !1);
            const h = r.outputs;
            let p;
            if (f && null !== h && (p = h[o])) {
              const g = p.length;
              if (g)
                for (let v = 0; v < g; v += 2) {
                  const j = t[p[v]][p[v + 1]].subscribe(s),
                    Me = d.length;
                  d.push(s, j), c && c.push(o, r.index, Me, -(Me + 1));
                }
            }
          })(s, o, o[P], i, e, t, r),
          Un
        );
      }
      function Rm(e, t, n, r) {
        try {
          return kt(6, t, n), !1 !== n(r);
        } catch (o) {
          return Qg(e, o), !1;
        } finally {
          kt(7, t, n);
        }
      }
      function Nm(e, t, n, r, o) {
        return function s(i) {
          if (i === Function) return r;
          zo(e.componentOffset > -1 ? nt(e.index, t) : t);
          let u = Rm(t, n, r, i),
            c = s.__ngNextListenerFn__;
          for (; c; ) (u = Rm(t, n, c, i) && u), (c = c.__ngNextListenerFn__);
          return o && !1 === u && i.preventDefault(), u;
        };
      }
      function Ye(e = 1) {
        return (function lb(e) {
          return (N.lFrame.contextLView = (function db(e, t) {
            for (; e > 0; ) (t = t[ur]), e--;
            return t;
          })(e, N.lFrame.contextLView))[de];
        })(e);
      }
      function na(e, t) {
        return (e << 17) | (t << 2);
      }
      function En(e) {
        return (e >> 17) & 32767;
      }
      function ml(e) {
        return 2 | e;
      }
      function zn(e) {
        return (131068 & e) >> 2;
      }
      function vl(e, t) {
        return (-131069 & e) | (t << 2);
      }
      function yl(e) {
        return 1 | e;
      }
      function Vm(e, t, n, r, o) {
        const s = e[n + 1],
          i = null === t;
        let a = r ? En(s) : zn(s),
          u = !1;
        for (; 0 !== a && (!1 === u || i); ) {
          const l = e[a + 1];
          RM(e[a], t) && ((u = !0), (e[a + 1] = r ? yl(l) : ml(l))),
            (a = r ? En(l) : zn(l));
        }
        u && (e[n + 1] = r ? ml(s) : yl(s));
      }
      function RM(e, t) {
        return (
          null === e ||
          null == t ||
          (Array.isArray(e) ? e[1] : e) === t ||
          (!(!Array.isArray(e) || "string" != typeof t) && _r(e, t) >= 0)
        );
      }
      function ra(e, t) {
        return (
          (function bt(e, t, n, r) {
            const o = D(),
              s = z(),
              i = (function Kt(e) {
                const t = N.lFrame,
                  n = t.bindingIndex;
                return (t.bindingIndex = t.bindingIndex + e), n;
              })(2);
            s.firstUpdatePass &&
              (function Qm(e, t, n, r) {
                const o = e.data;
                if (null === o[n + 1]) {
                  const s = o[Pe()],
                    i = (function Ym(e, t) {
                      return t >= e.expandoStartIndex;
                    })(e, n);
                  (function ev(e, t) {
                    return 0 != (e.flags & (t ? 8 : 16));
                  })(s, r) &&
                    null === t &&
                    !i &&
                    (t = !1),
                    (t = (function BM(e, t, n, r) {
                      const o = (function Uu(e) {
                        const t = N.lFrame.currentDirectiveIndex;
                        return -1 === t ? null : e[t];
                      })(e);
                      let s = r ? t.residualClasses : t.residualStyles;
                      if (null === o)
                        0 === (r ? t.classBindings : t.styleBindings) &&
                          ((n = es((n = Dl(null, e, t, n, r)), t.attrs, r)),
                          (s = null));
                      else {
                        const i = t.directiveStylingLast;
                        if (-1 === i || e[i] !== o)
                          if (((n = Dl(o, e, t, n, r)), null === s)) {
                            let u = (function $M(e, t, n) {
                              const r = n ? t.classBindings : t.styleBindings;
                              if (0 !== zn(r)) return e[En(r)];
                            })(e, t, r);
                            void 0 !== u &&
                              Array.isArray(u) &&
                              ((u = Dl(null, e, t, u[1], r)),
                              (u = es(u, t.attrs, r)),
                              (function VM(e, t, n, r) {
                                e[En(n ? t.classBindings : t.styleBindings)] =
                                  r;
                              })(e, t, r, u));
                          } else
                            s = (function HM(e, t, n) {
                              let r;
                              const o = t.directiveEnd;
                              for (
                                let s = 1 + t.directiveStylingLast;
                                s < o;
                                s++
                              )
                                r = es(r, e[s].hostAttrs, n);
                              return es(r, t.attrs, n);
                            })(e, t, r);
                      }
                      return (
                        void 0 !== s &&
                          (r
                            ? (t.residualClasses = s)
                            : (t.residualStyles = s)),
                        n
                      );
                    })(o, s, t, r)),
                    (function TM(e, t, n, r, o, s) {
                      let i = s ? t.classBindings : t.styleBindings,
                        a = En(i),
                        u = zn(i);
                      e[r] = n;
                      let l,
                        c = !1;
                      if (
                        (Array.isArray(n)
                          ? ((l = n[1]),
                            (null === l || _r(n, l) > 0) && (c = !0))
                          : (l = n),
                        o)
                      )
                        if (0 !== u) {
                          const f = En(e[a + 1]);
                          (e[r + 1] = na(f, a)),
                            0 !== f && (e[f + 1] = vl(e[f + 1], r)),
                            (e[a + 1] = (function SM(e, t) {
                              return (131071 & e) | (t << 17);
                            })(e[a + 1], r));
                        } else
                          (e[r + 1] = na(a, 0)),
                            0 !== a && (e[a + 1] = vl(e[a + 1], r)),
                            (a = r);
                      else
                        (e[r + 1] = na(u, 0)),
                          0 === a ? (a = r) : (e[u + 1] = vl(e[u + 1], r)),
                          (u = r);
                      c && (e[r + 1] = ml(e[r + 1])),
                        Vm(e, l, r, !0),
                        Vm(e, l, r, !1),
                        (function AM(e, t, n, r, o) {
                          const s = o ? e.residualClasses : e.residualStyles;
                          null != s &&
                            "string" == typeof t &&
                            _r(s, t) >= 0 &&
                            (n[r + 1] = yl(n[r + 1]));
                        })(t, l, e, r, s),
                        (i = na(a, u)),
                        s ? (t.classBindings = i) : (t.styleBindings = i);
                    })(o, s, t, n, i, r);
                }
              })(s, e, i, r),
              t !== k &&
                Re(o, i, t) &&
                (function Jm(e, t, n, r, o, s, i, a) {
                  if (!(3 & t.type)) return;
                  const u = e.data,
                    c = u[a + 1],
                    l = (function MM(e) {
                      return 1 == (1 & e);
                    })(c)
                      ? Km(u, t, n, o, zn(c), i)
                      : void 0;
                  oa(l) ||
                    (oa(s) ||
                      ((function IM(e) {
                        return 2 == (2 & e);
                      })(c) &&
                        (s = Km(u, null, n, o, a, i))),
                    (function NI(e, t, n, r, o) {
                      if (t) o ? e.addClass(n, r) : e.removeClass(n, r);
                      else {
                        let s = -1 === r.indexOf("-") ? void 0 : wn.DashCase;
                        null == o
                          ? e.removeStyle(n, r, s)
                          : ("string" == typeof o &&
                              o.endsWith("!important") &&
                              ((o = o.slice(0, -10)), (s |= wn.Important)),
                            e.setStyle(n, r, o, s));
                      }
                    })(r, i, ti(Pe(), n), o, s));
                })(
                  s,
                  s.data[Pe()],
                  o,
                  o[P],
                  e,
                  (o[i + 1] = (function GM(e, t) {
                    return (
                      null == e ||
                        "" === e ||
                        ("string" == typeof t
                          ? (e += t)
                          : "object" == typeof e && (e = ve(_n(e)))),
                      e
                    );
                  })(t, n)),
                  r,
                  i
                );
          })(e, t, null, !0),
          ra
        );
      }
      function Dl(e, t, n, r, o) {
        let s = null;
        const i = n.directiveEnd;
        let a = n.directiveStylingLast;
        for (
          -1 === a ? (a = n.directiveStart) : a++;
          a < i && ((s = t[a]), (r = es(r, s.hostAttrs, o)), s !== e);

        )
          a++;
        return null !== e && (n.directiveStylingLast = a), r;
      }
      function es(e, t, n) {
        const r = n ? 1 : 2;
        let o = -1;
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const i = t[s];
            "number" == typeof i
              ? (o = i)
              : o === r &&
                (Array.isArray(e) || (e = void 0 === e ? [] : ["", e]),
                rt(e, i, !!n || t[++s]));
          }
        return void 0 === e ? null : e;
      }
      function Km(e, t, n, r, o, s) {
        const i = null === t;
        let a;
        for (; o > 0; ) {
          const u = e[o],
            c = Array.isArray(u),
            l = c ? u[1] : u,
            d = null === l;
          let f = n[o + 1];
          f === k && (f = d ? q : void 0);
          let h = d ? tc(f, r) : l === r ? f : void 0;
          if ((c && !oa(h) && (h = tc(u, r)), oa(h) && ((a = h), i))) return a;
          const p = e[o + 1];
          o = i ? En(p) : zn(p);
        }
        if (null !== t) {
          let u = s ? t.residualClasses : t.residualStyles;
          null != u && (a = tc(u, r));
        }
        return a;
      }
      function oa(e) {
        return void 0 !== e;
      }
      function se(e, t = "") {
        const n = D(),
          r = z(),
          o = e + $,
          s = r.firstCreatePass ? Or(r, o, 1, t, null) : r.data[o],
          i = tv(r, n, s, t, e);
        (n[o] = i), ni() && Ii(r, n, i, s), Lt(s, !1);
      }
      let tv = (e, t, n, r, o) => (
        Dn(!0),
        (function _i(e, t) {
          return e.createText(t);
        })(t[P], r)
      );
      function zr(e) {
        return Qe("", e, ""), zr;
      }
      function Qe(e, t, n) {
        const r = D(),
          o = (function Fr(e, t, n, r) {
            return Re(e, hr(), n) ? t + O(n) + r : k;
          })(r, e, t, n);
        return (
          o !== k &&
            (function nn(e, t, n) {
              const r = ti(t, e);
              !(function Rp(e, t, n) {
                e.setValue(t, n);
              })(e[P], r, n);
            })(r, Pe(), o),
          Qe
        );
      }
      const Gr = "en-US";
      let Ev = Gr;
      class Gn {}
      class Yv {}
      class Sl extends Gn {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new nm(this));
          const o = tt(t);
          (this._bootstrapComponents = tn(o.bootstrap)),
            (this._r3Injector = Cg(
              t,
              n,
              [
                { provide: Gn, useValue: this },
                { provide: $i, useValue: this.componentFactoryResolver },
                ...r,
              ],
              ve(t),
              new Set(["environment"])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t));
        }
        get injector() {
          return this._r3Injector;
        }
        destroy() {
          const t = this._r3Injector;
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null);
        }
        onDestroy(t) {
          this.destroyCbs.push(t);
        }
      }
      class Ml extends Yv {
        constructor(t) {
          super(), (this.moduleType = t);
        }
        create(t) {
          return new Sl(this.moduleType, t, []);
        }
      }
      class Qv extends Gn {
        constructor(t) {
          super(),
            (this.componentFactoryResolver = new nm(this)),
            (this.instance = null);
          const n = new Oi(
            [
              ...t.providers,
              { provide: Gn, useValue: this },
              { provide: $i, useValue: this.componentFactoryResolver },
            ],
            t.parent || xi(),
            t.debugName,
            new Set(["environment"])
          );
          (this.injector = n),
            t.runEnvironmentInitializers && n.resolveInjectorInitializers();
        }
        destroy() {
          this.injector.destroy();
        }
        onDestroy(t) {
          this.injector.onDestroy(t);
        }
      }
      function Tl(e, t, n = null) {
        return new Qv({
          providers: e,
          parent: t,
          debugName: n,
          runEnvironmentInitializers: !0,
        }).injector;
      }
      let vA = (() => {
        var e;
        class t {
          constructor(r) {
            (this._injector = r), (this.cachedInjectors = new Map());
          }
          getOrCreateStandaloneInjector(r) {
            if (!r.standalone) return null;
            if (!this.cachedInjectors.has(r)) {
              const o = og(0, r.type),
                s =
                  o.length > 0
                    ? Tl([o], this._injector, `Standalone[${r.type.name}]`)
                    : null;
              this.cachedInjectors.set(r, s);
            }
            return this.cachedInjectors.get(r);
          }
          ngOnDestroy() {
            try {
              for (const r of this.cachedInjectors.values())
                null !== r && r.destroy();
            } finally {
              this.cachedInjectors.clear();
            }
          }
        }
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "environment",
            factory: () => new e(I(ot)),
          })),
          t
        );
      })();
      function Xv(e) {
        e.getStandaloneInjector = (t) =>
          t.get(vA).getOrCreateStandaloneInjector(e);
      }
      function oy(e, t, n, r, o) {
        return (function iy(e, t, n, r, o, s, i) {
          const a = t + n;
          return (function Hn(e, t, n, r) {
            const o = Re(e, t, n);
            return Re(e, t + 1, r) || o;
          })(e, a, o, s)
            ? (function $t(e, t, n) {
                return (e[t] = n);
              })(e, a + 2, i ? r.call(i, o, s) : r(o, s))
            : (function is(e, t) {
                const n = e[t];
                return n === k ? void 0 : n;
              })(e, a + 2);
        })(
          D(),
          (function Oe() {
            const e = N.lFrame;
            let t = e.bindingRootIndex;
            return (
              -1 === t && (t = e.bindingRootIndex = e.tView.bindingStartIndex),
              t
            );
          })(),
          e,
          t,
          n,
          r,
          o
        );
      }
      function Rl(e) {
        return (t) => {
          setTimeout(e, void 0, t);
        };
      }
      const je = class HA extends Gt {
        constructor(t = !1) {
          super(), (this.__isAsync = t);
        }
        emit(t) {
          super.next(t);
        }
        subscribe(t, n, r) {
          let o = t,
            s = n || (() => null),
            i = r;
          if (t && "object" == typeof t) {
            const u = t;
            (o = u.next?.bind(u)),
              (s = u.error?.bind(u)),
              (i = u.complete?.bind(u));
          }
          this.__isAsync && ((s = Rl(s)), o && (o = Rl(o)), i && (i = Rl(i)));
          const a = super.subscribe({ next: o, error: s, complete: i });
          return t instanceof lt && t.add(a), a;
        }
      };
      function qA(e, t, n, r = !0) {
        const o = t[_];
        if (
          ((function EI(e, t, n, r) {
            const o = Ie + r,
              s = n.length;
            r > 0 && (n[o - 1][Ct] = t),
              r < s - Ie
                ? ((t[Ct] = n[o]), ip(n, Ie + r, t))
                : (n.push(t), (t[Ct] = null)),
              (t[ie] = n);
            const i = t[wo];
            null !== i &&
              n !== i &&
              (function bI(e, t) {
                const n = e[lr];
                t[fe] !== t[ie][ie][fe] && (e[hh] = !0),
                  null === n ? (e[lr] = [t]) : n.push(t);
              })(i, t);
            const a = t[Ot];
            null !== a && a.insertView(e), (t[F] |= 128);
          })(o, t, e, n),
          r)
        ) {
          const s = mc(n, e),
            i = t[P],
            a = bi(i, e[Pt]);
          null !== a &&
            (function wI(e, t, n, r, o, s) {
              (r[le] = o), (r[Te] = t), ko(e, r, n, 1, o, s);
            })(o, e[Te], i, t, a, s);
        }
      }
      let on = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = ZA), t;
      })();
      const GA = on,
        WA = class extends GA {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r);
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null;
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n);
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function zA(e, t, n, r) {
              const o = t.tView,
                a = qi(
                  e,
                  o,
                  n,
                  4096 & e[F] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                );
              a[wo] = e[t.index];
              const c = e[Ot];
              return (
                null !== c && (a[Ot] = c.createEmbeddedView(o)), ol(o, a, n), a
              );
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            });
            return new Wo(o);
          }
        };
      function ZA() {
        return (function ca(e, t) {
          return 4 & e.type ? new WA(t, e, Rr(e, t)) : null;
        })(Se(), D());
      }
      let St = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = eR), t;
      })();
      function eR() {
        return (function my(e, t) {
          let n;
          const r = t[e.index];
          return (
            qe(r)
              ? (n = r)
              : ((n = qg(r, t, null, e)), (t[e.index] = n), Gi(t, n)),
            vy(n, t, e, r),
            new py(n, e, t)
          );
        })(Se(), D());
      }
      const tR = St,
        py = class extends tR {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r);
          }
          get element() {
            return Rr(this._hostTNode, this._hostLView);
          }
          get injector() {
            return new Fe(this._hostTNode, this._hostLView);
          }
          get parentInjector() {
            const t = ui(this._hostTNode, this._hostLView);
            if (Yu(t)) {
              const n = To(t, this._hostLView),
                r = Mo(t);
              return new Fe(n[_].data[r + 8], n);
            }
            return new Fe(null, this._hostLView);
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1);
          }
          get(t) {
            const n = gy(this._lContainer);
            return (null !== n && n[t]) || null;
          }
          get length() {
            return this._lContainer.length - Ie;
          }
          createEmbeddedView(t, n, r) {
            let o, s;
            "number" == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (s = r.injector));
            const a = t.createEmbeddedViewImpl(n || {}, s, null);
            return this.insertImpl(a, o, false), a;
          }
          createComponent(t, n, r, o, s) {
            const i =
              t &&
              !(function Ro(e) {
                return "function" == typeof e;
              })(t);
            let a;
            if (i) a = n;
            else {
              const g = n || {};
              (a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (s = g.environmentInjector || g.ngModuleRef);
            }
            const u = i ? t : new Zo(U(t)),
              c = r || this.parentInjector;
            if (!s && null == u.ngModule) {
              const v = (i ? c : this.parentInjector).get(ot, null);
              v && (s = v);
            }
            U(u.componentType ?? {});
            const h = u.create(c, o, null, s);
            return this.insertImpl(h.hostView, a, false), h;
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1);
          }
          insertImpl(t, n, r) {
            const o = t._lView;
            if (
              (function ZE(e) {
                return qe(e[ie]);
              })(o)
            ) {
              const u = this.indexOf(t);
              if (-1 !== u) this.detach(u);
              else {
                const c = o[ie],
                  l = new py(c, c[Te], c[ie]);
                l.detach(l.indexOf(t));
              }
            }
            const i = this._adjustIndex(n),
              a = this._lContainer;
            return (
              qA(a, o, i, !r), t.attachToViewContainerRef(), ip(xl(a), i, t), t
            );
          }
          move(t, n) {
            return this.insert(t, n);
          }
          indexOf(t) {
            const n = gy(this._lContainer);
            return null !== n ? n.indexOf(t) : -1;
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = Ei(this._lContainer, n);
            r && (di(xl(this._lContainer), n), fc(r[_], r));
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = Ei(this._lContainer, n);
            return r && null != di(xl(this._lContainer), n) ? new Wo(r) : null;
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n;
          }
        };
      function gy(e) {
        return e[8];
      }
      function xl(e) {
        return e[8] || (e[8] = []);
      }
      let vy = function yy(e, t, n, r) {
        if (e[Pt]) return;
        let o;
        (o =
          8 & n.type
            ? ne(r)
            : (function nR(e, t) {
                const n = e[P],
                  r = n.createComment(""),
                  o = Ge(t, e);
                return (
                  jn(
                    n,
                    bi(n, o),
                    r,
                    (function TI(e, t) {
                      return e.nextSibling(t);
                    })(n, o),
                    !1
                  ),
                  r
                );
              })(t, n)),
          (e[Pt] = o);
      };
      const Ul = new b("Application Initializer");
      let zl = (() => {
          var e;
          class t {
            constructor() {
              (this.initialized = !1),
                (this.done = !1),
                (this.donePromise = new Promise((r, o) => {
                  (this.resolve = r), (this.reject = o);
                })),
                (this.appInits = C(Ul, { optional: !0 }) ?? []);
            }
            runInitializers() {
              if (this.initialized) return;
              const r = [];
              for (const s of this.appInits) {
                const i = s();
                if (ta(i)) r.push(i);
                else if (Mm(i)) {
                  const a = new Promise((u, c) => {
                    i.subscribe({ complete: u, error: c });
                  });
                  r.push(a);
                }
              }
              const o = () => {
                (this.done = !0), this.resolve();
              };
              Promise.all(r)
                .then(() => {
                  o();
                })
                .catch((s) => {
                  this.reject(s);
                }),
                0 === r.length && o(),
                (this.initialized = !0);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Uy = (() => {
          var e;
          class t {
            log(r) {
              console.log(r);
            }
            warn(r) {
              console.warn(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })();
      const sn = new b("LocaleId", {
        providedIn: "root",
        factory: () =>
          C(sn, B.Optional | B.SkipSelf) ||
          (function OR() {
            return (typeof $localize < "u" && $localize.locale) || Gr;
          })(),
      });
      let fa = (() => {
        var e;
        class t {
          constructor() {
            (this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new dt(!1));
          }
          add() {
            this.hasPendingTasks.next(!0);
            const r = this.taskId++;
            return this.pendingTasks.add(r), r;
          }
          remove(r) {
            this.pendingTasks.delete(r),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1);
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class kR {
        constructor(t, n) {
          (this.ngModuleFactory = t), (this.componentFactories = n);
        }
      }
      let zy = (() => {
        var e;
        class t {
          compileModuleSync(r) {
            return new Ml(r);
          }
          compileModuleAsync(r) {
            return Promise.resolve(this.compileModuleSync(r));
          }
          compileModuleAndAllComponentsSync(r) {
            const o = this.compileModuleSync(r),
              i = tn(tt(r).declarations).reduce((a, u) => {
                const c = U(u);
                return c && a.push(new Zo(c)), a;
              }, []);
            return new kR(o, i);
          }
          compileModuleAndAllComponentsAsync(r) {
            return Promise.resolve(this.compileModuleAndAllComponentsSync(r));
          }
          clearCache() {}
          clearCacheFor(r) {}
          getModuleId(r) {}
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function Zy(...e) {}
      class ae {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new je(!1)),
            (this.onMicrotaskEmpty = new je(!1)),
            (this.onStable = new je(!1)),
            (this.onError = new je(!1)),
            typeof Zone > "u")
          )
            throw new w(908, !1);
          Zone.assertZonePatched();
          const o = this;
          (o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function n1() {
              const e = "function" == typeof ee.requestAnimationFrame;
              let t = ee[e ? "requestAnimationFrame" : "setTimeout"],
                n = ee[e ? "cancelAnimationFrame" : "clearTimeout"];
              if (typeof Zone < "u" && t && n) {
                const r = t[Zone.__symbol__("OriginalDelegate")];
                r && (t = r);
                const o = n[Zone.__symbol__("OriginalDelegate")];
                o && (n = o);
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              };
            })().nativeRequestAnimationFrame),
            (function s1(e) {
              const t = () => {
                !(function o1(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(ee, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            "fakeTopEventTask",
                            () => {
                              (e.lastRequestAnimationFrameId = -1),
                                Zl(e),
                                (e.isCheckStableRunning = !0),
                                Wl(e),
                                (e.isCheckStableRunning = !1);
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke();
                      })),
                    Zl(e));
                })(e);
              };
              e._inner = e._inner.fork({
                name: "angular",
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, s, i, a) => {
                  try {
                    return Yy(e), n.invokeTask(o, s, i, a);
                  } finally {
                    ((e.shouldCoalesceEventChangeDetection &&
                      "eventTask" === s.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      Qy(e);
                  }
                },
                onInvoke: (n, r, o, s, i, a, u) => {
                  try {
                    return Yy(e), n.invoke(o, s, i, a, u);
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), Qy(e);
                  }
                },
                onHasTask: (n, r, o, s) => {
                  n.hasTask(o, s),
                    r === o &&
                      ("microTask" == s.change
                        ? ((e._hasPendingMicrotasks = s.microTask),
                          Zl(e),
                          Wl(e))
                        : "macroTask" == s.change &&
                          (e.hasPendingMacrotasks = s.macroTask));
                },
                onHandleError: (n, r, o, s) => (
                  n.handleError(o, s),
                  e.runOutsideAngular(() => e.onError.emit(s)),
                  !1
                ),
              });
            })(o);
        }
        static isInAngularZone() {
          return typeof Zone < "u" && !0 === Zone.current.get("isAngularZone");
        }
        static assertInAngularZone() {
          if (!ae.isInAngularZone()) throw new w(909, !1);
        }
        static assertNotInAngularZone() {
          if (ae.isInAngularZone()) throw new w(909, !1);
        }
        run(t, n, r) {
          return this._inner.run(t, n, r);
        }
        runTask(t, n, r, o) {
          const s = this._inner,
            i = s.scheduleEventTask("NgZoneEvent: " + o, t, r1, Zy, Zy);
          try {
            return s.runTask(i, n, r);
          } finally {
            s.cancelTask(i);
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r);
        }
        runOutsideAngular(t) {
          return this._outer.run(t);
        }
      }
      const r1 = {};
      function Wl(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null);
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null));
              } finally {
                e.isStable = !0;
              }
          }
      }
      function Zl(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        );
      }
      function Yy(e) {
        e._nesting++,
          e.isStable && ((e.isStable = !1), e.onUnstable.emit(null));
      }
      function Qy(e) {
        e._nesting--, Wl(e);
      }
      class i1 {
        constructor() {
          (this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new je()),
            (this.onMicrotaskEmpty = new je()),
            (this.onStable = new je()),
            (this.onError = new je());
        }
        run(t, n, r) {
          return t.apply(n, r);
        }
        runGuarded(t, n, r) {
          return t.apply(n, r);
        }
        runOutsideAngular(t) {
          return t();
        }
        runTask(t, n, r, o) {
          return t.apply(n, r);
        }
      }
      const Xy = new b("", { providedIn: "root", factory: Jy });
      function Jy() {
        const e = C(ae);
        let t = !0;
        return (function UC(...e) {
          const t = ho(e),
            n = (function kC(e, t) {
              return "number" == typeof pu(e) ? e.pop() : t;
            })(e, 1 / 0),
            r = e;
          return r.length ? (1 === r.length ? yt(r[0]) : rr(n)(ge(r, t))) : Rt;
        })(
          new pe((o) => {
            (t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete();
              });
          }),
          new pe((o) => {
            let s;
            e.runOutsideAngular(() => {
              s = e.onStable.subscribe(() => {
                ae.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0));
                  });
              });
            });
            const i = e.onUnstable.subscribe(() => {
              ae.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1);
                  }));
            });
            return () => {
              s.unsubscribe(), i.unsubscribe();
            };
          }).pipe(Uf())
        );
      }
      const Ky = new b(""),
        pa = new b("");
      let Xl,
        Yl = (() => {
          var e;
          class t {
            constructor(r, o, s) {
              (this._ngZone = r),
                (this.registry = o),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                Xl ||
                  ((function a1(e) {
                    Xl = e;
                  })(s),
                  s.addToWindow(o)),
                this._watchAngularEvents(),
                r.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > "u"
                      ? null
                      : Zone.current.get("TaskTrackingZone");
                });
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  (this._didWork = !0), (this._isZoneStable = !1);
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      ae.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          (this._isZoneStable = !0),
                            this._runCallbacksIfReady();
                        });
                    },
                  });
                });
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              );
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error("pending async requests below zero");
              return this._runCallbacksIfReady(), this._pendingCount;
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              );
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let r = this._callbacks.pop();
                    clearTimeout(r.timeoutId), r.doneCb(this._didWork);
                  }
                  this._didWork = !1;
                });
              else {
                let r = this.getPendingTasks();
                (this._callbacks = this._callbacks.filter(
                  (o) =>
                    !o.updateCb ||
                    !o.updateCb(r) ||
                    (clearTimeout(o.timeoutId), !1)
                )),
                  (this._didWork = !0);
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((r) => ({
                    source: r.source,
                    creationLocation: r.creationLocation,
                    data: r.data,
                  }))
                : [];
            }
            addCallback(r, o, s) {
              let i = -1;
              o &&
                o > 0 &&
                (i = setTimeout(() => {
                  (this._callbacks = this._callbacks.filter(
                    (a) => a.timeoutId !== i
                  )),
                    r(this._didWork, this.getPendingTasks());
                }, o)),
                this._callbacks.push({ doneCb: r, timeoutId: i, updateCb: s });
            }
            whenStable(r, o, s) {
              if (s && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                );
              this.addCallback(r, o, s), this._runCallbacksIfReady();
            }
            getPendingRequestCount() {
              return this._pendingCount;
            }
            registerApplication(r) {
              this.registry.registerApplication(r, this);
            }
            unregisterApplication(r) {
              this.registry.unregisterApplication(r);
            }
            findProviders(r, o, s) {
              return [];
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(ae), I(Ql), I(pa));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Ql = (() => {
          var e;
          class t {
            constructor() {
              this._applications = new Map();
            }
            registerApplication(r, o) {
              this._applications.set(r, o);
            }
            unregisterApplication(r) {
              this._applications.delete(r);
            }
            unregisterAllApplications() {
              this._applications.clear();
            }
            getTestability(r) {
              return this._applications.get(r) || null;
            }
            getAllTestabilities() {
              return Array.from(this._applications.values());
            }
            getAllRootElements() {
              return Array.from(this._applications.keys());
            }
            findTestabilityInTree(r, o = !0) {
              return Xl?.findTestabilityInTree(this, r, o) ?? null;
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: e.ɵfac,
              providedIn: "platform",
            })),
            t
          );
        })(),
        bn = null;
      const eD = new b("AllowMultipleToken"),
        Jl = new b("PlatformDestroyListeners"),
        Kl = new b("appBootstrapListener");
      class nD {
        constructor(t, n) {
          (this.name = t), (this.token = n);
        }
      }
      function oD(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new b(r);
        return (s = []) => {
          let i = ed();
          if (!i || i.injector.get(eD, !1)) {
            const a = [...n, ...s, { provide: o, useValue: !0 }];
            e
              ? e(a)
              : (function l1(e) {
                  if (bn && !bn.get(eD, !1)) throw new w(400, !1);
                  (function tD() {
                    !(function kE(e) {
                      Dh = e;
                    })(() => {
                      throw new w(600, !1);
                    });
                  })(),
                    (bn = e);
                  const t = e.get(iD);
                  (function rD(e) {
                    e.get(cg, null)?.forEach((n) => n());
                  })(e);
                })(
                  (function sD(e = [], t) {
                    return pt.create({
                      name: t,
                      providers: [
                        { provide: Rc, useValue: "platform" },
                        { provide: Jl, useValue: new Set([() => (bn = null)]) },
                        ...e,
                      ],
                    });
                  })(a, r)
                );
          }
          return (function f1(e) {
            const t = ed();
            if (!t) throw new w(401, !1);
            return t;
          })();
        };
      }
      function ed() {
        return bn?.get(iD) ?? null;
      }
      let iD = (() => {
        var e;
        class t {
          constructor(r) {
            (this._injector = r),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1);
          }
          bootstrapModuleFactory(r, o) {
            const s = (function h1(e = "zone.js", t) {
              return "noop" === e ? new i1() : "zone.js" === e ? new ae(t) : e;
            })(
              o?.ngZone,
              (function aD(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                };
              })({
                eventCoalescing: o?.ngZoneEventCoalescing,
                runCoalescing: o?.ngZoneRunCoalescing,
              })
            );
            return s.run(() => {
              const i = (function mA(e, t, n) {
                  return new Sl(e, t, n);
                })(
                  r.moduleType,
                  this.injector,
                  (function fD(e) {
                    return [
                      { provide: ae, useFactory: e },
                      {
                        provide: $o,
                        multi: !0,
                        useFactory: () => {
                          const t = C(g1, { optional: !0 });
                          return () => t.initialize();
                        },
                      },
                      { provide: dD, useFactory: p1 },
                      { provide: Xy, useFactory: Jy },
                    ];
                  })(() => s)
                ),
                a = i.injector.get(Vn, null);
              return (
                s.runOutsideAngular(() => {
                  const u = s.onError.subscribe({
                    next: (c) => {
                      a.handleError(c);
                    },
                  });
                  i.onDestroy(() => {
                    ga(this._modules, i), u.unsubscribe();
                  });
                }),
                (function uD(e, t, n) {
                  try {
                    const r = n();
                    return ta(r)
                      ? r.catch((o) => {
                          throw (
                            (t.runOutsideAngular(() => e.handleError(o)), o)
                          );
                        })
                      : r;
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r);
                  }
                })(a, s, () => {
                  const u = i.injector.get(zl);
                  return (
                    u.runInitializers(),
                    u.donePromise.then(
                      () => (
                        (function bv(e) {
                          ft(e, "Expected localeId to be defined"),
                            "string" == typeof e &&
                              (Ev = e.toLowerCase().replace(/_/g, "-"));
                        })(i.injector.get(sn, Gr) || Gr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  );
                })
              );
            });
          }
          bootstrapModule(r, o = []) {
            const s = cD({}, o);
            return (function u1(e, t, n) {
              const r = new Ml(n);
              return Promise.resolve(r);
            })(0, 0, r).then((i) => this.bootstrapModuleFactory(i, s));
          }
          _moduleDoBootstrap(r) {
            const o = r.injector.get(Yr);
            if (r._bootstrapComponents.length > 0)
              r._bootstrapComponents.forEach((s) => o.bootstrap(s));
            else {
              if (!r.instance.ngDoBootstrap) throw new w(-403, !1);
              r.instance.ngDoBootstrap(o);
            }
            this._modules.push(r);
          }
          onDestroy(r) {
            this._destroyListeners.push(r);
          }
          get injector() {
            return this._injector;
          }
          destroy() {
            if (this._destroyed) throw new w(404, !1);
            this._modules.slice().forEach((o) => o.destroy()),
              this._destroyListeners.forEach((o) => o());
            const r = this._injector.get(Jl, null);
            r && (r.forEach((o) => o()), r.clear()), (this._destroyed = !0);
          }
          get destroyed() {
            return this._destroyed;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(pt));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "platform" })),
          t
        );
      })();
      function cD(e, t) {
        return Array.isArray(t) ? t.reduce(cD, e) : { ...e, ...t };
      }
      let Yr = (() => {
        var e;
        class t {
          constructor() {
            (this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = C(dD)),
              (this.zoneIsStable = C(Xy)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = C(fa).hasPendingTasks.pipe(
                Dt((r) => (r ? A(!1) : this.zoneIsStable)),
                (function zC(e, t = hn) {
                  return (
                    (e = e ?? qC),
                    we((n, r) => {
                      let o,
                        s = !0;
                      n.subscribe(
                        _e(r, (i) => {
                          const a = t(i);
                          (s || !e(o, a)) && ((s = !1), (o = a), r.next(i));
                        })
                      );
                    })
                  );
                })(),
                Uf()
              )),
              (this._injector = C(ot));
          }
          get destroyed() {
            return this._destroyed;
          }
          get injector() {
            return this._injector;
          }
          bootstrap(r, o) {
            const s = r instanceof gg;
            if (!this._injector.get(zl).done)
              throw (
                (!s &&
                  (function sr(e) {
                    const t = U(e) || be(e) || xe(e);
                    return null !== t && t.standalone;
                  })(r),
                new w(405, !1))
              );
            let a;
            (a = s ? r : this._injector.get($i).resolveComponentFactory(r)),
              this.componentTypes.push(a.componentType);
            const u = (function c1(e) {
                return e.isBoundToModule;
              })(a)
                ? void 0
                : this._injector.get(Gn),
              l = a.create(pt.NULL, [], o || a.selector, u),
              d = l.location.nativeElement,
              f = l.injector.get(Ky, null);
            return (
              f?.registerApplication(d),
              l.onDestroy(() => {
                this.detachView(l.hostView),
                  ga(this.components, l),
                  f?.unregisterApplication(d);
              }),
              this._loadComponent(l),
              l
            );
          }
          tick() {
            if (this._runningTick) throw new w(101, !1);
            try {
              this._runningTick = !0;
              for (let r of this._views) r.detectChanges();
            } catch (r) {
              this.internalErrorHandler(r);
            } finally {
              this._runningTick = !1;
            }
          }
          attachView(r) {
            const o = r;
            this._views.push(o), o.attachToAppRef(this);
          }
          detachView(r) {
            const o = r;
            ga(this._views, o), o.detachFromAppRef();
          }
          _loadComponent(r) {
            this.attachView(r.hostView), this.tick(), this.components.push(r);
            const o = this._injector.get(Kl, []);
            o.push(...this._bootstrapListeners), o.forEach((s) => s(r));
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((r) => r()),
                  this._views.slice().forEach((r) => r.destroy());
              } finally {
                (this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = []);
              }
          }
          onDestroy(r) {
            return (
              this._destroyListeners.push(r),
              () => ga(this._destroyListeners, r)
            );
          }
          destroy() {
            if (this._destroyed) throw new w(406, !1);
            const r = this._injector;
            r.destroy && !r.destroyed && r.destroy();
          }
          get viewCount() {
            return this._views.length;
          }
          warnIfDestroyed() {}
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function ga(e, t) {
        const n = e.indexOf(t);
        n > -1 && e.splice(n, 1);
      }
      const dD = new b("", {
        providedIn: "root",
        factory: () => C(Vn).handleError.bind(void 0),
      });
      function p1() {
        const e = C(ae),
          t = C(Vn);
        return (n) => e.runOutsideAngular(() => t.handleError(n));
      }
      let g1 = (() => {
        var e;
        class t {
          constructor() {
            (this.zone = C(ae)), (this.applicationRef = C(Yr));
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick();
                    });
                  },
                }));
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      let td = (() => {
        class t {}
        return (t.__NG_ELEMENT_ID__ = v1), t;
      })();
      function v1(e) {
        return (function y1(e, t, n) {
          if (On(e) && !n) {
            const r = nt(e.index, t);
            return new Wo(r, r);
          }
          return 47 & e.type ? new Wo(t[fe], t) : null;
        })(Se(), D(), 16 == (16 & e));
      }
      class mD {
        constructor() {}
        supports(t) {
          return Qi(t);
        }
        create(t) {
          return new b1(t);
        }
      }
      const E1 = (e, t) => t;
      class b1 {
        constructor(t) {
          (this.length = 0),
            (this._linkedRecords = null),
            (this._unlinkedRecords = null),
            (this._previousItHead = null),
            (this._itHead = null),
            (this._itTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._movesHead = null),
            (this._movesTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null),
            (this._identityChangesHead = null),
            (this._identityChangesTail = null),
            (this._trackByFn = t || E1);
        }
        forEachItem(t) {
          let n;
          for (n = this._itHead; null !== n; n = n._next) t(n);
        }
        forEachOperation(t) {
          let n = this._itHead,
            r = this._removalsHead,
            o = 0,
            s = null;
          for (; n || r; ) {
            const i = !r || (n && n.currentIndex < yD(r, o, s)) ? n : r,
              a = yD(i, o, s),
              u = i.currentIndex;
            if (i === r) o--, (r = r._nextRemoved);
            else if (((n = n._next), null == i.previousIndex)) o++;
            else {
              s || (s = []);
              const c = a - o,
                l = u - o;
              if (c != l) {
                for (let f = 0; f < c; f++) {
                  const h = f < s.length ? s[f] : (s[f] = 0),
                    p = h + f;
                  l <= p && p < c && (s[f] = h + 1);
                }
                s[i.previousIndex] = l - c;
              }
            }
            a !== u && t(i, a, u);
          }
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousItHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachMovedItem(t) {
          let n;
          for (n = this._movesHead; null !== n; n = n._nextMoved) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        forEachIdentityChange(t) {
          let n;
          for (
            n = this._identityChangesHead;
            null !== n;
            n = n._nextIdentityChange
          )
            t(n);
        }
        diff(t) {
          if ((null == t && (t = []), !Qi(t))) throw new w(900, !1);
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let o,
            s,
            i,
            n = this._itHead,
            r = !1;
          if (Array.isArray(t)) {
            this.length = t.length;
            for (let a = 0; a < this.length; a++)
              (s = t[a]),
                (i = this._trackByFn(a, s)),
                null !== n && Object.is(n.trackById, i)
                  ? (r && (n = this._verifyReinsertion(n, s, i, a)),
                    Object.is(n.item, s) || this._addIdentityChange(n, s))
                  : ((n = this._mismatch(n, s, i, a)), (r = !0)),
                (n = n._next);
          } else
            (o = 0),
              (function GS(e, t) {
                if (Array.isArray(e))
                  for (let n = 0; n < e.length; n++) t(e[n]);
                else {
                  const n = e[Symbol.iterator]();
                  let r;
                  for (; !(r = n.next()).done; ) t(r.value);
                }
              })(t, (a) => {
                (i = this._trackByFn(o, a)),
                  null !== n && Object.is(n.trackById, i)
                    ? (r && (n = this._verifyReinsertion(n, a, i, o)),
                      Object.is(n.item, a) || this._addIdentityChange(n, a))
                    : ((n = this._mismatch(n, a, i, o)), (r = !0)),
                  (n = n._next),
                  o++;
              }),
              (this.length = o);
          return this._truncate(n), (this.collection = t), this.isDirty;
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._movesHead ||
            null !== this._removalsHead ||
            null !== this._identityChangesHead
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              t = this._previousItHead = this._itHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._additionsHead; null !== t; t = t._nextAdded)
              t.previousIndex = t.currentIndex;
            for (
              this._additionsHead = this._additionsTail = null,
                t = this._movesHead;
              null !== t;
              t = t._nextMoved
            )
              t.previousIndex = t.currentIndex;
            (this._movesHead = this._movesTail = null),
              (this._removalsHead = this._removalsTail = null),
              (this._identityChangesHead = this._identityChangesTail = null);
          }
        }
        _mismatch(t, n, r, o) {
          let s;
          return (
            null === t ? (s = this._itTail) : ((s = t._prev), this._remove(t)),
            null !==
            (t =
              null === this._unlinkedRecords
                ? null
                : this._unlinkedRecords.get(r, null))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._reinsertAfter(t, s, o))
              : null !==
                (t =
                  null === this._linkedRecords
                    ? null
                    : this._linkedRecords.get(r, o))
              ? (Object.is(t.item, n) || this._addIdentityChange(t, n),
                this._moveAfter(t, s, o))
              : (t = this._addAfter(new I1(n, r), s, o)),
            t
          );
        }
        _verifyReinsertion(t, n, r, o) {
          let s =
            null === this._unlinkedRecords
              ? null
              : this._unlinkedRecords.get(r, null);
          return (
            null !== s
              ? (t = this._reinsertAfter(s, t._prev, o))
              : t.currentIndex != o &&
                ((t.currentIndex = o), this._addToMoves(t, o)),
            t
          );
        }
        _truncate(t) {
          for (; null !== t; ) {
            const n = t._next;
            this._addToRemovals(this._unlink(t)), (t = n);
          }
          null !== this._unlinkedRecords && this._unlinkedRecords.clear(),
            null !== this._additionsTail &&
              (this._additionsTail._nextAdded = null),
            null !== this._movesTail && (this._movesTail._nextMoved = null),
            null !== this._itTail && (this._itTail._next = null),
            null !== this._removalsTail &&
              (this._removalsTail._nextRemoved = null),
            null !== this._identityChangesTail &&
              (this._identityChangesTail._nextIdentityChange = null);
        }
        _reinsertAfter(t, n, r) {
          null !== this._unlinkedRecords && this._unlinkedRecords.remove(t);
          const o = t._prevRemoved,
            s = t._nextRemoved;
          return (
            null === o ? (this._removalsHead = s) : (o._nextRemoved = s),
            null === s ? (this._removalsTail = o) : (s._prevRemoved = o),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _moveAfter(t, n, r) {
          return (
            this._unlink(t),
            this._insertAfter(t, n, r),
            this._addToMoves(t, r),
            t
          );
        }
        _addAfter(t, n, r) {
          return (
            this._insertAfter(t, n, r),
            (this._additionsTail =
              null === this._additionsTail
                ? (this._additionsHead = t)
                : (this._additionsTail._nextAdded = t)),
            t
          );
        }
        _insertAfter(t, n, r) {
          const o = null === n ? this._itHead : n._next;
          return (
            (t._next = o),
            (t._prev = n),
            null === o ? (this._itTail = t) : (o._prev = t),
            null === n ? (this._itHead = t) : (n._next = t),
            null === this._linkedRecords && (this._linkedRecords = new vD()),
            this._linkedRecords.put(t),
            (t.currentIndex = r),
            t
          );
        }
        _remove(t) {
          return this._addToRemovals(this._unlink(t));
        }
        _unlink(t) {
          null !== this._linkedRecords && this._linkedRecords.remove(t);
          const n = t._prev,
            r = t._next;
          return (
            null === n ? (this._itHead = r) : (n._next = r),
            null === r ? (this._itTail = n) : (r._prev = n),
            t
          );
        }
        _addToMoves(t, n) {
          return (
            t.previousIndex === n ||
              (this._movesTail =
                null === this._movesTail
                  ? (this._movesHead = t)
                  : (this._movesTail._nextMoved = t)),
            t
          );
        }
        _addToRemovals(t) {
          return (
            null === this._unlinkedRecords &&
              (this._unlinkedRecords = new vD()),
            this._unlinkedRecords.put(t),
            (t.currentIndex = null),
            (t._nextRemoved = null),
            null === this._removalsTail
              ? ((this._removalsTail = this._removalsHead = t),
                (t._prevRemoved = null))
              : ((t._prevRemoved = this._removalsTail),
                (this._removalsTail = this._removalsTail._nextRemoved = t)),
            t
          );
        }
        _addIdentityChange(t, n) {
          return (
            (t.item = n),
            (this._identityChangesTail =
              null === this._identityChangesTail
                ? (this._identityChangesHead = t)
                : (this._identityChangesTail._nextIdentityChange = t)),
            t
          );
        }
      }
      class I1 {
        constructor(t, n) {
          (this.item = t),
            (this.trackById = n),
            (this.currentIndex = null),
            (this.previousIndex = null),
            (this._nextPrevious = null),
            (this._prev = null),
            (this._next = null),
            (this._prevDup = null),
            (this._nextDup = null),
            (this._prevRemoved = null),
            (this._nextRemoved = null),
            (this._nextAdded = null),
            (this._nextMoved = null),
            (this._nextIdentityChange = null);
        }
      }
      class S1 {
        constructor() {
          (this._head = null), (this._tail = null);
        }
        add(t) {
          null === this._head
            ? ((this._head = this._tail = t),
              (t._nextDup = null),
              (t._prevDup = null))
            : ((this._tail._nextDup = t),
              (t._prevDup = this._tail),
              (t._nextDup = null),
              (this._tail = t));
        }
        get(t, n) {
          let r;
          for (r = this._head; null !== r; r = r._nextDup)
            if (
              (null === n || n <= r.currentIndex) &&
              Object.is(r.trackById, t)
            )
              return r;
          return null;
        }
        remove(t) {
          const n = t._prevDup,
            r = t._nextDup;
          return (
            null === n ? (this._head = r) : (n._nextDup = r),
            null === r ? (this._tail = n) : (r._prevDup = n),
            null === this._head
          );
        }
      }
      class vD {
        constructor() {
          this.map = new Map();
        }
        put(t) {
          const n = t.trackById;
          let r = this.map.get(n);
          r || ((r = new S1()), this.map.set(n, r)), r.add(t);
        }
        get(t, n) {
          const o = this.map.get(t);
          return o ? o.get(t, n) : null;
        }
        remove(t) {
          const n = t.trackById;
          return this.map.get(n).remove(t) && this.map.delete(n), t;
        }
        get isEmpty() {
          return 0 === this.map.size;
        }
        clear() {
          this.map.clear();
        }
      }
      function yD(e, t, n) {
        const r = e.previousIndex;
        if (null === r) return r;
        let o = 0;
        return n && r < n.length && (o = n[r]), r + t + o;
      }
      class DD {
        constructor() {}
        supports(t) {
          return t instanceof Map || sl(t);
        }
        create() {
          return new M1();
        }
      }
      class M1 {
        constructor() {
          (this._records = new Map()),
            (this._mapHead = null),
            (this._appendAfter = null),
            (this._previousMapHead = null),
            (this._changesHead = null),
            (this._changesTail = null),
            (this._additionsHead = null),
            (this._additionsTail = null),
            (this._removalsHead = null),
            (this._removalsTail = null);
        }
        get isDirty() {
          return (
            null !== this._additionsHead ||
            null !== this._changesHead ||
            null !== this._removalsHead
          );
        }
        forEachItem(t) {
          let n;
          for (n = this._mapHead; null !== n; n = n._next) t(n);
        }
        forEachPreviousItem(t) {
          let n;
          for (n = this._previousMapHead; null !== n; n = n._nextPrevious) t(n);
        }
        forEachChangedItem(t) {
          let n;
          for (n = this._changesHead; null !== n; n = n._nextChanged) t(n);
        }
        forEachAddedItem(t) {
          let n;
          for (n = this._additionsHead; null !== n; n = n._nextAdded) t(n);
        }
        forEachRemovedItem(t) {
          let n;
          for (n = this._removalsHead; null !== n; n = n._nextRemoved) t(n);
        }
        diff(t) {
          if (t) {
            if (!(t instanceof Map || sl(t))) throw new w(900, !1);
          } else t = new Map();
          return this.check(t) ? this : null;
        }
        onDestroy() {}
        check(t) {
          this._reset();
          let n = this._mapHead;
          if (
            ((this._appendAfter = null),
            this._forEach(t, (r, o) => {
              if (n && n.key === o)
                this._maybeAddToChanges(n, r),
                  (this._appendAfter = n),
                  (n = n._next);
              else {
                const s = this._getOrCreateRecordForKey(o, r);
                n = this._insertBeforeOrAppend(n, s);
              }
            }),
            n)
          ) {
            n._prev && (n._prev._next = null), (this._removalsHead = n);
            for (let r = n; null !== r; r = r._nextRemoved)
              r === this._mapHead && (this._mapHead = null),
                this._records.delete(r.key),
                (r._nextRemoved = r._next),
                (r.previousValue = r.currentValue),
                (r.currentValue = null),
                (r._prev = null),
                (r._next = null);
          }
          return (
            this._changesTail && (this._changesTail._nextChanged = null),
            this._additionsTail && (this._additionsTail._nextAdded = null),
            this.isDirty
          );
        }
        _insertBeforeOrAppend(t, n) {
          if (t) {
            const r = t._prev;
            return (
              (n._next = t),
              (n._prev = r),
              (t._prev = n),
              r && (r._next = n),
              t === this._mapHead && (this._mapHead = n),
              (this._appendAfter = t),
              t
            );
          }
          return (
            this._appendAfter
              ? ((this._appendAfter._next = n), (n._prev = this._appendAfter))
              : (this._mapHead = n),
            (this._appendAfter = n),
            null
          );
        }
        _getOrCreateRecordForKey(t, n) {
          if (this._records.has(t)) {
            const o = this._records.get(t);
            this._maybeAddToChanges(o, n);
            const s = o._prev,
              i = o._next;
            return (
              s && (s._next = i),
              i && (i._prev = s),
              (o._next = null),
              (o._prev = null),
              o
            );
          }
          const r = new T1(t);
          return (
            this._records.set(t, r),
            (r.currentValue = n),
            this._addToAdditions(r),
            r
          );
        }
        _reset() {
          if (this.isDirty) {
            let t;
            for (
              this._previousMapHead = this._mapHead, t = this._previousMapHead;
              null !== t;
              t = t._next
            )
              t._nextPrevious = t._next;
            for (t = this._changesHead; null !== t; t = t._nextChanged)
              t.previousValue = t.currentValue;
            for (t = this._additionsHead; null != t; t = t._nextAdded)
              t.previousValue = t.currentValue;
            (this._changesHead = this._changesTail = null),
              (this._additionsHead = this._additionsTail = null),
              (this._removalsHead = null);
          }
        }
        _maybeAddToChanges(t, n) {
          Object.is(n, t.currentValue) ||
            ((t.previousValue = t.currentValue),
            (t.currentValue = n),
            this._addToChanges(t));
        }
        _addToAdditions(t) {
          null === this._additionsHead
            ? (this._additionsHead = this._additionsTail = t)
            : ((this._additionsTail._nextAdded = t), (this._additionsTail = t));
        }
        _addToChanges(t) {
          null === this._changesHead
            ? (this._changesHead = this._changesTail = t)
            : ((this._changesTail._nextChanged = t), (this._changesTail = t));
        }
        _forEach(t, n) {
          t instanceof Map
            ? t.forEach(n)
            : Object.keys(t).forEach((r) => n(t[r], r));
        }
      }
      class T1 {
        constructor(t) {
          (this.key = t),
            (this.previousValue = null),
            (this.currentValue = null),
            (this._nextPrevious = null),
            (this._next = null),
            (this._prev = null),
            (this._nextAdded = null),
            (this._nextRemoved = null),
            (this._nextChanged = null);
        }
      }
      function wD() {
        return new ya([new mD()]);
      }
      let ya = (() => {
        var e;
        class t {
          constructor(r) {
            this.factories = r;
          }
          static create(r, o) {
            if (null != o) {
              const s = o.factories.slice();
              r = r.concat(s);
            }
            return new t(r);
          }
          static extend(r) {
            return {
              provide: t,
              useFactory: (o) => t.create(r, o || wD()),
              deps: [[t, new pi(), new hi()]],
            };
          }
          find(r) {
            const o = this.factories.find((s) => s.supports(r));
            if (null != o) return o;
            throw new w(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = M({ token: e, providedIn: "root", factory: wD })), t
        );
      })();
      function _D() {
        return new ls([new DD()]);
      }
      let ls = (() => {
        var e;
        class t {
          constructor(r) {
            this.factories = r;
          }
          static create(r, o) {
            if (o) {
              const s = o.factories.slice();
              r = r.concat(s);
            }
            return new t(r);
          }
          static extend(r) {
            return {
              provide: t,
              useFactory: (o) => t.create(r, o || _D()),
              deps: [[t, new pi(), new hi()]],
            };
          }
          find(r) {
            const o = this.factories.find((s) => s.supports(r));
            if (o) return o;
            throw new w(901, !1);
          }
        }
        return (
          ((e = t).ɵprov = M({ token: e, providedIn: "root", factory: _D })), t
        );
      })();
      const N1 = oD(null, "core", []);
      let x1 = (() => {
          var e;
          class t {
            constructor(r) {}
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(Yr));
            }),
            (e.ɵmod = Qt({ type: e })),
            (e.ɵinj = Nt({})),
            t
          );
        })(),
        ud = null;
      function Qr() {
        return ud;
      }
      class G1 {}
      const it = new b("DocumentToken");
      let cd = (() => {
        var e;
        class t {
          historyGo(r) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return C(Z1);
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      const W1 = new b("Location Initialized");
      let Z1 = (() => {
        var e;
        class t extends cd {
          constructor() {
            super(),
              (this._doc = C(it)),
              (this._location = window.location),
              (this._history = window.history);
          }
          getBaseHrefFromDOM() {
            return Qr().getBaseHref(this._doc);
          }
          onPopState(r) {
            const o = Qr().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("popstate", r, !1),
              () => o.removeEventListener("popstate", r)
            );
          }
          onHashChange(r) {
            const o = Qr().getGlobalEventTarget(this._doc, "window");
            return (
              o.addEventListener("hashchange", r, !1),
              () => o.removeEventListener("hashchange", r)
            );
          }
          get href() {
            return this._location.href;
          }
          get protocol() {
            return this._location.protocol;
          }
          get hostname() {
            return this._location.hostname;
          }
          get port() {
            return this._location.port;
          }
          get pathname() {
            return this._location.pathname;
          }
          get search() {
            return this._location.search;
          }
          get hash() {
            return this._location.hash;
          }
          set pathname(r) {
            this._location.pathname = r;
          }
          pushState(r, o, s) {
            this._history.pushState(r, o, s);
          }
          replaceState(r, o, s) {
            this._history.replaceState(r, o, s);
          }
          forward() {
            this._history.forward();
          }
          back() {
            this._history.back();
          }
          historyGo(r = 0) {
            this._history.go(r);
          }
          getState() {
            return this._history.state;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new e();
            },
            providedIn: "platform",
          })),
          t
        );
      })();
      function ld(e, t) {
        if (0 == e.length) return t;
        if (0 == t.length) return e;
        let n = 0;
        return (
          e.endsWith("/") && n++,
          t.startsWith("/") && n++,
          2 == n ? e + t.substring(1) : 1 == n ? e + t : e + "/" + t
        );
      }
      function AD(e) {
        const t = e.match(/#|\?|$/),
          n = (t && t.index) || e.length;
        return e.slice(0, n - ("/" === e[n - 1] ? 1 : 0)) + e.slice(n);
      }
      function an(e) {
        return e && "?" !== e[0] ? "?" + e : e;
      }
      let Zn = (() => {
        var e;
        class t {
          historyGo(r) {
            throw new Error("Not implemented");
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return C(ND);
            },
            providedIn: "root",
          })),
          t
        );
      })();
      const RD = new b("appBaseHref");
      let ND = (() => {
          var e;
          class t extends Zn {
            constructor(r, o) {
              super(),
                (this._platformLocation = r),
                (this._removeListenerFns = []),
                (this._baseHref =
                  o ??
                  this._platformLocation.getBaseHrefFromDOM() ??
                  C(it).location?.origin ??
                  "");
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(r) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(r),
                this._platformLocation.onHashChange(r)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            prepareExternalUrl(r) {
              return ld(this._baseHref, r);
            }
            path(r = !1) {
              const o =
                  this._platformLocation.pathname +
                  an(this._platformLocation.search),
                s = this._platformLocation.hash;
              return s && r ? `${o}${s}` : o;
            }
            pushState(r, o, s, i) {
              const a = this.prepareExternalUrl(s + an(i));
              this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, s, i) {
              const a = this.prepareExternalUrl(s + an(i));
              this._platformLocation.replaceState(r, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(r = 0) {
              this._platformLocation.historyGo?.(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(cd), I(RD, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        Y1 = (() => {
          var e;
          class t extends Zn {
            constructor(r, o) {
              super(),
                (this._platformLocation = r),
                (this._baseHref = ""),
                (this._removeListenerFns = []),
                null != o && (this._baseHref = o);
            }
            ngOnDestroy() {
              for (; this._removeListenerFns.length; )
                this._removeListenerFns.pop()();
            }
            onPopState(r) {
              this._removeListenerFns.push(
                this._platformLocation.onPopState(r),
                this._platformLocation.onHashChange(r)
              );
            }
            getBaseHref() {
              return this._baseHref;
            }
            path(r = !1) {
              let o = this._platformLocation.hash;
              return null == o && (o = "#"), o.length > 0 ? o.substring(1) : o;
            }
            prepareExternalUrl(r) {
              const o = ld(this._baseHref, r);
              return o.length > 0 ? "#" + o : o;
            }
            pushState(r, o, s, i) {
              let a = this.prepareExternalUrl(s + an(i));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.pushState(r, o, a);
            }
            replaceState(r, o, s, i) {
              let a = this.prepareExternalUrl(s + an(i));
              0 == a.length && (a = this._platformLocation.pathname),
                this._platformLocation.replaceState(r, o, a);
            }
            forward() {
              this._platformLocation.forward();
            }
            back() {
              this._platformLocation.back();
            }
            getState() {
              return this._platformLocation.getState();
            }
            historyGo(r = 0) {
              this._platformLocation.historyGo?.(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(cd), I(RD, 8));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        dd = (() => {
          var e;
          class t {
            constructor(r) {
              (this._subject = new je()),
                (this._urlChangeListeners = []),
                (this._urlChangeSubscription = null),
                (this._locationStrategy = r);
              const o = this._locationStrategy.getBaseHref();
              (this._basePath = (function J1(e) {
                if (new RegExp("^(https?:)?//").test(e)) {
                  const [, n] = e.split(/\/\/[^\/]+/);
                  return n;
                }
                return e;
              })(AD(xD(o)))),
                this._locationStrategy.onPopState((s) => {
                  this._subject.emit({
                    url: this.path(!0),
                    pop: !0,
                    state: s.state,
                    type: s.type,
                  });
                });
            }
            ngOnDestroy() {
              this._urlChangeSubscription?.unsubscribe(),
                (this._urlChangeListeners = []);
            }
            path(r = !1) {
              return this.normalize(this._locationStrategy.path(r));
            }
            getState() {
              return this._locationStrategy.getState();
            }
            isCurrentPathEqualTo(r, o = "") {
              return this.path() == this.normalize(r + an(o));
            }
            normalize(r) {
              return t.stripTrailingSlash(
                (function X1(e, t) {
                  if (!e || !t.startsWith(e)) return t;
                  const n = t.substring(e.length);
                  return "" === n || ["/", ";", "?", "#"].includes(n[0])
                    ? n
                    : t;
                })(this._basePath, xD(r))
              );
            }
            prepareExternalUrl(r) {
              return (
                r && "/" !== r[0] && (r = "/" + r),
                this._locationStrategy.prepareExternalUrl(r)
              );
            }
            go(r, o = "", s = null) {
              this._locationStrategy.pushState(s, "", r, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(r + an(o)),
                  s
                );
            }
            replaceState(r, o = "", s = null) {
              this._locationStrategy.replaceState(s, "", r, o),
                this._notifyUrlChangeListeners(
                  this.prepareExternalUrl(r + an(o)),
                  s
                );
            }
            forward() {
              this._locationStrategy.forward();
            }
            back() {
              this._locationStrategy.back();
            }
            historyGo(r = 0) {
              this._locationStrategy.historyGo?.(r);
            }
            onUrlChange(r) {
              return (
                this._urlChangeListeners.push(r),
                this._urlChangeSubscription ||
                  (this._urlChangeSubscription = this.subscribe((o) => {
                    this._notifyUrlChangeListeners(o.url, o.state);
                  })),
                () => {
                  const o = this._urlChangeListeners.indexOf(r);
                  this._urlChangeListeners.splice(o, 1),
                    0 === this._urlChangeListeners.length &&
                      (this._urlChangeSubscription?.unsubscribe(),
                      (this._urlChangeSubscription = null));
                }
              );
            }
            _notifyUrlChangeListeners(r = "", o) {
              this._urlChangeListeners.forEach((s) => s(r, o));
            }
            subscribe(r, o, s) {
              return this._subject.subscribe({
                next: r,
                error: o,
                complete: s,
              });
            }
          }
          return (
            ((e = t).normalizeQueryParams = an),
            (e.joinWithSlash = ld),
            (e.stripTrailingSlash = AD),
            (e.ɵfac = function (r) {
              return new (r || e)(I(Zn));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return (function Q1() {
                  return new dd(I(Zn));
                })();
              },
              providedIn: "root",
            })),
            t
          );
        })();
      function xD(e) {
        return e.replace(/\/index.html$/, "");
      }
      function VD(e, t) {
        t = encodeURIComponent(t);
        for (const n of e.split(";")) {
          const r = n.indexOf("="),
            [o, s] = -1 == r ? [n, ""] : [n.slice(0, r), n.slice(r + 1)];
          if (o.trim() === t) return decodeURIComponent(s);
        }
        return null;
      }
      class jN {
        constructor(t, n, r, o) {
          (this.$implicit = t),
            (this.ngForOf = n),
            (this.index = r),
            (this.count = o);
        }
        get first() {
          return 0 === this.index;
        }
        get last() {
          return this.index === this.count - 1;
        }
        get even() {
          return this.index % 2 == 0;
        }
        get odd() {
          return !this.even;
        }
      }
      let Cd = (() => {
        var e;
        class t {
          set ngForOf(r) {
            (this._ngForOf = r), (this._ngForOfDirty = !0);
          }
          set ngForTrackBy(r) {
            this._trackByFn = r;
          }
          get ngForTrackBy() {
            return this._trackByFn;
          }
          constructor(r, o, s) {
            (this._viewContainer = r),
              (this._template = o),
              (this._differs = s),
              (this._ngForOf = null),
              (this._ngForOfDirty = !0),
              (this._differ = null);
          }
          set ngForTemplate(r) {
            r && (this._template = r);
          }
          ngDoCheck() {
            if (this._ngForOfDirty) {
              this._ngForOfDirty = !1;
              const r = this._ngForOf;
              !this._differ &&
                r &&
                (this._differ = this._differs
                  .find(r)
                  .create(this.ngForTrackBy));
            }
            if (this._differ) {
              const r = this._differ.diff(this._ngForOf);
              r && this._applyChanges(r);
            }
          }
          _applyChanges(r) {
            const o = this._viewContainer;
            r.forEachOperation((s, i, a) => {
              if (null == s.previousIndex)
                o.createEmbeddedView(
                  this._template,
                  new jN(s.item, this._ngForOf, -1, -1),
                  null === a ? void 0 : a
                );
              else if (null == a) o.remove(null === i ? void 0 : i);
              else if (null !== i) {
                const u = o.get(i);
                o.move(u, a), zD(u, s);
              }
            });
            for (let s = 0, i = o.length; s < i; s++) {
              const u = o.get(s).context;
              (u.index = s), (u.count = i), (u.ngForOf = this._ngForOf);
            }
            r.forEachIdentityChange((s) => {
              zD(o.get(s.currentIndex), s);
            });
          }
          static ngTemplateContextGuard(r, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(T(St), T(on), T(ya));
          }),
          (e.ɵdir = Ne({
            type: e,
            selectors: [["", "ngFor", "", "ngForOf", ""]],
            inputs: {
              ngForOf: "ngForOf",
              ngForTrackBy: "ngForTrackBy",
              ngForTemplate: "ngForTemplate",
            },
            standalone: !0,
          })),
          t
        );
      })();
      function zD(e, t) {
        e.context.$implicit = t.item;
      }
      let qD = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this._viewContainer = r),
              (this._context = new BN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = o);
          }
          set ngIf(r) {
            (this._context.$implicit = this._context.ngIf = r),
              this._updateView();
          }
          set ngIfThen(r) {
            GD("ngIfThen", r),
              (this._thenTemplateRef = r),
              (this._thenViewRef = null),
              this._updateView();
          }
          set ngIfElse(r) {
            GD("ngIfElse", r),
              (this._elseTemplateRef = r),
              (this._elseViewRef = null),
              this._updateView();
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )));
          }
          static ngTemplateContextGuard(r, o) {
            return !0;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(T(St), T(on));
          }),
          (e.ɵdir = Ne({
            type: e,
            selectors: [["", "ngIf", ""]],
            inputs: {
              ngIf: "ngIf",
              ngIfThen: "ngIfThen",
              ngIfElse: "ngIfElse",
            },
            standalone: !0,
          })),
          t
        );
      })();
      class BN {
        constructor() {
          (this.$implicit = null), (this.ngIf = null);
        }
      }
      function GD(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ve(t)}'.`
          );
      }
      let ZD = (() => {
          var e;
          class t {
            constructor(r, o, s) {
              (this._ngEl = r),
                (this._differs = o),
                (this._renderer = s),
                (this._ngStyle = null),
                (this._differ = null);
            }
            set ngStyle(r) {
              (this._ngStyle = r),
                !this._differ &&
                  r &&
                  (this._differ = this._differs.find(r).create());
            }
            ngDoCheck() {
              if (this._differ) {
                const r = this._differ.diff(this._ngStyle);
                r && this._applyChanges(r);
              }
            }
            _setStyle(r, o) {
              const [s, i] = r.split("."),
                a = -1 === s.indexOf("-") ? void 0 : wn.DashCase;
              null != o
                ? this._renderer.setStyle(
                    this._ngEl.nativeElement,
                    s,
                    i ? `${o}${i}` : o,
                    a
                  )
                : this._renderer.removeStyle(this._ngEl.nativeElement, s, a);
            }
            _applyChanges(r) {
              r.forEachRemovedItem((o) => this._setStyle(o.key, null)),
                r.forEachAddedItem((o) =>
                  this._setStyle(o.key, o.currentValue)
                ),
                r.forEachChangedItem((o) =>
                  this._setStyle(o.key, o.currentValue)
                );
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(T(Cn), T(ls), T(Vi));
            }),
            (e.ɵdir = Ne({
              type: e,
              selectors: [["", "ngStyle", ""]],
              inputs: { ngStyle: "ngStyle" },
              standalone: !0,
            })),
            t
          );
        })(),
        dx = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Qt({ type: e })),
            (e.ɵinj = Nt({})),
            t
          );
        })();
      function XD(e) {
        return "server" === e;
      }
      let gx = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵprov = M({
            token: e,
            providedIn: "root",
            factory: () => new mx(I(it), window),
          })),
          t
        );
      })();
      class mx {
        constructor(t, n) {
          (this.document = t), (this.window = n), (this.offset = () => [0, 0]);
        }
        setOffset(t) {
          this.offset = Array.isArray(t) ? () => t : t;
        }
        getScrollPosition() {
          return this.supportsScrolling()
            ? [this.window.pageXOffset, this.window.pageYOffset]
            : [0, 0];
        }
        scrollToPosition(t) {
          this.supportsScrolling() && this.window.scrollTo(t[0], t[1]);
        }
        scrollToAnchor(t) {
          if (!this.supportsScrolling()) return;
          const n = (function vx(e, t) {
            const n = e.getElementById(t) || e.getElementsByName(t)[0];
            if (n) return n;
            if (
              "function" == typeof e.createTreeWalker &&
              e.body &&
              "function" == typeof e.body.attachShadow
            ) {
              const r = e.createTreeWalker(e.body, NodeFilter.SHOW_ELEMENT);
              let o = r.currentNode;
              for (; o; ) {
                const s = o.shadowRoot;
                if (s) {
                  const i =
                    s.getElementById(t) || s.querySelector(`[name="${t}"]`);
                  if (i) return i;
                }
                o = r.nextNode();
              }
            }
            return null;
          })(this.document, t);
          n && (this.scrollToElement(n), n.focus());
        }
        setHistoryScrollRestoration(t) {
          this.supportsScrolling() &&
            (this.window.history.scrollRestoration = t);
        }
        scrollToElement(t) {
          const n = t.getBoundingClientRect(),
            r = n.left + this.window.pageXOffset,
            o = n.top + this.window.pageYOffset,
            s = this.offset();
          this.window.scrollTo(r - s[0], o - s[1]);
        }
        supportsScrolling() {
          try {
            return (
              !!this.window &&
              !!this.window.scrollTo &&
              "pageXOffset" in this.window
            );
          } catch {
            return !1;
          }
        }
      }
      class JD {}
      class $x extends G1 {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0);
        }
      }
      class Ad extends $x {
        static makeCurrent() {
          !(function q1(e) {
            ud || (ud = e);
          })(new Ad());
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r);
            }
          );
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n);
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t);
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t);
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument("fakeTitle");
        }
        getDefaultDocument() {
          return document;
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE;
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment;
        }
        getGlobalEventTarget(t, n) {
          return "window" === n
            ? window
            : "document" === n
            ? t
            : "body" === n
            ? t.body
            : null;
        }
        getBaseHref(t) {
          const n = (function Vx() {
            return (
              (ps = ps || document.querySelector("base")),
              ps ? ps.getAttribute("href") : null
            );
          })();
          return null == n
            ? null
            : (function Hx(e) {
                (xa = xa || document.createElement("a")),
                  xa.setAttribute("href", e);
                const t = xa.pathname;
                return "/" === t.charAt(0) ? t : `/${t}`;
              })(n);
        }
        resetBaseElement() {
          ps = null;
        }
        getUserAgent() {
          return window.navigator.userAgent;
        }
        getCookie(t) {
          return VD(document.cookie, t);
        }
      }
      let xa,
        ps = null,
        zx = (() => {
          var e;
          class t {
            build() {
              return new XMLHttpRequest();
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      const Rd = new b("EventManagerPlugins");
      let rw = (() => {
        var e;
        class t {
          constructor(r, o) {
            (this._zone = o),
              (this._eventNameToPlugin = new Map()),
              r.forEach((s) => {
                s.manager = this;
              }),
              (this._plugins = r.slice().reverse());
          }
          addEventListener(r, o, s) {
            return this._findPluginFor(o).addEventListener(r, o, s);
          }
          getZone() {
            return this._zone;
          }
          _findPluginFor(r) {
            let o = this._eventNameToPlugin.get(r);
            if (o) return o;
            if (((o = this._plugins.find((i) => i.supports(r))), !o))
              throw new w(5101, !1);
            return this._eventNameToPlugin.set(r, o), o;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(Rd), I(ae));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class ow {
        constructor(t) {
          this._doc = t;
        }
      }
      const Nd = "ng-app-id";
      let sw = (() => {
        var e;
        class t {
          constructor(r, o, s, i = {}) {
            (this.doc = r),
              (this.appId = o),
              (this.nonce = s),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = XD(i)),
              this.resetHostNodes();
          }
          addStyles(r) {
            for (const o of r)
              1 === this.changeUsageCount(o, 1) && this.onStyleAdded(o);
          }
          removeStyles(r) {
            for (const o of r)
              this.changeUsageCount(o, -1) <= 0 && this.onStyleRemoved(o);
          }
          ngOnDestroy() {
            const r = this.styleNodesInDOM;
            r && (r.forEach((o) => o.remove()), r.clear());
            for (const o of this.getAllStyles()) this.onStyleRemoved(o);
            this.resetHostNodes();
          }
          addHost(r) {
            this.hostNodes.add(r);
            for (const o of this.getAllStyles()) this.addStyleToHost(r, o);
          }
          removeHost(r) {
            this.hostNodes.delete(r);
          }
          getAllStyles() {
            return this.styleRef.keys();
          }
          onStyleAdded(r) {
            for (const o of this.hostNodes) this.addStyleToHost(o, r);
          }
          onStyleRemoved(r) {
            const o = this.styleRef;
            o.get(r)?.elements?.forEach((s) => s.remove()), o.delete(r);
          }
          collectServerRenderedStyles() {
            const r = this.doc.head?.querySelectorAll(
              `style[${Nd}="${this.appId}"]`
            );
            if (r?.length) {
              const o = new Map();
              return (
                r.forEach((s) => {
                  null != s.textContent && o.set(s.textContent, s);
                }),
                o
              );
            }
            return null;
          }
          changeUsageCount(r, o) {
            const s = this.styleRef;
            if (s.has(r)) {
              const i = s.get(r);
              return (i.usage += o), i.usage;
            }
            return s.set(r, { usage: o, elements: [] }), o;
          }
          getStyleElement(r, o) {
            const s = this.styleNodesInDOM,
              i = s?.get(o);
            if (i?.parentNode === r)
              return s.delete(o), i.removeAttribute(Nd), i;
            {
              const a = this.doc.createElement("style");
              return (
                this.nonce && a.setAttribute("nonce", this.nonce),
                (a.textContent = o),
                this.platformIsServer && a.setAttribute(Nd, this.appId),
                a
              );
            }
          }
          addStyleToHost(r, o) {
            const s = this.getStyleElement(r, o);
            r.appendChild(s);
            const i = this.styleRef,
              a = i.get(o)?.elements;
            a ? a.push(s) : i.set(o, { elements: [s], usage: 1 });
          }
          resetHostNodes() {
            const r = this.hostNodes;
            r.clear(), r.add(this.doc.head);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(it), I(Pi), I(lg, 8), I($n));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const xd = {
          svg: "http://www.w3.org/2000/svg",
          xhtml: "http://www.w3.org/1999/xhtml",
          xlink: "http://www.w3.org/1999/xlink",
          xml: "http://www.w3.org/XML/1998/namespace",
          xmlns: "http://www.w3.org/2000/xmlns/",
          math: "http://www.w3.org/1998/MathML/",
        },
        Od = /%COMP%/g,
        Zx = new b("RemoveStylesOnCompDestroy", {
          providedIn: "root",
          factory: () => !1,
        });
      function aw(e, t) {
        return t.map((n) => n.replace(Od, e));
      }
      let uw = (() => {
        var e;
        class t {
          constructor(r, o, s, i, a, u, c, l = null) {
            (this.eventManager = r),
              (this.sharedStylesHost = o),
              (this.appId = s),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = a),
              (this.platformId = u),
              (this.ngZone = c),
              (this.nonce = l),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = XD(u)),
              (this.defaultRenderer = new Pd(r, a, c, this.platformIsServer));
          }
          createRenderer(r, o) {
            if (!r || !o) return this.defaultRenderer;
            this.platformIsServer &&
              o.encapsulation === wt.ShadowDom &&
              (o = { ...o, encapsulation: wt.Emulated });
            const s = this.getOrCreateRenderer(r, o);
            return (
              s instanceof lw
                ? s.applyToHost(r)
                : s instanceof Fd && s.applyStyles(),
              s
            );
          }
          getOrCreateRenderer(r, o) {
            const s = this.rendererByCompId;
            let i = s.get(o.id);
            if (!i) {
              const a = this.doc,
                u = this.ngZone,
                c = this.eventManager,
                l = this.sharedStylesHost,
                d = this.removeStylesOnCompDestroy,
                f = this.platformIsServer;
              switch (o.encapsulation) {
                case wt.Emulated:
                  i = new lw(c, l, o, this.appId, d, a, u, f);
                  break;
                case wt.ShadowDom:
                  return new Jx(c, l, r, o, a, u, this.nonce, f);
                default:
                  i = new Fd(c, l, o, d, a, u, f);
              }
              s.set(o.id, i);
            }
            return i;
          }
          ngOnDestroy() {
            this.rendererByCompId.clear();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(
              I(rw),
              I(sw),
              I(Pi),
              I(Zx),
              I(it),
              I($n),
              I(ae),
              I(lg)
            );
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      class Pd {
        constructor(t, n, r, o) {
          (this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null);
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(xd[n] || n, t)
            : this.doc.createElement(t);
        }
        createComment(t) {
          return this.doc.createComment(t);
        }
        createText(t) {
          return this.doc.createTextNode(t);
        }
        appendChild(t, n) {
          (cw(t) ? t.content : t).appendChild(n);
        }
        insertBefore(t, n, r) {
          t && (cw(t) ? t.content : t).insertBefore(n, r);
        }
        removeChild(t, n) {
          t && t.removeChild(n);
        }
        selectRootElement(t, n) {
          let r = "string" == typeof t ? this.doc.querySelector(t) : t;
          if (!r) throw new w(-5104, !1);
          return n || (r.textContent = ""), r;
        }
        parentNode(t) {
          return t.parentNode;
        }
        nextSibling(t) {
          return t.nextSibling;
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ":" + n;
            const s = xd[o];
            s ? t.setAttributeNS(s, n, r) : t.setAttribute(n, r);
          } else t.setAttribute(n, r);
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = xd[r];
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`);
          } else t.removeAttribute(n);
        }
        addClass(t, n) {
          t.classList.add(n);
        }
        removeClass(t, n) {
          t.classList.remove(n);
        }
        setStyle(t, n, r, o) {
          o & (wn.DashCase | wn.Important)
            ? t.style.setProperty(n, r, o & wn.Important ? "important" : "")
            : (t.style[n] = r);
        }
        removeStyle(t, n, r) {
          r & wn.DashCase ? t.style.removeProperty(n) : (t.style[n] = "");
        }
        setProperty(t, n, r) {
          t[n] = r;
        }
        setValue(t, n) {
          t.nodeValue = n;
        }
        listen(t, n, r) {
          if (
            "string" == typeof t &&
            !(t = Qr().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`);
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          );
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ("__ngUnwrap__" === n) return t;
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault();
          };
        }
      }
      function cw(e) {
        return "TEMPLATE" === e.tagName && void 0 !== e.content;
      }
      class Jx extends Pd {
        constructor(t, n, r, o, s, i, a, u) {
          super(t, s, i, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: "open" })),
            this.sharedStylesHost.addHost(this.shadowRoot);
          const c = aw(o.id, o.styles);
          for (const l of c) {
            const d = document.createElement("style");
            a && d.setAttribute("nonce", a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d);
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t;
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n);
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r);
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n);
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          );
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot);
        }
      }
      class Fd extends Pd {
        constructor(t, n, r, o, s, i, a, u) {
          super(t, s, i, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? aw(u, r.styles) : r.styles);
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles);
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles);
        }
      }
      class lw extends Fd {
        constructor(t, n, r, o, s, i, a, u) {
          const c = o + "-" + r.id;
          super(t, n, r, s, i, a, u, c),
            (this.contentAttr = (function Yx(e) {
              return "_ngcontent-%COMP%".replace(Od, e);
            })(c)),
            (this.hostAttr = (function Qx(e) {
              return "_nghost-%COMP%".replace(Od, e);
            })(c));
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, "");
        }
        createElement(t, n) {
          const r = super.createElement(t, n);
          return super.setAttribute(r, this.contentAttr, ""), r;
        }
      }
      let Kx = (() => {
        var e;
        class t extends ow {
          constructor(r) {
            super(r);
          }
          supports(r) {
            return !0;
          }
          addEventListener(r, o, s) {
            return (
              r.addEventListener(o, s, !1),
              () => this.removeEventListener(r, o, s)
            );
          }
          removeEventListener(r, o, s) {
            return r.removeEventListener(o, s);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(it));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const dw = ["alt", "control", "meta", "shift"],
        eO = {
          "\b": "Backspace",
          "\t": "Tab",
          "\x7f": "Delete",
          "\x1b": "Escape",
          Del: "Delete",
          Esc: "Escape",
          Left: "ArrowLeft",
          Right: "ArrowRight",
          Up: "ArrowUp",
          Down: "ArrowDown",
          Menu: "ContextMenu",
          Scroll: "ScrollLock",
          Win: "OS",
        },
        tO = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        };
      let nO = (() => {
        var e;
        class t extends ow {
          constructor(r) {
            super(r);
          }
          supports(r) {
            return null != t.parseEventName(r);
          }
          addEventListener(r, o, s) {
            const i = t.parseEventName(o),
              a = t.eventCallback(i.fullKey, s, this.manager.getZone());
            return this.manager
              .getZone()
              .runOutsideAngular(() => Qr().onAndCancel(r, i.domEventName, a));
          }
          static parseEventName(r) {
            const o = r.toLowerCase().split("."),
              s = o.shift();
            if (0 === o.length || ("keydown" !== s && "keyup" !== s))
              return null;
            const i = t._normalizeKey(o.pop());
            let a = "",
              u = o.indexOf("code");
            if (
              (u > -1 && (o.splice(u, 1), (a = "code.")),
              dw.forEach((l) => {
                const d = o.indexOf(l);
                d > -1 && (o.splice(d, 1), (a += l + "."));
              }),
              (a += i),
              0 != o.length || 0 === i.length)
            )
              return null;
            const c = {};
            return (c.domEventName = s), (c.fullKey = a), c;
          }
          static matchEventFullKeyCode(r, o) {
            let s = eO[r.key] || r.key,
              i = "";
            return (
              o.indexOf("code.") > -1 && ((s = r.code), (i = "code.")),
              !(null == s || !s) &&
                ((s = s.toLowerCase()),
                " " === s ? (s = "space") : "." === s && (s = "dot"),
                dw.forEach((a) => {
                  a !== s && (0, tO[a])(r) && (i += a + ".");
                }),
                (i += s),
                i === o)
            );
          }
          static eventCallback(r, o, s) {
            return (i) => {
              t.matchEventFullKeyCode(i, r) && s.runGuarded(() => o(i));
            };
          }
          static _normalizeKey(r) {
            return "esc" === r ? "escape" : r;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(it));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const iO = oD(N1, "browser", [
          { provide: $n, useValue: "browser" },
          {
            provide: cg,
            useValue: function rO() {
              Ad.makeCurrent();
            },
            multi: !0,
          },
          {
            provide: it,
            useFactory: function sO() {
              return (
                (function kI(e) {
                  Dc = e;
                })(document),
                document
              );
            },
            deps: [],
          },
        ]),
        aO = new b(""),
        pw = [
          {
            provide: pa,
            useClass: class Ux {
              addToWindow(t) {
                (ee.getAngularTestability = (r, o = !0) => {
                  const s = t.findTestabilityInTree(r, o);
                  if (null == s) throw new w(5103, !1);
                  return s;
                }),
                  (ee.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (ee.getAllAngularRootElements = () => t.getAllRootElements()),
                  ee.frameworkStabilizers || (ee.frameworkStabilizers = []),
                  ee.frameworkStabilizers.push((r) => {
                    const o = ee.getAllAngularTestabilities();
                    let s = o.length,
                      i = !1;
                    const a = function (u) {
                      (i = i || u), s--, 0 == s && r(i);
                    };
                    o.forEach((u) => {
                      u.whenStable(a);
                    });
                  });
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Qr().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null);
              }
            },
            deps: [],
          },
          { provide: Ky, useClass: Yl, deps: [ae, Ql, pa] },
          { provide: Yl, useClass: Yl, deps: [ae, Ql, pa] },
        ],
        gw = [
          { provide: Rc, useValue: "root" },
          {
            provide: Vn,
            useFactory: function oO() {
              return new Vn();
            },
            deps: [],
          },
          { provide: Rd, useClass: Kx, multi: !0, deps: [it, ae, $n] },
          { provide: Rd, useClass: nO, multi: !0, deps: [it] },
          uw,
          sw,
          rw,
          { provide: vg, useExisting: uw },
          { provide: JD, useClass: zx, deps: [] },
          [],
        ];
      let mw = (() => {
          var e;
          class t {
            constructor(r) {}
            static withServerTransition(r) {
              return {
                ngModule: t,
                providers: [{ provide: Pi, useValue: r.appId }],
              };
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(aO, 12));
            }),
            (e.ɵmod = Qt({ type: e })),
            (e.ɵinj = Nt({ providers: [...gw, ...pw], imports: [dx, x1] })),
            t
          );
        })(),
        vw = (() => {
          var e;
          class t {
            constructor(r) {
              this._doc = r;
            }
            getTitle() {
              return this._doc.title;
            }
            setTitle(r) {
              this._doc.title = r || "";
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(it));
            }),
            (e.ɵprov = M({
              token: e,
              factory: function (r) {
                let o = null;
                return (
                  (o = r
                    ? new r()
                    : (function cO() {
                        return new vw(I(it));
                      })()),
                  o
                );
              },
              providedIn: "root",
            })),
            t
          );
        })();
      typeof window < "u" && window;
      const { isArray: gO } = Array,
        { getPrototypeOf: mO, prototype: vO, keys: yO } = Object;
      const { isArray: _O } = Array;
      function Ld(...e) {
        const t = ho(e),
          n = (function FC(e) {
            return K(pu(e)) ? e.pop() : void 0;
          })(e),
          { args: r, keys: o } = (function DO(e) {
            if (1 === e.length) {
              const t = e[0];
              if (gO(t)) return { args: t, keys: null };
              if (
                (function wO(e) {
                  return e && "object" == typeof e && mO(e) === vO;
                })(t)
              ) {
                const n = yO(t);
                return { args: n.map((r) => t[r]), keys: n };
              }
            }
            return { args: e, keys: null };
          })(e);
        if (0 === r.length) return ge([], t);
        const s = new pe(
          (function IO(e, t, n = hn) {
            return (r) => {
              _w(
                t,
                () => {
                  const { length: o } = e,
                    s = new Array(o);
                  let i = o,
                    a = o;
                  for (let u = 0; u < o; u++)
                    _w(
                      t,
                      () => {
                        const c = ge(e[u], t);
                        let l = !1;
                        c.subscribe(
                          _e(
                            r,
                            (d) => {
                              (s[u] = d),
                                l || ((l = !0), a--),
                                a || r.next(n(s.slice()));
                            },
                            () => {
                              --i || r.complete();
                            }
                          )
                        );
                      },
                      r
                    );
                },
                r
              );
            };
          })(
            r,
            t,
            o
              ? (i) =>
                  (function bO(e, t) {
                    return e.reduce((n, r, o) => ((n[r] = t[o]), n), {});
                  })(o, i)
              : hn
          )
        );
        return n
          ? s.pipe(
              (function EO(e) {
                return Z((t) =>
                  (function CO(e, t) {
                    return _O(t) ? e(...t) : e(t);
                  })(e, t)
                );
              })(n)
            )
          : s;
      }
      function _w(e, t, n) {
        e ? Wt(n, e, t) : t();
      }
      const Oa = co(
        (e) =>
          function () {
            e(this),
              (this.name = "EmptyError"),
              (this.message = "no elements in sequence");
          }
      );
      function jd(...e) {
        return (function SO() {
          return rr(1);
        })()(ge(e, ho(e)));
      }
      function Cw(e) {
        return new pe((t) => {
          yt(e()).subscribe(t);
        });
      }
      function gs(e, t) {
        const n = K(e) ? e : () => e,
          r = (o) => o.error(n());
        return new pe(t ? (o) => t.schedule(r, 0, o) : r);
      }
      function Bd() {
        return we((e, t) => {
          let n = null;
          e._refCount++;
          const r = _e(t, void 0, void 0, void 0, () => {
            if (!e || e._refCount <= 0 || 0 < --e._refCount)
              return void (n = null);
            const o = e._connection,
              s = n;
            (n = null),
              o && (!s || o === s) && o.unsubscribe(),
              t.unsubscribe();
          });
          e.subscribe(r), r.closed || (n = e.connect());
        });
      }
      class Ew extends pe {
        constructor(t, n) {
          super(),
            (this.source = t),
            (this.subjectFactory = n),
            (this._subject = null),
            (this._refCount = 0),
            (this._connection = null),
            If(t) && (this.lift = t.lift);
        }
        _subscribe(t) {
          return this.getSubject().subscribe(t);
        }
        getSubject() {
          const t = this._subject;
          return (
            (!t || t.isStopped) && (this._subject = this.subjectFactory()),
            this._subject
          );
        }
        _teardown() {
          this._refCount = 0;
          const { _connection: t } = this;
          (this._subject = this._connection = null), t?.unsubscribe();
        }
        connect() {
          let t = this._connection;
          if (!t) {
            t = this._connection = new lt();
            const n = this.getSubject();
            t.add(
              this.source.subscribe(
                _e(
                  n,
                  void 0,
                  () => {
                    this._teardown(), n.complete();
                  },
                  (r) => {
                    this._teardown(), n.error(r);
                  },
                  () => this._teardown()
                )
              )
            ),
              t.closed && ((this._connection = null), (t = lt.EMPTY));
          }
          return t;
        }
        refCount() {
          return Bd()(this);
        }
      }
      function Jr(e) {
        return e <= 0
          ? () => Rt
          : we((t, n) => {
              let r = 0;
              t.subscribe(
                _e(n, (o) => {
                  ++r <= e && (n.next(o), e <= r && n.complete());
                })
              );
            });
      }
      function ln(e, t) {
        return we((n, r) => {
          let o = 0;
          n.subscribe(_e(r, (s) => e.call(t, s, o++) && r.next(s)));
        });
      }
      function Pa(e) {
        return we((t, n) => {
          let r = !1;
          t.subscribe(
            _e(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => {
                r || n.next(e), n.complete();
              }
            )
          );
        });
      }
      function bw(e = TO) {
        return we((t, n) => {
          let r = !1;
          t.subscribe(
            _e(
              n,
              (o) => {
                (r = !0), n.next(o);
              },
              () => (r ? n.complete() : n.error(e()))
            )
          );
        });
      }
      function TO() {
        return new Oa();
      }
      function Yn(e, t) {
        const n = arguments.length >= 2;
        return (r) =>
          r.pipe(
            e ? ln((o, s) => e(o, s, r)) : hn,
            Jr(1),
            n ? Pa(t) : bw(() => new Oa())
          );
      }
      function Kr(e, t) {
        return K(t) ? Ee(e, t, 1) : Ee(e, 1);
      }
      function Ve(e, t, n) {
        const r = K(e) || t || n ? { next: e, error: t, complete: n } : e;
        return r
          ? we((o, s) => {
              var i;
              null === (i = r.subscribe) || void 0 === i || i.call(r);
              let a = !0;
              o.subscribe(
                _e(
                  s,
                  (u) => {
                    var c;
                    null === (c = r.next) || void 0 === c || c.call(r, u),
                      s.next(u);
                  },
                  () => {
                    var u;
                    (a = !1),
                      null === (u = r.complete) || void 0 === u || u.call(r),
                      s.complete();
                  },
                  (u) => {
                    var c;
                    (a = !1),
                      null === (c = r.error) || void 0 === c || c.call(r, u),
                      s.error(u);
                  },
                  () => {
                    var u, c;
                    a &&
                      (null === (u = r.unsubscribe) ||
                        void 0 === u ||
                        u.call(r)),
                      null === (c = r.finalize) || void 0 === c || c.call(r);
                  }
                )
              );
            })
          : hn;
      }
      function Qn(e) {
        return we((t, n) => {
          let s,
            r = null,
            o = !1;
          (r = t.subscribe(
            _e(n, void 0, void 0, (i) => {
              (s = yt(e(i, Qn(e)(t)))),
                r ? (r.unsubscribe(), (r = null), s.subscribe(n)) : (o = !0);
            })
          )),
            o && (r.unsubscribe(), (r = null), s.subscribe(n));
        });
      }
      function $d(e) {
        return e <= 0
          ? () => Rt
          : we((t, n) => {
              let r = [];
              t.subscribe(
                _e(
                  n,
                  (o) => {
                    r.push(o), e < r.length && r.shift();
                  },
                  () => {
                    for (const o of r) n.next(o);
                    n.complete();
                  },
                  void 0,
                  () => {
                    r = null;
                  }
                )
              );
            });
      }
      function ms(e) {
        return we((t, n) => {
          try {
            t.subscribe(n);
          } finally {
            n.add(e);
          }
        });
      }
      const L = "primary",
        vs = Symbol("RouteTitle");
      class OO {
        constructor(t) {
          this.params = t || {};
        }
        has(t) {
          return Object.prototype.hasOwnProperty.call(this.params, t);
        }
        get(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n[0] : n;
          }
          return null;
        }
        getAll(t) {
          if (this.has(t)) {
            const n = this.params[t];
            return Array.isArray(n) ? n : [n];
          }
          return [];
        }
        get keys() {
          return Object.keys(this.params);
        }
      }
      function eo(e) {
        return new OO(e);
      }
      function PO(e, t, n) {
        const r = n.path.split("/");
        if (
          r.length > e.length ||
          ("full" === n.pathMatch && (t.hasChildren() || r.length < e.length))
        )
          return null;
        const o = {};
        for (let s = 0; s < r.length; s++) {
          const i = r[s],
            a = e[s];
          if (i.startsWith(":")) o[i.substring(1)] = a;
          else if (i !== a.path) return null;
        }
        return { consumed: e.slice(0, r.length), posParams: o };
      }
      function Ut(e, t) {
        const n = e ? Object.keys(e) : void 0,
          r = t ? Object.keys(t) : void 0;
        if (!n || !r || n.length != r.length) return !1;
        let o;
        for (let s = 0; s < n.length; s++)
          if (((o = n[s]), !Iw(e[o], t[o]))) return !1;
        return !0;
      }
      function Iw(e, t) {
        if (Array.isArray(e) && Array.isArray(t)) {
          if (e.length !== t.length) return !1;
          const n = [...e].sort(),
            r = [...t].sort();
          return n.every((o, s) => r[s] === o);
        }
        return e === t;
      }
      function Sw(e) {
        return e.length > 0 ? e[e.length - 1] : null;
      }
      function Sn(e) {
        return (function pO(e) {
          return !!e && (e instanceof pe || (K(e.lift) && K(e.subscribe)));
        })(e)
          ? e
          : ta(e)
          ? ge(Promise.resolve(e))
          : A(e);
      }
      const kO = {
          exact: function Aw(e, t, n) {
            if (
              !Xn(e.segments, t.segments) ||
              !Fa(e.segments, t.segments, n) ||
              e.numberOfChildren !== t.numberOfChildren
            )
              return !1;
            for (const r in t.children)
              if (!e.children[r] || !Aw(e.children[r], t.children[r], n))
                return !1;
            return !0;
          },
          subset: Rw,
        },
        Mw = {
          exact: function LO(e, t) {
            return Ut(e, t);
          },
          subset: function jO(e, t) {
            return (
              Object.keys(t).length <= Object.keys(e).length &&
              Object.keys(t).every((n) => Iw(e[n], t[n]))
            );
          },
          ignored: () => !0,
        };
      function Tw(e, t, n) {
        return (
          kO[n.paths](e.root, t.root, n.matrixParams) &&
          Mw[n.queryParams](e.queryParams, t.queryParams) &&
          !("exact" === n.fragment && e.fragment !== t.fragment)
        );
      }
      function Rw(e, t, n) {
        return Nw(e, t, t.segments, n);
      }
      function Nw(e, t, n, r) {
        if (e.segments.length > n.length) {
          const o = e.segments.slice(0, n.length);
          return !(!Xn(o, n) || t.hasChildren() || !Fa(o, n, r));
        }
        if (e.segments.length === n.length) {
          if (!Xn(e.segments, n) || !Fa(e.segments, n, r)) return !1;
          for (const o in t.children)
            if (!e.children[o] || !Rw(e.children[o], t.children[o], r))
              return !1;
          return !0;
        }
        {
          const o = n.slice(0, e.segments.length),
            s = n.slice(e.segments.length);
          return (
            !!(Xn(e.segments, o) && Fa(e.segments, o, r) && e.children[L]) &&
            Nw(e.children[L], t, s, r)
          );
        }
      }
      function Fa(e, t, n) {
        return t.every((r, o) => Mw[n](e[o].parameters, r.parameters));
      }
      class to {
        constructor(t = new J([], {}), n = {}, r = null) {
          (this.root = t), (this.queryParams = n), (this.fragment = r);
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = eo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return VO.serialize(this);
        }
      }
      class J {
        constructor(t, n) {
          (this.segments = t),
            (this.children = n),
            (this.parent = null),
            Object.values(n).forEach((r) => (r.parent = this));
        }
        hasChildren() {
          return this.numberOfChildren > 0;
        }
        get numberOfChildren() {
          return Object.keys(this.children).length;
        }
        toString() {
          return ka(this);
        }
      }
      class ys {
        constructor(t, n) {
          (this.path = t), (this.parameters = n);
        }
        get parameterMap() {
          return (
            this._parameterMap || (this._parameterMap = eo(this.parameters)),
            this._parameterMap
          );
        }
        toString() {
          return Pw(this);
        }
      }
      function Xn(e, t) {
        return e.length === t.length && e.every((n, r) => n.path === t[r].path);
      }
      let Ds = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({
            token: e,
            factory: function () {
              return new Vd();
            },
            providedIn: "root",
          })),
          t
        );
      })();
      class Vd {
        parse(t) {
          const n = new JO(t);
          return new to(
            n.parseRootSegment(),
            n.parseQueryParams(),
            n.parseFragment()
          );
        }
        serialize(t) {
          const n = `/${ws(t.root, !0)}`,
            r = (function zO(e) {
              const t = Object.keys(e)
                .map((n) => {
                  const r = e[n];
                  return Array.isArray(r)
                    ? r.map((o) => `${La(n)}=${La(o)}`).join("&")
                    : `${La(n)}=${La(r)}`;
                })
                .filter((n) => !!n);
              return t.length ? `?${t.join("&")}` : "";
            })(t.queryParams);
          return `${n}${r}${
            "string" == typeof t.fragment
              ? `#${(function HO(e) {
                  return encodeURI(e);
                })(t.fragment)}`
              : ""
          }`;
        }
      }
      const VO = new Vd();
      function ka(e) {
        return e.segments.map((t) => Pw(t)).join("/");
      }
      function ws(e, t) {
        if (!e.hasChildren()) return ka(e);
        if (t) {
          const n = e.children[L] ? ws(e.children[L], !1) : "",
            r = [];
          return (
            Object.entries(e.children).forEach(([o, s]) => {
              o !== L && r.push(`${o}:${ws(s, !1)}`);
            }),
            r.length > 0 ? `${n}(${r.join("//")})` : n
          );
        }
        {
          const n = (function $O(e, t) {
            let n = [];
            return (
              Object.entries(e.children).forEach(([r, o]) => {
                r === L && (n = n.concat(t(o, r)));
              }),
              Object.entries(e.children).forEach(([r, o]) => {
                r !== L && (n = n.concat(t(o, r)));
              }),
              n
            );
          })(e, (r, o) =>
            o === L ? [ws(e.children[L], !1)] : [`${o}:${ws(r, !1)}`]
          );
          return 1 === Object.keys(e.children).length && null != e.children[L]
            ? `${ka(e)}/${n[0]}`
            : `${ka(e)}/(${n.join("//")})`;
        }
      }
      function xw(e) {
        return encodeURIComponent(e)
          .replace(/%40/g, "@")
          .replace(/%3A/gi, ":")
          .replace(/%24/g, "$")
          .replace(/%2C/gi, ",");
      }
      function La(e) {
        return xw(e).replace(/%3B/gi, ";");
      }
      function Hd(e) {
        return xw(e)
          .replace(/\(/g, "%28")
          .replace(/\)/g, "%29")
          .replace(/%26/gi, "&");
      }
      function ja(e) {
        return decodeURIComponent(e);
      }
      function Ow(e) {
        return ja(e.replace(/\+/g, "%20"));
      }
      function Pw(e) {
        return `${Hd(e.path)}${(function UO(e) {
          return Object.keys(e)
            .map((t) => `;${Hd(t)}=${Hd(e[t])}`)
            .join("");
        })(e.parameters)}`;
      }
      const qO = /^[^\/()?;#]+/;
      function Ud(e) {
        const t = e.match(qO);
        return t ? t[0] : "";
      }
      const GO = /^[^\/()?;=#]+/,
        ZO = /^[^=?&#]+/,
        QO = /^[^&#]+/;
      class JO {
        constructor(t) {
          (this.url = t), (this.remaining = t);
        }
        parseRootSegment() {
          return (
            this.consumeOptional("/"),
            "" === this.remaining ||
            this.peekStartsWith("?") ||
            this.peekStartsWith("#")
              ? new J([], {})
              : new J([], this.parseChildren())
          );
        }
        parseQueryParams() {
          const t = {};
          if (this.consumeOptional("?"))
            do {
              this.parseQueryParam(t);
            } while (this.consumeOptional("&"));
          return t;
        }
        parseFragment() {
          return this.consumeOptional("#")
            ? decodeURIComponent(this.remaining)
            : null;
        }
        parseChildren() {
          if ("" === this.remaining) return {};
          this.consumeOptional("/");
          const t = [];
          for (
            this.peekStartsWith("(") || t.push(this.parseSegment());
            this.peekStartsWith("/") &&
            !this.peekStartsWith("//") &&
            !this.peekStartsWith("/(");

          )
            this.capture("/"), t.push(this.parseSegment());
          let n = {};
          this.peekStartsWith("/(") &&
            (this.capture("/"), (n = this.parseParens(!0)));
          let r = {};
          return (
            this.peekStartsWith("(") && (r = this.parseParens(!1)),
            (t.length > 0 || Object.keys(n).length > 0) && (r[L] = new J(t, n)),
            r
          );
        }
        parseSegment() {
          const t = Ud(this.remaining);
          if ("" === t && this.peekStartsWith(";")) throw new w(4009, !1);
          return this.capture(t), new ys(ja(t), this.parseMatrixParams());
        }
        parseMatrixParams() {
          const t = {};
          for (; this.consumeOptional(";"); ) this.parseParam(t);
          return t;
        }
        parseParam(t) {
          const n = (function WO(e) {
            const t = e.match(GO);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const o = Ud(this.remaining);
            o && ((r = o), this.capture(r));
          }
          t[ja(n)] = ja(r);
        }
        parseQueryParam(t) {
          const n = (function YO(e) {
            const t = e.match(ZO);
            return t ? t[0] : "";
          })(this.remaining);
          if (!n) return;
          this.capture(n);
          let r = "";
          if (this.consumeOptional("=")) {
            const i = (function XO(e) {
              const t = e.match(QO);
              return t ? t[0] : "";
            })(this.remaining);
            i && ((r = i), this.capture(r));
          }
          const o = Ow(n),
            s = Ow(r);
          if (t.hasOwnProperty(o)) {
            let i = t[o];
            Array.isArray(i) || ((i = [i]), (t[o] = i)), i.push(s);
          } else t[o] = s;
        }
        parseParens(t) {
          const n = {};
          for (
            this.capture("(");
            !this.consumeOptional(")") && this.remaining.length > 0;

          ) {
            const r = Ud(this.remaining),
              o = this.remaining[r.length];
            if ("/" !== o && ")" !== o && ";" !== o) throw new w(4010, !1);
            let s;
            r.indexOf(":") > -1
              ? ((s = r.slice(0, r.indexOf(":"))),
                this.capture(s),
                this.capture(":"))
              : t && (s = L);
            const i = this.parseChildren();
            (n[s] = 1 === Object.keys(i).length ? i[L] : new J([], i)),
              this.consumeOptional("//");
          }
          return n;
        }
        peekStartsWith(t) {
          return this.remaining.startsWith(t);
        }
        consumeOptional(t) {
          return (
            !!this.peekStartsWith(t) &&
            ((this.remaining = this.remaining.substring(t.length)), !0)
          );
        }
        capture(t) {
          if (!this.consumeOptional(t)) throw new w(4011, !1);
        }
      }
      function Fw(e) {
        return e.segments.length > 0 ? new J([], { [L]: e }) : e;
      }
      function kw(e) {
        const t = {};
        for (const r of Object.keys(e.children)) {
          const s = kw(e.children[r]);
          if (r === L && 0 === s.segments.length && s.hasChildren())
            for (const [i, a] of Object.entries(s.children)) t[i] = a;
          else (s.segments.length > 0 || s.hasChildren()) && (t[r] = s);
        }
        return (function KO(e) {
          if (1 === e.numberOfChildren && e.children[L]) {
            const t = e.children[L];
            return new J(e.segments.concat(t.segments), t.children);
          }
          return e;
        })(new J(e.segments, t));
      }
      function Jn(e) {
        return e instanceof to;
      }
      function Lw(e) {
        let t;
        const o = Fw(
          (function n(s) {
            const i = {};
            for (const u of s.children) {
              const c = n(u);
              i[u.outlet] = c;
            }
            const a = new J(s.url, i);
            return s === e && (t = a), a;
          })(e.root)
        );
        return t ?? o;
      }
      function jw(e, t, n, r) {
        let o = e;
        for (; o.parent; ) o = o.parent;
        if (0 === t.length) return zd(o, o, o, n, r);
        const s = (function tP(e) {
          if ("string" == typeof e[0] && 1 === e.length && "/" === e[0])
            return new $w(!0, 0, e);
          let t = 0,
            n = !1;
          const r = e.reduce((o, s, i) => {
            if ("object" == typeof s && null != s) {
              if (s.outlets) {
                const a = {};
                return (
                  Object.entries(s.outlets).forEach(([u, c]) => {
                    a[u] = "string" == typeof c ? c.split("/") : c;
                  }),
                  [...o, { outlets: a }]
                );
              }
              if (s.segmentPath) return [...o, s.segmentPath];
            }
            return "string" != typeof s
              ? [...o, s]
              : 0 === i
              ? (s.split("/").forEach((a, u) => {
                  (0 == u && "." === a) ||
                    (0 == u && "" === a
                      ? (n = !0)
                      : ".." === a
                      ? t++
                      : "" != a && o.push(a));
                }),
                o)
              : [...o, s];
          }, []);
          return new $w(n, t, r);
        })(t);
        if (s.toRoot()) return zd(o, o, new J([], {}), n, r);
        const i = (function nP(e, t, n) {
            if (e.isAbsolute) return new $a(t, !0, 0);
            if (!n) return new $a(t, !1, NaN);
            if (null === n.parent) return new $a(n, !0, 0);
            const r = Ba(e.commands[0]) ? 0 : 1;
            return (function rP(e, t, n) {
              let r = e,
                o = t,
                s = n;
              for (; s > o; ) {
                if (((s -= o), (r = r.parent), !r)) throw new w(4005, !1);
                o = r.segments.length;
              }
              return new $a(r, !1, o - s);
            })(n, n.segments.length - 1 + r, e.numberOfDoubleDots);
          })(s, o, e),
          a = i.processChildren
            ? Cs(i.segmentGroup, i.index, s.commands)
            : Vw(i.segmentGroup, i.index, s.commands);
        return zd(o, i.segmentGroup, a, n, r);
      }
      function Ba(e) {
        return (
          "object" == typeof e && null != e && !e.outlets && !e.segmentPath
        );
      }
      function _s(e) {
        return "object" == typeof e && null != e && e.outlets;
      }
      function zd(e, t, n, r, o) {
        let i,
          s = {};
        r &&
          Object.entries(r).forEach(([u, c]) => {
            s[u] = Array.isArray(c) ? c.map((l) => `${l}`) : `${c}`;
          }),
          (i = e === t ? n : Bw(e, t, n));
        const a = Fw(kw(i));
        return new to(a, s, o);
      }
      function Bw(e, t, n) {
        const r = {};
        return (
          Object.entries(e.children).forEach(([o, s]) => {
            r[o] = s === t ? n : Bw(s, t, n);
          }),
          new J(e.segments, r)
        );
      }
      class $w {
        constructor(t, n, r) {
          if (
            ((this.isAbsolute = t),
            (this.numberOfDoubleDots = n),
            (this.commands = r),
            t && r.length > 0 && Ba(r[0]))
          )
            throw new w(4003, !1);
          const o = r.find(_s);
          if (o && o !== Sw(r)) throw new w(4004, !1);
        }
        toRoot() {
          return (
            this.isAbsolute &&
            1 === this.commands.length &&
            "/" == this.commands[0]
          );
        }
      }
      class $a {
        constructor(t, n, r) {
          (this.segmentGroup = t), (this.processChildren = n), (this.index = r);
        }
      }
      function Vw(e, t, n) {
        if (
          (e || (e = new J([], {})), 0 === e.segments.length && e.hasChildren())
        )
          return Cs(e, t, n);
        const r = (function sP(e, t, n) {
            let r = 0,
              o = t;
            const s = { match: !1, pathIndex: 0, commandIndex: 0 };
            for (; o < e.segments.length; ) {
              if (r >= n.length) return s;
              const i = e.segments[o],
                a = n[r];
              if (_s(a)) break;
              const u = `${a}`,
                c = r < n.length - 1 ? n[r + 1] : null;
              if (o > 0 && void 0 === u) break;
              if (u && c && "object" == typeof c && void 0 === c.outlets) {
                if (!Uw(u, c, i)) return s;
                r += 2;
              } else {
                if (!Uw(u, {}, i)) return s;
                r++;
              }
              o++;
            }
            return { match: !0, pathIndex: o, commandIndex: r };
          })(e, t, n),
          o = n.slice(r.commandIndex);
        if (r.match && r.pathIndex < e.segments.length) {
          const s = new J(e.segments.slice(0, r.pathIndex), {});
          return (
            (s.children[L] = new J(e.segments.slice(r.pathIndex), e.children)),
            Cs(s, 0, o)
          );
        }
        return r.match && 0 === o.length
          ? new J(e.segments, {})
          : r.match && !e.hasChildren()
          ? qd(e, t, n)
          : r.match
          ? Cs(e, 0, o)
          : qd(e, t, n);
      }
      function Cs(e, t, n) {
        if (0 === n.length) return new J(e.segments, {});
        {
          const r = (function oP(e) {
              return _s(e[0]) ? e[0].outlets : { [L]: e };
            })(n),
            o = {};
          if (
            Object.keys(r).some((s) => s !== L) &&
            e.children[L] &&
            1 === e.numberOfChildren &&
            0 === e.children[L].segments.length
          ) {
            const s = Cs(e.children[L], t, n);
            return new J(e.segments, s.children);
          }
          return (
            Object.entries(r).forEach(([s, i]) => {
              "string" == typeof i && (i = [i]),
                null !== i && (o[s] = Vw(e.children[s], t, i));
            }),
            Object.entries(e.children).forEach(([s, i]) => {
              void 0 === r[s] && (o[s] = i);
            }),
            new J(e.segments, o)
          );
        }
      }
      function qd(e, t, n) {
        const r = e.segments.slice(0, t);
        let o = 0;
        for (; o < n.length; ) {
          const s = n[o];
          if (_s(s)) {
            const u = iP(s.outlets);
            return new J(r, u);
          }
          if (0 === o && Ba(n[0])) {
            r.push(new ys(e.segments[t].path, Hw(n[0]))), o++;
            continue;
          }
          const i = _s(s) ? s.outlets[L] : `${s}`,
            a = o < n.length - 1 ? n[o + 1] : null;
          i && a && Ba(a)
            ? (r.push(new ys(i, Hw(a))), (o += 2))
            : (r.push(new ys(i, {})), o++);
        }
        return new J(r, {});
      }
      function iP(e) {
        const t = {};
        return (
          Object.entries(e).forEach(([n, r]) => {
            "string" == typeof r && (r = [r]),
              null !== r && (t[n] = qd(new J([], {}), 0, r));
          }),
          t
        );
      }
      function Hw(e) {
        const t = {};
        return Object.entries(e).forEach(([n, r]) => (t[n] = `${r}`)), t;
      }
      function Uw(e, t, n) {
        return e == n.path && Ut(t, n.parameters);
      }
      const Es = "imperative";
      class zt {
        constructor(t, n) {
          (this.id = t), (this.url = n);
        }
      }
      class Gd extends zt {
        constructor(t, n, r = "imperative", o = null) {
          super(t, n),
            (this.type = 0),
            (this.navigationTrigger = r),
            (this.restoredState = o);
        }
        toString() {
          return `NavigationStart(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class Kn extends zt {
        constructor(t, n, r) {
          super(t, n), (this.urlAfterRedirects = r), (this.type = 1);
        }
        toString() {
          return `NavigationEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}')`;
        }
      }
      class Va extends zt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 2);
        }
        toString() {
          return `NavigationCancel(id: ${this.id}, url: '${this.url}')`;
        }
      }
      class bs extends zt {
        constructor(t, n, r, o) {
          super(t, n), (this.reason = r), (this.code = o), (this.type = 16);
        }
      }
      class Wd extends zt {
        constructor(t, n, r, o) {
          super(t, n), (this.error = r), (this.target = o), (this.type = 3);
        }
        toString() {
          return `NavigationError(id: ${this.id}, url: '${this.url}', error: ${this.error})`;
        }
      }
      class aP extends zt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 4);
        }
        toString() {
          return `RoutesRecognized(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class uP extends zt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 7);
        }
        toString() {
          return `GuardsCheckStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class cP extends zt {
        constructor(t, n, r, o, s) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.shouldActivate = s),
            (this.type = 8);
        }
        toString() {
          return `GuardsCheckEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state}, shouldActivate: ${this.shouldActivate})`;
        }
      }
      class lP extends zt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 5);
        }
        toString() {
          return `ResolveStart(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class dP extends zt {
        constructor(t, n, r, o) {
          super(t, n),
            (this.urlAfterRedirects = r),
            (this.state = o),
            (this.type = 6);
        }
        toString() {
          return `ResolveEnd(id: ${this.id}, url: '${this.url}', urlAfterRedirects: '${this.urlAfterRedirects}', state: ${this.state})`;
        }
      }
      class fP {
        constructor(t) {
          (this.route = t), (this.type = 9);
        }
        toString() {
          return `RouteConfigLoadStart(path: ${this.route.path})`;
        }
      }
      class hP {
        constructor(t) {
          (this.route = t), (this.type = 10);
        }
        toString() {
          return `RouteConfigLoadEnd(path: ${this.route.path})`;
        }
      }
      class pP {
        constructor(t) {
          (this.snapshot = t), (this.type = 11);
        }
        toString() {
          return `ChildActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class gP {
        constructor(t) {
          (this.snapshot = t), (this.type = 12);
        }
        toString() {
          return `ChildActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class mP {
        constructor(t) {
          (this.snapshot = t), (this.type = 13);
        }
        toString() {
          return `ActivationStart(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class vP {
        constructor(t) {
          (this.snapshot = t), (this.type = 14);
        }
        toString() {
          return `ActivationEnd(path: '${
            (this.snapshot.routeConfig && this.snapshot.routeConfig.path) || ""
          }')`;
        }
      }
      class zw {
        constructor(t, n, r) {
          (this.routerEvent = t),
            (this.position = n),
            (this.anchor = r),
            (this.type = 15);
        }
        toString() {
          return `Scroll(anchor: '${this.anchor}', position: '${
            this.position ? `${this.position[0]}, ${this.position[1]}` : null
          }')`;
        }
      }
      class yP {
        constructor() {
          (this.outlet = null),
            (this.route = null),
            (this.injector = null),
            (this.children = new Is()),
            (this.attachRef = null);
        }
      }
      let Is = (() => {
        var e;
        class t {
          constructor() {
            this.contexts = new Map();
          }
          onChildOutletCreated(r, o) {
            const s = this.getOrCreateContext(r);
            (s.outlet = o), this.contexts.set(r, s);
          }
          onChildOutletDestroyed(r) {
            const o = this.getContext(r);
            o && ((o.outlet = null), (o.attachRef = null));
          }
          onOutletDeactivated() {
            const r = this.contexts;
            return (this.contexts = new Map()), r;
          }
          onOutletReAttached(r) {
            this.contexts = r;
          }
          getOrCreateContext(r) {
            let o = this.getContext(r);
            return o || ((o = new yP()), this.contexts.set(r, o)), o;
          }
          getContext(r) {
            return this.contexts.get(r) || null;
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class qw {
        constructor(t) {
          this._root = t;
        }
        get root() {
          return this._root.value;
        }
        parent(t) {
          const n = this.pathFromRoot(t);
          return n.length > 1 ? n[n.length - 2] : null;
        }
        children(t) {
          const n = Zd(t, this._root);
          return n ? n.children.map((r) => r.value) : [];
        }
        firstChild(t) {
          const n = Zd(t, this._root);
          return n && n.children.length > 0 ? n.children[0].value : null;
        }
        siblings(t) {
          const n = Yd(t, this._root);
          return n.length < 2
            ? []
            : n[n.length - 2].children
                .map((o) => o.value)
                .filter((o) => o !== t);
        }
        pathFromRoot(t) {
          return Yd(t, this._root).map((n) => n.value);
        }
      }
      function Zd(e, t) {
        if (e === t.value) return t;
        for (const n of t.children) {
          const r = Zd(e, n);
          if (r) return r;
        }
        return null;
      }
      function Yd(e, t) {
        if (e === t.value) return [t];
        for (const n of t.children) {
          const r = Yd(e, n);
          if (r.length) return r.unshift(t), r;
        }
        return [];
      }
      class dn {
        constructor(t, n) {
          (this.value = t), (this.children = n);
        }
        toString() {
          return `TreeNode(${this.value})`;
        }
      }
      function no(e) {
        const t = {};
        return e && e.children.forEach((n) => (t[n.value.outlet] = n)), t;
      }
      class Gw extends qw {
        constructor(t, n) {
          super(t), (this.snapshot = n), Qd(this, t);
        }
        toString() {
          return this.snapshot.toString();
        }
      }
      function Ww(e, t) {
        const n = (function DP(e, t) {
            const i = new Ha([], {}, {}, "", {}, L, t, null, {});
            return new Yw("", new dn(i, []));
          })(0, t),
          r = new dt([new ys("", {})]),
          o = new dt({}),
          s = new dt({}),
          i = new dt({}),
          a = new dt(""),
          u = new er(r, o, i, a, s, L, t, n.root);
        return (u.snapshot = n.root), new Gw(new dn(u, []), n);
      }
      class er {
        constructor(t, n, r, o, s, i, a, u) {
          (this.urlSubject = t),
            (this.paramsSubject = n),
            (this.queryParamsSubject = r),
            (this.fragmentSubject = o),
            (this.dataSubject = s),
            (this.outlet = i),
            (this.component = a),
            (this._futureSnapshot = u),
            (this.title = this.dataSubject?.pipe(Z((c) => c[vs])) ?? A(void 0)),
            (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s);
        }
        get routeConfig() {
          return this._futureSnapshot.routeConfig;
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap ||
              (this._paramMap = this.params.pipe(Z((t) => eo(t)))),
            this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap ||
              (this._queryParamMap = this.queryParams.pipe(Z((t) => eo(t)))),
            this._queryParamMap
          );
        }
        toString() {
          return this.snapshot
            ? this.snapshot.toString()
            : `Future(${this._futureSnapshot})`;
        }
      }
      function Zw(e, t = "emptyOnly") {
        const n = e.pathFromRoot;
        let r = 0;
        if ("always" !== t)
          for (r = n.length - 1; r >= 1; ) {
            const o = n[r],
              s = n[r - 1];
            if (o.routeConfig && "" === o.routeConfig.path) r--;
            else {
              if (s.component) break;
              r--;
            }
          }
        return (function wP(e) {
          return e.reduce(
            (t, n) => ({
              params: { ...t.params, ...n.params },
              data: { ...t.data, ...n.data },
              resolve: {
                ...n.data,
                ...t.resolve,
                ...n.routeConfig?.data,
                ...n._resolvedData,
              },
            }),
            { params: {}, data: {}, resolve: {} }
          );
        })(n.slice(r));
      }
      class Ha {
        get title() {
          return this.data?.[vs];
        }
        constructor(t, n, r, o, s, i, a, u, c) {
          (this.url = t),
            (this.params = n),
            (this.queryParams = r),
            (this.fragment = o),
            (this.data = s),
            (this.outlet = i),
            (this.component = a),
            (this.routeConfig = u),
            (this._resolve = c);
        }
        get root() {
          return this._routerState.root;
        }
        get parent() {
          return this._routerState.parent(this);
        }
        get firstChild() {
          return this._routerState.firstChild(this);
        }
        get children() {
          return this._routerState.children(this);
        }
        get pathFromRoot() {
          return this._routerState.pathFromRoot(this);
        }
        get paramMap() {
          return (
            this._paramMap || (this._paramMap = eo(this.params)), this._paramMap
          );
        }
        get queryParamMap() {
          return (
            this._queryParamMap || (this._queryParamMap = eo(this.queryParams)),
            this._queryParamMap
          );
        }
        toString() {
          return `Route(url:'${this.url
            .map((r) => r.toString())
            .join("/")}', path:'${
            this.routeConfig ? this.routeConfig.path : ""
          }')`;
        }
      }
      class Yw extends qw {
        constructor(t, n) {
          super(n), (this.url = t), Qd(this, n);
        }
        toString() {
          return Qw(this._root);
        }
      }
      function Qd(e, t) {
        (t.value._routerState = e), t.children.forEach((n) => Qd(e, n));
      }
      function Qw(e) {
        const t =
          e.children.length > 0 ? ` { ${e.children.map(Qw).join(", ")} } ` : "";
        return `${e.value}${t}`;
      }
      function Xd(e) {
        if (e.snapshot) {
          const t = e.snapshot,
            n = e._futureSnapshot;
          (e.snapshot = n),
            Ut(t.queryParams, n.queryParams) ||
              e.queryParamsSubject.next(n.queryParams),
            t.fragment !== n.fragment && e.fragmentSubject.next(n.fragment),
            Ut(t.params, n.params) || e.paramsSubject.next(n.params),
            (function FO(e, t) {
              if (e.length !== t.length) return !1;
              for (let n = 0; n < e.length; ++n) if (!Ut(e[n], t[n])) return !1;
              return !0;
            })(t.url, n.url) || e.urlSubject.next(n.url),
            Ut(t.data, n.data) || e.dataSubject.next(n.data);
        } else
          (e.snapshot = e._futureSnapshot),
            e.dataSubject.next(e._futureSnapshot.data);
      }
      function Jd(e, t) {
        const n =
          Ut(e.params, t.params) &&
          (function BO(e, t) {
            return (
              Xn(e, t) && e.every((n, r) => Ut(n.parameters, t[r].parameters))
            );
          })(e.url, t.url);
        return (
          n &&
          !(!e.parent != !t.parent) &&
          (!e.parent || Jd(e.parent, t.parent))
        );
      }
      let Kd = (() => {
        var e;
        class t {
          constructor() {
            (this.activated = null),
              (this._activatedRoute = null),
              (this.name = L),
              (this.activateEvents = new je()),
              (this.deactivateEvents = new je()),
              (this.attachEvents = new je()),
              (this.detachEvents = new je()),
              (this.parentContexts = C(Is)),
              (this.location = C(St)),
              (this.changeDetector = C(td)),
              (this.environmentInjector = C(ot)),
              (this.inputBinder = C(Ua, { optional: !0 })),
              (this.supportsBindingToComponentInputs = !0);
          }
          get activatedComponentRef() {
            return this.activated;
          }
          ngOnChanges(r) {
            if (r.name) {
              const { firstChange: o, previousValue: s } = r.name;
              if (o) return;
              this.isTrackedInParentContexts(s) &&
                (this.deactivate(),
                this.parentContexts.onChildOutletDestroyed(s)),
                this.initializeOutletWithName();
            }
          }
          ngOnDestroy() {
            this.isTrackedInParentContexts(this.name) &&
              this.parentContexts.onChildOutletDestroyed(this.name),
              this.inputBinder?.unsubscribeFromRouteData(this);
          }
          isTrackedInParentContexts(r) {
            return this.parentContexts.getContext(r)?.outlet === this;
          }
          ngOnInit() {
            this.initializeOutletWithName();
          }
          initializeOutletWithName() {
            if (
              (this.parentContexts.onChildOutletCreated(this.name, this),
              this.activated)
            )
              return;
            const r = this.parentContexts.getContext(this.name);
            r?.route &&
              (r.attachRef
                ? this.attach(r.attachRef, r.route)
                : this.activateWith(r.route, r.injector));
          }
          get isActivated() {
            return !!this.activated;
          }
          get component() {
            if (!this.activated) throw new w(4012, !1);
            return this.activated.instance;
          }
          get activatedRoute() {
            if (!this.activated) throw new w(4012, !1);
            return this._activatedRoute;
          }
          get activatedRouteData() {
            return this._activatedRoute
              ? this._activatedRoute.snapshot.data
              : {};
          }
          detach() {
            if (!this.activated) throw new w(4012, !1);
            this.location.detach();
            const r = this.activated;
            return (
              (this.activated = null),
              (this._activatedRoute = null),
              this.detachEvents.emit(r.instance),
              r
            );
          }
          attach(r, o) {
            (this.activated = r),
              (this._activatedRoute = o),
              this.location.insert(r.hostView),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.attachEvents.emit(r.instance);
          }
          deactivate() {
            if (this.activated) {
              const r = this.component;
              this.activated.destroy(),
                (this.activated = null),
                (this._activatedRoute = null),
                this.deactivateEvents.emit(r);
            }
          }
          activateWith(r, o) {
            if (this.isActivated) throw new w(4013, !1);
            this._activatedRoute = r;
            const s = this.location,
              a = r.snapshot.component,
              u = this.parentContexts.getOrCreateContext(this.name).children,
              c = new _P(r, u, s.injector);
            (this.activated = s.createComponent(a, {
              index: s.length,
              injector: c,
              environmentInjector: o ?? this.environmentInjector,
            })),
              this.changeDetector.markForCheck(),
              this.inputBinder?.bindActivatedRouteToOutletComponent(this),
              this.activateEvents.emit(this.activated.instance);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵdir = Ne({
            type: e,
            selectors: [["router-outlet"]],
            inputs: { name: "name" },
            outputs: {
              activateEvents: "activate",
              deactivateEvents: "deactivate",
              attachEvents: "attach",
              detachEvents: "detach",
            },
            exportAs: ["outlet"],
            standalone: !0,
            features: [Fn],
          })),
          t
        );
      })();
      class _P {
        constructor(t, n, r) {
          (this.route = t), (this.childContexts = n), (this.parent = r);
        }
        get(t, n) {
          return t === er
            ? this.route
            : t === Is
            ? this.childContexts
            : this.parent.get(t, n);
        }
      }
      const Ua = new b("");
      let Xw = (() => {
        var e;
        class t {
          constructor() {
            this.outletDataSubscriptions = new Map();
          }
          bindActivatedRouteToOutletComponent(r) {
            this.unsubscribeFromRouteData(r), this.subscribeToRouteData(r);
          }
          unsubscribeFromRouteData(r) {
            this.outletDataSubscriptions.get(r)?.unsubscribe(),
              this.outletDataSubscriptions.delete(r);
          }
          subscribeToRouteData(r) {
            const { activatedRoute: o } = r,
              s = Ld([o.queryParams, o.params, o.data])
                .pipe(
                  Dt(
                    ([i, a, u], c) => (
                      (u = { ...i, ...a, ...u }),
                      0 === c ? A(u) : Promise.resolve(u)
                    )
                  )
                )
                .subscribe((i) => {
                  if (
                    !r.isActivated ||
                    !r.activatedComponentRef ||
                    r.activatedRoute !== o ||
                    null === o.component
                  )
                    return void this.unsubscribeFromRouteData(r);
                  const a = (function z1(e) {
                    const t = U(e);
                    if (!t) return null;
                    const n = new Zo(t);
                    return {
                      get selector() {
                        return n.selector;
                      },
                      get type() {
                        return n.componentType;
                      },
                      get inputs() {
                        return n.inputs;
                      },
                      get outputs() {
                        return n.outputs;
                      },
                      get ngContentSelectors() {
                        return n.ngContentSelectors;
                      },
                      get isStandalone() {
                        return t.standalone;
                      },
                      get isSignal() {
                        return t.signals;
                      },
                    };
                  })(o.component);
                  if (a)
                    for (const { templateName: u } of a.inputs)
                      r.activatedComponentRef.setInput(u, i[u]);
                  else this.unsubscribeFromRouteData(r);
                });
            this.outletDataSubscriptions.set(r, s);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function Ss(e, t, n) {
        if (n && e.shouldReuseRoute(t.value, n.value.snapshot)) {
          const r = n.value;
          r._futureSnapshot = t.value;
          const o = (function EP(e, t, n) {
            return t.children.map((r) => {
              for (const o of n.children)
                if (e.shouldReuseRoute(r.value, o.value.snapshot))
                  return Ss(e, r, o);
              return Ss(e, r);
            });
          })(e, t, n);
          return new dn(r, o);
        }
        {
          if (e.shouldAttach(t.value)) {
            const s = e.retrieve(t.value);
            if (null !== s) {
              const i = s.route;
              return (
                (i.value._futureSnapshot = t.value),
                (i.children = t.children.map((a) => Ss(e, a))),
                i
              );
            }
          }
          const r = (function bP(e) {
              return new er(
                new dt(e.url),
                new dt(e.params),
                new dt(e.queryParams),
                new dt(e.fragment),
                new dt(e.data),
                e.outlet,
                e.component,
                e
              );
            })(t.value),
            o = t.children.map((s) => Ss(e, s));
          return new dn(r, o);
        }
      }
      const ef = "ngNavigationCancelingError";
      function Jw(e, t) {
        const { redirectTo: n, navigationBehaviorOptions: r } = Jn(t)
            ? { redirectTo: t, navigationBehaviorOptions: void 0 }
            : t,
          o = Kw(!1, 0, t);
        return (o.url = n), (o.navigationBehaviorOptions = r), o;
      }
      function Kw(e, t, n) {
        const r = new Error("NavigationCancelingError: " + (e || ""));
        return (r[ef] = !0), (r.cancellationCode = t), n && (r.url = n), r;
      }
      function e_(e) {
        return t_(e) && Jn(e.url);
      }
      function t_(e) {
        return e && e[ef];
      }
      let n_ = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵcmp = xn({
            type: e,
            selectors: [["ng-component"]],
            standalone: !0,
            features: [Xv],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && ke(0, "router-outlet");
            },
            dependencies: [Kd],
            encapsulation: 2,
          })),
          t
        );
      })();
      function tf(e) {
        const t = e.children && e.children.map(tf),
          n = t ? { ...e, children: t } : { ...e };
        return (
          !n.component &&
            !n.loadComponent &&
            (t || n.loadChildren) &&
            n.outlet &&
            n.outlet !== L &&
            (n.component = n_),
          n
        );
      }
      function At(e) {
        return e.outlet || L;
      }
      function Ms(e) {
        if (!e) return null;
        if (e.routeConfig?._injector) return e.routeConfig._injector;
        for (let t = e.parent; t; t = t.parent) {
          const n = t.routeConfig;
          if (n?._loadedInjector) return n._loadedInjector;
          if (n?._injector) return n._injector;
        }
        return null;
      }
      class NP {
        constructor(t, n, r, o, s) {
          (this.routeReuseStrategy = t),
            (this.futureState = n),
            (this.currState = r),
            (this.forwardEvent = o),
            (this.inputBindingEnabled = s);
        }
        activate(t) {
          const n = this.futureState._root,
            r = this.currState ? this.currState._root : null;
          this.deactivateChildRoutes(n, r, t),
            Xd(this.futureState.root),
            this.activateChildRoutes(n, r, t);
        }
        deactivateChildRoutes(t, n, r) {
          const o = no(n);
          t.children.forEach((s) => {
            const i = s.value.outlet;
            this.deactivateRoutes(s, o[i], r), delete o[i];
          }),
            Object.values(o).forEach((s) => {
              this.deactivateRouteAndItsChildren(s, r);
            });
        }
        deactivateRoutes(t, n, r) {
          const o = t.value,
            s = n ? n.value : null;
          if (o === s)
            if (o.component) {
              const i = r.getContext(o.outlet);
              i && this.deactivateChildRoutes(t, n, i.children);
            } else this.deactivateChildRoutes(t, n, r);
          else s && this.deactivateRouteAndItsChildren(n, r);
        }
        deactivateRouteAndItsChildren(t, n) {
          t.value.component &&
          this.routeReuseStrategy.shouldDetach(t.value.snapshot)
            ? this.detachAndStoreRouteSubtree(t, n)
            : this.deactivateRouteAndOutlet(t, n);
        }
        detachAndStoreRouteSubtree(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            s = no(t);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], o);
          if (r && r.outlet) {
            const i = r.outlet.detach(),
              a = r.children.onOutletDeactivated();
            this.routeReuseStrategy.store(t.value.snapshot, {
              componentRef: i,
              route: t,
              contexts: a,
            });
          }
        }
        deactivateRouteAndOutlet(t, n) {
          const r = n.getContext(t.value.outlet),
            o = r && t.value.component ? r.children : n,
            s = no(t);
          for (const i of Object.keys(s))
            this.deactivateRouteAndItsChildren(s[i], o);
          r &&
            (r.outlet &&
              (r.outlet.deactivate(), r.children.onOutletDeactivated()),
            (r.attachRef = null),
            (r.route = null));
        }
        activateChildRoutes(t, n, r) {
          const o = no(n);
          t.children.forEach((s) => {
            this.activateRoutes(s, o[s.value.outlet], r),
              this.forwardEvent(new vP(s.value.snapshot));
          }),
            t.children.length && this.forwardEvent(new gP(t.value.snapshot));
        }
        activateRoutes(t, n, r) {
          const o = t.value,
            s = n ? n.value : null;
          if ((Xd(o), o === s))
            if (o.component) {
              const i = r.getOrCreateContext(o.outlet);
              this.activateChildRoutes(t, n, i.children);
            } else this.activateChildRoutes(t, n, r);
          else if (o.component) {
            const i = r.getOrCreateContext(o.outlet);
            if (this.routeReuseStrategy.shouldAttach(o.snapshot)) {
              const a = this.routeReuseStrategy.retrieve(o.snapshot);
              this.routeReuseStrategy.store(o.snapshot, null),
                i.children.onOutletReAttached(a.contexts),
                (i.attachRef = a.componentRef),
                (i.route = a.route.value),
                i.outlet && i.outlet.attach(a.componentRef, a.route.value),
                Xd(a.route.value),
                this.activateChildRoutes(t, null, i.children);
            } else {
              const a = Ms(o.snapshot);
              (i.attachRef = null),
                (i.route = o),
                (i.injector = a),
                i.outlet && i.outlet.activateWith(o, i.injector),
                this.activateChildRoutes(t, null, i.children);
            }
          } else this.activateChildRoutes(t, null, r);
        }
      }
      class r_ {
        constructor(t) {
          (this.path = t), (this.route = this.path[this.path.length - 1]);
        }
      }
      class za {
        constructor(t, n) {
          (this.component = t), (this.route = n);
        }
      }
      function xP(e, t, n) {
        const r = e._root;
        return Ts(r, t ? t._root : null, n, [r.value]);
      }
      function ro(e, t) {
        const n = Symbol(),
          r = t.get(e, n);
        return r === n
          ? "function" != typeof e ||
            (function JC(e) {
              return null !== $s(e);
            })(e)
            ? t.get(e)
            : e
          : r;
      }
      function Ts(
        e,
        t,
        n,
        r,
        o = { canDeactivateChecks: [], canActivateChecks: [] }
      ) {
        const s = no(t);
        return (
          e.children.forEach((i) => {
            (function PP(
              e,
              t,
              n,
              r,
              o = { canDeactivateChecks: [], canActivateChecks: [] }
            ) {
              const s = e.value,
                i = t ? t.value : null,
                a = n ? n.getContext(e.value.outlet) : null;
              if (i && s.routeConfig === i.routeConfig) {
                const u = (function FP(e, t, n) {
                  if ("function" == typeof n) return n(e, t);
                  switch (n) {
                    case "pathParamsChange":
                      return !Xn(e.url, t.url);
                    case "pathParamsOrQueryParamsChange":
                      return (
                        !Xn(e.url, t.url) || !Ut(e.queryParams, t.queryParams)
                      );
                    case "always":
                      return !0;
                    case "paramsOrQueryParamsChange":
                      return !Jd(e, t) || !Ut(e.queryParams, t.queryParams);
                    default:
                      return !Jd(e, t);
                  }
                })(i, s, s.routeConfig.runGuardsAndResolvers);
                u
                  ? o.canActivateChecks.push(new r_(r))
                  : ((s.data = i.data), (s._resolvedData = i._resolvedData)),
                  Ts(e, t, s.component ? (a ? a.children : null) : n, r, o),
                  u &&
                    a &&
                    a.outlet &&
                    a.outlet.isActivated &&
                    o.canDeactivateChecks.push(new za(a.outlet.component, i));
              } else
                i && As(t, a, o),
                  o.canActivateChecks.push(new r_(r)),
                  Ts(e, null, s.component ? (a ? a.children : null) : n, r, o);
            })(i, s[i.value.outlet], n, r.concat([i.value]), o),
              delete s[i.value.outlet];
          }),
          Object.entries(s).forEach(([i, a]) => As(a, n.getContext(i), o)),
          o
        );
      }
      function As(e, t, n) {
        const r = no(e),
          o = e.value;
        Object.entries(r).forEach(([s, i]) => {
          As(i, o.component ? (t ? t.children.getContext(s) : null) : t, n);
        }),
          n.canDeactivateChecks.push(
            new za(
              o.component && t && t.outlet && t.outlet.isActivated
                ? t.outlet.component
                : null,
              o
            )
          );
      }
      function Rs(e) {
        return "function" == typeof e;
      }
      function o_(e) {
        return e instanceof Oa || "EmptyError" === e?.name;
      }
      const qa = Symbol("INITIAL_VALUE");
      function oo() {
        return Dt((e) =>
          Ld(
            e.map((t) =>
              t.pipe(
                Jr(1),
                (function MO(...e) {
                  const t = ho(e);
                  return we((n, r) => {
                    (t ? jd(e, n, t) : jd(e, n)).subscribe(r);
                  });
                })(qa)
              )
            )
          ).pipe(
            Z((t) => {
              for (const n of t)
                if (!0 !== n) {
                  if (n === qa) return qa;
                  if (!1 === n || n instanceof to) return n;
                }
              return !0;
            }),
            ln((t) => t !== qa),
            Jr(1)
          )
        );
      }
      function s_(e) {
        return (function K_(...e) {
          return Cf(e);
        })(
          Ve((t) => {
            if (Jn(t)) throw Jw(0, t);
          }),
          Z((t) => !0 === t)
        );
      }
      class Ga {
        constructor(t) {
          this.segmentGroup = t || null;
        }
      }
      class i_ {
        constructor(t) {
          this.urlTree = t;
        }
      }
      function so(e) {
        return gs(new Ga(e));
      }
      function a_(e) {
        return gs(new i_(e));
      }
      class tF {
        constructor(t, n) {
          (this.urlSerializer = t), (this.urlTree = n);
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        lineralizeSegments(t, n) {
          let r = [],
            o = n.root;
          for (;;) {
            if (((r = r.concat(o.segments)), 0 === o.numberOfChildren))
              return A(r);
            if (o.numberOfChildren > 1 || !o.children[L])
              return gs(new w(4e3, !1));
            o = o.children[L];
          }
        }
        applyRedirectCommands(t, n, r) {
          return this.applyRedirectCreateUrlTree(
            n,
            this.urlSerializer.parse(n),
            t,
            r
          );
        }
        applyRedirectCreateUrlTree(t, n, r, o) {
          const s = this.createSegmentGroup(t, n.root, r, o);
          return new to(
            s,
            this.createQueryParams(n.queryParams, this.urlTree.queryParams),
            n.fragment
          );
        }
        createQueryParams(t, n) {
          const r = {};
          return (
            Object.entries(t).forEach(([o, s]) => {
              if ("string" == typeof s && s.startsWith(":")) {
                const a = s.substring(1);
                r[o] = n[a];
              } else r[o] = s;
            }),
            r
          );
        }
        createSegmentGroup(t, n, r, o) {
          const s = this.createSegments(t, n.segments, r, o);
          let i = {};
          return (
            Object.entries(n.children).forEach(([a, u]) => {
              i[a] = this.createSegmentGroup(t, u, r, o);
            }),
            new J(s, i)
          );
        }
        createSegments(t, n, r, o) {
          return n.map((s) =>
            s.path.startsWith(":")
              ? this.findPosParam(t, s, o)
              : this.findOrReturn(s, r)
          );
        }
        findPosParam(t, n, r) {
          const o = r[n.path.substring(1)];
          if (!o) throw new w(4001, !1);
          return o;
        }
        findOrReturn(t, n) {
          let r = 0;
          for (const o of n) {
            if (o.path === t.path) return n.splice(r), o;
            r++;
          }
          return t;
        }
      }
      const nf = {
        matched: !1,
        consumedSegments: [],
        remainingSegments: [],
        parameters: {},
        positionalParamSegments: {},
      };
      function nF(e, t, n, r, o) {
        const s = rf(e, t, n);
        return s.matched
          ? ((r = (function IP(e, t) {
              return (
                e.providers &&
                  !e._injector &&
                  (e._injector = Tl(e.providers, t, `Route: ${e.path}`)),
                e._injector ?? t
              );
            })(t, r)),
            (function JP(e, t, n, r) {
              const o = t.canMatch;
              return o && 0 !== o.length
                ? A(
                    o.map((i) => {
                      const a = ro(i, e);
                      return Sn(
                        (function VP(e) {
                          return e && Rs(e.canMatch);
                        })(a)
                          ? a.canMatch(t, n)
                          : e.runInContext(() => a(t, n))
                      );
                    })
                  ).pipe(oo(), s_())
                : A(!0);
            })(r, t, n).pipe(Z((i) => (!0 === i ? s : { ...nf }))))
          : A(s);
      }
      function rf(e, t, n) {
        if ("" === t.path)
          return "full" === t.pathMatch && (e.hasChildren() || n.length > 0)
            ? { ...nf }
            : {
                matched: !0,
                consumedSegments: [],
                remainingSegments: n,
                parameters: {},
                positionalParamSegments: {},
              };
        const o = (t.matcher || PO)(n, e, t);
        if (!o) return { ...nf };
        const s = {};
        Object.entries(o.posParams ?? {}).forEach(([a, u]) => {
          s[a] = u.path;
        });
        const i =
          o.consumed.length > 0
            ? { ...s, ...o.consumed[o.consumed.length - 1].parameters }
            : s;
        return {
          matched: !0,
          consumedSegments: o.consumed,
          remainingSegments: n.slice(o.consumed.length),
          parameters: i,
          positionalParamSegments: o.posParams ?? {},
        };
      }
      function u_(e, t, n, r) {
        return n.length > 0 &&
          (function sF(e, t, n) {
            return n.some((r) => Wa(e, t, r) && At(r) !== L);
          })(e, n, r)
          ? {
              segmentGroup: new J(t, oF(r, new J(n, e.children))),
              slicedSegments: [],
            }
          : 0 === n.length &&
            (function iF(e, t, n) {
              return n.some((r) => Wa(e, t, r));
            })(e, n, r)
          ? {
              segmentGroup: new J(e.segments, rF(e, 0, n, r, e.children)),
              slicedSegments: n,
            }
          : { segmentGroup: new J(e.segments, e.children), slicedSegments: n };
      }
      function rF(e, t, n, r, o) {
        const s = {};
        for (const i of r)
          if (Wa(e, n, i) && !o[At(i)]) {
            const a = new J([], {});
            s[At(i)] = a;
          }
        return { ...o, ...s };
      }
      function oF(e, t) {
        const n = {};
        n[L] = t;
        for (const r of e)
          if ("" === r.path && At(r) !== L) {
            const o = new J([], {});
            n[At(r)] = o;
          }
        return n;
      }
      function Wa(e, t, n) {
        return (
          (!(e.hasChildren() || t.length > 0) || "full" !== n.pathMatch) &&
          "" === n.path
        );
      }
      class lF {
        constructor(t, n, r, o, s, i, a) {
          (this.injector = t),
            (this.configLoader = n),
            (this.rootComponentType = r),
            (this.config = o),
            (this.urlTree = s),
            (this.paramsInheritanceStrategy = i),
            (this.urlSerializer = a),
            (this.allowRedirects = !0),
            (this.applyRedirects = new tF(this.urlSerializer, this.urlTree));
        }
        noMatchError(t) {
          return new w(4002, !1);
        }
        recognize() {
          const t = u_(this.urlTree.root, [], [], this.config).segmentGroup;
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t,
            L
          ).pipe(
            Qn((n) => {
              if (n instanceof i_)
                return (
                  (this.allowRedirects = !1),
                  (this.urlTree = n.urlTree),
                  this.match(n.urlTree)
                );
              throw n instanceof Ga ? this.noMatchError(n) : n;
            }),
            Z((n) => {
              const r = new Ha(
                  [],
                  Object.freeze({}),
                  Object.freeze({ ...this.urlTree.queryParams }),
                  this.urlTree.fragment,
                  {},
                  L,
                  this.rootComponentType,
                  null,
                  {}
                ),
                o = new dn(r, n),
                s = new Yw("", o),
                i = (function eP(e, t, n = null, r = null) {
                  return jw(Lw(e), t, n, r);
                })(r, [], this.urlTree.queryParams, this.urlTree.fragment);
              return (
                (i.queryParams = this.urlTree.queryParams),
                (s.url = this.urlSerializer.serialize(i)),
                this.inheritParamsAndData(s._root),
                { state: s, tree: i }
              );
            })
          );
        }
        match(t) {
          return this.processSegmentGroup(
            this.injector,
            this.config,
            t.root,
            L
          ).pipe(
            Qn((r) => {
              throw r instanceof Ga ? this.noMatchError(r) : r;
            })
          );
        }
        inheritParamsAndData(t) {
          const n = t.value,
            r = Zw(n, this.paramsInheritanceStrategy);
          (n.params = Object.freeze(r.params)),
            (n.data = Object.freeze(r.data)),
            t.children.forEach((o) => this.inheritParamsAndData(o));
        }
        processSegmentGroup(t, n, r, o) {
          return 0 === r.segments.length && r.hasChildren()
            ? this.processChildren(t, n, r)
            : this.processSegment(t, n, r, r.segments, o, !0);
        }
        processChildren(t, n, r) {
          const o = [];
          for (const s of Object.keys(r.children))
            "primary" === s ? o.unshift(s) : o.push(s);
          return ge(o).pipe(
            Kr((s) => {
              const i = r.children[s],
                a = (function AP(e, t) {
                  const n = e.filter((r) => At(r) === t);
                  return n.push(...e.filter((r) => At(r) !== t)), n;
                })(n, s);
              return this.processSegmentGroup(t, a, i, s);
            }),
            (function RO(e, t) {
              return we(
                (function AO(e, t, n, r, o) {
                  return (s, i) => {
                    let a = n,
                      u = t,
                      c = 0;
                    s.subscribe(
                      _e(
                        i,
                        (l) => {
                          const d = c++;
                          (u = a ? e(u, l, d) : ((a = !0), l)), r && i.next(u);
                        },
                        o &&
                          (() => {
                            a && i.next(u), i.complete();
                          })
                      )
                    );
                  };
                })(e, t, arguments.length >= 2, !0)
              );
            })((s, i) => (s.push(...i), s)),
            Pa(null),
            (function NO(e, t) {
              const n = arguments.length >= 2;
              return (r) =>
                r.pipe(
                  e ? ln((o, s) => e(o, s, r)) : hn,
                  $d(1),
                  n ? Pa(t) : bw(() => new Oa())
                );
            })(),
            Ee((s) => {
              if (null === s) return so(r);
              const i = c_(s);
              return (
                (function dF(e) {
                  e.sort((t, n) =>
                    t.value.outlet === L
                      ? -1
                      : n.value.outlet === L
                      ? 1
                      : t.value.outlet.localeCompare(n.value.outlet)
                  );
                })(i),
                A(i)
              );
            })
          );
        }
        processSegment(t, n, r, o, s, i) {
          return ge(n).pipe(
            Kr((a) =>
              this.processSegmentAgainstRoute(
                a._injector ?? t,
                n,
                a,
                r,
                o,
                s,
                i
              ).pipe(
                Qn((u) => {
                  if (u instanceof Ga) return A(null);
                  throw u;
                })
              )
            ),
            Yn((a) => !!a),
            Qn((a) => {
              if (o_(a))
                return (function uF(e, t, n) {
                  return 0 === t.length && !e.children[n];
                })(r, o, s)
                  ? A([])
                  : so(r);
              throw a;
            })
          );
        }
        processSegmentAgainstRoute(t, n, r, o, s, i, a) {
          return (function aF(e, t, n, r) {
            return (
              !!(At(e) === r || (r !== L && Wa(t, n, e))) &&
              ("**" === e.path || rf(t, e, n).matched)
            );
          })(r, o, s, i)
            ? void 0 === r.redirectTo
              ? this.matchSegmentAgainstRoute(t, o, r, s, i, a)
              : a && this.allowRedirects
              ? this.expandSegmentAgainstRouteUsingRedirect(t, o, n, r, s, i)
              : so(o)
            : so(o);
        }
        expandSegmentAgainstRouteUsingRedirect(t, n, r, o, s, i) {
          return "**" === o.path
            ? this.expandWildCardWithParamsAgainstRouteUsingRedirect(t, r, o, i)
            : this.expandRegularSegmentAgainstRouteUsingRedirect(
                t,
                n,
                r,
                o,
                s,
                i
              );
        }
        expandWildCardWithParamsAgainstRouteUsingRedirect(t, n, r, o) {
          const s = this.applyRedirects.applyRedirectCommands(
            [],
            r.redirectTo,
            {}
          );
          return r.redirectTo.startsWith("/")
            ? a_(s)
            : this.applyRedirects.lineralizeSegments(r, s).pipe(
                Ee((i) => {
                  const a = new J(i, {});
                  return this.processSegment(t, n, a, i, o, !1);
                })
              );
        }
        expandRegularSegmentAgainstRouteUsingRedirect(t, n, r, o, s, i) {
          const {
            matched: a,
            consumedSegments: u,
            remainingSegments: c,
            positionalParamSegments: l,
          } = rf(n, o, s);
          if (!a) return so(n);
          const d = this.applyRedirects.applyRedirectCommands(
            u,
            o.redirectTo,
            l
          );
          return o.redirectTo.startsWith("/")
            ? a_(d)
            : this.applyRedirects
                .lineralizeSegments(o, d)
                .pipe(
                  Ee((f) => this.processSegment(t, r, n, f.concat(c), i, !1))
                );
        }
        matchSegmentAgainstRoute(t, n, r, o, s, i) {
          let a;
          if ("**" === r.path) {
            const u = o.length > 0 ? Sw(o).parameters : {};
            (a = A({
              snapshot: new Ha(
                o,
                u,
                Object.freeze({ ...this.urlTree.queryParams }),
                this.urlTree.fragment,
                l_(r),
                At(r),
                r.component ?? r._loadedComponent ?? null,
                r,
                d_(r)
              ),
              consumedSegments: [],
              remainingSegments: [],
            })),
              (n.children = {});
          } else
            a = nF(n, r, o, t).pipe(
              Z(
                ({
                  matched: u,
                  consumedSegments: c,
                  remainingSegments: l,
                  parameters: d,
                }) =>
                  u
                    ? {
                        snapshot: new Ha(
                          c,
                          d,
                          Object.freeze({ ...this.urlTree.queryParams }),
                          this.urlTree.fragment,
                          l_(r),
                          At(r),
                          r.component ?? r._loadedComponent ?? null,
                          r,
                          d_(r)
                        ),
                        consumedSegments: c,
                        remainingSegments: l,
                      }
                    : null
              )
            );
          return a.pipe(
            Dt((u) =>
              null === u
                ? so(n)
                : this.getChildConfig((t = r._injector ?? t), r, o).pipe(
                    Dt(({ routes: c }) => {
                      const l = r._loadedInjector ?? t,
                        {
                          snapshot: d,
                          consumedSegments: f,
                          remainingSegments: h,
                        } = u,
                        { segmentGroup: p, slicedSegments: g } = u_(n, f, h, c);
                      if (0 === g.length && p.hasChildren())
                        return this.processChildren(l, c, p).pipe(
                          Z((y) => (null === y ? null : [new dn(d, y)]))
                        );
                      if (0 === c.length && 0 === g.length)
                        return A([new dn(d, [])]);
                      const v = At(r) === s;
                      return this.processSegment(
                        l,
                        c,
                        p,
                        g,
                        v ? L : s,
                        !0
                      ).pipe(Z((y) => [new dn(d, y)]));
                    })
                  )
            )
          );
        }
        getChildConfig(t, n, r) {
          return n.children
            ? A({ routes: n.children, injector: t })
            : n.loadChildren
            ? void 0 !== n._loadedRoutes
              ? A({ routes: n._loadedRoutes, injector: n._loadedInjector })
              : (function XP(e, t, n, r) {
                  const o = t.canLoad;
                  return void 0 === o || 0 === o.length
                    ? A(!0)
                    : A(
                        o.map((i) => {
                          const a = ro(i, e);
                          return Sn(
                            (function LP(e) {
                              return e && Rs(e.canLoad);
                            })(a)
                              ? a.canLoad(t, n)
                              : e.runInContext(() => a(t, n))
                          );
                        })
                      ).pipe(oo(), s_());
                })(t, n, r).pipe(
                  Ee((o) =>
                    o
                      ? this.configLoader.loadChildren(t, n).pipe(
                          Ve((s) => {
                            (n._loadedRoutes = s.routes),
                              (n._loadedInjector = s.injector);
                          })
                        )
                      : (function eF(e) {
                          return gs(Kw(!1, 3));
                        })()
                  )
                )
            : A({ routes: [], injector: t });
        }
      }
      function fF(e) {
        const t = e.value.routeConfig;
        return t && "" === t.path;
      }
      function c_(e) {
        const t = [],
          n = new Set();
        for (const r of e) {
          if (!fF(r)) {
            t.push(r);
            continue;
          }
          const o = t.find((s) => r.value.routeConfig === s.value.routeConfig);
          void 0 !== o ? (o.children.push(...r.children), n.add(o)) : t.push(r);
        }
        for (const r of n) {
          const o = c_(r.children);
          t.push(new dn(r.value, o));
        }
        return t.filter((r) => !n.has(r));
      }
      function l_(e) {
        return e.data || {};
      }
      function d_(e) {
        return e.resolve || {};
      }
      function f_(e) {
        return "string" == typeof e.title || null === e.title;
      }
      function sf(e) {
        return Dt((t) => {
          const n = e(t);
          return n ? ge(n).pipe(Z(() => t)) : A(t);
        });
      }
      const io = new b("ROUTES");
      let af = (() => {
        var e;
        class t {
          constructor() {
            (this.componentLoaders = new WeakMap()),
              (this.childrenLoaders = new WeakMap()),
              (this.compiler = C(zy));
          }
          loadComponent(r) {
            if (this.componentLoaders.get(r))
              return this.componentLoaders.get(r);
            if (r._loadedComponent) return A(r._loadedComponent);
            this.onLoadStartListener && this.onLoadStartListener(r);
            const o = Sn(r.loadComponent()).pipe(
                Z(h_),
                Ve((i) => {
                  this.onLoadEndListener && this.onLoadEndListener(r),
                    (r._loadedComponent = i);
                }),
                ms(() => {
                  this.componentLoaders.delete(r);
                })
              ),
              s = new Ew(o, () => new Gt()).pipe(Bd());
            return this.componentLoaders.set(r, s), s;
          }
          loadChildren(r, o) {
            if (this.childrenLoaders.get(o)) return this.childrenLoaders.get(o);
            if (o._loadedRoutes)
              return A({
                routes: o._loadedRoutes,
                injector: o._loadedInjector,
              });
            this.onLoadStartListener && this.onLoadStartListener(o);
            const i = this.loadModuleFactoryOrRoutes(o.loadChildren).pipe(
                Z((u) => {
                  this.onLoadEndListener && this.onLoadEndListener(o);
                  let c, l;
                  return (
                    Array.isArray(u)
                      ? (l = u)
                      : ((c = u.create(r).injector),
                        (l = c.get(io, [], B.Self | B.Optional).flat())),
                    { routes: l.map(tf), injector: c }
                  );
                }),
                ms(() => {
                  this.childrenLoaders.delete(o);
                })
              ),
              a = new Ew(i, () => new Gt()).pipe(Bd());
            return this.childrenLoaders.set(o, a), a;
          }
          loadModuleFactoryOrRoutes(r) {
            return Sn(r()).pipe(
              Z(h_),
              Ee((o) =>
                o instanceof Yv || Array.isArray(o)
                  ? A(o)
                  : ge(this.compiler.compileModuleAsync(o))
              )
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function h_(e) {
        return (function DF(e) {
          return e && "object" == typeof e && "default" in e;
        })(e)
          ? e.default
          : e;
      }
      let Za = (() => {
        var e;
        class t {
          get hasRequestedNavigation() {
            return 0 !== this.navigationId;
          }
          constructor() {
            (this.currentNavigation = null),
              (this.lastSuccessfulNavigation = null),
              (this.events = new Gt()),
              (this.configLoader = C(af)),
              (this.environmentInjector = C(ot)),
              (this.urlSerializer = C(Ds)),
              (this.rootContexts = C(Is)),
              (this.inputBindingEnabled = null !== C(Ua, { optional: !0 })),
              (this.navigationId = 0),
              (this.afterPreactivation = () => A(void 0)),
              (this.rootComponentType = null),
              (this.configLoader.onLoadEndListener = (s) =>
                this.events.next(new hP(s))),
              (this.configLoader.onLoadStartListener = (s) =>
                this.events.next(new fP(s)));
          }
          complete() {
            this.transitions?.complete();
          }
          handleNavigationRequest(r) {
            const o = ++this.navigationId;
            this.transitions?.next({ ...this.transitions.value, ...r, id: o });
          }
          setupNavigations(r) {
            return (
              (this.transitions = new dt({
                id: 0,
                currentUrlTree: r.currentUrlTree,
                currentRawUrl: r.currentUrlTree,
                extractedUrl: r.urlHandlingStrategy.extract(r.currentUrlTree),
                urlAfterRedirects: r.urlHandlingStrategy.extract(
                  r.currentUrlTree
                ),
                rawUrl: r.currentUrlTree,
                extras: {},
                resolve: null,
                reject: null,
                promise: Promise.resolve(!0),
                source: Es,
                restoredState: null,
                currentSnapshot: r.routerState.snapshot,
                targetSnapshot: null,
                currentRouterState: r.routerState,
                targetRouterState: null,
                guards: { canActivateChecks: [], canDeactivateChecks: [] },
                guardsResult: null,
              })),
              this.transitions.pipe(
                ln((o) => 0 !== o.id),
                Z((o) => ({
                  ...o,
                  extractedUrl: r.urlHandlingStrategy.extract(o.rawUrl),
                })),
                Dt((o) => {
                  let s = !1,
                    i = !1;
                  return A(o).pipe(
                    Ve((a) => {
                      this.currentNavigation = {
                        id: a.id,
                        initialUrl: a.rawUrl,
                        extractedUrl: a.extractedUrl,
                        trigger: a.source,
                        extras: a.extras,
                        previousNavigation: this.lastSuccessfulNavigation
                          ? {
                              ...this.lastSuccessfulNavigation,
                              previousNavigation: null,
                            }
                          : null,
                      };
                    }),
                    Dt((a) => {
                      const u = r.browserUrlTree.toString(),
                        c =
                          !r.navigated ||
                          a.extractedUrl.toString() !== u ||
                          u !== r.currentUrlTree.toString();
                      if (
                        !c &&
                        "reload" !==
                          (a.extras.onSameUrlNavigation ??
                            r.onSameUrlNavigation)
                      ) {
                        const d = "";
                        return (
                          this.events.next(
                            new bs(a.id, r.serializeUrl(o.rawUrl), d, 0)
                          ),
                          (r.rawUrlTree = a.rawUrl),
                          a.resolve(null),
                          Rt
                        );
                      }
                      if (r.urlHandlingStrategy.shouldProcessUrl(a.rawUrl))
                        return (
                          p_(a.source) && (r.browserUrlTree = a.extractedUrl),
                          A(a).pipe(
                            Dt((d) => {
                              const f = this.transitions?.getValue();
                              return (
                                this.events.next(
                                  new Gd(
                                    d.id,
                                    this.urlSerializer.serialize(
                                      d.extractedUrl
                                    ),
                                    d.source,
                                    d.restoredState
                                  )
                                ),
                                f !== this.transitions?.getValue()
                                  ? Rt
                                  : Promise.resolve(d)
                              );
                            }),
                            (function hF(e, t, n, r, o, s) {
                              return Ee((i) =>
                                (function cF(
                                  e,
                                  t,
                                  n,
                                  r,
                                  o,
                                  s,
                                  i = "emptyOnly"
                                ) {
                                  return new lF(
                                    e,
                                    t,
                                    n,
                                    r,
                                    o,
                                    i,
                                    s
                                  ).recognize();
                                })(e, t, n, r, i.extractedUrl, o, s).pipe(
                                  Z(({ state: a, tree: u }) => ({
                                    ...i,
                                    targetSnapshot: a,
                                    urlAfterRedirects: u,
                                  }))
                                )
                              );
                            })(
                              this.environmentInjector,
                              this.configLoader,
                              this.rootComponentType,
                              r.config,
                              this.urlSerializer,
                              r.paramsInheritanceStrategy
                            ),
                            Ve((d) => {
                              if (
                                ((o.targetSnapshot = d.targetSnapshot),
                                (o.urlAfterRedirects = d.urlAfterRedirects),
                                (this.currentNavigation = {
                                  ...this.currentNavigation,
                                  finalUrl: d.urlAfterRedirects,
                                }),
                                "eager" === r.urlUpdateStrategy)
                              ) {
                                if (!d.extras.skipLocationChange) {
                                  const h = r.urlHandlingStrategy.merge(
                                    d.urlAfterRedirects,
                                    d.rawUrl
                                  );
                                  r.setBrowserUrl(h, d);
                                }
                                r.browserUrlTree = d.urlAfterRedirects;
                              }
                              const f = new aP(
                                d.id,
                                this.urlSerializer.serialize(d.extractedUrl),
                                this.urlSerializer.serialize(
                                  d.urlAfterRedirects
                                ),
                                d.targetSnapshot
                              );
                              this.events.next(f);
                            })
                          )
                        );
                      if (
                        c &&
                        r.urlHandlingStrategy.shouldProcessUrl(r.rawUrlTree)
                      ) {
                        const {
                            id: d,
                            extractedUrl: f,
                            source: h,
                            restoredState: p,
                            extras: g,
                          } = a,
                          v = new Gd(d, this.urlSerializer.serialize(f), h, p);
                        this.events.next(v);
                        const y = Ww(0, this.rootComponentType).snapshot;
                        return A(
                          (o = {
                            ...a,
                            targetSnapshot: y,
                            urlAfterRedirects: f,
                            extras: {
                              ...g,
                              skipLocationChange: !1,
                              replaceUrl: !1,
                            },
                          })
                        );
                      }
                      {
                        const d = "";
                        return (
                          this.events.next(
                            new bs(a.id, r.serializeUrl(o.extractedUrl), d, 1)
                          ),
                          (r.rawUrlTree = a.rawUrl),
                          a.resolve(null),
                          Rt
                        );
                      }
                    }),
                    Ve((a) => {
                      const u = new uP(
                        a.id,
                        this.urlSerializer.serialize(a.extractedUrl),
                        this.urlSerializer.serialize(a.urlAfterRedirects),
                        a.targetSnapshot
                      );
                      this.events.next(u);
                    }),
                    Z(
                      (a) =>
                        (o = {
                          ...a,
                          guards: xP(
                            a.targetSnapshot,
                            a.currentSnapshot,
                            this.rootContexts
                          ),
                        })
                    ),
                    (function UP(e, t) {
                      return Ee((n) => {
                        const {
                          targetSnapshot: r,
                          currentSnapshot: o,
                          guards: {
                            canActivateChecks: s,
                            canDeactivateChecks: i,
                          },
                        } = n;
                        return 0 === i.length && 0 === s.length
                          ? A({ ...n, guardsResult: !0 })
                          : (function zP(e, t, n, r) {
                              return ge(e).pipe(
                                Ee((o) =>
                                  (function QP(e, t, n, r, o) {
                                    const s =
                                      t && t.routeConfig
                                        ? t.routeConfig.canDeactivate
                                        : null;
                                    return s && 0 !== s.length
                                      ? A(
                                          s.map((a) => {
                                            const u = Ms(t) ?? o,
                                              c = ro(a, u);
                                            return Sn(
                                              (function $P(e) {
                                                return e && Rs(e.canDeactivate);
                                              })(c)
                                                ? c.canDeactivate(e, t, n, r)
                                                : u.runInContext(() =>
                                                    c(e, t, n, r)
                                                  )
                                            ).pipe(Yn());
                                          })
                                        ).pipe(oo())
                                      : A(!0);
                                  })(o.component, o.route, n, t, r)
                                ),
                                Yn((o) => !0 !== o, !0)
                              );
                            })(i, r, o, e).pipe(
                              Ee((a) =>
                                a &&
                                (function kP(e) {
                                  return "boolean" == typeof e;
                                })(a)
                                  ? (function qP(e, t, n, r) {
                                      return ge(t).pipe(
                                        Kr((o) =>
                                          jd(
                                            (function WP(e, t) {
                                              return (
                                                null !== e && t && t(new pP(e)),
                                                A(!0)
                                              );
                                            })(o.route.parent, r),
                                            (function GP(e, t) {
                                              return (
                                                null !== e && t && t(new mP(e)),
                                                A(!0)
                                              );
                                            })(o.route, r),
                                            (function YP(e, t, n) {
                                              const r = t[t.length - 1],
                                                s = t
                                                  .slice(0, t.length - 1)
                                                  .reverse()
                                                  .map((i) =>
                                                    (function OP(e) {
                                                      const t = e.routeConfig
                                                        ? e.routeConfig
                                                            .canActivateChild
                                                        : null;
                                                      return t && 0 !== t.length
                                                        ? { node: e, guards: t }
                                                        : null;
                                                    })(i)
                                                  )
                                                  .filter((i) => null !== i)
                                                  .map((i) =>
                                                    Cw(() =>
                                                      A(
                                                        i.guards.map((u) => {
                                                          const c =
                                                              Ms(i.node) ?? n,
                                                            l = ro(u, c);
                                                          return Sn(
                                                            (function BP(e) {
                                                              return (
                                                                e &&
                                                                Rs(
                                                                  e.canActivateChild
                                                                )
                                                              );
                                                            })(l)
                                                              ? l.canActivateChild(
                                                                  r,
                                                                  e
                                                                )
                                                              : c.runInContext(
                                                                  () => l(r, e)
                                                                )
                                                          ).pipe(Yn());
                                                        })
                                                      ).pipe(oo())
                                                    )
                                                  );
                                              return A(s).pipe(oo());
                                            })(e, o.path, n),
                                            (function ZP(e, t, n) {
                                              const r = t.routeConfig
                                                ? t.routeConfig.canActivate
                                                : null;
                                              if (!r || 0 === r.length)
                                                return A(!0);
                                              const o = r.map((s) =>
                                                Cw(() => {
                                                  const i = Ms(t) ?? n,
                                                    a = ro(s, i);
                                                  return Sn(
                                                    (function jP(e) {
                                                      return (
                                                        e && Rs(e.canActivate)
                                                      );
                                                    })(a)
                                                      ? a.canActivate(t, e)
                                                      : i.runInContext(() =>
                                                          a(t, e)
                                                        )
                                                  ).pipe(Yn());
                                                })
                                              );
                                              return A(o).pipe(oo());
                                            })(e, o.route, n)
                                          )
                                        ),
                                        Yn((o) => !0 !== o, !0)
                                      );
                                    })(r, s, e, t)
                                  : A(a)
                              ),
                              Z((a) => ({ ...n, guardsResult: a }))
                            );
                      });
                    })(this.environmentInjector, (a) => this.events.next(a)),
                    Ve((a) => {
                      if (
                        ((o.guardsResult = a.guardsResult), Jn(a.guardsResult))
                      )
                        throw Jw(0, a.guardsResult);
                      const u = new cP(
                        a.id,
                        this.urlSerializer.serialize(a.extractedUrl),
                        this.urlSerializer.serialize(a.urlAfterRedirects),
                        a.targetSnapshot,
                        !!a.guardsResult
                      );
                      this.events.next(u);
                    }),
                    ln(
                      (a) =>
                        !!a.guardsResult ||
                        (r.restoreHistory(a),
                        this.cancelNavigationTransition(a, "", 3),
                        !1)
                    ),
                    sf((a) => {
                      if (a.guards.canActivateChecks.length)
                        return A(a).pipe(
                          Ve((u) => {
                            const c = new lP(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects),
                              u.targetSnapshot
                            );
                            this.events.next(c);
                          }),
                          Dt((u) => {
                            let c = !1;
                            return A(u).pipe(
                              (function pF(e, t) {
                                return Ee((n) => {
                                  const {
                                    targetSnapshot: r,
                                    guards: { canActivateChecks: o },
                                  } = n;
                                  if (!o.length) return A(n);
                                  let s = 0;
                                  return ge(o).pipe(
                                    Kr((i) =>
                                      (function gF(e, t, n, r) {
                                        const o = e.routeConfig,
                                          s = e._resolve;
                                        return (
                                          void 0 !== o?.title &&
                                            !f_(o) &&
                                            (s[vs] = o.title),
                                          (function mF(e, t, n, r) {
                                            const o = (function vF(e) {
                                              return [
                                                ...Object.keys(e),
                                                ...Object.getOwnPropertySymbols(
                                                  e
                                                ),
                                              ];
                                            })(e);
                                            if (0 === o.length) return A({});
                                            const s = {};
                                            return ge(o).pipe(
                                              Ee((i) =>
                                                (function yF(e, t, n, r) {
                                                  const o = Ms(t) ?? r,
                                                    s = ro(e, o);
                                                  return Sn(
                                                    s.resolve
                                                      ? s.resolve(t, n)
                                                      : o.runInContext(() =>
                                                          s(t, n)
                                                        )
                                                  );
                                                })(e[i], t, n, r).pipe(
                                                  Yn(),
                                                  Ve((a) => {
                                                    s[i] = a;
                                                  })
                                                )
                                              ),
                                              $d(1),
                                              (function xO(e) {
                                                return Z(() => e);
                                              })(s),
                                              Qn((i) => (o_(i) ? Rt : gs(i)))
                                            );
                                          })(s, e, t, r).pipe(
                                            Z(
                                              (i) => (
                                                (e._resolvedData = i),
                                                (e.data = Zw(e, n).resolve),
                                                o &&
                                                  f_(o) &&
                                                  (e.data[vs] = o.title),
                                                null
                                              )
                                            )
                                          )
                                        );
                                      })(i.route, r, e, t)
                                    ),
                                    Ve(() => s++),
                                    $d(1),
                                    Ee((i) => (s === o.length ? A(n) : Rt))
                                  );
                                });
                              })(
                                r.paramsInheritanceStrategy,
                                this.environmentInjector
                              ),
                              Ve({
                                next: () => (c = !0),
                                complete: () => {
                                  c ||
                                    (r.restoreHistory(u),
                                    this.cancelNavigationTransition(u, "", 2));
                                },
                              })
                            );
                          }),
                          Ve((u) => {
                            const c = new dP(
                              u.id,
                              this.urlSerializer.serialize(u.extractedUrl),
                              this.urlSerializer.serialize(u.urlAfterRedirects),
                              u.targetSnapshot
                            );
                            this.events.next(c);
                          })
                        );
                    }),
                    sf((a) => {
                      const u = (c) => {
                        const l = [];
                        c.routeConfig?.loadComponent &&
                          !c.routeConfig._loadedComponent &&
                          l.push(
                            this.configLoader.loadComponent(c.routeConfig).pipe(
                              Ve((d) => {
                                c.component = d;
                              }),
                              Z(() => {})
                            )
                          );
                        for (const d of c.children) l.push(...u(d));
                        return l;
                      };
                      return Ld(u(a.targetSnapshot.root)).pipe(Pa(), Jr(1));
                    }),
                    sf(() => this.afterPreactivation()),
                    Z((a) => {
                      const u = (function CP(e, t, n) {
                        const r = Ss(e, t._root, n ? n._root : void 0);
                        return new Gw(r, t);
                      })(
                        r.routeReuseStrategy,
                        a.targetSnapshot,
                        a.currentRouterState
                      );
                      return (o = { ...a, targetRouterState: u });
                    }),
                    Ve((a) => {
                      (r.currentUrlTree = a.urlAfterRedirects),
                        (r.rawUrlTree = r.urlHandlingStrategy.merge(
                          a.urlAfterRedirects,
                          a.rawUrl
                        )),
                        (r.routerState = a.targetRouterState),
                        "deferred" === r.urlUpdateStrategy &&
                          (a.extras.skipLocationChange ||
                            r.setBrowserUrl(r.rawUrlTree, a),
                          (r.browserUrlTree = a.urlAfterRedirects));
                    }),
                    ((e, t, n, r) =>
                      Z(
                        (o) => (
                          new NP(
                            t,
                            o.targetRouterState,
                            o.currentRouterState,
                            n,
                            r
                          ).activate(e),
                          o
                        )
                      ))(
                      this.rootContexts,
                      r.routeReuseStrategy,
                      (a) => this.events.next(a),
                      this.inputBindingEnabled
                    ),
                    Jr(1),
                    Ve({
                      next: (a) => {
                        (s = !0),
                          (this.lastSuccessfulNavigation =
                            this.currentNavigation),
                          (r.navigated = !0),
                          this.events.next(
                            new Kn(
                              a.id,
                              this.urlSerializer.serialize(a.extractedUrl),
                              this.urlSerializer.serialize(r.currentUrlTree)
                            )
                          ),
                          r.titleStrategy?.updateTitle(
                            a.targetRouterState.snapshot
                          ),
                          a.resolve(!0);
                      },
                      complete: () => {
                        s = !0;
                      },
                    }),
                    ms(() => {
                      s || i || this.cancelNavigationTransition(o, "", 1),
                        this.currentNavigation?.id === o.id &&
                          (this.currentNavigation = null);
                    }),
                    Qn((a) => {
                      if (((i = !0), t_(a))) {
                        e_(a) || ((r.navigated = !0), r.restoreHistory(o, !0));
                        const u = new Va(
                          o.id,
                          this.urlSerializer.serialize(o.extractedUrl),
                          a.message,
                          a.cancellationCode
                        );
                        if ((this.events.next(u), e_(a))) {
                          const c = r.urlHandlingStrategy.merge(
                              a.url,
                              r.rawUrlTree
                            ),
                            l = {
                              skipLocationChange: o.extras.skipLocationChange,
                              replaceUrl:
                                "eager" === r.urlUpdateStrategy || p_(o.source),
                            };
                          r.scheduleNavigation(c, Es, null, l, {
                            resolve: o.resolve,
                            reject: o.reject,
                            promise: o.promise,
                          });
                        } else o.resolve(!1);
                      } else {
                        r.restoreHistory(o, !0);
                        const u = new Wd(
                          o.id,
                          this.urlSerializer.serialize(o.extractedUrl),
                          a,
                          o.targetSnapshot ?? void 0
                        );
                        this.events.next(u);
                        try {
                          o.resolve(r.errorHandler(a));
                        } catch (c) {
                          o.reject(c);
                        }
                      }
                      return Rt;
                    })
                  );
                })
              )
            );
          }
          cancelNavigationTransition(r, o, s) {
            const i = new Va(
              r.id,
              this.urlSerializer.serialize(r.extractedUrl),
              o,
              s
            );
            this.events.next(i), r.resolve(!1);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      function p_(e) {
        return e !== Es;
      }
      let g_ = (() => {
          var e;
          class t {
            buildTitle(r) {
              let o,
                s = r.root;
              for (; void 0 !== s; )
                (o = this.getResolvedTitleForRoute(s) ?? o),
                  (s = s.children.find((i) => i.outlet === L));
              return o;
            }
            getResolvedTitleForRoute(r) {
              return r.data[vs];
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return C(wF);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        wF = (() => {
          var e;
          class t extends g_ {
            constructor(r) {
              super(), (this.title = r);
            }
            updateTitle(r) {
              const o = this.buildTitle(r);
              void 0 !== o && this.title.setTitle(o);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(vw));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })(),
        _F = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return C(EF);
              },
              providedIn: "root",
            })),
            t
          );
        })();
      class CF {
        shouldDetach(t) {
          return !1;
        }
        store(t, n) {}
        shouldAttach(t) {
          return !1;
        }
        retrieve(t) {
          return null;
        }
        shouldReuseRoute(t, n) {
          return t.routeConfig === n.routeConfig;
        }
      }
      let EF = (() => {
        var e;
        class t extends CF {}
        return (
          ((e = t).ɵfac = (function () {
            let n;
            return function (o) {
              return (
                n ||
                (n = (function rp(e) {
                  return Zt(() => {
                    const t = e.prototype.constructor,
                      n = t[Yt] || Ku(t),
                      r = Object.prototype;
                    let o = Object.getPrototypeOf(e.prototype).constructor;
                    for (; o && o !== r; ) {
                      const s = o[Yt] || Ku(o);
                      if (s && s !== n) return s;
                      o = Object.getPrototypeOf(o);
                    }
                    return (s) => new s();
                  });
                })(e))
              )(o || e);
            };
          })()),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const Ya = new b("", { providedIn: "root", factory: () => ({}) });
      let bF = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({
              token: e,
              factory: function () {
                return C(IF);
              },
              providedIn: "root",
            })),
            t
          );
        })(),
        IF = (() => {
          var e;
          class t {
            shouldProcessUrl(r) {
              return !0;
            }
            extract(r) {
              return r;
            }
            merge(r, o) {
              return r;
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
            t
          );
        })();
      var Ns = (function (e) {
        return (
          (e[(e.COMPLETE = 0)] = "COMPLETE"),
          (e[(e.FAILED = 1)] = "FAILED"),
          (e[(e.REDIRECTING = 2)] = "REDIRECTING"),
          e
        );
      })(Ns || {});
      function m_(e, t) {
        e.events
          .pipe(
            ln(
              (n) =>
                n instanceof Kn ||
                n instanceof Va ||
                n instanceof Wd ||
                n instanceof bs
            ),
            Z((n) =>
              n instanceof Kn || n instanceof bs
                ? Ns.COMPLETE
                : n instanceof Va && (0 === n.code || 1 === n.code)
                ? Ns.REDIRECTING
                : Ns.FAILED
            ),
            ln((n) => n !== Ns.REDIRECTING),
            Jr(1)
          )
          .subscribe(() => {
            t();
          });
      }
      function SF(e) {
        throw e;
      }
      function MF(e, t, n) {
        return t.parse("/");
      }
      const TF = {
          paths: "exact",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "exact",
        },
        AF = {
          paths: "subset",
          fragment: "ignored",
          matrixParams: "ignored",
          queryParams: "subset",
        };
      let ut = (() => {
        var e;
        class t {
          get navigationId() {
            return this.navigationTransitions.navigationId;
          }
          get browserPageId() {
            if ("computed" === this.canceledNavigationResolution)
              return this.location.getState()?.ɵrouterPageId;
          }
          get events() {
            return this.navigationTransitions.events;
          }
          constructor() {
            (this.disposed = !1),
              (this.currentPageId = 0),
              (this.console = C(Uy)),
              (this.isNgZoneEnabled = !1),
              (this.options = C(Ya, { optional: !0 }) || {}),
              (this.pendingTasks = C(fa)),
              (this.errorHandler = this.options.errorHandler || SF),
              (this.malformedUriErrorHandler =
                this.options.malformedUriErrorHandler || MF),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1),
              (this.urlHandlingStrategy = C(bF)),
              (this.routeReuseStrategy = C(_F)),
              (this.titleStrategy = C(g_)),
              (this.onSameUrlNavigation =
                this.options.onSameUrlNavigation || "ignore"),
              (this.paramsInheritanceStrategy =
                this.options.paramsInheritanceStrategy || "emptyOnly"),
              (this.urlUpdateStrategy =
                this.options.urlUpdateStrategy || "deferred"),
              (this.canceledNavigationResolution =
                this.options.canceledNavigationResolution || "replace"),
              (this.config = C(io, { optional: !0 })?.flat() ?? []),
              (this.navigationTransitions = C(Za)),
              (this.urlSerializer = C(Ds)),
              (this.location = C(dd)),
              (this.componentInputBindingEnabled = !!C(Ua, { optional: !0 })),
              (this.isNgZoneEnabled =
                C(ae) instanceof ae && ae.isInAngularZone()),
              this.resetConfig(this.config),
              (this.currentUrlTree = new to()),
              (this.rawUrlTree = this.currentUrlTree),
              (this.browserUrlTree = this.currentUrlTree),
              (this.routerState = Ww(0, null)),
              this.navigationTransitions.setupNavigations(this).subscribe(
                (r) => {
                  (this.lastSuccessfulId = r.id),
                    (this.currentPageId = this.browserPageId ?? 0);
                },
                (r) => {
                  this.console.warn(`Unhandled Navigation Error: ${r}`);
                }
              );
          }
          resetRootComponentType(r) {
            (this.routerState.root.component = r),
              (this.navigationTransitions.rootComponentType = r);
          }
          initialNavigation() {
            if (
              (this.setUpLocationChangeListener(),
              !this.navigationTransitions.hasRequestedNavigation)
            ) {
              const r = this.location.getState();
              this.navigateToSyncWithBrowser(this.location.path(!0), Es, r);
            }
          }
          setUpLocationChangeListener() {
            this.locationSubscription ||
              (this.locationSubscription = this.location.subscribe((r) => {
                const o = "popstate" === r.type ? "popstate" : "hashchange";
                "popstate" === o &&
                  setTimeout(() => {
                    this.navigateToSyncWithBrowser(r.url, o, r.state);
                  }, 0);
              }));
          }
          navigateToSyncWithBrowser(r, o, s) {
            const i = { replaceUrl: !0 },
              a = s?.navigationId ? s : null;
            if (s) {
              const c = { ...s };
              delete c.navigationId,
                delete c.ɵrouterPageId,
                0 !== Object.keys(c).length && (i.state = c);
            }
            const u = this.parseUrl(r);
            this.scheduleNavigation(u, o, a, i);
          }
          get url() {
            return this.serializeUrl(this.currentUrlTree);
          }
          getCurrentNavigation() {
            return this.navigationTransitions.currentNavigation;
          }
          get lastSuccessfulNavigation() {
            return this.navigationTransitions.lastSuccessfulNavigation;
          }
          resetConfig(r) {
            (this.config = r.map(tf)),
              (this.navigated = !1),
              (this.lastSuccessfulId = -1);
          }
          ngOnDestroy() {
            this.dispose();
          }
          dispose() {
            this.navigationTransitions.complete(),
              this.locationSubscription &&
                (this.locationSubscription.unsubscribe(),
                (this.locationSubscription = void 0)),
              (this.disposed = !0);
          }
          createUrlTree(r, o = {}) {
            const {
                relativeTo: s,
                queryParams: i,
                fragment: a,
                queryParamsHandling: u,
                preserveFragment: c,
              } = o,
              l = c ? this.currentUrlTree.fragment : a;
            let f,
              d = null;
            switch (u) {
              case "merge":
                d = { ...this.currentUrlTree.queryParams, ...i };
                break;
              case "preserve":
                d = this.currentUrlTree.queryParams;
                break;
              default:
                d = i || null;
            }
            null !== d && (d = this.removeEmptyProps(d));
            try {
              f = Lw(s ? s.snapshot : this.routerState.snapshot.root);
            } catch {
              ("string" != typeof r[0] || !r[0].startsWith("/")) && (r = []),
                (f = this.currentUrlTree.root);
            }
            return jw(f, r, d, l ?? null);
          }
          navigateByUrl(r, o = { skipLocationChange: !1 }) {
            const s = Jn(r) ? r : this.parseUrl(r),
              i = this.urlHandlingStrategy.merge(s, this.rawUrlTree);
            return this.scheduleNavigation(i, Es, null, o);
          }
          navigate(r, o = { skipLocationChange: !1 }) {
            return (
              (function RF(e) {
                for (let t = 0; t < e.length; t++)
                  if (null == e[t]) throw new w(4008, !1);
              })(r),
              this.navigateByUrl(this.createUrlTree(r, o), o)
            );
          }
          serializeUrl(r) {
            return this.urlSerializer.serialize(r);
          }
          parseUrl(r) {
            let o;
            try {
              o = this.urlSerializer.parse(r);
            } catch (s) {
              o = this.malformedUriErrorHandler(s, this.urlSerializer, r);
            }
            return o;
          }
          isActive(r, o) {
            let s;
            if (((s = !0 === o ? { ...TF } : !1 === o ? { ...AF } : o), Jn(r)))
              return Tw(this.currentUrlTree, r, s);
            const i = this.parseUrl(r);
            return Tw(this.currentUrlTree, i, s);
          }
          removeEmptyProps(r) {
            return Object.keys(r).reduce((o, s) => {
              const i = r[s];
              return null != i && (o[s] = i), o;
            }, {});
          }
          scheduleNavigation(r, o, s, i, a) {
            if (this.disposed) return Promise.resolve(!1);
            let u, c, l;
            a
              ? ((u = a.resolve), (c = a.reject), (l = a.promise))
              : (l = new Promise((f, h) => {
                  (u = f), (c = h);
                }));
            const d = this.pendingTasks.add();
            return (
              m_(this, () => {
                queueMicrotask(() => this.pendingTasks.remove(d));
              }),
              this.navigationTransitions.handleNavigationRequest({
                source: o,
                restoredState: s,
                currentUrlTree: this.currentUrlTree,
                currentRawUrl: this.currentUrlTree,
                rawUrl: r,
                extras: i,
                resolve: u,
                reject: c,
                promise: l,
                currentSnapshot: this.routerState.snapshot,
                currentRouterState: this.routerState,
              }),
              l.catch((f) => Promise.reject(f))
            );
          }
          setBrowserUrl(r, o) {
            const s = this.urlSerializer.serialize(r);
            if (this.location.isCurrentPathEqualTo(s) || o.extras.replaceUrl) {
              const a = {
                ...o.extras.state,
                ...this.generateNgRouterState(o.id, this.browserPageId),
              };
              this.location.replaceState(s, "", a);
            } else {
              const i = {
                ...o.extras.state,
                ...this.generateNgRouterState(
                  o.id,
                  (this.browserPageId ?? 0) + 1
                ),
              };
              this.location.go(s, "", i);
            }
          }
          restoreHistory(r, o = !1) {
            if ("computed" === this.canceledNavigationResolution) {
              const i =
                this.currentPageId - (this.browserPageId ?? this.currentPageId);
              0 !== i
                ? this.location.historyGo(i)
                : this.currentUrlTree ===
                    this.getCurrentNavigation()?.finalUrl &&
                  0 === i &&
                  (this.resetState(r),
                  (this.browserUrlTree = r.currentUrlTree),
                  this.resetUrlToCurrentUrlTree());
            } else
              "replace" === this.canceledNavigationResolution &&
                (o && this.resetState(r), this.resetUrlToCurrentUrlTree());
          }
          resetState(r) {
            (this.routerState = r.currentRouterState),
              (this.currentUrlTree = r.currentUrlTree),
              (this.rawUrlTree = this.urlHandlingStrategy.merge(
                this.currentUrlTree,
                r.rawUrl
              ));
          }
          resetUrlToCurrentUrlTree() {
            this.location.replaceState(
              this.urlSerializer.serialize(this.rawUrlTree),
              "",
              this.generateNgRouterState(
                this.lastSuccessfulId,
                this.currentPageId
              )
            );
          }
          generateNgRouterState(r, o) {
            return "computed" === this.canceledNavigationResolution
              ? { navigationId: r, ɵrouterPageId: o }
              : { navigationId: r };
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      class v_ {}
      let OF = (() => {
        var e;
        class t {
          constructor(r, o, s, i, a) {
            (this.router = r),
              (this.injector = s),
              (this.preloadingStrategy = i),
              (this.loader = a);
          }
          setUpPreloading() {
            this.subscription = this.router.events
              .pipe(
                ln((r) => r instanceof Kn),
                Kr(() => this.preload())
              )
              .subscribe(() => {});
          }
          preload() {
            return this.processRoutes(this.injector, this.router.config);
          }
          ngOnDestroy() {
            this.subscription && this.subscription.unsubscribe();
          }
          processRoutes(r, o) {
            const s = [];
            for (const i of o) {
              i.providers &&
                !i._injector &&
                (i._injector = Tl(i.providers, r, `Route: ${i.path}`));
              const a = i._injector ?? r,
                u = i._loadedInjector ?? a;
              ((i.loadChildren && !i._loadedRoutes && void 0 === i.canLoad) ||
                (i.loadComponent && !i._loadedComponent)) &&
                s.push(this.preloadConfig(a, i)),
                (i.children || i._loadedRoutes) &&
                  s.push(this.processRoutes(u, i.children ?? i._loadedRoutes));
            }
            return ge(s).pipe(rr());
          }
          preloadConfig(r, o) {
            return this.preloadingStrategy.preload(o, () => {
              let s;
              s =
                o.loadChildren && void 0 === o.canLoad
                  ? this.loader.loadChildren(r, o)
                  : A(null);
              const i = s.pipe(
                Ee((a) =>
                  null === a
                    ? A(void 0)
                    : ((o._loadedRoutes = a.routes),
                      (o._loadedInjector = a.injector),
                      this.processRoutes(a.injector ?? r, a.routes))
                )
              );
              return o.loadComponent && !o._loadedComponent
                ? ge([i, this.loader.loadComponent(o)]).pipe(rr())
                : i;
            });
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(ut), I(zy), I(ot), I(v_), I(af));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac, providedIn: "root" })),
          t
        );
      })();
      const cf = new b("");
      let y_ = (() => {
        var e;
        class t {
          constructor(r, o, s, i, a = {}) {
            (this.urlSerializer = r),
              (this.transitions = o),
              (this.viewportScroller = s),
              (this.zone = i),
              (this.options = a),
              (this.lastId = 0),
              (this.lastSource = "imperative"),
              (this.restoredId = 0),
              (this.store = {}),
              (a.scrollPositionRestoration =
                a.scrollPositionRestoration || "disabled"),
              (a.anchorScrolling = a.anchorScrolling || "disabled");
          }
          init() {
            "disabled" !== this.options.scrollPositionRestoration &&
              this.viewportScroller.setHistoryScrollRestoration("manual"),
              (this.routerEventsSubscription = this.createScrollEvents()),
              (this.scrollEventsSubscription = this.consumeScrollEvents());
          }
          createScrollEvents() {
            return this.transitions.events.subscribe((r) => {
              r instanceof Gd
                ? ((this.store[this.lastId] =
                    this.viewportScroller.getScrollPosition()),
                  (this.lastSource = r.navigationTrigger),
                  (this.restoredId = r.restoredState
                    ? r.restoredState.navigationId
                    : 0))
                : r instanceof Kn
                ? ((this.lastId = r.id),
                  this.scheduleScrollEvent(
                    r,
                    this.urlSerializer.parse(r.urlAfterRedirects).fragment
                  ))
                : r instanceof bs &&
                  0 === r.code &&
                  ((this.lastSource = void 0),
                  (this.restoredId = 0),
                  this.scheduleScrollEvent(
                    r,
                    this.urlSerializer.parse(r.url).fragment
                  ));
            });
          }
          consumeScrollEvents() {
            return this.transitions.events.subscribe((r) => {
              r instanceof zw &&
                (r.position
                  ? "top" === this.options.scrollPositionRestoration
                    ? this.viewportScroller.scrollToPosition([0, 0])
                    : "enabled" === this.options.scrollPositionRestoration &&
                      this.viewportScroller.scrollToPosition(r.position)
                  : r.anchor && "enabled" === this.options.anchorScrolling
                  ? this.viewportScroller.scrollToAnchor(r.anchor)
                  : "disabled" !== this.options.scrollPositionRestoration &&
                    this.viewportScroller.scrollToPosition([0, 0]));
            });
          }
          scheduleScrollEvent(r, o) {
            this.zone.runOutsideAngular(() => {
              setTimeout(() => {
                this.zone.run(() => {
                  this.transitions.events.next(
                    new zw(
                      r,
                      "popstate" === this.lastSource
                        ? this.store[this.restoredId]
                        : null,
                      o
                    )
                  );
                });
              }, 0);
            });
          }
          ngOnDestroy() {
            this.routerEventsSubscription?.unsubscribe(),
              this.scrollEventsSubscription?.unsubscribe();
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            !(function kg() {
              throw new Error("invalid");
            })();
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function fn(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function w_() {
        const e = C(pt);
        return (t) => {
          const n = e.get(Yr);
          if (t !== n.components[0]) return;
          const r = e.get(ut),
            o = e.get(__);
          1 === e.get(lf) && r.initialNavigation(),
            e.get(C_, null, B.Optional)?.setUpPreloading(),
            e.get(cf, null, B.Optional)?.init(),
            r.resetRootComponentType(n.componentTypes[0]),
            o.closed || (o.next(), o.complete(), o.unsubscribe());
        };
      }
      const __ = new b("", { factory: () => new Gt() }),
        lf = new b("", { providedIn: "root", factory: () => 1 }),
        C_ = new b("");
      function LF(e) {
        return fn(0, [
          { provide: C_, useExisting: OF },
          { provide: v_, useExisting: e },
        ]);
      }
      const E_ = new b("ROUTER_FORROOT_GUARD"),
        BF = [
          dd,
          { provide: Ds, useClass: Vd },
          ut,
          Is,
          {
            provide: er,
            useFactory: function D_(e) {
              return e.routerState.root;
            },
            deps: [ut],
          },
          af,
          [],
        ];
      function $F() {
        return new nD("Router", ut);
      }
      let b_ = (() => {
        var e;
        class t {
          constructor(r) {}
          static forRoot(r, o) {
            return {
              ngModule: t,
              providers: [
                BF,
                [],
                { provide: io, multi: !0, useValue: r },
                {
                  provide: E_,
                  useFactory: zF,
                  deps: [[ut, new hi(), new pi()]],
                },
                { provide: Ya, useValue: o || {} },
                o?.useHash
                  ? { provide: Zn, useClass: Y1 }
                  : { provide: Zn, useClass: ND },
                {
                  provide: cf,
                  useFactory: () => {
                    const e = C(gx),
                      t = C(ae),
                      n = C(Ya),
                      r = C(Za),
                      o = C(Ds);
                    return (
                      n.scrollOffset && e.setOffset(n.scrollOffset),
                      new y_(o, r, e, t, n)
                    );
                  },
                },
                o?.preloadingStrategy
                  ? LF(o.preloadingStrategy).ɵproviders
                  : [],
                { provide: nD, multi: !0, useFactory: $F },
                o?.initialNavigation ? qF(o) : [],
                o?.bindToComponentInputs
                  ? fn(8, [Xw, { provide: Ua, useExisting: Xw }]).ɵproviders
                  : [],
                [
                  { provide: I_, useFactory: w_ },
                  { provide: Kl, multi: !0, useExisting: I_ },
                ],
              ],
            };
          }
          static forChild(r) {
            return {
              ngModule: t,
              providers: [{ provide: io, multi: !0, useValue: r }],
            };
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(E_, 8));
          }),
          (e.ɵmod = Qt({ type: e })),
          (e.ɵinj = Nt({})),
          t
        );
      })();
      function zF(e) {
        return "guarded";
      }
      function qF(e) {
        return [
          "disabled" === e.initialNavigation
            ? fn(3, [
                {
                  provide: Ul,
                  multi: !0,
                  useFactory: () => {
                    const t = C(ut);
                    return () => {
                      t.setUpLocationChangeListener();
                    };
                  },
                },
                { provide: lf, useValue: 2 },
              ]).ɵproviders
            : [],
          "enabledBlocking" === e.initialNavigation
            ? fn(2, [
                { provide: lf, useValue: 0 },
                {
                  provide: Ul,
                  multi: !0,
                  deps: [pt],
                  useFactory: (t) => {
                    const n = t.get(W1, Promise.resolve());
                    return () =>
                      n.then(
                        () =>
                          new Promise((r) => {
                            const o = t.get(ut),
                              s = t.get(__);
                            m_(o, () => {
                              r(!0);
                            }),
                              (t.get(Za).afterPreactivation = () => (
                                r(!0), s.closed ? A(void 0) : s
                              )),
                              o.initialNavigation();
                          })
                      );
                  },
                },
              ]).ɵproviders
            : [],
        ];
      }
      const I_ = new b("");
      let WF = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵcmp = xn({
            type: e,
            selectors: [["app-root"]],
            decls: 1,
            vars: 0,
            template: function (r, o) {
              1 & r && ke(0, "router-outlet");
            },
            dependencies: [Kd],
            encapsulation: 2,
          })),
          t
        );
      })();
      class Qa {}
      class Xa {}
      class qt {
        constructor(t) {
          (this.normalizedNames = new Map()),
            (this.lazyUpdate = null),
            t
              ? "string" == typeof t
                ? (this.lazyInit = () => {
                    (this.headers = new Map()),
                      t.split("\n").forEach((n) => {
                        const r = n.indexOf(":");
                        if (r > 0) {
                          const o = n.slice(0, r),
                            s = o.toLowerCase(),
                            i = n.slice(r + 1).trim();
                          this.maybeSetNormalizedName(o, s),
                            this.headers.has(s)
                              ? this.headers.get(s).push(i)
                              : this.headers.set(s, [i]);
                        }
                      });
                  })
                : typeof Headers < "u" && t instanceof Headers
                ? ((this.headers = new Map()),
                  t.forEach((n, r) => {
                    this.setHeaderEntries(r, n);
                  }))
                : (this.lazyInit = () => {
                    (this.headers = new Map()),
                      Object.entries(t).forEach(([n, r]) => {
                        this.setHeaderEntries(n, r);
                      });
                  })
              : (this.headers = new Map());
        }
        has(t) {
          return this.init(), this.headers.has(t.toLowerCase());
        }
        get(t) {
          this.init();
          const n = this.headers.get(t.toLowerCase());
          return n && n.length > 0 ? n[0] : null;
        }
        keys() {
          return this.init(), Array.from(this.normalizedNames.values());
        }
        getAll(t) {
          return this.init(), this.headers.get(t.toLowerCase()) || null;
        }
        append(t, n) {
          return this.clone({ name: t, value: n, op: "a" });
        }
        set(t, n) {
          return this.clone({ name: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ name: t, value: n, op: "d" });
        }
        maybeSetNormalizedName(t, n) {
          this.normalizedNames.has(n) || this.normalizedNames.set(n, t);
        }
        init() {
          this.lazyInit &&
            (this.lazyInit instanceof qt
              ? this.copyFrom(this.lazyInit)
              : this.lazyInit(),
            (this.lazyInit = null),
            this.lazyUpdate &&
              (this.lazyUpdate.forEach((t) => this.applyUpdate(t)),
              (this.lazyUpdate = null)));
        }
        copyFrom(t) {
          t.init(),
            Array.from(t.headers.keys()).forEach((n) => {
              this.headers.set(n, t.headers.get(n)),
                this.normalizedNames.set(n, t.normalizedNames.get(n));
            });
        }
        clone(t) {
          const n = new qt();
          return (
            (n.lazyInit =
              this.lazyInit && this.lazyInit instanceof qt
                ? this.lazyInit
                : this),
            (n.lazyUpdate = (this.lazyUpdate || []).concat([t])),
            n
          );
        }
        applyUpdate(t) {
          const n = t.name.toLowerCase();
          switch (t.op) {
            case "a":
            case "s":
              let r = t.value;
              if (("string" == typeof r && (r = [r]), 0 === r.length)) return;
              this.maybeSetNormalizedName(t.name, n);
              const o = ("a" === t.op ? this.headers.get(n) : void 0) || [];
              o.push(...r), this.headers.set(n, o);
              break;
            case "d":
              const s = t.value;
              if (s) {
                let i = this.headers.get(n);
                if (!i) return;
                (i = i.filter((a) => -1 === s.indexOf(a))),
                  0 === i.length
                    ? (this.headers.delete(n), this.normalizedNames.delete(n))
                    : this.headers.set(n, i);
              } else this.headers.delete(n), this.normalizedNames.delete(n);
          }
        }
        setHeaderEntries(t, n) {
          const r = (Array.isArray(n) ? n : [n]).map((s) => s.toString()),
            o = t.toLowerCase();
          this.headers.set(o, r), this.maybeSetNormalizedName(t, o);
        }
        forEach(t) {
          this.init(),
            Array.from(this.normalizedNames.keys()).forEach((n) =>
              t(this.normalizedNames.get(n), this.headers.get(n))
            );
        }
      }
      class ZF {
        encodeKey(t) {
          return S_(t);
        }
        encodeValue(t) {
          return S_(t);
        }
        decodeKey(t) {
          return decodeURIComponent(t);
        }
        decodeValue(t) {
          return decodeURIComponent(t);
        }
      }
      const QF = /%(\d[a-f0-9])/gi,
        XF = {
          40: "@",
          "3A": ":",
          24: "$",
          "2C": ",",
          "3B": ";",
          "3D": "=",
          "3F": "?",
          "2F": "/",
        };
      function S_(e) {
        return encodeURIComponent(e).replace(QF, (t, n) => XF[n] ?? t);
      }
      function Ja(e) {
        return `${e}`;
      }
      class Mn {
        constructor(t = {}) {
          if (
            ((this.updates = null),
            (this.cloneFrom = null),
            (this.encoder = t.encoder || new ZF()),
            t.fromString)
          ) {
            if (t.fromObject)
              throw new Error("Cannot specify both fromString and fromObject.");
            this.map = (function YF(e, t) {
              const n = new Map();
              return (
                e.length > 0 &&
                  e
                    .replace(/^\?/, "")
                    .split("&")
                    .forEach((o) => {
                      const s = o.indexOf("="),
                        [i, a] =
                          -1 == s
                            ? [t.decodeKey(o), ""]
                            : [
                                t.decodeKey(o.slice(0, s)),
                                t.decodeValue(o.slice(s + 1)),
                              ],
                        u = n.get(i) || [];
                      u.push(a), n.set(i, u);
                    }),
                n
              );
            })(t.fromString, this.encoder);
          } else
            t.fromObject
              ? ((this.map = new Map()),
                Object.keys(t.fromObject).forEach((n) => {
                  const r = t.fromObject[n],
                    o = Array.isArray(r) ? r.map(Ja) : [Ja(r)];
                  this.map.set(n, o);
                }))
              : (this.map = null);
        }
        has(t) {
          return this.init(), this.map.has(t);
        }
        get(t) {
          this.init();
          const n = this.map.get(t);
          return n ? n[0] : null;
        }
        getAll(t) {
          return this.init(), this.map.get(t) || null;
        }
        keys() {
          return this.init(), Array.from(this.map.keys());
        }
        append(t, n) {
          return this.clone({ param: t, value: n, op: "a" });
        }
        appendAll(t) {
          const n = [];
          return (
            Object.keys(t).forEach((r) => {
              const o = t[r];
              Array.isArray(o)
                ? o.forEach((s) => {
                    n.push({ param: r, value: s, op: "a" });
                  })
                : n.push({ param: r, value: o, op: "a" });
            }),
            this.clone(n)
          );
        }
        set(t, n) {
          return this.clone({ param: t, value: n, op: "s" });
        }
        delete(t, n) {
          return this.clone({ param: t, value: n, op: "d" });
        }
        toString() {
          return (
            this.init(),
            this.keys()
              .map((t) => {
                const n = this.encoder.encodeKey(t);
                return this.map
                  .get(t)
                  .map((r) => n + "=" + this.encoder.encodeValue(r))
                  .join("&");
              })
              .filter((t) => "" !== t)
              .join("&")
          );
        }
        clone(t) {
          const n = new Mn({ encoder: this.encoder });
          return (
            (n.cloneFrom = this.cloneFrom || this),
            (n.updates = (this.updates || []).concat(t)),
            n
          );
        }
        init() {
          null === this.map && (this.map = new Map()),
            null !== this.cloneFrom &&
              (this.cloneFrom.init(),
              this.cloneFrom
                .keys()
                .forEach((t) => this.map.set(t, this.cloneFrom.map.get(t))),
              this.updates.forEach((t) => {
                switch (t.op) {
                  case "a":
                  case "s":
                    const n =
                      ("a" === t.op ? this.map.get(t.param) : void 0) || [];
                    n.push(Ja(t.value)), this.map.set(t.param, n);
                    break;
                  case "d":
                    if (void 0 === t.value) {
                      this.map.delete(t.param);
                      break;
                    }
                    {
                      let r = this.map.get(t.param) || [];
                      const o = r.indexOf(Ja(t.value));
                      -1 !== o && r.splice(o, 1),
                        r.length > 0
                          ? this.map.set(t.param, r)
                          : this.map.delete(t.param);
                    }
                }
              }),
              (this.cloneFrom = this.updates = null));
        }
      }
      class JF {
        constructor() {
          this.map = new Map();
        }
        set(t, n) {
          return this.map.set(t, n), this;
        }
        get(t) {
          return (
            this.map.has(t) || this.map.set(t, t.defaultValue()),
            this.map.get(t)
          );
        }
        delete(t) {
          return this.map.delete(t), this;
        }
        has(t) {
          return this.map.has(t);
        }
        keys() {
          return this.map.keys();
        }
      }
      function M_(e) {
        return typeof ArrayBuffer < "u" && e instanceof ArrayBuffer;
      }
      function T_(e) {
        return typeof Blob < "u" && e instanceof Blob;
      }
      function A_(e) {
        return typeof FormData < "u" && e instanceof FormData;
      }
      class xs {
        constructor(t, n, r, o) {
          let s;
          if (
            ((this.url = n),
            (this.body = null),
            (this.reportProgress = !1),
            (this.withCredentials = !1),
            (this.responseType = "json"),
            (this.method = t.toUpperCase()),
            (function KF(e) {
              switch (e) {
                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "JSONP":
                  return !1;
                default:
                  return !0;
              }
            })(this.method) || o
              ? ((this.body = void 0 !== r ? r : null), (s = o))
              : (s = r),
            s &&
              ((this.reportProgress = !!s.reportProgress),
              (this.withCredentials = !!s.withCredentials),
              s.responseType && (this.responseType = s.responseType),
              s.headers && (this.headers = s.headers),
              s.context && (this.context = s.context),
              s.params && (this.params = s.params)),
            this.headers || (this.headers = new qt()),
            this.context || (this.context = new JF()),
            this.params)
          ) {
            const i = this.params.toString();
            if (0 === i.length) this.urlWithParams = n;
            else {
              const a = n.indexOf("?");
              this.urlWithParams =
                n + (-1 === a ? "?" : a < n.length - 1 ? "&" : "") + i;
            }
          } else (this.params = new Mn()), (this.urlWithParams = n);
        }
        serializeBody() {
          return null === this.body
            ? null
            : M_(this.body) ||
              T_(this.body) ||
              A_(this.body) ||
              (function ek(e) {
                return (
                  typeof URLSearchParams < "u" && e instanceof URLSearchParams
                );
              })(this.body) ||
              "string" == typeof this.body
            ? this.body
            : this.body instanceof Mn
            ? this.body.toString()
            : "object" == typeof this.body ||
              "boolean" == typeof this.body ||
              Array.isArray(this.body)
            ? JSON.stringify(this.body)
            : this.body.toString();
        }
        detectContentTypeHeader() {
          return null === this.body || A_(this.body)
            ? null
            : T_(this.body)
            ? this.body.type || null
            : M_(this.body)
            ? null
            : "string" == typeof this.body
            ? "text/plain"
            : this.body instanceof Mn
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "object" == typeof this.body ||
              "number" == typeof this.body ||
              "boolean" == typeof this.body
            ? "application/json"
            : null;
        }
        clone(t = {}) {
          const n = t.method || this.method,
            r = t.url || this.url,
            o = t.responseType || this.responseType,
            s = void 0 !== t.body ? t.body : this.body,
            i =
              void 0 !== t.withCredentials
                ? t.withCredentials
                : this.withCredentials,
            a =
              void 0 !== t.reportProgress
                ? t.reportProgress
                : this.reportProgress;
          let u = t.headers || this.headers,
            c = t.params || this.params;
          const l = t.context ?? this.context;
          return (
            void 0 !== t.setHeaders &&
              (u = Object.keys(t.setHeaders).reduce(
                (d, f) => d.set(f, t.setHeaders[f]),
                u
              )),
            t.setParams &&
              (c = Object.keys(t.setParams).reduce(
                (d, f) => d.set(f, t.setParams[f]),
                c
              )),
            new xs(n, r, s, {
              params: c,
              headers: u,
              context: l,
              reportProgress: a,
              responseType: o,
              withCredentials: i,
            })
          );
        }
      }
      var ao = (function (e) {
        return (
          (e[(e.Sent = 0)] = "Sent"),
          (e[(e.UploadProgress = 1)] = "UploadProgress"),
          (e[(e.ResponseHeader = 2)] = "ResponseHeader"),
          (e[(e.DownloadProgress = 3)] = "DownloadProgress"),
          (e[(e.Response = 4)] = "Response"),
          (e[(e.User = 5)] = "User"),
          e
        );
      })(ao || {});
      class df {
        constructor(t, n = 200, r = "OK") {
          (this.headers = t.headers || new qt()),
            (this.status = void 0 !== t.status ? t.status : n),
            (this.statusText = t.statusText || r),
            (this.url = t.url || null),
            (this.ok = this.status >= 200 && this.status < 300);
        }
      }
      class ff extends df {
        constructor(t = {}) {
          super(t), (this.type = ao.ResponseHeader);
        }
        clone(t = {}) {
          return new ff({
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class uo extends df {
        constructor(t = {}) {
          super(t),
            (this.type = ao.Response),
            (this.body = void 0 !== t.body ? t.body : null);
        }
        clone(t = {}) {
          return new uo({
            body: void 0 !== t.body ? t.body : this.body,
            headers: t.headers || this.headers,
            status: void 0 !== t.status ? t.status : this.status,
            statusText: t.statusText || this.statusText,
            url: t.url || this.url || void 0,
          });
        }
      }
      class R_ extends df {
        constructor(t) {
          super(t, 0, "Unknown Error"),
            (this.name = "HttpErrorResponse"),
            (this.ok = !1),
            (this.message =
              this.status >= 200 && this.status < 300
                ? `Http failure during parsing for ${t.url || "(unknown url)"}`
                : `Http failure response for ${t.url || "(unknown url)"}: ${
                    t.status
                  } ${t.statusText}`),
            (this.error = t.error || null);
        }
      }
      function hf(e, t) {
        return {
          body: t,
          headers: e.headers,
          context: e.context,
          observe: e.observe,
          params: e.params,
          reportProgress: e.reportProgress,
          responseType: e.responseType,
          withCredentials: e.withCredentials,
        };
      }
      let N_ = (() => {
        var e;
        class t {
          constructor(r) {
            this.handler = r;
          }
          request(r, o, s = {}) {
            let i;
            if (r instanceof xs) i = r;
            else {
              let c, l;
              (c = s.headers instanceof qt ? s.headers : new qt(s.headers)),
                s.params &&
                  (l =
                    s.params instanceof Mn
                      ? s.params
                      : new Mn({ fromObject: s.params })),
                (i = new xs(r, o, void 0 !== s.body ? s.body : null, {
                  headers: c,
                  context: s.context,
                  params: l,
                  reportProgress: s.reportProgress,
                  responseType: s.responseType || "json",
                  withCredentials: s.withCredentials,
                }));
            }
            const a = A(i).pipe(Kr((c) => this.handler.handle(c)));
            if (r instanceof xs || "events" === s.observe) return a;
            const u = a.pipe(ln((c) => c instanceof uo));
            switch (s.observe || "body") {
              case "body":
                switch (i.responseType) {
                  case "arraybuffer":
                    return u.pipe(
                      Z((c) => {
                        if (null !== c.body && !(c.body instanceof ArrayBuffer))
                          throw new Error("Response is not an ArrayBuffer.");
                        return c.body;
                      })
                    );
                  case "blob":
                    return u.pipe(
                      Z((c) => {
                        if (null !== c.body && !(c.body instanceof Blob))
                          throw new Error("Response is not a Blob.");
                        return c.body;
                      })
                    );
                  case "text":
                    return u.pipe(
                      Z((c) => {
                        if (null !== c.body && "string" != typeof c.body)
                          throw new Error("Response is not a string.");
                        return c.body;
                      })
                    );
                  default:
                    return u.pipe(Z((c) => c.body));
                }
              case "response":
                return u;
              default:
                throw new Error(
                  `Unreachable: unhandled observe type ${s.observe}}`
                );
            }
          }
          delete(r, o = {}) {
            return this.request("DELETE", r, o);
          }
          get(r, o = {}) {
            return this.request("GET", r, o);
          }
          head(r, o = {}) {
            return this.request("HEAD", r, o);
          }
          jsonp(r, o) {
            return this.request("JSONP", r, {
              params: new Mn().append(o, "JSONP_CALLBACK"),
              observe: "body",
              responseType: "json",
            });
          }
          options(r, o = {}) {
            return this.request("OPTIONS", r, o);
          }
          patch(r, o, s = {}) {
            return this.request("PATCH", r, hf(s, o));
          }
          post(r, o, s = {}) {
            return this.request("POST", r, hf(s, o));
          }
          put(r, o, s = {}) {
            return this.request("PUT", r, hf(s, o));
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(Qa));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function P_(e, t) {
        return t(e);
      }
      function nk(e, t) {
        return (n, r) => t.intercept(n, { handle: (o) => e(o, r) });
      }
      const ok = new b(""),
        Os = new b(""),
        F_ = new b("");
      function sk() {
        let e = null;
        return (t, n) => {
          null === e &&
            (e = (C(ok, { optional: !0 }) ?? []).reduceRight(nk, P_));
          const r = C(fa),
            o = r.add();
          return e(t, n).pipe(ms(() => r.remove(o)));
        };
      }
      let k_ = (() => {
        var e;
        class t extends Qa {
          constructor(r, o) {
            super(),
              (this.backend = r),
              (this.injector = o),
              (this.chain = null),
              (this.pendingTasks = C(fa));
          }
          handle(r) {
            if (null === this.chain) {
              const s = Array.from(
                new Set([
                  ...this.injector.get(Os),
                  ...this.injector.get(F_, []),
                ])
              );
              this.chain = s.reduceRight(
                (i, a) =>
                  (function rk(e, t, n) {
                    return (r, o) => n.runInContext(() => t(r, (s) => e(s, o)));
                  })(i, a, this.injector),
                P_
              );
            }
            const o = this.pendingTasks.add();
            return this.chain(r, (s) => this.backend.handle(s)).pipe(
              ms(() => this.pendingTasks.remove(o))
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(Xa), I(ot));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const ck = /^\)\]\}',?\n/;
      let j_ = (() => {
        var e;
        class t {
          constructor(r) {
            this.xhrFactory = r;
          }
          handle(r) {
            if ("JSONP" === r.method) throw new w(-2800, !1);
            const o = this.xhrFactory;
            return (o.ɵloadImpl ? ge(o.ɵloadImpl()) : A(null)).pipe(
              Dt(
                () =>
                  new pe((i) => {
                    const a = o.build();
                    if (
                      (a.open(r.method, r.urlWithParams),
                      r.withCredentials && (a.withCredentials = !0),
                      r.headers.forEach((v, y) =>
                        a.setRequestHeader(v, y.join(","))
                      ),
                      r.headers.has("Accept") ||
                        a.setRequestHeader(
                          "Accept",
                          "application/json, text/plain, */*"
                        ),
                      !r.headers.has("Content-Type"))
                    ) {
                      const v = r.detectContentTypeHeader();
                      null !== v && a.setRequestHeader("Content-Type", v);
                    }
                    if (r.responseType) {
                      const v = r.responseType.toLowerCase();
                      a.responseType = "json" !== v ? v : "text";
                    }
                    const u = r.serializeBody();
                    let c = null;
                    const l = () => {
                        if (null !== c) return c;
                        const v = a.statusText || "OK",
                          y = new qt(a.getAllResponseHeaders()),
                          m =
                            (function lk(e) {
                              return "responseURL" in e && e.responseURL
                                ? e.responseURL
                                : /^X-Request-URL:/m.test(
                                    e.getAllResponseHeaders()
                                  )
                                ? e.getResponseHeader("X-Request-URL")
                                : null;
                            })(a) || r.url;
                        return (
                          (c = new ff({
                            headers: y,
                            status: a.status,
                            statusText: v,
                            url: m,
                          })),
                          c
                        );
                      },
                      d = () => {
                        let {
                            headers: v,
                            status: y,
                            statusText: m,
                            url: S,
                          } = l(),
                          E = null;
                        204 !== y &&
                          (E =
                            typeof a.response > "u"
                              ? a.responseText
                              : a.response),
                          0 === y && (y = E ? 200 : 0);
                        let j = y >= 200 && y < 300;
                        if ("json" === r.responseType && "string" == typeof E) {
                          const Me = E;
                          E = E.replace(ck, "");
                          try {
                            E = "" !== E ? JSON.parse(E) : null;
                          } catch (ct) {
                            (E = Me),
                              j && ((j = !1), (E = { error: ct, text: E }));
                          }
                        }
                        j
                          ? (i.next(
                              new uo({
                                body: E,
                                headers: v,
                                status: y,
                                statusText: m,
                                url: S || void 0,
                              })
                            ),
                            i.complete())
                          : i.error(
                              new R_({
                                error: E,
                                headers: v,
                                status: y,
                                statusText: m,
                                url: S || void 0,
                              })
                            );
                      },
                      f = (v) => {
                        const { url: y } = l(),
                          m = new R_({
                            error: v,
                            status: a.status || 0,
                            statusText: a.statusText || "Unknown Error",
                            url: y || void 0,
                          });
                        i.error(m);
                      };
                    let h = !1;
                    const p = (v) => {
                        h || (i.next(l()), (h = !0));
                        let y = { type: ao.DownloadProgress, loaded: v.loaded };
                        v.lengthComputable && (y.total = v.total),
                          "text" === r.responseType &&
                            a.responseText &&
                            (y.partialText = a.responseText),
                          i.next(y);
                      },
                      g = (v) => {
                        let y = { type: ao.UploadProgress, loaded: v.loaded };
                        v.lengthComputable && (y.total = v.total), i.next(y);
                      };
                    return (
                      a.addEventListener("load", d),
                      a.addEventListener("error", f),
                      a.addEventListener("timeout", f),
                      a.addEventListener("abort", f),
                      r.reportProgress &&
                        (a.addEventListener("progress", p),
                        null !== u &&
                          a.upload &&
                          a.upload.addEventListener("progress", g)),
                      a.send(u),
                      i.next({ type: ao.Sent }),
                      () => {
                        a.removeEventListener("error", f),
                          a.removeEventListener("abort", f),
                          a.removeEventListener("load", d),
                          a.removeEventListener("timeout", f),
                          r.reportProgress &&
                            (a.removeEventListener("progress", p),
                            null !== u &&
                              a.upload &&
                              a.upload.removeEventListener("progress", g)),
                          a.readyState !== a.DONE && a.abort();
                      }
                    );
                  })
              )
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(JD));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      const pf = new b("XSRF_ENABLED"),
        B_ = new b("XSRF_COOKIE_NAME", {
          providedIn: "root",
          factory: () => "XSRF-TOKEN",
        }),
        $_ = new b("XSRF_HEADER_NAME", {
          providedIn: "root",
          factory: () => "X-XSRF-TOKEN",
        });
      class V_ {}
      let hk = (() => {
        var e;
        class t {
          constructor(r, o, s) {
            (this.doc = r),
              (this.platform = o),
              (this.cookieName = s),
              (this.lastCookieString = ""),
              (this.lastToken = null),
              (this.parseCount = 0);
          }
          getToken() {
            if ("server" === this.platform) return null;
            const r = this.doc.cookie || "";
            return (
              r !== this.lastCookieString &&
                (this.parseCount++,
                (this.lastToken = VD(r, this.cookieName)),
                (this.lastCookieString = r)),
              this.lastToken
            );
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(I(it), I($n), I(B_));
          }),
          (e.ɵprov = M({ token: e, factory: e.ɵfac })),
          t
        );
      })();
      function pk(e, t) {
        const n = e.url.toLowerCase();
        if (
          !C(pf) ||
          "GET" === e.method ||
          "HEAD" === e.method ||
          n.startsWith("http://") ||
          n.startsWith("https://")
        )
          return t(e);
        const r = C(V_).getToken(),
          o = C($_);
        return (
          null != r &&
            !e.headers.has(o) &&
            (e = e.clone({ headers: e.headers.set(o, r) })),
          t(e)
        );
      }
      var Tn = (function (e) {
        return (
          (e[(e.Interceptors = 0)] = "Interceptors"),
          (e[(e.LegacyInterceptors = 1)] = "LegacyInterceptors"),
          (e[(e.CustomXsrfConfiguration = 2)] = "CustomXsrfConfiguration"),
          (e[(e.NoXsrfProtection = 3)] = "NoXsrfProtection"),
          (e[(e.JsonpSupport = 4)] = "JsonpSupport"),
          (e[(e.RequestsMadeViaParent = 5)] = "RequestsMadeViaParent"),
          (e[(e.Fetch = 6)] = "Fetch"),
          e
        );
      })(Tn || {});
      function tr(e, t) {
        return { ɵkind: e, ɵproviders: t };
      }
      function gk(...e) {
        const t = [
          N_,
          j_,
          k_,
          { provide: Qa, useExisting: k_ },
          { provide: Xa, useExisting: j_ },
          { provide: Os, useValue: pk, multi: !0 },
          { provide: pf, useValue: !0 },
          { provide: V_, useClass: hk },
        ];
        for (const n of e) t.push(...n.ɵproviders);
        return (function Mc(e) {
          return { ɵproviders: e };
        })(t);
      }
      const H_ = new b("LEGACY_INTERCEPTOR_FN");
      let vk = (() => {
        var e;
        class t {}
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)();
          }),
          (e.ɵmod = Qt({ type: e })),
          (e.ɵinj = Nt({
            providers: [
              gk(
                tr(Tn.LegacyInterceptors, [
                  { provide: H_, useFactory: sk },
                  { provide: Os, useExisting: H_, multi: !0 },
                ])
              ),
            ],
          })),
          t
        );
      })();
      const bk = location.hostname;
      let eu = (() => {
          var e;
          class t {
            constructor(r) {
              (this.http = r), (this.baseUrl = `http://${bk}:3500/`);
            }
            getTheaters() {
              return this.http.get(this.baseUrl + "theaters");
            }
            getShows() {
              return this.http.get(this.baseUrl + "shows");
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(N_));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        gf = (() => {
          var e;
          class t {
            constructor(r) {
              (this.dataSource = r),
                (this.theaters = []),
                this.dataSource.getTheaters().subscribe((o) => {
                  this.theaters = o;
                });
            }
            getTheaters() {
              return this.theaters;
            }
            getTheaterById(r) {
              return this.theaters.find((o) => o.id === r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(eu));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        mf = (() => {
          var e;
          class t {
            constructor(r) {
              (this.dataSource = r),
                (this.shows = []),
                this.dataSource.getShows().subscribe((o) => {
                  this.shows = o;
                });
            }
            getShows() {
              return this.shows;
            }
            getShowById(r) {
              return this.shows.find((o) => o.id === r);
            }
            getShowsByTheater(r) {
              return this.shows.filter((o) => o.theater === r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(I(eu));
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })();
      class tu {
        constructor(t, n, r, o, s) {
          (this.id = t),
            (this.name = n),
            (this.movie = r),
            (this.seatPrice = o),
            (this.seatData = s);
        }
      }
      class nu {
        constructor(t, n, r, o, s) {
          (this.name = t),
            (this.genre = n),
            (this.rate = r),
            (this.length = o),
            (this.coverImage = s);
        }
      }
      class ru {
        constructor(t, n) {
          (this.numRows = t), (this.numSeatsPerRow = n);
        }
      }
      class Ke {
        constructor(t, n, r, o) {
          (this.id = t),
            (this.showTime = n),
            (this.theater = r),
            (this.unavailableSeats = o);
        }
      }
      let Sk = (() => {
          var e;
          class t {
            constructor() {
              (this.theaters = [
                new tu(
                  1,
                  "\u0e42\u0e23\u0e07\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c 1",
                  new nu(
                    "\u0e1a\u0e25\u0e39 \u0e1a\u0e35\u0e40\u0e17\u0e34\u0e25",
                    "Action, Adventure, Sci - Fi",
                    "G",
                    130,
                    "https://3bugs.com/online-tickets/images/movie01.jpg"
                  ),
                  200,
                  new ru(10, 15)
                ),
                new tu(
                  2,
                  "\u0e42\u0e23\u0e07\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c 2",
                  new nu(
                    "\u0e1a\u0e32\u0e23\u0e4c\u0e1a\u0e35\u0e49",
                    "Adventure, Comedy, Fantasy",
                    "G",
                    115,
                    "https://3bugs.com/online-tickets/images/movie02.jpg"
                  ),
                  180,
                  new ru(15, 18)
                ),
                new tu(
                  3,
                  "\u0e42\u0e23\u0e07\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c 3",
                  new nu(
                    "\u0e21\u0e2d\u0e19\u0e42\u0e14 \u0e23\u0e31\u0e01 | \u0e42\u0e1e\u0e2a\u0e15\u0e4c | \u0e25\u0e1a | \u0e25\u0e37\u0e21",
                    "Romantic, Sci - Fi",
                    "13",
                    130,
                    "https://3bugs.com/online-tickets/images/movie03.jpg"
                  ),
                  250,
                  new ru(12, 14)
                ),
                new tu(
                  4,
                  "\u0e42\u0e23\u0e07\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c 4",
                  new nu(
                    "\u0e19\u0e30\u0e2b\u0e19\u0e49\u0e32\u0e17\u0e2d\u0e07",
                    "Erotic, Horror",
                    "18",
                    100,
                    "https://3bugs.com/online-tickets/images/movie04.jpg"
                  ),
                  180,
                  new ru(10, 12)
                ),
              ]),
                (this.shows = [
                  new Ke(1, "11:15", 1, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(2, "14:00", 1, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(3, "16:45", 1, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(4, "19:30", 1, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(5, "11:45", 2, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(6, "14:15", 2, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(7, "16:45", 2, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(8, "19:15", 2, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(9, "21:45", 2, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(10, "12:00", 3, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(11, "17:30", 3, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(12, "11:30", 4, ["B2", "B4", "B5", "B6", "C8"]),
                  new Ke(13, "16:30", 4, ["A7", "A8", "A9", "B10", "B11"]),
                  new Ke(14, "21:15", 4, ["B2", "B4", "B5", "B6", "C8"]),
                ]);
            }
            getTheaters() {
              return ge([this.theaters]);
            }
            getShows() {
              return ge([this.shows]);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵprov = M({ token: e, factory: e.ɵfac })),
            t
          );
        })(),
        Mk = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Qt({ type: e })),
            (e.ɵinj = Nt({
              providers: [eu, gf, mf, { provide: eu, useClass: Sk }],
              imports: [vk],
            })),
            t
          );
        })(),
        Tk = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Qt({ type: e })),
            (e.ɵinj = Nt({ imports: [Mk, mw, b_] })),
            t
          );
        })(),
        U_ = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵcmp = xn({
              type: e,
              selectors: [["movie-details"]],
              inputs: { movie: "movie" },
              decls: 14,
              vars: 5,
              consts: [
                [1, "container", "mt-3"],
                [1, "row"],
                [
                  1,
                  "d-flex",
                  "col-sm-6",
                  "justify-content-center",
                  "justify-content-sm-end",
                ],
                [2, "width", "240px", 3, "src"],
                [1, "col-sm-6"],
                [1, "h5", "text-primary", "fw-bold", "my-3"],
                [1, "h6"],
                [1, "fa-regular", "fa-clock"],
              ],
              template: function (r, o) {
                1 & r &&
                  (V(0, "div", 0)(1, "div", 1)(2, "div", 2),
                  ke(3, "img", 3),
                  H(),
                  V(4, "div", 4)(5, "div", 5),
                  se(6),
                  H(),
                  V(7, "div", 6),
                  se(8),
                  H(),
                  V(9, "div", 6),
                  se(10),
                  H(),
                  V(11, "div", 6),
                  ke(12, "i", 7),
                  se(13),
                  H()()()()),
                  2 & r &&
                    (X(3),
                    Ze("src", null == o.movie ? null : o.movie.coverImage, Ic),
                    X(3),
                    zr(null == o.movie ? null : o.movie.name),
                    X(2),
                    Qe(
                      "\u0e2b\u0e21\u0e27\u0e14\u0e2b\u0e21\u0e39\u0e48: ",
                      null == o.movie ? null : o.movie.genre,
                      ""
                    ),
                    X(2),
                    Qe(
                      "\u0e40\u0e23\u0e17: ",
                      null == o.movie ? null : o.movie.rate,
                      ""
                    ),
                    X(3),
                    Qe(
                      " ",
                      null == o.movie ? null : o.movie.length,
                      " \u0e19\u0e32\u0e17\u0e35"
                    ));
              },
              styles: [
                "img[_ngcontent-%COMP%] {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  }",
              ],
            })),
            t
          );
        })(),
        z_ = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵcmp = xn({
              type: e,
              selectors: [["app-footer"]],
              decls: 13,
              vars: 0,
              consts: [
                [1, "text-center", "bg-dark", "text-white"],
                [1, "container", "p-3"],
                [1, "row"],
                [
                  1,
                  "col-4",
                  "d-flex",
                  "align-items-center",
                  "justify-content-end",
                ],
                [
                  "target",
                  "_blank",
                  "href",
                  "https://www.camt.cmu.ac.th/",
                  1,
                  "text-white",
                ],
                ["src", "assets/logo_camt.png"],
                [
                  1,
                  "col-8",
                  "d-flex",
                  "flex-column",
                  "justify-content-center",
                  "bg-dark",
                  "text-center",
                  "p-2",
                ],
                [1, "text-start"],
                ["src", "assets/logo_angular.png", 2, "height", "36px"],
              ],
              template: function (r, o) {
                1 & r &&
                  (V(0, "footer", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(
                    4,
                    "a",
                    4
                  ),
                  ke(5, "img", 5),
                  H()(),
                  V(6, "div", 6)(7, "div", 7),
                  se(
                    8,
                    "\xa9 2023 \u0e27\u0e34\u0e0a\u0e32 Front-end Development with Angular\xa0\xa0"
                  ),
                  ke(9, "img", 8),
                  H(),
                  V(10, "div", 7)(11, "a", 4),
                  se(12, " College of Arts, Media and Technology "),
                  H()()()()()());
              },
              styles: [
                "a[_ngcontent-%COMP%]:link {\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:visited {\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:hover {\n    text-decoration: none;\n  }\n\n  a[_ngcontent-%COMP%]:active {\n    text-decoration: none;\n  }",
              ],
            })),
            t
          );
        })();
      function Ak(e, t) {
        if (1 & e) {
          const n = Ko();
          V(0, "li", 12)(1, "a", 13),
            Un("click", function () {
              const s = Eo(n).$implicit;
              return bo((Ye().selectedTheaterId = s.id));
            }),
            se(2),
            H()();
        }
        if (2 & e) {
          const n = t.$implicit,
            r = Ye();
          X(1),
            ra("active", r.selectedTheaterId === n.id),
            X(1),
            Qe(" ", n.name, " ");
        }
      }
      function Rk(e, t) {
        if (1 & e) {
          const n = Ko();
          V(0, "div", 14)(1, "button", 15),
            Un("click", function () {
              const s = Eo(n).$implicit;
              return bo(Ye().onClickShow(s));
            }),
            se(2),
            H()();
        }
        if (2 & e) {
          const n = t.$implicit;
          X(2), Qe(" ", n.showTime, " ");
        }
      }
      let Nk = (() => {
        var e;
        class t {
          constructor(r, o, s) {
            (this.theaterRepository = r),
              (this.showRepository = o),
              (this.router = s),
              (this.selectedTheaterId = 1);
          }
          get theaters() {
            return this.theaterRepository.getTheaters();
          }
          get movie() {
            const r = this.theaterRepository.getTheaterById(
              this.selectedTheaterId
            );
            return r ? r.movie : void 0;
          }
          get shows() {
            return this.showRepository.getShowsByTheater(
              this.selectedTheaterId
            );
          }
          onClickShow(r) {
            this.router.navigateByUrl("/show/" + r.id);
          }
        }
        return (
          ((e = t).ɵfac = function (r) {
            return new (r || e)(T(gf), T(mf), T(ut));
          }),
          (e.ɵcmp = xn({
            type: e,
            selectors: [["store"]],
            decls: 15,
            vars: 3,
            consts: [
              [1, "navbar", "bg-body-tertiary", "mb-0", "pb-0"],
              [1, "h3", "container", "justify-content-center", "mt-5"],
              ["src", "assets/logo_camt_2.png", 1, "logo", "shadow"],
              [1, "container", "justify-content-center", "mt-4"],
              [
                1,
                "nav",
                "nav-tabs",
                "justify-content-center",
                2,
                "width",
                "100%",
              ],
              ["class", "nav-item", 4, "ngFor", "ngForOf"],
              [1, "my-tab-content", "container", "bg-white", "p-4"],
              [3, "movie"],
              [1, "mx-sm-5", 2, "margin-bottom", "80px"],
              [1, "h4", "mt-5", "mb-3"],
              [1, "row", "g-3"],
              [
                "class",
                "col-12 col-sm-6 col-md-4 col-lg-3",
                4,
                "ngFor",
                "ngForOf",
              ],
              [1, "nav-item"],
              ["href", "javascript:void", 1, "nav-link", 3, "click"],
              [1, "col-12", "col-sm-6", "col-md-4", "col-lg-3"],
              ["type", "button", 1, "btn", "btn-primary", 3, "click"],
            ],
            template: function (r, o) {
              1 & r &&
                (V(0, "nav", 0)(1, "div", 1),
                ke(2, "img", 2),
                se(3, "\xa0MOVIE TICKETS"),
                H(),
                V(4, "div", 3)(5, "ul", 4),
                rn(6, Ak, 3, 3, "li", 5),
                H(),
                V(7, "div", 6),
                ke(8, "movie-details", 7),
                V(9, "div", 8)(10, "div", 9),
                se(11, "\u0e23\u0e2d\u0e1a\u0e09\u0e32\u0e22"),
                H(),
                V(12, "div", 10),
                rn(13, Rk, 3, 1, "div", 11),
                H()()()()(),
                ke(14, "app-footer")),
                2 & r &&
                  (X(6),
                  Ze("ngForOf", o.theaters),
                  X(2),
                  Ze("movie", o.movie),
                  X(5),
                  Ze("ngForOf", o.shows));
            },
            dependencies: [Cd, U_, z_],
            styles: [
              ".logo[_ngcontent-%COMP%] {\n    height: 36px;\n  }\n\n  .my-tab-content[_ngcontent-%COMP%] {\n    border-left: 1px solid rgb(222, 226, 230);\n    border-right: 1px solid rgb(222, 226, 230)\n  }\n\n  button[_ngcontent-%COMP%] {\n    width: 140px;\n  }\n\n  img.shadow[_ngcontent-%COMP%] {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);\n  }",
            ],
          })),
          t
        );
      })();
      function xk(e, t) {
        if ((1 & e && (V(0, "span", 30), se(1), H()), 2 & e)) {
          const n = Ye().$implicit;
          X(1), zr(n);
        }
      }
      function Ok(e, t) {
        1 & e && ke(0, "i", 31);
      }
      function Pk(e, t) {
        if (1 & e) {
          const n = Ko();
          V(0, "i", 32),
            Un("click", function () {
              Eo(n);
              const o = Ye().$implicit,
                s = Ye().$implicit;
              return bo(Ye().toggleSeat(s + o));
            }),
            H();
        }
      }
      function Fk(e, t) {
        if (1 & e) {
          const n = Ko();
          V(0, "i", 33),
            Un("click", function () {
              Eo(n);
              const o = Ye().$implicit,
                s = Ye().$implicit;
              return bo(Ye().toggleSeat(s + o));
            }),
            H();
        }
      }
      const kk = function (e, t) {
        return { cursor: e, color: t };
      };
      function Lk(e, t) {
        if (
          (1 & e &&
            (V(0, "span", 25),
            rn(1, xk, 2, 1, "span", 26),
            rn(2, Ok, 1, 0, "i", 27),
            rn(3, Pk, 1, 0, "i", 28),
            rn(4, Fk, 1, 0, "i", 29),
            H()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = Ye().$implicit,
            o = Ye();
          Ze(
            "ngStyle",
            oy(
              5,
              kk,
              o.isAvaiable(r + n) ? "pointer" : "default",
              o.isAvaiable(r + n)
                ? o.isBooked(r + n)
                  ? "green"
                  : "lightgrey"
                : "tomato"
            )
          ),
            X(1),
            Ze("ngIf", "" === r),
            X(1),
            Ze("ngIf", "" !== r && !o.isAvaiable(r + n)),
            X(1),
            Ze("ngIf", "" !== r && o.isAvaiable(r + n) && o.isBooked(r + n)),
            X(1),
            Ze("ngIf", "" !== r && o.isAvaiable(r + n) && !o.isBooked(r + n));
        }
      }
      function jk(e, t) {
        if (
          (1 & e &&
            (V(0, "div", 9)(1, "span", 23),
            se(2),
            H(),
            rn(3, Lk, 5, 8, "span", 24),
            H()),
          2 & e)
        ) {
          const n = t.$implicit,
            r = Ye();
          X(2),
            Qe(" ", n.toUpperCase(), " "),
            X(1),
            Ze("ngForOf", r.seatNumbers);
        }
      }
      let Bk = (() => {
          var e;
          class t {
            constructor(r, o, s) {
              (this.route = r),
                (this.theaterRepository = o),
                (this.showRepository = s),
                (this.bookedSeats = []);
              const i = Number(this.route.snapshot.params.show_id);
              (this.show = this.showRepository.getShowById(i)),
                (this.theater = this.show
                  ? this.theaterRepository.getTheaterById(this.show.theater)
                  : void 0),
                (this.movie = this.theater ? this.theater.movie : void 0),
                console.log("book-component constructor !!!");
            }
            get rowNames() {
              return [
                ...Array.from(Array(this.theater?.seatData.numRows))
                  .map((o, s) => s + 65)
                  .map((o) => String.fromCharCode(o))
                  .reverse(),
                "",
              ];
            }
            get seatNumbers() {
              return Array.from(
                Array(this.theater?.seatData.numSeatsPerRow)
              ).map((r, o) => o + 1);
            }
            get bookedSeatText() {
              return this.bookedSeats
                .sort((r, o) =>
                  r.substring(0, 1) === o.substring(0, 1)
                    ? Number(r.substring(1)) - Number(o.substring(1))
                    : r.substring(0, 1).localeCompare(o.substring(0, 1))
                )
                .join(", ");
            }
            get totalPrice() {
              return this.bookedSeats.length * (this.theater?.seatPrice ?? 0);
            }
            isAvaiable(r) {
              return !this.show.unavailableSeats
                .map((o) => o.toLowerCase())
                .includes(r.toLowerCase());
            }
            isBooked(r) {
              return this.bookedSeats.includes(r);
            }
            toggleSeat(r) {
              this.isBooked(r)
                ? (this.bookedSeats = this.bookedSeats.filter((o) => o !== r))
                : this.bookedSeats.push(r);
            }
          }
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)(T(er), T(gf), T(mf));
            }),
            (e.ɵcmp = xn({
              type: e,
              selectors: [["booking"]],
              decls: 42,
              vars: 11,
              consts: [
                [
                  1,
                  "h3",
                  "justify-content-center",
                  "mt-5",
                  2,
                  "text-align",
                  "center",
                ],
                [
                  1,
                  "container-fluid",
                  "bg-white",
                  "p-4",
                  2,
                  "border",
                  "0px solid red",
                ],
                [3, "movie"],
                [1, "container-fluid", 2, "margin-bottom", "80px"],
                [1, "row", "mt-5"],
                [1, "col-12", "col-xl-9"],
                [1, "row", "text-center"],
                [1, "col"],
                [
                  1,
                  "text-center",
                  "bg-light",
                  2,
                  "display",
                  "inline-block",
                  "width",
                  "500px",
                ],
                [1, "row", "justify-content-center"],
                [1, "container", "mt-4"],
                ["class", "row justify-content-center", 4, "ngFor", "ngForOf"],
                [
                  1,
                  "shadow",
                  "col-12",
                  "col-xl-3",
                  "bg-light",
                  "mt-4",
                  "pt-4",
                  "px-sm-4",
                ],
                [1, "fw-bold", "mb-3"],
                [1, "my-2"],
                [1, "fa-solid", "fa-couch", 2, "color", "gray"],
                [
                  1,
                  "bg-white",
                  "my-4",
                  "p-3",
                  2,
                  "border",
                  "1px solid rgba(0, 0, 0, 0.1)",
                ],
                [1, "text-center", "mt-1", "mb-2"],
                [1, "text-primary"],
                [1, "h4", "text-center", "text-primary", "mb-3"],
                [1, "text-center", "mb-2"],
                [1, "h4", "text-center", "text-primary"],
                [
                  "type",
                  "button",
                  1,
                  "btn",
                  "btn-success",
                  "w-100",
                  "mt-2",
                  "mb-4",
                ],
                [
                  1,
                  "text-center",
                  "h4",
                  "mt-1",
                  2,
                  "display",
                  "inline-block",
                  "width",
                  "60px",
                ],
                [
                  "class",
                  "p-0 my-0",
                  "style",
                  "display: inline-block; width: 44px; text-align: center; font-size: 24px",
                  3,
                  "ngStyle",
                  4,
                  "ngFor",
                  "ngForOf",
                ],
                [
                  1,
                  "p-0",
                  "my-0",
                  2,
                  "display",
                  "inline-block",
                  "width",
                  "44px",
                  "text-align",
                  "center",
                  "font-size",
                  "24px",
                  3,
                  "ngStyle",
                ],
                [
                  "class",
                  "mt-2",
                  "style",
                  "display: inline-block; color: black",
                  4,
                  "ngIf",
                ],
                ["class", "fa-solid fa-circle-xmark", 4, "ngIf"],
                ["class", "fa-solid fa-circle-check", 3, "click", 4, "ngIf"],
                ["class", "fa-solid fa-couch", 3, "click", 4, "ngIf"],
                [1, "mt-2", 2, "display", "inline-block", "color", "black"],
                [1, "fa-solid", "fa-circle-xmark"],
                [1, "fa-solid", "fa-circle-check", 3, "click"],
                [1, "fa-solid", "fa-couch", 3, "click"],
              ],
              template: function (r, o) {
                1 & r &&
                  (V(0, "div", 0),
                  se(
                    1,
                    "\u0e40\u0e25\u0e37\u0e2d\u0e01\u0e17\u0e35\u0e48\u0e19\u0e31\u0e48\u0e07"
                  ),
                  H(),
                  V(2, "div", 1),
                  ke(3, "movie-details", 2),
                  V(4, "div", 3)(5, "div", 4)(6, "div", 5)(7, "div", 6)(
                    8,
                    "div",
                    7
                  )(9, "span", 8),
                  se(
                    10,
                    "\u0e08\u0e2d\u0e20\u0e32\u0e1e\u0e22\u0e19\u0e15\u0e23\u0e4c"
                  ),
                  H()()(),
                  V(11, "div", 9)(12, "div", 10),
                  rn(13, jk, 4, 2, "div", 11),
                  H()()(),
                  V(14, "div", 12)(15, "div", 13),
                  se(16),
                  H(),
                  V(17, "ul")(18, "li")(19, "div", 14),
                  se(20),
                  H()(),
                  V(21, "li")(22, "div", 14),
                  se(23),
                  H()(),
                  V(24, "li")(25, "div", 14),
                  ke(26, "i", 15),
                  se(27),
                  H()()(),
                  V(28, "div", 16)(29, "div", 17),
                  se(
                    30,
                    " \u0e17\u0e35\u0e48\u0e19\u0e31\u0e48\u0e07\u0e17\u0e35\u0e48\u0e40\u0e25\u0e37\u0e2d\u0e01 "
                  ),
                  V(31, "span", 18),
                  se(32),
                  H()(),
                  V(33, "div", 19),
                  se(34),
                  H(),
                  V(35, "div", 20),
                  se(36, "\u0e23\u0e32\u0e04\u0e32\u0e23\u0e27\u0e21"),
                  H(),
                  V(37, "div", 21),
                  se(38),
                  H()(),
                  V(39, "button", 22),
                  se(40, "\u0e0a\u0e33\u0e23\u0e30\u0e40\u0e07\u0e34\u0e19"),
                  H()()()()(),
                  ke(41, "app-footer")),
                  2 & r &&
                    (X(3),
                    Ze("movie", o.movie),
                    X(10),
                    Ze("ngForOf", o.rowNames),
                    X(3),
                    zr(null == o.movie ? null : o.movie.name),
                    X(4),
                    Qe(
                      "\u0e23\u0e2d\u0e1a\u0e40\u0e27\u0e25\u0e32 ",
                      null == o.show ? null : o.show.showTime,
                      " \u0e19."
                    ),
                    X(3),
                    zr(null == o.theater ? null : o.theater.name),
                    X(4),
                    Qe(
                      "\xa0",
                      null == o.theater ? null : o.theater.seatPrice,
                      "\xa0\u0e1a\u0e32\u0e17"
                    ),
                    X(5),
                    Qe(
                      " ",
                      o.bookedSeats.length > 0
                        ? "(" + o.bookedSeats.length + ")"
                        : "",
                      " "
                    ),
                    X(2),
                    Qe(
                      " ",
                      "" === o.bookedSeatText ? "-" : o.bookedSeatText,
                      " "
                    ),
                    X(4),
                    Qe(
                      " ",
                      0 === o.totalPrice
                        ? "-"
                        : o.totalPrice.toLocaleString() + " \u0e1a\u0e32\u0e17",
                      " "
                    ),
                    X(1),
                    ra("disabled", 0 === o.totalPrice));
              },
              dependencies: [Cd, qD, ZD, U_, z_],
              styles: [
                "shadow[_ngcontent-%COMP%] {\n    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 8px 0 rgba(0, 0, 0, 0.19);\n  }",
              ],
            })),
            t
          );
        })(),
        $k = (() => {
          var e;
          class t {}
          return (
            ((e = t).ɵfac = function (r) {
              return new (r || e)();
            }),
            (e.ɵmod = Qt({ type: e, bootstrap: [WF] })),
            (e.ɵinj = Nt({
              imports: [
                mw,
                Tk,
                b_.forRoot([
                  { path: "", component: Nk },
                  { path: "show/:show_id", component: Bk },
                ]),
              ],
            })),
            t
          );
        })();
      iO()
        .bootstrapModule($k)
        .catch((e) => console.error(e));
    },
  },
  (K) => {
    K((K.s = 829));
  },
]);
