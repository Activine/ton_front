import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type WalletData = {
    $$type: 'WalletData';
    balance: bigint;
    owner: Address;
    master: Address;
    code: Cell;
}

export function storeWalletData(src: WalletData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.balance, 257);
        b_0.storeAddress(src.owner);
        b_0.storeAddress(src.master);
        b_0.storeRef(src.code);
    };
}

export function loadWalletData(slice: Slice) {
    let sc_0 = slice;
    let _balance = sc_0.loadIntBig(257);
    let _owner = sc_0.loadAddress();
    let _master = sc_0.loadAddress();
    let _code = sc_0.loadRef();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function loadGetterTupleWalletData(source: TupleReader) {
    let _balance = source.readBigNumber();
    let _owner = source.readAddress();
    let _master = source.readAddress();
    let _code = source.readCell();
    return { $$type: 'WalletData' as const, balance: _balance, owner: _owner, master: _master, code: _code };
}

function storeTupleWalletData(source: WalletData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.balance);
    builder.writeAddress(source.owner);
    builder.writeAddress(source.master);
    builder.writeCell(source.code);
    return builder.build();
}

function dictValueParserWalletData(): DictionaryValue<WalletData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeWalletData(src)).endCell());
        },
        parse: (src) => {
            return loadWalletData(src.loadRef().beginParse());
        }
    }
}

export type NftData = {
    $$type: 'NftData';
    deployed: boolean;
    index: bigint;
    collection: Address;
    owner: Address;
    content: Cell;
}

export function storeNftData(src: NftData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.deployed);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.collection);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadNftData(slice: Slice) {
    let sc_0 = slice;
    let _deployed = sc_0.loadBit();
    let _index = sc_0.loadIntBig(257);
    let _collection = sc_0.loadAddress();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadTupleNftData(source: TupleReader) {
    let _deployed = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function loadGetterTupleNftData(source: TupleReader) {
    let _deployed = source.readBoolean();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'NftData' as const, deployed: _deployed, index: _index, collection: _collection, owner: _owner, content: _content };
}

function storeTupleNftData(source: NftData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.deployed);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserNftData(): DictionaryValue<NftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftData(src)).endCell());
        },
        parse: (src) => {
            return loadNftData(src.loadRef().beginParse());
        }
    }
}

export type Numbers = {
    $$type: 'Numbers';
    first: bigint;
    second: bigint;
    third: bigint;
    match: bigint;
}

export function storeNumbers(src: Numbers) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.first, 257);
        b_0.storeInt(src.second, 257);
        b_0.storeInt(src.third, 257);
        let b_1 = new Builder();
        b_1.storeInt(src.match, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNumbers(slice: Slice) {
    let sc_0 = slice;
    let _first = sc_0.loadIntBig(257);
    let _second = sc_0.loadIntBig(257);
    let _third = sc_0.loadIntBig(257);
    let sc_1 = sc_0.loadRef().beginParse();
    let _match = sc_1.loadIntBig(257);
    return { $$type: 'Numbers' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadTupleNumbers(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'Numbers' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadGetterTupleNumbers(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'Numbers' as const, first: _first, second: _second, third: _third, match: _match };
}

function storeTupleNumbers(source: Numbers) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.first);
    builder.writeNumber(source.second);
    builder.writeNumber(source.third);
    builder.writeNumber(source.match);
    return builder.build();
}

function dictValueParserNumbers(): DictionaryValue<Numbers> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNumbers(src)).endCell());
        },
        parse: (src) => {
            return loadNumbers(src.loadRef().beginParse());
        }
    }
}

export type ItemLotteryData = {
    $$type: 'ItemLotteryData';
    status: boolean;
    numbers: Numbers;
}

export function storeItemLotteryData(src: ItemLotteryData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.status);
        b_0.store(storeNumbers(src.numbers));
    };
}

export function loadItemLotteryData(slice: Slice) {
    let sc_0 = slice;
    let _status = sc_0.loadBit();
    let _numbers = loadNumbers(sc_0);
    return { $$type: 'ItemLotteryData' as const, status: _status, numbers: _numbers };
}

function loadTupleItemLotteryData(source: TupleReader) {
    let _status = source.readBoolean();
    const _numbers = loadTupleNumbers(source);
    return { $$type: 'ItemLotteryData' as const, status: _status, numbers: _numbers };
}

function loadGetterTupleItemLotteryData(source: TupleReader) {
    let _status = source.readBoolean();
    const _numbers = loadGetterTupleNumbers(source);
    return { $$type: 'ItemLotteryData' as const, status: _status, numbers: _numbers };
}

function storeTupleItemLotteryData(source: ItemLotteryData) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.status);
    builder.writeTuple(storeTupleNumbers(source.numbers));
    return builder.build();
}

function dictValueParserItemLotteryData(): DictionaryValue<ItemLotteryData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeItemLotteryData(src)).endCell());
        },
        parse: (src) => {
            return loadItemLotteryData(src.loadRef().beginParse());
        }
    }
}

export type Transfer = {
    $$type: 'Transfer';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
}

export function storeTransfer(src: Transfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(260144805, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
    };
}

export function loadTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 260144805) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function loadTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function loadGetterTupleTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    return { $$type: 'Transfer' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function storeTupleTransfer(source: Transfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    return builder.build();
}

function dictValueParserTransfer(): DictionaryValue<Transfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadTransfer(src.loadRef().beginParse());
        }
    }
}

export type InternalTransfer = {
    $$type: 'InternalTransfer';
    query_id: bigint;
    amount: bigint;
    from: Address;
    response_destination: Address;
    forward_ton_amount: bigint;
    forward_payload: Slice;
}

export function storeInternalTransfer(src: InternalTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(395134233, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.from);
        b_0.storeAddress(src.response_destination);
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadInternalTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 395134233) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _from = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _forward_ton_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function loadGetterTupleInternalTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _from = source.readAddress();
    let _response_destination = source.readAddress();
    let _forward_ton_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'InternalTransfer' as const, query_id: _query_id, amount: _amount, from: _from, response_destination: _response_destination, forward_ton_amount: _forward_ton_amount, forward_payload: _forward_payload };
}

function storeTupleInternalTransfer(source: InternalTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.from);
    builder.writeAddress(source.response_destination);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserInternalTransfer(): DictionaryValue<InternalTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeInternalTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadInternalTransfer(src.loadRef().beginParse());
        }
    }
}

export type TransferNotification = {
    $$type: 'TransferNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    forward_payload: Slice;
}

export function storeTransferNotification(src: TransferNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1935855772, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadTransferNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1935855772) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function loadGetterTupleTransferNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'TransferNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, forward_payload: _forward_payload };
}

function storeTupleTransferNotification(source: TransferNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserTransferNotification(): DictionaryValue<TransferNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTransferNotification(src)).endCell());
        },
        parse: (src) => {
            return loadTransferNotification(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    query_id: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function loadGetterTupleExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'Excesses' as const, query_id: _query_id };
}

function storeTupleExcesses(source: Excesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type Burn = {
    $$type: 'Burn';
    query_id: bigint;
    amount: bigint;
    response_destination: Address;
    custom_payload: Cell | null;
}

export function storeBurn(src: Burn) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1499400124, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
    };
}

export function loadBurn(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1499400124) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function loadGetterTupleBurn(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    return { $$type: 'Burn' as const, query_id: _query_id, amount: _amount, response_destination: _response_destination, custom_payload: _custom_payload };
}

function storeTupleBurn(source: Burn) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    return builder.build();
}

function dictValueParserBurn(): DictionaryValue<Burn> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurn(src)).endCell());
        },
        parse: (src) => {
            return loadBurn(src.loadRef().beginParse());
        }
    }
}

export type BurnNotification = {
    $$type: 'BurnNotification';
    query_id: bigint;
    amount: bigint;
    sender: Address;
    response_destination: Address;
}

export function storeBurnNotification(src: BurnNotification) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2078119902, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.sender);
        b_0.storeAddress(src.response_destination);
    };
}

export function loadBurnNotification(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2078119902) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _sender = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function loadGetterTupleBurnNotification(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _sender = source.readAddress();
    let _response_destination = source.readAddress();
    return { $$type: 'BurnNotification' as const, query_id: _query_id, amount: _amount, sender: _sender, response_destination: _response_destination };
}

function storeTupleBurnNotification(source: BurnNotification) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.sender);
    builder.writeAddress(source.response_destination);
    return builder.build();
}

function dictValueParserBurnNotification(): DictionaryValue<BurnNotification> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBurnNotification(src)).endCell());
        },
        parse: (src) => {
            return loadBurnNotification(src.loadRef().beginParse());
        }
    }
}

export type ChangeContent = {
    $$type: 'ChangeContent';
    jetton_content: Cell;
}

export function storeChangeContent(src: ChangeContent) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(274271986, 32);
        b_0.storeRef(src.jetton_content);
    };
}

export function loadChangeContent(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 274271986) { throw Error('Invalid prefix'); }
    let _jetton_content = sc_0.loadRef();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function loadGetterTupleChangeContent(source: TupleReader) {
    let _jetton_content = source.readCell();
    return { $$type: 'ChangeContent' as const, jetton_content: _jetton_content };
}

function storeTupleChangeContent(source: ChangeContent) {
    let builder = new TupleBuilder();
    builder.writeCell(source.jetton_content);
    return builder.build();
}

function dictValueParserChangeContent(): DictionaryValue<ChangeContent> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeContent(src)).endCell());
        },
        parse: (src) => {
            return loadChangeContent(src.loadRef().beginParse());
        }
    }
}

export type ProvideWalletAddress = {
    $$type: 'ProvideWalletAddress';
    query_id: bigint;
    owner_address: Address;
    include_address: boolean;
}

export function storeProvideWalletAddress(src: ProvideWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(745978227, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.owner_address);
        b_0.storeBit(src.include_address);
    };
}

export function loadProvideWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 745978227) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _owner_address = sc_0.loadAddress();
    let _include_address = sc_0.loadBit();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function loadGetterTupleProvideWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _owner_address = source.readAddress();
    let _include_address = source.readBoolean();
    return { $$type: 'ProvideWalletAddress' as const, query_id: _query_id, owner_address: _owner_address, include_address: _include_address };
}

function storeTupleProvideWalletAddress(source: ProvideWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.owner_address);
    builder.writeBoolean(source.include_address);
    return builder.build();
}

function dictValueParserProvideWalletAddress(): DictionaryValue<ProvideWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeProvideWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadProvideWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type TakeWalletAddress = {
    $$type: 'TakeWalletAddress';
    query_id: bigint;
    wallet_address: Address;
    owner_address: Address | null;
}

export function storeTakeWalletAddress(src: TakeWalletAddress) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3513996288, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.wallet_address);
        b_0.storeAddress(src.owner_address);
    };
}

export function loadTakeWalletAddress(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3513996288) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _wallet_address = sc_0.loadAddress();
    let _owner_address = sc_0.loadMaybeAddress();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function loadGetterTupleTakeWalletAddress(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _wallet_address = source.readAddress();
    let _owner_address = source.readAddressOpt();
    return { $$type: 'TakeWalletAddress' as const, query_id: _query_id, wallet_address: _wallet_address, owner_address: _owner_address };
}

function storeTupleTakeWalletAddress(source: TakeWalletAddress) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.wallet_address);
    builder.writeAddress(source.owner_address);
    return builder.build();
}

function dictValueParserTakeWalletAddress(): DictionaryValue<TakeWalletAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTakeWalletAddress(src)).endCell());
        },
        parse: (src) => {
            return loadTakeWalletAddress(src.loadRef().beginParse());
        }
    }
}

export type NftTransfer = {
    $$type: 'NftTransfer';
    query_id: bigint;
    new_owner: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_amount: bigint;
    forward_payload: Slice;
}

export function storeNftTransfer(src: NftTransfer) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.new_owner);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_amount);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftTransfer(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _new_owner = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_amount = sc_0.loadCoins();
    let _forward_payload = sc_0;
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadTupleNftTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function loadGetterTupleNftTransfer(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _new_owner = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_amount = source.readBigNumber();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'NftTransfer' as const, query_id: _query_id, new_owner: _new_owner, response_destination: _response_destination, custom_payload: _custom_payload, forward_amount: _forward_amount, forward_payload: _forward_payload };
}

function storeTupleNftTransfer(source: NftTransfer) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.new_owner);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_amount);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserNftTransfer(): DictionaryValue<NftTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNftTransfer(src.loadRef().beginParse());
        }
    }
}

export type NftOwnershipAssigned = {
    $$type: 'NftOwnershipAssigned';
    query_id: bigint;
    prev_owner: Address;
    forward_payload: Slice;
}

export function storeNftOwnershipAssigned(src: NftOwnershipAssigned) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.prev_owner);
        b_0.storeBuilder(src.forward_payload.asBuilder());
    };
}

export function loadNftOwnershipAssigned(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _prev_owner = sc_0.loadAddress();
    let _forward_payload = sc_0;
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadTupleNftOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function loadGetterTupleNftOwnershipAssigned(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _prev_owner = source.readAddress();
    let _forward_payload = source.readCell().asSlice();
    return { $$type: 'NftOwnershipAssigned' as const, query_id: _query_id, prev_owner: _prev_owner, forward_payload: _forward_payload };
}

function storeTupleNftOwnershipAssigned(source: NftOwnershipAssigned) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.prev_owner);
    builder.writeSlice(source.forward_payload.asCell());
    return builder.build();
}

function dictValueParserNftOwnershipAssigned(): DictionaryValue<NftOwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadNftOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type NftExcesses = {
    $$type: 'NftExcesses';
    query_id: bigint;
}

export function storeNftExcesses(src: NftExcesses) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1871312355, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftExcesses(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1871312355) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function loadTupleNftExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function loadGetterTupleNftExcesses(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftExcesses' as const, query_id: _query_id };
}

function storeTupleNftExcesses(source: NftExcesses) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftExcesses(): DictionaryValue<NftExcesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadNftExcesses(src.loadRef().beginParse());
        }
    }
}

export type NftGetStaticData = {
    $$type: 'NftGetStaticData';
    query_id: bigint;
}

export function storeNftGetStaticData(src: NftGetStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function loadTupleNftGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function loadGetterTupleNftGetStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetStaticData' as const, query_id: _query_id };
}

function storeTupleNftGetStaticData(source: NftGetStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetStaticData(): DictionaryValue<NftGetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftReportStaticData = {
    $$type: 'NftReportStaticData';
    query_id: bigint;
    index: bigint;
    collection: Address;
}

export function storeNftReportStaticData(src: NftReportStaticData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadNftReportStaticData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    let _collection = sc_0.loadAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function loadTupleNftReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function loadGetterTupleNftReportStaticData(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    let _collection = source.readAddress();
    return { $$type: 'NftReportStaticData' as const, query_id: _query_id, index: _index, collection: _collection };
}

function storeTupleNftReportStaticData(source: NftReportStaticData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserNftReportStaticData(): DictionaryValue<NftReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type NftGetRoyaltyParams = {
    $$type: 'NftGetRoyaltyParams';
    query_id: bigint;
}

export function storeNftGetRoyaltyParams(src: NftGetRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftGetRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function loadTupleNftGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function loadGetterTupleNftGetRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftGetRoyaltyParams' as const, query_id: _query_id };
}

function storeTupleNftGetRoyaltyParams(source: NftGetRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftGetRoyaltyParams(): DictionaryValue<NftGetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftReportRoyaltyParams = {
    $$type: 'NftReportRoyaltyParams';
    query_id: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeNftReportRoyaltyParams(src: NftReportRoyaltyParams) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeUint(src.denominator, 16);
        b_0.storeAddress(src.destination);
    };
}

export function loadNftReportRoyaltyParams(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _numerator = sc_0.loadUintBig(16);
    let _denominator = sc_0.loadUintBig(16);
    let _destination = sc_0.loadAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleNftReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleNftReportRoyaltyParams(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _numerator = source.readBigNumber();
    let _denominator = source.readBigNumber();
    let _destination = source.readAddress();
    return { $$type: 'NftReportRoyaltyParams' as const, query_id: _query_id, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleNftReportRoyaltyParams(source: NftReportRoyaltyParams) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserNftReportRoyaltyParams(): DictionaryValue<NftReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadNftReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NftDestroy = {
    $$type: 'NftDestroy';
    query_id: bigint;
}

export function storeNftDestroy(src: NftDestroy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(520377210, 32);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadNftDestroy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 520377210) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function loadTupleNftDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function loadGetterTupleNftDestroy(source: TupleReader) {
    let _query_id = source.readBigNumber();
    return { $$type: 'NftDestroy' as const, query_id: _query_id };
}

function storeTupleNftDestroy(source: NftDestroy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserNftDestroy(): DictionaryValue<NftDestroy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftDestroy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDestroy(src.loadRef().beginParse());
        }
    }
}

export type NftDeploy = {
    $$type: 'NftDeploy';
    index: bigint;
    owner: Address;
    content: Cell;
    operator: Address;
}

export function storeNftDeploy(src: NftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4052982508, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
        b_0.storeAddress(src.operator);
    };
}

export function loadNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4052982508) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    let _operator = sc_0.loadAddress();
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, content: _content, operator: _operator };
}

function loadTupleNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _operator = source.readAddress();
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, content: _content, operator: _operator };
}

function loadGetterTupleNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    let _operator = source.readAddress();
    return { $$type: 'NftDeploy' as const, index: _index, owner: _owner, content: _content, operator: _operator };
}

function storeTupleNftDeploy(source: NftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    builder.writeAddress(source.operator);
    return builder.build();
}

function dictValueParserNftDeploy(): DictionaryValue<NftDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type RequestNftDeploy = {
    $$type: 'RequestNftDeploy';
    index: bigint;
    amount: bigint;
    owner: Address;
    content: Cell;
}

export function storeRequestNftDeploy(src: RequestNftDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1410495530, 32);
        b_0.storeUint(src.index, 256);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.owner);
        b_0.storeRef(src.content);
    };
}

export function loadRequestNftDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1410495530) { throw Error('Invalid prefix'); }
    let _index = sc_0.loadUintBig(256);
    let _amount = sc_0.loadCoins();
    let _owner = sc_0.loadAddress();
    let _content = sc_0.loadRef();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content };
}

function loadTupleRequestNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content };
}

function loadGetterTupleRequestNftDeploy(source: TupleReader) {
    let _index = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _owner = source.readAddress();
    let _content = source.readCell();
    return { $$type: 'RequestNftDeploy' as const, index: _index, amount: _amount, owner: _owner, content: _content };
}

function storeTupleRequestNftDeploy(source: RequestNftDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.index);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.owner);
    builder.writeCell(source.content);
    return builder.build();
}

function dictValueParserRequestNftDeploy(): DictionaryValue<RequestNftDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRequestNftDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadRequestNftDeploy(src.loadRef().beginParse());
        }
    }
}

export type SetLotteryData = {
    $$type: 'SetLotteryData';
    first: bigint;
    second: bigint;
    third: bigint;
    match: bigint;
}

export function storeSetLotteryData(src: SetLotteryData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4066829817, 32);
        b_0.storeUint(src.first, 8);
        b_0.storeUint(src.second, 8);
        b_0.storeUint(src.third, 8);
        b_0.storeUint(src.match, 8);
    };
}

export function loadSetLotteryData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4066829817) { throw Error('Invalid prefix'); }
    let _first = sc_0.loadUintBig(8);
    let _second = sc_0.loadUintBig(8);
    let _third = sc_0.loadUintBig(8);
    let _match = sc_0.loadUintBig(8);
    return { $$type: 'SetLotteryData' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadTupleSetLotteryData(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'SetLotteryData' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadGetterTupleSetLotteryData(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'SetLotteryData' as const, first: _first, second: _second, third: _third, match: _match };
}

function storeTupleSetLotteryData(source: SetLotteryData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.first);
    builder.writeNumber(source.second);
    builder.writeNumber(source.third);
    builder.writeNumber(source.match);
    return builder.build();
}

function dictValueParserSetLotteryData(): DictionaryValue<SetLotteryData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetLotteryData(src)).endCell());
        },
        parse: (src) => {
            return loadSetLotteryData(src.loadRef().beginParse());
        }
    }
}

export type SetData = {
    $$type: 'SetData';
    nftAddress: Address;
    jettonAddress: Address;
}

export function storeSetData(src: SetData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1233384412, 32);
        b_0.storeAddress(src.nftAddress);
        b_0.storeAddress(src.jettonAddress);
    };
}

export function loadSetData(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1233384412) { throw Error('Invalid prefix'); }
    let _nftAddress = sc_0.loadAddress();
    let _jettonAddress = sc_0.loadAddress();
    return { $$type: 'SetData' as const, nftAddress: _nftAddress, jettonAddress: _jettonAddress };
}

function loadTupleSetData(source: TupleReader) {
    let _nftAddress = source.readAddress();
    let _jettonAddress = source.readAddress();
    return { $$type: 'SetData' as const, nftAddress: _nftAddress, jettonAddress: _jettonAddress };
}

function loadGetterTupleSetData(source: TupleReader) {
    let _nftAddress = source.readAddress();
    let _jettonAddress = source.readAddress();
    return { $$type: 'SetData' as const, nftAddress: _nftAddress, jettonAddress: _jettonAddress };
}

function storeTupleSetData(source: SetData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nftAddress);
    builder.writeAddress(source.jettonAddress);
    return builder.build();
}

function dictValueParserSetData(): DictionaryValue<SetData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetData(src)).endCell());
        },
        parse: (src) => {
            return loadSetData(src.loadRef().beginParse());
        }
    }
}

export type BuyToken = {
    $$type: 'BuyToken';
    query_id: bigint;
    amount: bigint;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
}

export function storeBuyToken(src: BuyToken) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(283496184, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
    };
}

export function loadBuyToken(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 283496184) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    return { $$type: 'BuyToken' as const, query_id: _query_id, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function loadTupleBuyToken(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    return { $$type: 'BuyToken' as const, query_id: _query_id, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function loadGetterTupleBuyToken(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    return { $$type: 'BuyToken' as const, query_id: _query_id, amount: _amount, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount };
}

function storeTupleBuyToken(source: BuyToken) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    return builder.build();
}

function dictValueParserBuyToken(): DictionaryValue<BuyToken> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyToken(src)).endCell());
        },
        parse: (src) => {
            return loadBuyToken(src.loadRef().beginParse());
        }
    }
}

export type BuyTicket = {
    $$type: 'BuyTicket';
    query_id: bigint;
    amount: bigint;
    destination: Address;
    response_destination: Address;
    custom_payload: Cell | null;
    forward_ton_amount: bigint;
    contentNft: Cell;
    value: bigint;
}

export function storeBuyTicket(src: BuyTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3349641132, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeCoins(src.amount);
        b_0.storeAddress(src.destination);
        b_0.storeAddress(src.response_destination);
        if (src.custom_payload !== null && src.custom_payload !== undefined) { b_0.storeBit(true).storeRef(src.custom_payload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forward_ton_amount);
        b_0.storeRef(src.contentNft);
        b_0.storeCoins(src.value);
    };
}

export function loadBuyTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3349641132) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _amount = sc_0.loadCoins();
    let _destination = sc_0.loadAddress();
    let _response_destination = sc_0.loadAddress();
    let _custom_payload = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _forward_ton_amount = sc_0.loadCoins();
    let _contentNft = sc_0.loadRef();
    let _value = sc_0.loadCoins();
    return { $$type: 'BuyTicket' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, contentNft: _contentNft, value: _value };
}

function loadTupleBuyTicket(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _contentNft = source.readCell();
    let _value = source.readBigNumber();
    return { $$type: 'BuyTicket' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, contentNft: _contentNft, value: _value };
}

function loadGetterTupleBuyTicket(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _amount = source.readBigNumber();
    let _destination = source.readAddress();
    let _response_destination = source.readAddress();
    let _custom_payload = source.readCellOpt();
    let _forward_ton_amount = source.readBigNumber();
    let _contentNft = source.readCell();
    let _value = source.readBigNumber();
    return { $$type: 'BuyTicket' as const, query_id: _query_id, amount: _amount, destination: _destination, response_destination: _response_destination, custom_payload: _custom_payload, forward_ton_amount: _forward_ton_amount, contentNft: _contentNft, value: _value };
}

function storeTupleBuyTicket(source: BuyTicket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.destination);
    builder.writeAddress(source.response_destination);
    builder.writeCell(source.custom_payload);
    builder.writeNumber(source.forward_ton_amount);
    builder.writeCell(source.contentNft);
    builder.writeNumber(source.value);
    return builder.build();
}

function dictValueParserBuyTicket(): DictionaryValue<BuyTicket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBuyTicket(src)).endCell());
        },
        parse: (src) => {
            return loadBuyTicket(src.loadRef().beginParse());
        }
    }
}

export type CheckTicket = {
    $$type: 'CheckTicket';
    query_id: bigint;
    index: bigint;
}

export function storeCheckTicket(src: CheckTicket) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(4236050538, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
    };
}

export function loadCheckTicket(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 4236050538) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    return { $$type: 'CheckTicket' as const, query_id: _query_id, index: _index };
}

function loadTupleCheckTicket(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'CheckTicket' as const, query_id: _query_id, index: _index };
}

function loadGetterTupleCheckTicket(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'CheckTicket' as const, query_id: _query_id, index: _index };
}

function storeTupleCheckTicket(source: CheckTicket) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserCheckTicket(): DictionaryValue<CheckTicket> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCheckTicket(src)).endCell());
        },
        parse: (src) => {
            return loadCheckTicket(src.loadRef().beginParse());
        }
    }
}

export type GetTicketStatus = {
    $$type: 'GetTicketStatus';
    query_id: bigint;
    status: boolean;
    index: bigint;
}

export function storeGetTicketStatus(src: GetTicketStatus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(708453207, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeBit(src.status);
        b_0.storeUint(src.index, 256);
    };
}

export function loadGetTicketStatus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 708453207) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _status = sc_0.loadBit();
    let _index = sc_0.loadUintBig(256);
    return { $$type: 'GetTicketStatus' as const, query_id: _query_id, status: _status, index: _index };
}

function loadTupleGetTicketStatus(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _status = source.readBoolean();
    let _index = source.readBigNumber();
    return { $$type: 'GetTicketStatus' as const, query_id: _query_id, status: _status, index: _index };
}

function loadGetterTupleGetTicketStatus(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _status = source.readBoolean();
    let _index = source.readBigNumber();
    return { $$type: 'GetTicketStatus' as const, query_id: _query_id, status: _status, index: _index };
}

function storeTupleGetTicketStatus(source: GetTicketStatus) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeBoolean(source.status);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserGetTicketStatus(): DictionaryValue<GetTicketStatus> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetTicketStatus(src)).endCell());
        },
        parse: (src) => {
            return loadGetTicketStatus(src.loadRef().beginParse());
        }
    }
}

export type TicketStatus = {
    $$type: 'TicketStatus';
    getRewards: boolean;
    query_id: bigint;
}

export function storeTicketStatus(src: TicketStatus) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(226386112, 32);
        b_0.storeBit(src.getRewards);
        b_0.storeUint(src.query_id, 64);
    };
}

export function loadTicketStatus(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 226386112) { throw Error('Invalid prefix'); }
    let _getRewards = sc_0.loadBit();
    let _query_id = sc_0.loadUintBig(64);
    return { $$type: 'TicketStatus' as const, getRewards: _getRewards, query_id: _query_id };
}

function loadTupleTicketStatus(source: TupleReader) {
    let _getRewards = source.readBoolean();
    let _query_id = source.readBigNumber();
    return { $$type: 'TicketStatus' as const, getRewards: _getRewards, query_id: _query_id };
}

function loadGetterTupleTicketStatus(source: TupleReader) {
    let _getRewards = source.readBoolean();
    let _query_id = source.readBigNumber();
    return { $$type: 'TicketStatus' as const, getRewards: _getRewards, query_id: _query_id };
}

function storeTupleTicketStatus(source: TicketStatus) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.getRewards);
    builder.writeNumber(source.query_id);
    return builder.build();
}

function dictValueParserTicketStatus(): DictionaryValue<TicketStatus> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTicketStatus(src)).endCell());
        },
        parse: (src) => {
            return loadTicketStatus(src.loadRef().beginParse());
        }
    }
}

export type ClaimReward = {
    $$type: 'ClaimReward';
    query_id: bigint;
    index: bigint;
}

export function storeClaimReward(src: ClaimReward) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1830816447, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeUint(src.index, 256);
    };
}

export function loadClaimReward(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1830816447) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _index = sc_0.loadUintBig(256);
    return { $$type: 'ClaimReward' as const, query_id: _query_id, index: _index };
}

function loadTupleClaimReward(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'ClaimReward' as const, query_id: _query_id, index: _index };
}

function loadGetterTupleClaimReward(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _index = source.readBigNumber();
    return { $$type: 'ClaimReward' as const, query_id: _query_id, index: _index };
}

function storeTupleClaimReward(source: ClaimReward) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserClaimReward(): DictionaryValue<ClaimReward> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimReward(src)).endCell());
        },
        parse: (src) => {
            return loadClaimReward(src.loadRef().beginParse());
        }
    }
}

export type ClaimResponse = {
    $$type: 'ClaimResponse';
    query_id: bigint;
    winner: Address;
    match: bigint;
}

export function storeClaimResponse(src: ClaimResponse) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(799247125, 32);
        b_0.storeUint(src.query_id, 64);
        b_0.storeAddress(src.winner);
        b_0.storeUint(src.match, 8);
    };
}

export function loadClaimResponse(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 799247125) { throw Error('Invalid prefix'); }
    let _query_id = sc_0.loadUintBig(64);
    let _winner = sc_0.loadAddress();
    let _match = sc_0.loadUintBig(8);
    return { $$type: 'ClaimResponse' as const, query_id: _query_id, winner: _winner, match: _match };
}

function loadTupleClaimResponse(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _winner = source.readAddress();
    let _match = source.readBigNumber();
    return { $$type: 'ClaimResponse' as const, query_id: _query_id, winner: _winner, match: _match };
}

function loadGetterTupleClaimResponse(source: TupleReader) {
    let _query_id = source.readBigNumber();
    let _winner = source.readAddress();
    let _match = source.readBigNumber();
    return { $$type: 'ClaimResponse' as const, query_id: _query_id, winner: _winner, match: _match };
}

function storeTupleClaimResponse(source: ClaimResponse) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.query_id);
    builder.writeAddress(source.winner);
    builder.writeNumber(source.match);
    return builder.build();
}

function dictValueParserClaimResponse(): DictionaryValue<ClaimResponse> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeClaimResponse(src)).endCell());
        },
        parse: (src) => {
            return loadClaimResponse(src.loadRef().beginParse());
        }
    }
}

export type RoundData = {
    $$type: 'RoundData';
    first: bigint;
    second: bigint;
    third: bigint;
    match: bigint;
}

export function storeRoundData(src: RoundData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.first, 8);
        b_0.storeUint(src.second, 8);
        b_0.storeUint(src.third, 8);
        b_0.storeUint(src.match, 8);
    };
}

export function loadRoundData(slice: Slice) {
    let sc_0 = slice;
    let _first = sc_0.loadUintBig(8);
    let _second = sc_0.loadUintBig(8);
    let _third = sc_0.loadUintBig(8);
    let _match = sc_0.loadUintBig(8);
    return { $$type: 'RoundData' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadTupleRoundData(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'RoundData' as const, first: _first, second: _second, third: _third, match: _match };
}

function loadGetterTupleRoundData(source: TupleReader) {
    let _first = source.readBigNumber();
    let _second = source.readBigNumber();
    let _third = source.readBigNumber();
    let _match = source.readBigNumber();
    return { $$type: 'RoundData' as const, first: _first, second: _second, third: _third, match: _match };
}

function storeTupleRoundData(source: RoundData) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.first);
    builder.writeNumber(source.second);
    builder.writeNumber(source.third);
    builder.writeNumber(source.match);
    return builder.build();
}

function dictValueParserRoundData(): DictionaryValue<RoundData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoundData(src)).endCell());
        },
        parse: (src) => {
            return loadRoundData(src.loadRef().beginParse());
        }
    }
}

export type LotteryData = {
    $$type: 'LotteryData';
    nftCollection: Address;
    paymentToken: Address;
}

export function storeLotteryData(src: LotteryData) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.nftCollection);
        b_0.storeAddress(src.paymentToken);
    };
}

export function loadLotteryData(slice: Slice) {
    let sc_0 = slice;
    let _nftCollection = sc_0.loadAddress();
    let _paymentToken = sc_0.loadAddress();
    return { $$type: 'LotteryData' as const, nftCollection: _nftCollection, paymentToken: _paymentToken };
}

function loadTupleLotteryData(source: TupleReader) {
    let _nftCollection = source.readAddress();
    let _paymentToken = source.readAddress();
    return { $$type: 'LotteryData' as const, nftCollection: _nftCollection, paymentToken: _paymentToken };
}

function loadGetterTupleLotteryData(source: TupleReader) {
    let _nftCollection = source.readAddress();
    let _paymentToken = source.readAddress();
    return { $$type: 'LotteryData' as const, nftCollection: _nftCollection, paymentToken: _paymentToken };
}

function storeTupleLotteryData(source: LotteryData) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.nftCollection);
    builder.writeAddress(source.paymentToken);
    return builder.build();
}

function dictValueParserLotteryData(): DictionaryValue<LotteryData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeLotteryData(src)).endCell());
        },
        parse: (src) => {
            return loadLotteryData(src.loadRef().beginParse());
        }
    }
}

 type NftItem_init_args = {
    $$type: 'NftItem_init_args';
    collection: Address;
    index: bigint;
    operator: Address;
}

function initNftItem_init_args(src: NftItem_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.collection);
        b_0.storeInt(src.index, 257);
        b_0.storeAddress(src.operator);
    };
}

async function NftItem_init(collection: Address, index: bigint, operator: Address) {
    const __code = Cell.fromBase64('te6ccgECIwEABvsAART/APSkE/S88sgLAQIBYgIDA5rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVG9s88uCCyPhDAcx/AcoAVbDbPMntVB4EBQIBIBMUBPABkjB/4HAh10nCH5UwINcLH94gghDxk5rsuuMCIIIQHwRTerqOvzDTHwGCEB8EU3q68uCB0z8BMYIApfv4QhzHBRvy9Pgo+EJwgwYNyAGCEG+J9eNYyx/LP8lBMB1/VTBtbds8f+AgghDyZuX5uuMCIIIQDX5gwLoGEAcIAeJQvMoAUAkg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQByDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhXL/xPMyFgg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYSygDIRBRQVhIA8DDTHwGCEPGTmuy68uCB0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdT6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIFEMwbBQ6OjuBWt/4QlLQxwXy9CmCAKwzArry9IIAxJQMsxzy9H8LfwBsMNMfAYIQ8mbl+bry4IHTB9MH0wfTB1UwbBSCAJl9+EJSwMcF8vQps5hsVVUgfwRVBJJfBOJ/BF6OlTDTHwGCEA1+YMC68uCB0gDTP1lsEuAgghBfzD0Uuo8FMNs8bBbgghAvyyaiugkKCwwC6AGOzSLDAJIhs5Fw4o6/MVORfwNZyFUgghAvo4sVUATLHxLLPwEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxbLB8n4QgF/bds8kTDijqBUZqBZyFUgghAqOiNXUATLHxLLP8oAy//J+EIBf23bPOJ/DQ0AwNMfAYIQX8w9FLry4IHTP/pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSAAGR1JJtAeL6AFFVFRRDMAP2MvhBbySBLkpWFfL0ggCl+1YTJMcF8vSCCvrwgCD4J28QtgihggkxLQAmoCGgJsMAjodUdUMl2zyg3iOBdsQCvvL0IoIJMS0AoSahAaElwwCUVxNfBuMNLMIAjpkCyAGCEG+J9eNYyx/LP8kcfwNwQwNtbds8kzA7MOJ/Dw4QAbSO1dMfAYIQL8smorry4IHTPwEx+EJwgEBUM87IVSCCEIt3FzVQBMsfEss/y/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyUEwf1UwbW3bPH/gMHAQATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPBACmFUw2zyhcSYCARERAQTIVSCCEAUTjZFQBMsfEss/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFgHPFskkAxEQAX9VMG1t2zwPEABkbDH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMPoAMXHXIfoAMfoAMKcDqwAByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsAEQCYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzABIUDSBAQHPAIEBAc8AgQEBzwAByIEBAc8AyQHME8oAyVjMyQHMAgFqFRYCASAZGgIRsUd2zzbPGzBgHhcCEbO09s82zxsxYB4YAAIpAApUdUNTVAIRuPz9s82zxsxYHhsCASAcHQAKVHuKU8oAEbRX3aiaGkAAMAIRt20bZ5tnjZgwHh8Czu1E0NQB+GPSAAGOhNs8bBzg+CjXCwqDCbry4In6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwA9FY2zwgIQACJgHa0gD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//U1AHQ+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANQw0CIAKDBwcHBUcABwKMjJKhCbEJoQKVVSAFqBAQHXAIEBAdcAgQEB1wDUAdCBAQHXADAUQzAE0gAwEHwQexB6EHkQeBA0QTA=');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initNftItem_init_args({ $$type: 'NftItem_init_args', collection, index, operator })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const NftItem_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    4429: { message: `Invalid sender` },
    11850: { message: `Not Deployed` },
    23263: { message: `Invalid Sender` },
    30404: { message: `Invalid Amount` },
    39293: { message: `Operator only` },
    42491: { message: `Invalid Owner` },
    44083: { message: `Invalid Index` },
    50324: { message: `Already Deployed` },
    50956: { message: `Only 1.5 TON payments are accepted` },
    51724: { message: `Invalid ton amount` },
    54227: { message: `Invalid token amount` },
}

const NftItem_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"WalletData","header":null,"fields":[{"name":"balance","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"master","type":{"kind":"simple","type":"address","optional":false}},{"name":"code","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"NftData","header":null,"fields":[{"name":"deployed","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Numbers","header":null,"fields":[{"name":"first","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"second","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"third","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"match","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"ItemLotteryData","header":null,"fields":[{"name":"status","type":{"kind":"simple","type":"bool","optional":false}},{"name":"numbers","type":{"kind":"simple","type":"Numbers","optional":false}}]},
    {"name":"Transfer","header":260144805,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"InternalTransfer","header":395134233,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"from","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"TransferNotification","header":1935855772,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"Burn","header":1499400124,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"BurnNotification","header":2078119902,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeContent","header":274271986,"fields":[{"name":"jetton_content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"ProvideWalletAddress","header":745978227,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"include_address","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TakeWalletAddress","header":3513996288,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"wallet_address","type":{"kind":"simple","type":"address","optional":false}},{"name":"owner_address","type":{"kind":"simple","type":"address","optional":true}}]},
    {"name":"NftTransfer","header":1607220500,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"new_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"NftOwnershipAssigned","header":85167505,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prev_owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forward_payload","type":{"kind":"simple","type":"slice","optional":false,"format":"remainder"}}]},
    {"name":"NftExcesses","header":1871312355,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftGetStaticData","header":801842850,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftReportStaticData","header":2339837749,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftGetRoyaltyParams","header":1765620048,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftReportRoyaltyParams","header":2831876269,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftDestroy","header":520377210,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"NftDeploy","header":4052982508,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}},{"name":"operator","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RequestNftDeploy","header":1410495530,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"content","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"SetLotteryData","header":4066829817,"fields":[{"name":"first","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"second","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"third","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"match","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"SetData","header":1233384412,"fields":[{"name":"nftAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"jettonAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"BuyToken","header":283496184,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"BuyTicket","header":3349641132,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"response_destination","type":{"kind":"simple","type":"address","optional":false}},{"name":"custom_payload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forward_ton_amount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"contentNft","type":{"kind":"simple","type":"cell","optional":false}},{"name":"value","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"CheckTicket","header":4236050538,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"GetTicketStatus","header":708453207,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"status","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"TicketStatus","header":226386112,"fields":[{"name":"getRewards","type":{"kind":"simple","type":"bool","optional":false}},{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ClaimReward","header":1830816447,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ClaimResponse","header":799247125,"fields":[{"name":"query_id","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"winner","type":{"kind":"simple","type":"address","optional":false}},{"name":"match","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"RoundData","header":null,"fields":[{"name":"first","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"second","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"third","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"match","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"LotteryData","header":null,"fields":[{"name":"nftCollection","type":{"kind":"simple","type":"address","optional":false}},{"name":"paymentToken","type":{"kind":"simple","type":"address","optional":false}}]},
]

const NftItem_getters: ABIGetter[] = [
    {"name":"lottery_data","arguments":[],"returnType":{"kind":"simple","type":"ItemLotteryData","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"operator","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"get_nft_data","arguments":[],"returnType":{"kind":"simple","type":"NftData","optional":false}},
]

export const NftItem_getterMapping: { [key: string]: string } = {
    'lottery_data': 'getLotteryData',
    'owner': 'getOwner',
    'operator': 'getOperator',
    'get_nft_data': 'getGetNftData',
}

const NftItem_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"NftDeploy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftDestroy"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetLotteryData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"TicketStatus"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"NftGetStaticData"}},
]

export class NftItem implements Contract {
    
    static async init(collection: Address, index: bigint, operator: Address) {
        return await NftItem_init(collection, index, operator);
    }
    
    static async fromInit(collection: Address, index: bigint, operator: Address) {
        const init = await NftItem_init(collection, index, operator);
        const address = contractAddress(0, init);
        return new NftItem(address, init);
    }
    
    static fromAddress(address: Address) {
        return new NftItem(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftItem_types,
        getters: NftItem_getters,
        receivers: NftItem_receivers,
        errors: NftItem_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: NftDeploy | NftDestroy | SetLotteryData | TicketStatus | NftTransfer | NftGetStaticData) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftDeploy') {
            body = beginCell().store(storeNftDeploy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftDestroy') {
            body = beginCell().store(storeNftDestroy(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetLotteryData') {
            body = beginCell().store(storeSetLotteryData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'TicketStatus') {
            body = beginCell().store(storeTicketStatus(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftTransfer') {
            body = beginCell().store(storeNftTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NftGetStaticData') {
            body = beginCell().store(storeNftGetStaticData(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getLotteryData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('lottery_data', builder.build())).stack;
        const result = loadGetterTupleItemLotteryData(source);
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getOperator(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('operator', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetNftData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('get_nft_data', builder.build())).stack;
        const result = loadGetterTupleNftData(source);
        return result;
    }
    
}