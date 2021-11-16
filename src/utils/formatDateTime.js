import moment from 'moment-timezone'

export default function formatDateTime(date, { sec }) {
  if(!date) return date
  if(sec) { // '초'단위까지!
    return moment(date).format('YYYY-MM-DD HH:mm:ss')
  } else { // '분'단위까지!
    return moment(date).format('YYYY-MM-DD HH:mm')
  }
}