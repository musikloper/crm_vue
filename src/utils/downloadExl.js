// =========================================================================================
//    File Name: downloadExl.js
//    Description: 엑셀 다운로드 함수 [reusable]
//    ----------------------------------------------------------------------------------------
//    인자: 
//      - fileName: 엑셀 파일 이름 (오늘 "날짜&시간 + fileName"으로 엑셀파일 이름을 설정하게 됨)
//      - worksheetName: 엑셀 파일 속 해당 데이터를 담을 worksheet 이름
//      - exlData: 다운로드 받을 엑셀 데이터 (원하는 엑셀의 형태에 맞추어 format된 형태로 받아와야 함!)
// ========================================================================================== 

import XLSX from 'xlsx'
import moment from 'moment-timezone'

export default function downloadExl(fileName, worksheetName, exlData) {
  // 1. 엑셀 파일 이름 짓기
  const excelName = `${moment().format('YYYY-MM-DD-HH:mm')}-${fileName}.xlsx`
  // 2. workbook과 data 생성
  const new_workbook = XLSX.utils.book_new()
  const dataWS = XLSX.utils.json_to_sheet(exlData)
  // 3. 다운받을 엑셀 파일생성
  XLSX.utils.book_append_sheet(new_workbook, dataWS, worksheetName)
  // 4. 엑셀 다운로드
  XLSX.writeFile(new_workbook, excelName)
}