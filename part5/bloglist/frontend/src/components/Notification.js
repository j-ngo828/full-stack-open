import './Notification.css'

const Notification = ({ message, isError = false }) => {
  const errorClass = isError ? 'error' : ''
  const successClass = isError ? '' : 'success'
  return message && <div className={`message ${successClass} ${errorClass}`}>{message}</div>
}

export default Notification
