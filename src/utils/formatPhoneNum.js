export default function formatPhoneNum(number) {
  if(!number) {
    return number
  }
  if(number.length === 11) {
    return number.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }
  else if(number.length === 10) {
    return number.replace(/(\d{2})(\d{4})(\d{4})/, '$1-$2-$3')
  }
  else {
    return number
  }
}