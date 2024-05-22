
export function EmailIcons(name) {

    const iconsMap = {
        inbox: <box-icon type='solid' name='inbox'></box-icon>,
        starred: <a className="starred"><box-icon name='star'></box-icon></a>,
        starFav: <box-icon name='star' type='solid' color='#f4b400'></box-icon>,
        sent: <box-icon name='send'></box-icon>,
        drafts: <box-icon name='file-blank'></box-icon>,
        trash: <box-icon name='trash'></box-icon>,
        compose: <box-icon name='pencil'></box-icon>,
        arrow: <box-icon name='chevron-up'></box-icon>,
        search: <box-icon name='search-alt-2'></box-icon>
    }

    return iconsMap[name] || null

}