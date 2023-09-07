import { formatCurrency } from "./utils/formatCurrency"

const database = new Map()

const usernames = new Set()

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

  get canWork() {
    const nextWork = this.#lastWorkTimestamp + 10000
    return nextWork <= Date.now()
  }

  work() {
    const dateNow = Date.now()

    if ((dateNow - this.#lastWorkTimestamp) > 10000) {
      const earnedMoney = Math.floor(Math.random() * 1000) + 1
      this.#balance += earnedMoney
      this.#lastWorkTimestamp = dateNow

      return {
        earnedMoney
      }
    }
  }

  transferMoney(usernameTarget, amount) {
    const target = Account.getByUsername(usernameTarget)

    if (!target || !amount) {
      return 'Conta alvo inválida'
    }

    if (amount <= 0) {
      return `Valor não pode ser menor que zero.`
    }

    if (this.#balance < amount) {
      return `Saldo insuficiente na sua conta.`
    }

    this.#balance -= amount
    target.#balance += amount

    return `Sua transação de ${formatCurrency(amount)} para **${usernameTarget}** foi feita com sucesso.`
  }

  getAccountInfo() {
    return {
      ...this.props,
      balance: this.#balance,
      lastWork: {
        date: this.#lastWorkTimestamp,
        time: new Date(this.#lastWorkTimestamp).getTime()
      }
    }
  }

  placeBet(amount, userSelectedNumber) {
    if (amount <= 0) {
      return `Valor não pode ser menor que zero.`
    }

    if (this.#balance < amount) {
      return `Saldo insuficiente na sua conta.`
    }

    const drawNumber = Math.floor(Math.random() * 10) + 1

    return drawNumber
  }

  static create(newAccount) {
    database.set(newAccount.id, newAccount)
    usernames.add(newAccount.username)
  }

  static has(id) {
    return database.has(id)
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
