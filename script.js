Web3HttpProvider: [function(t, e, r) {
            "use strict";
            var o = t("web3-core-helpers").errors
              , n = t("xhr2-cookies").XMLHttpRequest
              , i = t("http")
              , s = t("https")
              , a = function(t, e) {
                e = e || {},
                this.withCredentials = e.withCredentials || !1,
                this.timeout = e.timeout || 0,
                this.headers = e.headers,
                this.agent = e.agent;
                var r = !(this.connected = !1) === e.keepAlive || !1 !== e.keepAlive;
                this.host = t || "http://localhost:8545",
                this.agent || ("https" === this.host.substring(0, 5) ? this.httpsAgent = new s.Agent({
                    keepAlive: r
                }) : this.httpAgent = new i.Agent({
                    keepAlive: r
                }))
            };
            a.prototype._prepareRequest = function() {
                var e;
                if ("undefined" != typeof XMLHttpRequest)
                    e = new XMLHttpRequest;
                else {
                    e = new n;
                    var t = {
                        httpsAgent: this.httpsAgent,
                        httpAgent: this.httpAgent,
                        baseUrl: this.baseUrl
                    };
                    this.agent && (t.httpsAgent = this.agent.https,
                    t.httpAgent = this.agent.http,
                    t.baseUrl = this.agent.baseUrl),
                    e.nodejsSet(t)
                }
                return e.open("POST", this.host, !0),
                e.setRequestHeader("Content-Type", "application/json"),
                e.timeout = this.timeout,
                e.withCredentials = this.withCredentials,
                this.headers && this.headers.forEach(function(t) {
                    e.setRequestHeader(t.name, t.value)
                }),
                e
            }
            ,
            a.prototype.send = function(t, r) {
                var n = this
                  , i = this._prepareRequest();
                i.onreadystatechange = function() {
                    if (4 === i.readyState && 1 !== i.timeout) {
                        var t = i.responseText
                          , e = null;
                        try {
                            t = JSON.parse(t)
                        } catch (t) {
                            e = o.InvalidResponse(i.responseText)
                        }
                        n.connected = !0,
                        r(e, t)
                    }
                }
                ,
                i.ontimeout = function() {
                    n.connected = !1,
                    r(o.ConnectionTimeout(this.timeout))
                }
                ;
                try {
                    i.send(JSON.stringify(t))
                } catch (t) {
                    this.connected = !1,
                    r(o.InvalidConnection(this.host))
                }
            }
            ,
            a.prototype.disconnect = function() {}
            ,
            a.prototype.supportsSubscriptions = function() {
                return !1
            }
            ,
            e.exports = a
        }

Web3Eth: [function(e, t, r) {
            "use strict";
            var p = e("underscore")
              , b = e("web3-core")
              , n = e("web3-core-helpers")
              , y = e("web3-core-subscriptions").subscriptions
              , m = e("web3-core-method")
              , v = e("web3-utils")
              , g = e("web3-net")
              , w = e("web3-eth-ens")
              , _ = e("web3-eth-personal")
              , A = e("web3-eth-contract")
              , E = e("web3-eth-iban")
              , S = e("web3-eth-accounts")
              , k = e("web3-eth-abi")
              , x = e("./getNetworkType.js")
              , M = n.formatters
              , I = function(e) {
                return p.isString(e[0]) && 0 === e[0].indexOf("0x") ? "eth_getBlockByHash" : "eth_getBlockByNumber"
            }
              , U = function(e) {
                return p.isString(e[0]) && 0 === e[0].indexOf("0x") ? "eth_getTransactionByBlockHashAndIndex" : "eth_getTransactionByBlockNumberAndIndex"
            }
              , T = function(e) {
                return p.isString(e[0]) && 0 === e[0].indexOf("0x") ? "eth_getUncleByBlockHashAndIndex" : "eth_getUncleByBlockNumberAndIndex"
            }
              , C = function(e) {
                return p.isString(e[0]) && 0 === e[0].indexOf("0x") ? "eth_getBlockTransactionCountByHash" : "eth_getBlockTransactionCountByNumber"
            }
              , B = function(e) {
                return p.isString(e[0]) && 0 === e[0].indexOf("0x") ? "eth_getUncleCountByBlockHash" : "eth_getUncleCountByBlockNumber"
            }
              , i = function() {
                var t = this;
                b.packageInit(this, arguments);
                var r, n, i, e = this.setProvider, o = !(this.setProvider = function() {
                    e.apply(t, arguments),
                    t.net.setProvider.apply(t, arguments),
                    t.personal.setProvider.apply(t, arguments),
                    t.accounts.setProvider.apply(t, arguments),
                    t.Contract.setProvider(t.currentProvider, t.accounts)
                }
                ), a = null, s = "latest", u = 50, c = 24, f = 750;
                Object.defineProperty(this, "handleRevert", {
                    get: function() {
                        return o
                    },
                    set: function(e) {
                        o = e,
                        t.Contract.handleRevert = o,
                        d.forEach(function(e) {
                            e.handleRevert = o
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "defaultCommon", {
                    get: function() {
                        return i
                    },
                    set: function(e) {
                        i = e,
                        t.Contract.defaultCommon = i,
                        d.forEach(function(e) {
                            e.defaultCommon = i
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "defaultHardfork", {
                    get: function() {
                        return n
                    },
                    set: function(e) {
                        n = e,
                        t.Contract.defaultHardfork = n,
                        d.forEach(function(e) {
                            e.defaultHardfork = n
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "defaultChain", {
                    get: function() {
                        return r
                    },
                    set: function(e) {
                        r = e,
                        t.Contract.defaultChain = r,
                        d.forEach(function(e) {
                            e.defaultChain = r
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "transactionPollingTimeout", {
                    get: function() {
                        return f
                    },
                    set: function(e) {
                        f = e,
                        t.Contract.transactionPollingTimeout = f,
                        d.forEach(function(e) {
                            e.transactionPollingTimeout = f
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "transactionConfirmationBlocks", {
                    get: function() {
                        return c
                    },
                    set: function(e) {
                        c = e,
                        t.Contract.transactionConfirmationBlocks = c,
                        d.forEach(function(e) {
                            e.transactionConfirmationBlocks = c
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "transactionBlockTimeout", {
                    get: function() {
                        return u
                    },
                    set: function(e) {
                        u = e,
                        t.Contract.transactionBlockTimeout = u,
                        d.forEach(function(e) {
                            e.transactionBlockTimeout = u
                        })
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "defaultAccount", {
                    get: function() {
                        return a
                    },
                    set: function(e) {
                        return e && (a = v.toChecksumAddress(M.inputAddressFormatter(e))),
                        t.Contract.defaultAccount = a,
                        t.personal.defaultAccount = a,
                        d.forEach(function(e) {
                            e.defaultAccount = a
                        }),
                        e
                    },
                    enumerable: !0
                }),
                Object.defineProperty(this, "defaultBlock", {
                    get: function() {
                        return s
                    },
                    set: function(e) {
                        return s = e,
                        t.Contract.defaultBlock = s,
                        t.personal.defaultBlock = s,
                        d.forEach(function(e) {
                            e.defaultBlock = s
                        }),
                        e
                    },
                    enumerable: !0
                }),
                this.clearSubscriptions = t._requestManager.clearSubscriptions,
                this.net = new g(this.currentProvider),
                this.net.getNetworkType = x.bind(this),
                this.accounts = new S(this.currentProvider),
                this.personal = new _(this.currentProvider),
                this.personal.defaultAccount = this.defaultAccount;
                var h = this
                  , l = function() {
                    A.apply(this, arguments);
                    var e = this
                      , t = h.setProvider;
                    h.setProvider = function() {
                        t.apply(h, arguments),
                        b.packageInit(e, [h.currentProvider])
                    }
                };
                l.setProvider = function() {
                    A.setProvider.apply(this, arguments)
                }
                ,
                (l.prototype = Object.create(A.prototype)).constructor = l,
                this.Contract = l,
                this.Contract.defaultAccount = this.defaultAccount,
                this.Contract.defaultBlock = this.defaultBlock,
                this.Contract.transactionBlockTimeout = this.transactionBlockTimeout,
                this.Contract.transactionConfirmationBlocks = this.transactionConfirmationBlocks,
                this.Contract.transactionPollingTimeout = this.transactionPollingTimeout,
                this.Contract.handleRevert = this.handleRevert,
                this.Contract.setProvider(this.currentProvider, this.accounts),
                this.Iban = E,
                this.abi = k,
                this.ens = new w(this);
                var d = [new m({
                    name: "getNodeInfo",
                    call: "web3_clientVersion"
                }), new m({
                    name: "getProtocolVersion",
                    call: "eth_protocolVersion",
                    params: 0
                }), new m({
                    name: "getCoinbase",
                    call: "eth_coinbase",
                    params: 0
                }), new m({
                    name: "isMining",
                    call: "eth_mining",
                    params: 0
                }), new m({
                    name: "getHashrate",
                    call: "eth_hashrate",
                    params: 0,
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "isSyncing",
                    call: "eth_syncing",
                    params: 0,
                    outputFormatter: M.outputSyncingFormatter
                }), new m({
                    name: "getGasPrice",
                    call: "eth_gasPrice",
                    params: 0,
                    outputFormatter: M.outputBigNumberFormatter
                }), new m({
                    name: "getAccounts",
                    call: "eth_accounts",
                    params: 0,
                    outputFormatter: v.toChecksumAddress
                }), new m({
                    name: "getBlockNumber",
                    call: "eth_blockNumber",
                    params: 0,
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "getBalance",
                    call: "eth_getBalance",
                    params: 2,
                    inputFormatter: [M.inputAddressFormatter, M.inputDefaultBlockNumberFormatter],
                    outputFormatter: M.outputBigNumberFormatter
                }), new m({
                    name: "getStorageAt",
                    call: "eth_getStorageAt",
                    params: 3,
                    inputFormatter: [M.inputAddressFormatter, v.numberToHex, M.inputDefaultBlockNumberFormatter]
                }), new m({
                    name: "getCode",
                    call: "eth_getCode",
                    params: 2,
                    inputFormatter: [M.inputAddressFormatter, M.inputDefaultBlockNumberFormatter]
                }), new m({
                    name: "getBlock",
                    call: I,
                    params: 2,
                    inputFormatter: [M.inputBlockNumberFormatter, function(e) {
                        return !!e
                    }
                    ],
                    outputFormatter: M.outputBlockFormatter
                }), new m({
                    name: "getUncle",
                    call: T,
                    params: 2,
                    inputFormatter: [M.inputBlockNumberFormatter, v.numberToHex],
                    outputFormatter: M.outputBlockFormatter
                }), new m({
                    name: "getBlockTransactionCount",
                    call: C,
                    params: 1,
                    inputFormatter: [M.inputBlockNumberFormatter],
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "getBlockUncleCount",
                    call: B,
                    params: 1,
                    inputFormatter: [M.inputBlockNumberFormatter],
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "getTransaction",
                    call: "eth_getTransactionByHash",
                    params: 1,
                    inputFormatter: [null],
                    outputFormatter: M.outputTransactionFormatter
                }), new m({
                    name: "getTransactionFromBlock",
                    call: U,
                    params: 2,
                    inputFormatter: [M.inputBlockNumberFormatter, v.numberToHex],
                    outputFormatter: M.outputTransactionFormatter
                }), new m({
                    name: "getTransactionReceipt",
                    call: "eth_getTransactionReceipt",
                    params: 1,
                    inputFormatter: [null],
                    outputFormatter: M.outputTransactionReceiptFormatter
                }), new m({
                    name: "getTransactionCount",
                    call: "eth_getTransactionCount",
                    params: 2,
                    inputFormatter: [M.inputAddressFormatter, M.inputDefaultBlockNumberFormatter],
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "sendSignedTransaction",
                    call: "eth_sendRawTransaction",
                    params: 1,
                    inputFormatter: [null]
                }), new m({
                    name: "signTransaction",
                    call: "eth_signTransaction",
                    params: 1,
                    inputFormatter: [M.inputTransactionFormatter]
                }), new m({
                    name: "sendTransaction",
                    call: "eth_sendTransaction",
                    params: 1,
                    inputFormatter: [M.inputTransactionFormatter],
                    abiCoder: k
                }), new m({
                    name: "sign",
                    call: "eth_sign",
                    params: 2,
                    inputFormatter: [M.inputSignFormatter, M.inputAddressFormatter],
                    transformPayload: function(e) {
                        return e.params.reverse(),
                        e
                    }
                }), new m({
                    name: "call",
                    call: "eth_call",
                    params: 2,
                    inputFormatter: [M.inputCallFormatter, M.inputDefaultBlockNumberFormatter],
                    abiCoder: k
                }), new m({
                    name: "estimateGas",
                    call: "eth_estimateGas",
                    params: 1,
                    inputFormatter: [M.inputCallFormatter],
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "submitWork",
                    call: "eth_submitWork",
                    params: 3
                }), new m({
                    name: "getWork",
                    call: "eth_getWork",
                    params: 0
                }), new m({
                    name: "getPastLogs",
                    call: "eth_getLogs",
                    params: 1,
                    inputFormatter: [M.inputLogFormatter],
                    outputFormatter: M.outputLogFormatter
                }), new m({
                    name: "getChainId",
                    call: "eth_chainId",
                    params: 0,
                    outputFormatter: v.hexToNumber
                }), new m({
                    name: "requestAccounts",
                    call: "eth_requestAccounts",
                    params: 0,
                    outputFormatter: v.toChecksumAddress
                }), new m({
                    name: "getProof",
                    call: "eth_getProof",
                    params: 3,
                    inputFormatter: [M.inputAddressFormatter, M.inputStorageKeysFormatter, M.inputDefaultBlockNumberFormatter],
                    outputFormatter: M.outputProofFormatter
                }), new m({
                    name: "getPendingTransactions",
                    call: "eth_pendingTransactions",
                    params: 0,
                    outputFormatter: M.outputTransactionFormatter
                }), new y({
                    name: "subscribe",
                    type: "eth",
                    subscriptions: {
                        newBlockHeaders: {
                            subscriptionName: "newHeads",
                            params: 0,
                            outputFormatter: M.outputBlockFormatter
                        },
                        pendingTransactions: {
                            subscriptionName: "newPendingTransactions",
                            params: 0
                        },
                        logs: {
                            params: 1,
                            inputFormatter: [M.inputLogFormatter],
                            outputFormatter: M.outputLogFormatter,
                            subscriptionHandler: function(e) {
                                e.removed ? this.emit("changed", e) : this.emit("data", e),
                                p.isFunction(this.callback) && this.callback(null, e, this)
                            }
                        },
                        syncing: {
                            params: 0,
                            outputFormatter: M.outputSyncingFormatter,
                            subscriptionHandler: function(e) {
                                var t = this;
                                !0 !== this._isSyncing ? (this._isSyncing = !0,
                                this.emit("changed", t._isSyncing),
                                p.isFunction(this.callback) && this.callback(null, t._isSyncing, this),
                                setTimeout(function() {
                                    t.emit("data", e),
                                    p.isFunction(t.callback) && t.callback(null, e, t)
                                }, 0)) : (this.emit("data", e),
                                p.isFunction(t.callback) && this.callback(null, e, this),
                                clearTimeout(this._isSyncingTimeout),
                                this._isSyncingTimeout = setTimeout(function() {
                                    e.currentBlock > e.highestBlock - 200 && (t._isSyncing = !1,
                                    t.emit("changed", t._isSyncing),
                                    p.isFunction(t.callback) && t.callback(null, t._isSyncing, t))
                                }, 500))
                            }
                        }
                    }
                })];
                d.forEach(function(e) {
                    e.attachToObject(t),
                    e.setRequestManager(t._requestManager, t.accounts),
                    e.defaultBlock = t.defaultBlock,
                    e.defaultAccount = t.defaultAccount,
                    e.transactionBlockTimeout = t.transactionBlockTimeout,
                    e.transactionConfirmationBlocks = t.transactionConfirmationBlocks,
                    e.transactionPollingTimeout = t.transactionPollingTimeout,
                    e.handleRevert = t.handleRevert
                })
            };
            b.addProviders(i),
            t.exports = i
        }
