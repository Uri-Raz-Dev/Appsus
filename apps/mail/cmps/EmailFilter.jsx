const { useState, useEffect, useRef } = React

export function EmailFilter({ filterBy, onFilter }) {


    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onFilter(filterByToEdit);

    }, [filterByToEdit])

    // useEffect(() => {
    //     setFilterByToEdit(prevFilterBy => ({
    //         ...prevFilterBy,
    //         title:''
    //     }))
    // }, [selectedFilterToEdit])



    function onClearSearch() {
        setFilterByToEdit({
            txt: '',
            isRead: false,
            isStared: false,
            labels: [],
            sortByDate: 0,
            sortByTitle: 0
        })
    }

    function handleChange({ target }) {
        const { name, value } = target
        const sortByTitle = (value === '1') ? 1 : (value === '-1') ? -1 : 0
        const sortByDate = (value === '1') ? 1 : (value === '-1') ? -1 : 0
        // (value === 'true') ? true : (value === 'false') ? false : value

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [name]: sortByTitle,
            [name]: sortByDate
        }))
    }
    return <section className="mail-filter">
        <input type="text" className="email-search" name="txt" onChange={handleChange} value={filterByToEdit.txt}
            placeholder="" />
        <button className="clear-search" onClick={onClearSearch}>reset</button>
        <select name="sortByTitle" value={filterByToEdit.sortByTitle} onChange={handleChange}>
            <option value="0">No Sorting</option>
            <option value="1">Sort A-Z</option>
            <option value="-1">Sort Z-A</option>
        </select>
        <select name="sortByDate" value={filterByToEdit.sortByDate} onChange={handleChange}>
            <option value="0">No Date Sorting</option>
            <option value="1">Newest First</option>
            <option value="-1">Oldest First</option>
        </select>

    </section>
}   