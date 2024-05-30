import { mailService } from "../services/mail.service.js"
const { useState, useEffect } = React
const { useParams, useNavigate, Outlet } = ReactRouterDOM

export function EmailDetails() {
    const [mail, setMail] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const { folder, mailId } = useParams()
    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        mailService.get(mailId)
            .then((mail) => {
                setMail(mail)
                setIsLoading(false)
            })
            .catch(err => {
                console.error('Failed to fetch mail:', err)
                setIsLoading(false)
            })
    }, [mailId])

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
                <div className="email-info">From: {mail.from}</div>
                <div className="email-info">To: {mail.to}</div>
            </div>
            <div className="email-body">{mail.body}</div>
            <div className="email-actions">
                <button onClick={() => navigate(-1)}>Back</button>
                <button onClick={removeMail}>Delete</button>
                <button>send to keep</button>
            </div>
            <Outlet />
        </div>
    )
}
