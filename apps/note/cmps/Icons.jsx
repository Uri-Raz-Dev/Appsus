// import { trash } from "../../../assets/icons/bin.svg";
export function Icons({ type }) {
    const icons = {
        trash: <svg className="icon" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#202124"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" /></svg>,

        pin: <svg className="icon" xmlns="http://www.w3.org/2000/svg" fill="#202124" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="#000" d="M17 4v7l2 3v2h-6v5l-1 1-1-1v-5H5v-2l2-3V4c0-1.1.9-2 2-2h6c1.11 0 2 .89 2 2zM9 4v7.75L7.5 14h9L15 11.75V4H9z" />
        </svg>,

        pinChecked: <svg className="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#e8eaed">
            <path fill="none" d="M0 0h24v24H0z" />
            <path fill="#202124" d="M17 4a2 2 0 0 0-2-2H9c-1.1 0-2 .9-2 2v7l-2 3v2h6v5l1 1 1-1v-5h6v-2l-2-3V4z" />
        </svg>,

    }
    return icons[type]
}