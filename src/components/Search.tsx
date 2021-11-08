import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";
import useDebounce from "../hooks/useDebounce";

const Search: React.FC = () => {
    const {page} = useTypedSelector(state => state.repos)
    const {fetchRepos} = useActions();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce<string | number>(searchTerm, 300);

    // useEffect(()=>{
    //     fetchRepos(page)
    // },[page, debouncedValue])

    useEffect(()=>{
        console.log('debouncedValue :::', debouncedValue)
    },[ debouncedValue])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }
    return (
        <div>
            <input
                type="search"
                placeholder="Search name..."
                value={searchTerm}
                onChange={handleChange}
            />
        </div>
    )
}

export default Search;