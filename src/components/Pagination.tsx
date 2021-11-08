import React, {FC} from "react";
import {Pagination} from "react-bootstrap";

interface IPagination {
    total: number;
    currentPage: number;
    handler: (item: number) => void;
}

const PaginationContainer: FC<IPagination> = ({total, currentPage, handler}) => {
    const btnNumber = Math.ceil(total / 10);
    const btnList = Array.from({length: 10}, (_, i) => i + 1)

    return (
        <>
            <div style={{margin: '20px'}} >Total items: {total}</div>
            <div style={{display: 'flex', justifyContent: 'right', margin: "20px"}} >
                <Pagination>
                    { btnList.map((item) => {
                        return (
                            <Pagination.Item
                                key={item}
                                active={currentPage===item}
                                onClick={() => handler(item)}>{item}</Pagination.Item>
                        )
                    }
                    )}
                    <Pagination.Ellipsis disabled={true} />
                    <Pagination.Item>{btnNumber}</Pagination.Item>
                </Pagination>
            </div>
        </>
    )
}

export default PaginationContainer;