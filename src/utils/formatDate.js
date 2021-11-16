import moment from 'moment-timezone'

export default function formatDate(date) {
  if(!date) return date
  return moment(date).format('YYYY-MM-DD')
}