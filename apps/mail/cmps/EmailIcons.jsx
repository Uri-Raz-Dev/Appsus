

export function EmailIcons(name) {

    const iconsMap = {
        inbox: <box-icon type='solid' name='inbox'></box-icon>,
        starred: <i class="fa-regular fa-star fa-xl"></i>,
        starFav: <box-icon name='star' type='solid' color='#f4b400'></box-icon>,
        sent: <box-icon name='send'></box-icon>,
        draft: <box-icon name='file-blank'></box-icon>,
        trash: <box-icon name='trash'></box-icon>,
        compose: <box-icon name='pencil'></box-icon>,
        arrow: <box-icon name='chevron-up'></box-icon>,
        search: <box-icon name='search-alt-2' ></box-icon>,
        reset: <box-icon name='x' color='#575a5b' ></box-icon>,
        read: <box-icon name='envelope'></box-icon>,
        unread: <box-icon name='envelope-open' ></box-icon>,
        headmail: <box-icon name='envelope' type='solid' color='#6c8da6' ></box-icon>,
        headkeep: <box-icon name='pin' type='solid' color='#6c8da6' ></box-icon>,
        headhome: <box-icon name='home-alt-2' type='solid' color='#6c8da6' ></box-icon>,
        headabout: <box-icon name='user' type='solid' color='#6c8da6' ></box-icon>,
        back: <box-icon name='arrow-back'></box-icon>
    }

    return iconsMap[name] || null

}