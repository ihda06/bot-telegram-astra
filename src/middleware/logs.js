const logsRequest = async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log('Response time: %sms', ms)
    console.log(ctx.message)
  }

module.exports  = {
    logsRequest
}