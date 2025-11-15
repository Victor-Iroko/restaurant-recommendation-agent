import type { SentMessageInfo, Transporter } from 'nodemailer'
import nodemailer from 'nodemailer'

interface SendEmailOptions {
  to: string | string[]
  subject: string
  text?: string
  html?: string
  fromName?: string
}

let transporter: Transporter | null = null

function getTransporter(): Transporter {
  if (transporter)
    return transporter

  const user = useRuntimeConfig().gmailUser
  const pass = useRuntimeConfig().gmailPass

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user,
      pass,
    },
  })

  return transporter
}

/**
 * Send an email using Gmail SMTP.
 * Requires GMAIL_USER and GMAIL_PASS environment variables to be set.
 */
export async function sendEmail(options: SendEmailOptions): Promise<SentMessageInfo> {
  const t = getTransporter()

  const from = `${options.fromName ?? 'No-Reply'} <${useRuntimeConfig().gmailUser}>`

  const mailOptions = {
    from,
    to: options.to,
    subject: options.subject,
    text: options.text,
    html: options.html,
  }

  try {
    const info = await t.sendMail(mailOptions)
    return info
  }
  catch (err) {
    if (err instanceof Error) {
      return err.message
    }
  }
}
