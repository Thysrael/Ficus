const text = '![image-20220210173409474](办公工具-PPT/image-20220210173409474.png)'

function isImageLink (str) {
  const regex = /^!\[(.*)\]\((.*?)\)$/
  const match = regex.exec(str)
  if (match) {
    const altText = match[1]
    const imageUrl = match[2]
    console.log(altText)
    console.log(imageUrl)
    return { altText, imageUrl }
  }
  return null
}

if (isImageLink(text) !== null) {
  const details = isImageLink(text)
  // const url = 'ficus://办公工具-PPT/image-20220210173409474.png'
  url = 'ficus://' + details.imageUrl
  console.log(details.altText)
  console.log(details.imageUrl)
}
