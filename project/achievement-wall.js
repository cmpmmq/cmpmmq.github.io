// import html2canvas from 'html2canvas'

// html2canvas(document.querySelector("#capture")).then(canvas => {
//     document.body.appendChild(canvas)
// });

let n = 1

function convert() {
  n += 1
  html2canvas(document.querySelector("#capture")).then(canvas => {
    // document.body.appendChild(canvas)

    var imgUrl = canvas.toDataURL("image/png"); // 将canvas转换成img的src流
    console.log(imgUrl); 
    var img = document.getElementById("img-achievement")
    img.src = imgUrl
  });
  console.log('hello')
  }