import './index.css'

const MoneyDetails = props => {
  const {balance, income, expenses} = props

  return (
    <ul className="moneyDetailsContainer">
      <li className="moneyDetailsCard balanceStyle">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="iconStyle"
        />
        <div className="textContainer">
          <p className="yourBalHead">Your Balance</p>
          <p data-testid="balanceAmount" className="balanceParaStyle">
            Rs {balance.toFixed(2)}
          </p>
        </div>
      </li>
      <li className="moneyDetailsCard incomeStyle">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="iconStyle"
        />
        <div className="textContainer">
          <p className="yourBalHead">Your Income</p>
          <p data-testid="incomeAmount" className="balanceParaStyle">
            Rs {income.toFixed(2)}
          </p>
        </div>
      </li>
      <li className="moneyDetailsCard expenseStyle">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="iconStyle"
        />
        <div className="textContainer">
          <p className="yourBalHead">Your Expenses</p>
          <p data-testid="expensesAmount" className="balanceParaStyle">
            Rs {expenses.toFixed(2)}
          </p>
        </div>
      </li>
    </ul>
  )
}

export default MoneyDetails
