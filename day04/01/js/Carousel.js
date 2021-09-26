class Carousel {
  constructor(opt) {
    let { imgList } = opt;
    for (let s in opt) {
      this[s] = opt[s];
    }
    enableGesture(imgList);
    imgList.addEventListener("panstart", (e) => {
      this.panstart(e);
    })
  }
  panstart(e) {
    console.log(e);
  }
}