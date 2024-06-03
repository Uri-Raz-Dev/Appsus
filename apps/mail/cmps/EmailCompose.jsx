import { mailService } from "../services/mail.service.js"

const { useState } = React
export function EmailCompose({ closeCompose, onSendMail }) {

    const [form, setForm] = useState(mailService.composeMail)
    const [emailError, setEmailError] = useState("")
    function handleChange(event) {
        const { name, value } = event.target
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }))
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    function saveEmail(isDraft = false) {
        if (!isValidEmail(form.to) && !isDraft) {
            setEmailError("Please enter a valid email address.")
            return
        }
        setEmailError("")
        const emailToSave = { ...form, folder: isDraft ? 'draft' : 'sent', isDraft }
        mailService.save(emailToSave)
            .then(() => {
                setForm(mailService.composeMail())
                if (!isDraft) onSendMail(emailToSave)
                closeCompose()
            })
            .catch(err => {
                console.error('Failed to save email:', err)
            })
    }

    function sendEmail() {
        if (!form.to || !form.subject || !form.body) {
            saveEmail(true)

        } else {
            saveEmail(false)
        }
    }
    return (
        <div className="compose-email-modal">
            <div className="compose-header">
                <span>New Message</span>
                <span className="close-btn" onClick={closeCompose}>×</span>
            </div>
            <div className="compose-body">
                <input
                    type="email"
                    name="to"
                    placeholder="To"
                    value={form.to}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={form.subject}
                    onChange={handleChange}
                />
                <textarea
                    name="body"
                    rows="10"
                    placeholder="Message"
                    value={form.body}
                    onChange={handleChange}
                />
            </div>
            <div className="compose-footer">
                {!form.to || !form.subject || !form.body ?
                    <button onClick={() => saveEmail(true)}>Save as draft</button> :
                    <button onClick={sendEmail}>Send</button>
                }
            </div>
        </div>
    );

}