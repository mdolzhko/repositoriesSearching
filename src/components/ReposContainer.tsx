import React, {useEffect, useState} from "react";
import {useTypedSelector} from "../hooks/useTypeSelector";
import {useActions} from "../hooks/useActions";
import useDebounce from "../hooks/useDebounce";
import List from "./List";
import PaginationContainer from "./Pagination";
import {Alert, InputGroup, FormControl} from "react-bootstrap";

const ReposContainer = () => {
    const {loading, error, repos, page, totalRepos} = useTypedSelector(state => state.repos)
    const {fetchRepos, setReposPage} = useActions();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce<string | number>(searchTerm, 300);


    useEffect(() => {
        fetchRepos(debouncedValue, page)
    },[page, debouncedValue])

    if(error){
        return <h2>{error}</h2>
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    }

    return (
        <>
            <div style={{display: 'flex', justifyContent: "center" }} >
                <InputGroup className="mb-3">
                    <FormControl
                        type={'search'}
                        placeholder="Start Search..."
                        value={searchTerm}
                        onChange={handleChange}
                        style={{margin: "20px 20px 0 20px"}}
                    />
                </InputGroup>
            </div>
            <List
                data={repos}
            />
            {
                !!totalRepos &&
                <PaginationContainer
                    total={totalRepos}
                    currentPage={page}
                    handler={setReposPage}
                />

            }
            { loading && <Alert variant={'success'}>Loading...</Alert>}
        </>
    )
}

export default ReposContainer;