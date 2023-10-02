const threadMaker = (text)=>{
    let thread = []
    let numOfTweet = Math.round(text.length / 265)
    let position = 0
    for(let i = position; i<=numOfTweet; i++){
      if(i<numOfTweet){
        thread.push(text.substr(position,265)+"(cont..)")
      } else{
        thread.push(text.substr(position,265))
      }
      position += 265
    }
    return thread
}

module.exports = threadMaker