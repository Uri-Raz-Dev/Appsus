import { mailService } from "../services/mail.service.js"
import { EmailIcons } from "../cmps/EmailIcons.jsx"
const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function EmailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        mailService.get(params.mailId)
            .then((mail) => {
                setMail(mail)
                setIsLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch mail:', err)
                setIsLoading(false)
            })
    }, [params.mailId])

    function removeMail() {
        const currentTime = Date.now()
        mailService.get(params.mailId).then(email => {
            if (email.folder === 'trash') {
                return mailService.remove(params.mailId).then(() => {
                    navigate(-1)
                })
            } else {
                email.removedAt = currentTime
                email.folder = 'trash'
                email.isStarred = false
                return mailService.save(email).then(() => {
                    navigate(-1)
                })
            }
        }).catch(err => {
            console.error('Failed to remove mail:', err)
        })
    }

    if (isLoading) return <div>Loading...</div>
    if (!mail) return <div>Mail not found</div>

    return (
        <div className="email-details-container">
            <div className="email-header">
                <div className="email-subject">{mail.subject}</div>
                <div className="email-actions">
                    <div className="email-info from">From: {mail.from}</div>
                    <span onClick={removeMail}>{EmailIcons('trash')}</span>
                    <span onClick={() => navigate(-1)}>{EmailIcons('back')}</span>
                </div>
                <div className="email-info">To: {mail.to}</div>
            </div>
            <div className="email-body">{mail.body}</div>

        </div>
    )
}
