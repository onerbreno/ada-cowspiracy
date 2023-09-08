import { formatCurrency } from "./utils/formatCurrency"

const database = new Map()

class Entity {
  #id
  props

  constructor(props, id) {
    this.props = props
    this.#id = id
  }

  get id() {
    return this.#id
  }
}

export class Account extends Entity {
  #lastWorkTimestamp = 0
  #balance = 0
  static TIME_INTERVAL_WORK = 10000

  constructor(props, id) {
    super(props, id)
  }

  get name() {
    return this.props.name
  }

  get username() {
    return this.props.username
  }

  get avatarUrl() {
    return this.props.avatarUrl
  }

  get balance() {
    return this.#balance
  }

  set balance(amount) {
    this.#balance = amount
  }

  get canWork() {
    const nextWork = this.#lastWorkTimestamp + Account.TIME_INTERVAL_WORK
    return nextWork <= Date.now()
  }

  work() {
    const dateNow = Date.now()

    if ((dateNow - this.#lastWorkTimestamp) > Account.TIME_INTERVAL_WORK) {
      const earnedMoney = Math.floor(Math.random() * 1000) + 1
      this.balance += earnedMoney
      this.#lastWorkTimestamp = dateNow

      const formatEarnedMoney = formatCurrency(earnedMoney)
      return `Você ganhou ${formatEarnedMoney}.`
    }

    return `Aguarde 10 segundos para trabalhar novamente.`
  }

  checkTransactionConditions(amount) {
    if (isNaN(amount)) {
      return 'Passe todos os argumentos.'
    }

    if (amount <= 0) {
      return 'Valor não pode ser menor que zero.'
    }

    if (this.#balance < amount) {
      return 'Saldo insuficiente na sua conta.'
    }

    return null
  }

  transferMoney({ usernameTarget, amount }) {
    const amountError = this.checkTransactionConditions(amount)
    if (amountError) {
      return amountError
    }
    
    const target = Account.getByUsername(usernameTarget)
    if (!target) {
      return 'Username inválido.'
    }

    this.balance -= amount
    target.balance += amount

    return `Sua transação de ${formatCurrency(amount)} para **${usernameTarget}** foi feita com sucesso.`
  }

  getAccountInfo() {
    return {
      ...this.props,
      balance: formatCurrency(this.balance),
      lastWork: {
        date: this.#lastWorkTimestamp,
        time: new Date(this.#lastWorkTimestamp).getTime()
      }
    }
  }

  placeBet({ userSelectedNumber, amount }) {
    const amountError = this.checkTransactionConditions(amount)

    if (userSelectedNumber === undefined) {
      return 'Passe seu número da sorte.'
    }

    if (userSelectedNumber < 1 || userSelectedNumber > 10) {
      return 'Número da sorte inválido.'
    }

    if (amountError) {
      return amountError
    }

    const drawNumber = Math.floor(Math.random() * 5) + 1
    if (drawNumber === userSelectedNumber) {
      const earnedBetMoney = amount * drawNumber
      this.balance += earnedBetMoney
      const formatEarnedBetMoney = formatCurrency(earnedBetMoney)

      return `Você acertou! Ganhou ${formatEarnedBetMoney}!`
    }

    this.balance -= amount
    return `Você perdeu! ${drawNumber}`
  }

  static create(newAccount) {
    database.set(newAccount.id, newAccount)
  }

  static get(id) {
    return database.get(id)
  }

  static getByUsername(username) {
    let foundAccount = null

    database.forEach(account => {
      if (account.props.username === username) {
        foundAccount = account
      }
    })

    return foundAccount
  }
}