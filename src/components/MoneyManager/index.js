import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    title: '',
    amount: '',
    type: transactionTypeOptions[0].optionId,
  }

  componentDidMount() {
    this.loadTransactionsFromLocalStorage()
  }

  componentDidUpdate(prevProps, prevState) {
    const {transactionList} = this.state
    if (prevState.transactionList !== transactionList) {
      this.saveTransactionsToLocalStorage()
    }
  }

  loadTransactionsFromLocalStorage = () => {
    const savedTransactions = localStorage.getItem('transactionList')
    if (savedTransactions) {
      this.setState({transactionList: JSON.parse(savedTransactions)})
    }
  }

  saveTransactionsToLocalStorage = () => {
    const {transactionList} = this.state
    localStorage.setItem('transactionList', JSON.stringify(transactionList))
  }

  handleTitleInput = event => {
    this.setState({title: event.target.value})
  }

  handleAmountInput = event => {
    this.setState({amount: event.target.value})
  }

  handleTypeInput = event => {
    this.setState({type: event.target.value})
  }

  addTransaction = event => {
    event.preventDefault()
    const {title, amount, type} = this.state
    if (title === '' || amount === '') {
      return
    }
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === type,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      title: '',
      amount: '',
      type: transactionTypeOptions[0].optionId,
    }))
  }

  deleteTransaction = id => {
    this.setState(prevState => {
      const updatedTransactionList = prevState.transactionList.filter(
        transaction => transaction.id !== id,
      )
      return {transactionList: updatedTransactionList}
    })
  }

  accountIncome = () => {
    const {transactionList} = this.state
    return transactionList.reduce(
      (acc, transaction) =>
        transaction.type === transactionTypeOptions[0].displayText
          ? acc + transaction.amount
          : acc,
      0,
    )
  }

  accountExpenses = () => {
    const {transactionList} = this.state
    return transactionList.reduce(
      (acc, transaction) =>
        transaction.type === transactionTypeOptions[1].displayText
          ? acc + transaction.amount
          : acc,
      0,
    )
  }

  accountBalance = () => {
    const income = this.accountIncome()
    const expenses = this.accountExpenses()
    return income - expenses
  }

  render() {
    const {transactionList, title, amount, type} = this.state
    const income = this.accountIncome()
    const expenses = this.accountExpenses()
    const balance = this.accountBalance()

    return (
      <div className="bg-container">
        <div className="welcomeCard">
          <h1 className="nameHeading">Hi, Edward Newgate</h1>
          <p className="paraStyle">
            Welcome back to your{' '}
            <span className="spanStyle">Money Manager</span>
          </p>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="inputAndOutputContainer">
          <form onSubmit={this.addTransaction} className="transactionContainer">
            <h1 className="addTranHead">Add Transaction</h1>
            <label htmlFor="titleInput" className="labelStyle">
              Title
            </label>
            <input
              onChange={this.handleTitleInput}
              value={title}
              id="titleInput"
              placeholder="TITLE"
              className="inputStyle"
            />
            <label htmlFor="amtInput" className="labelStyle">
              Amount
            </label>
            <input
              onChange={this.handleAmountInput}
              value={amount}
              id="amtInput"
              placeholder="AMOUNT"
              className="inputStyle"
            />
            <label htmlFor="typeInput" className="labelStyle">
              Type
            </label>
            <select
              onChange={this.handleTypeInput}
              value={type}
              id="typeInput"
              className="inputStyle"
            >
              {transactionTypeOptions.map(transactionOption => (
                <option
                  key={transactionOption.optionId}
                  value={transactionOption.optionId}
                >
                  {transactionOption.displayText}
                </option>
              ))}
            </select>
            <button type="submit" className="addbtn">
              Add
            </button>
          </form>
          <div className="transactionHistoryContainer">
            <h1 className="addTranHead">History</h1>
            <ul className="transactionsContainer">
              <li className="rowInTab">
                <p className="titleCol">Title</p>
                <p className="amtCol">Amount</p>
                <p className="typeCol">Type</p>
              </li>
              {transactionList.map(transaction => (
                <TransactionItem
                  key={transaction.id}
                  transactionDetails={transaction}
                  deleteTransaction={this.deleteTransaction}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
