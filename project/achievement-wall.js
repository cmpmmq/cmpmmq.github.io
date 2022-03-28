// import html2canvas from 'html2canvas'

// html2canvas(document.querySelector("#capture")).then(canvas => {
//     document.body.appendChild(canvas)
// });

function convert() {
    html2canvas(document.querySelector("#capture")).then(canvas => {
      document.body.appendChild(canvas)
      var imgUrl = canvas.toDataURL("image/png"); // 将canvas转换成img的src流
      console.log(imgUrl); 
    });
    console.log('hello')
  }