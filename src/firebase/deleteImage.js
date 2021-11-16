import { imageStorage } from '@/firebase/config.js'
import vsNotify from '@/utils/vsNotify.js'

function deleteSingleImg(storageFolder, imageURL) {
  deleteImg(storageFolder, imageURL)
}

function deleteMultipleImg(storageFolder, imageURLs) {
  imageURLs.forEach(imageURL => {
    deleteImg(storageFolder, imageURL)
  })
}

///// 이미지 한개씩 삭제하는 함수 /////
function deleteImg(storageFolder, imageURL) {
  const urlInfo = imageStorage.refFromURL(imageURL)
  const image = imageStorage.ref(`${storageFolder}/${urlInfo.name}`)
  deleteFrmFirebase(image)
}
function deleteFrmFirebase(image) {
  image.delete()
    .then(() => {
      // console.log("img deleted frm firebase!")
    }).catch(() => {
      vsNotify('error', 'firebase 이미지 삭제를 실패하였습니다.')
    })
}

///// resized image 사용하게 된다면 이것 사용! /////
// function deleteResizedImg(storageFolder, image) { // 200x200
//   const fileExt = image.name.split('.').pop()
//   const resizedImg = imageStorage.ref(`${storageFolder}/${image.name.replace(/\.[^/.]+$/, "")}_200x200.${fileExt}`)
//   deleteFrmFirebase(resizedImg)
// }
/////////////////////////////////////////////

export {
  deleteSingleImg,
  deleteMultipleImg
}