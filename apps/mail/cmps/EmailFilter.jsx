const { useState, useEffect, useRef } = React

export function EmailFilter({ filterBy, onFilter, selectedFilter, onSelectFilter }) {


    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)
    const [selectedFilterToEdit, setSelectedFilterToEdit] = useState(selectedFilter)

    useEffect(() => {
        onFilter(filterByToEdit);
        onSelectFilter(selectedFilterToEdit)

    }, [filterByToEdit, selectedFilterToEdit])

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
            labels: []
        })
    }

    function handleChange({ target }) {
        const { name, value } = target

        setFilterByToEdit(prevFilterBy => ({
            ...prevFilterBy,
            [name]: name === 'date' ? +new Date(value) : value
        }))
    }


    return <section className="mail-filter">
        <input type="text" className="email-search" name="txt" onChange={handleChange} value={filterByToEdit.txt}
            placeholder="" />
        <button className="clear-search" onClick={onClearSearch}>reset</button>
        <label htmlFor="">
            <select value={selectedFilterToEdit} onChange={e => setSelectedFilterToEdit(e.target.value)}>

                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
            </select>
        </label>

    </section>
}