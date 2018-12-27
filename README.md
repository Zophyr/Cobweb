# Cobweb

💸 A P2P lending platform on Ethereum blockchain.

## Quick Start

Before you start, you need to install the following things: 

1. nodejs
    - [download](https://nodejs.org/)

2. truffle
    - `npm install truffle -g`

3. ganache
    - [download](https://truffleframework.com/ganache)

4. metamask
    - [install](https://metamask.io/)

OK, let's go.

1. down the repo.

```shell
$ git clone https://github.com/Zophyr/Cobweb
```

2. open ganache

3. migrate the contract

```shell
$ cd Cobweb/
$ truffle migrate --reset
```

4. run test

```shell
$ truffle test
```

When you see info like the following, you have successfully installed:

```shell
Using network 'development'.



  Contract: Cobweb
    ✓ Connect the blockchain and find the address. 
    ✓ Create two bills.  (347ms)
    ✓ Try to withdraw money by asker.  (184ms)
    ✓ Try to return money by asker.  (244ms)
    ✓ Try to callback money by giver.  (205ms)


  5 passing (1s)

```
