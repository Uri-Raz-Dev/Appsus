import { mailService } from "../services/mail.service.js"

const { useState, useEffect, useRef } = React
export function EmailCompose({ closeCompose, onSendMail }) {

    const [form, setForm] = useState(mailService.composeMail())
    const [emailError, setEmailError] = useState("")
    function handleChange(event) {
        const { name, value } = event.target;
        setForm(prevForm => ({
            ...prevForm,
            [name]: value
        }));
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function sendEmail() {
        if (!isValidEmail(form.to)) {
            setEmailError("Please enter a valid email address.");
            return;
        }
        setEmailError("")
        const emailToSend = { ...form, folder: 'sent' }
        mailService.save(emailToSend)
            .then(() => {
                setForm(mailService.composeMail())
                onSendMail(emailToSend)
                closeCompose()
            })
            .catch(err => {
                console.error('Failed to send email:', err)
            })
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
                <button onClick={sendEmail}>Send</button>
                {/* <button className="discard-btn" onClick={discardEmail}>Discard</button> */}
            </div>
        </div>
    );

}