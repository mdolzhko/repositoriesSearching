import React, {FC} from "react";
import {Repo} from "../types/repos";
import {ListGroup} from "react-bootstrap";

interface ListProps {
    data: Repo[]
}

const List: FC<ListProps> = ({data}) => {
    if(!data.length) return <div style={{ margin: '20px'}}>No Data</div>;

    return (
        <ListGroup style={{ margin: '20px'}}>
            {data.map((item, index) => <ListGroup.Item key={item.id}>
                #{item.id} - <strong>{item.name}</strong> - <a target={'_blank'} href={item.html_url}>{item.html_url}</a>
            </ListGroup.Item> )}
        </ListGroup>
    )
}

export default List;