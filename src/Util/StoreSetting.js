import moment from 'moment'

export function determineDay(date) {
  let currentDay = moment(date).format('dddd');
  if (currentDay === 'Monday' || currentDay === "Wednesday" || currentDay === "Thursday" || currentDay === "Sunday") {
    return 'regular hours'
  } else if (currentDay === 'Friday' || currentDay === 'Saturday') {
    return 'longer hours'
  } else {
    return 'restaurant closed'
  }
}

export function TimeFormatter(time) {
  let formattedTime = moment(time).format('HHmm')
  let first2Digits = formattedTime.slice(0, 2)
  let last2Digits = formattedTime.slice(2, 4)
  let hours2Min = Number(first2Digits) * 60 + Number(last2Digits)
  return hours2Min
}

export function storeOpener(date, time) {
  let hour1200 = 720;
  let hour2100 = 1260;
  let hour2130 = 1290;
  let hour1500 = 900;
  if (date === 'regular hours' && time > hour1500 && time < hour2100 ) {
    return 'regular open'
  } else if (date === 'longer hours' && time > hour1500 && time < hour2130) {
    return 'longer hour open'
  } else if (date === 'regular hours' && time >= hour1200 && time <= hour1500) {
    return 'lunch hour'
  } else if (date === 'longer hours' && time >= hour1200 && time <= hour1500) {
    return 'lunch hour'
  } else {
    return 'closed'
  }
}