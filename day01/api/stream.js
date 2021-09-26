// 如果直接使用readFile会使得内存占用太多，造成堵塞
// 因此使用straem流来减少负载：createReadStream s1 & createWriteStream s2 -> s1.pipe(s2)
