export default function getTableListNum(pageLimit, currentPage, index) {
  return (Number(pageLimit) * (Number(currentPage) - 1)) + Number(index)
}