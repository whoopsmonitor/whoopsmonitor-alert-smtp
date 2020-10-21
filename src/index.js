const nodemailer = require("nodemailer")

const host = process.env.WM_SMTP_HOST
const port = process.env.WM_SMTP_PORT
const secure = process.env.WM_SMTP_SECURE === "true" ? true : false
const user = process.env.WM_SMTP_USER
const pass = process.env.WM_SMTP_PASSWORD
const from = process.env.WM_SMTP_FROM
const to = process.env.WM_SMTP_TO

const CHECK_NAME = process.env.WM_CHECK_NAME
const CHECK_EXIT_CODE = process.env.WM_CHECK_EXIT_CODE * 1 // to make sure it is a number
let CHECK_OUTPUT = process.env.WM_CHECK_OUTPUT

let priority = 'low'

switch (CHECK_EXIT_CODE) {
  case 0:
    subject = '[ok]'
    break

  case 1:
    priority = 'normal'
    subject = '[warning]'
    break

  case 2:
  default: // we don't know what is going on
    priority = 'hight'
    subject = '[critical]'
    break
}

let text = `Check: ${CHECK_NAME}`
subject = `${subject} ${CHECK_NAME}`

if (!CHECK_OUTPUT) {
  CHECK_OUTPUT = 'no output'
}

text = `
${text}
Output: ${CHECK_OUTPUT}
`

async function main() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  })

  // send mail with defined transport object
  return await transporter.sendMail({
    from,
    to,
    subject,
    text,
    priority
  })
}

main()
  .then(() => {
    console.log('[ok] Mail sent.')
    process.exit(0)
  })
  .catch((err) => {
    console.error('[error] Mail not sent.')
    console.error(err)
    process.exit(1)
  })
