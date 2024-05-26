

export function EmailIcons(name) {

    const iconsMap = {
        inbox: <box-icon type='solid' name='inbox'></box-icon>,
        starred: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="icon icon-tabler icons-tabler-outline icon-tabler-star"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z" /></svg>,
        starFav: <box-icon name='star' type='solid' color='#f4b400'></box-icon>,
        sent: <box-icon name='send'></box-icon>,
        draft: <box-icon name='file-blank'></box-icon>,
        trash: <box-icon name='trash'></box-icon>,
        compose: <box-icon name='pencil'></box-icon>,
        arrow: <box-icon name='chevron-up'></box-icon>,
        search: <box-icon name='search-alt-2' ></box-icon>,
        reset: <box-icon name='x' color='#575a5b' ></box-icon>
    }

    return iconsMap[name] || null

}