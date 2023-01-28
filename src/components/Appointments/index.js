import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    appointmentDate: '',
    appointmentList: [],
    showStared: false,
  }

  changeTitle = event => {
    this.setState({title: event.target.value})
  }

  changeDate = event => {
    this.setState({appointmentDate: event.target.value})
  }

  onAddAppointmentDetails = () => {
    const {title, appointmentDate} = this.state
    const formatDate = format(new Date(appointmentDate), 'dd MMMM yyyy, EEEE')
    const appointmentDetails = {
      id: uuidv4(),
      title,
      appointmentDate: formatDate,
      isStared: false,
    }
    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, appointmentDetails],
      title: '',
      appointmentDate: '',
    }))
  }

  onMarkStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onClickShowStared = () => {
    this.setState(prevState => ({
      showStared: !prevState.showStared,
    }))
  }

  render() {
    const {title, appointmentDate, appointmentList, showStared} = this.state
    let isStaredActive
    let appointmentListToDisplay
    if (showStared === false) {
      isStaredActive = 'not-stared'
      appointmentListToDisplay = appointmentList
    } else {
      isStaredActive = 'stared'
      appointmentListToDisplay = appointmentList.filter(
        eachAppointment => eachAppointment.isStared,
      )
    }
    return (
      <div className="bg-container">
        <div className="main-appointment-card">
          <h1 className="appointment-heading">Add Appointment</h1>
          <div className="take-input-container">
            <div className="title-date-container">
              <div className="input-container">
                <label className="lable-element" htmlFor="title">
                  TITLE
                </label>
                <input
                  type="text"
                  className="input-elements"
                  id="title"
                  onChange={this.changeTitle}
                  placeholder="Title"
                  value={title}
                />
              </div>
              <div className="input-container">
                <label className="lable-element" htmlFor="date">
                  DATE
                </label>
                <input
                  type="date"
                  className="input-elements"
                  id="date"
                  onChange={this.changeDate}
                  placeholder="dd/mm/yyyy"
                  value={appointmentDate}
                />
              </div>
              <button
                className="add-button"
                onClick={this.onAddAppointmentDetails}
                type="button"
              >
                Add
              </button>
            </div>
            <div className="image-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="appointment-image"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="horizontal-rule" />
          <div className="appointmentList-container">
            <div className="appointment-header-container">
              <h1 className="appointment-list-heading">Appointments</h1>
              <button
                className={isStaredActive}
                onClick={this.onClickShowStared}
                type="button"
              >
                Starred
              </button>
            </div>
            <ul className="appointment-list-display-container">
              {appointmentListToDisplay.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  onMarkStar={this.onMarkStar}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
