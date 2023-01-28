// Write your code here
import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onMarkStar} = props
  const {id, title, appointmentDate, isStared} = appointmentDetails
  let startImageUrl
  if (isStared === true) {
    startImageUrl =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
  } else {
    startImageUrl =
      'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  }
  const onClickStar = () => {
    onMarkStar(id)
  }
  return (
    <li className="appointment-list-item">
      <div className="title-star-container">
        <p className="appointment-title">{title}</p>
        <button
          className="stat-button"
          type="button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={startImageUrl} className="star-image" alt="star" />
        </button>
      </div>
      <p className="appointment-date">{appointmentDate}</p>
    </li>
  )
}
export default AppointmentItem
