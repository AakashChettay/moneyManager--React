import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteTransaction} = props
  const {id, amount, type, title} = transactionDetails
  const deleteBtnClicked = () => {
    deleteTransaction(id)
  }

  return (
    <li className="rowInTab">
      <p className="titleCol">{title}</p>
      <p className="amtCol">{amount}</p>
      <p className="typeCol">{type}</p>
      <button type="button" onClick={deleteBtnClicked} className="delBtn">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
          alt="delete"
          data-testid="delete"
        />
      </button>
    </li>
  )
}
export default TransactionItem
