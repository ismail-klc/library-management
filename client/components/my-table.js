import React, { useState } from 'react'
import DataTable, { Alignment } from 'react-data-table-component'
import { customStyles } from '../styles/customStyles'
import { SubHeader } from './table-subheader'

function MyDataTable({
    columns, data, onClick, btnClick, filteredColumn, filteredBoxLabel
}) {
    const [filterText, setFilterText] = useState('')
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false)
    const filteredItems = filteredColumn ? (data.filter(item =>
        item[filteredColumn] && item[filteredColumn].toLowerCase().includes(filterText.toLowerCase()))) : data

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <SubHeader
            filteredBoxLabel={filteredBoxLabel}
            onClick={btnClick}
            onClear={handleClear}
            onFilter={e => setFilterText(e.target.value)}
            filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    return (
        <DataTable
            columns={columns}
            data={filteredItems}
            title={` `}
            highlightOnHover
            dense
            subHeader
            onRowClicked={onClick}
            subHeaderAlign={Alignment.Left}
            subHeaderComponent={subHeaderComponentMemo}
            paginationResetDefaultPage={resetPaginationToggle}
            paginationPerPage={10}
            pagination
            paginationRowsPerPageOptions={[5, 10, 25]}
            fixedHeader
            customStyles={customStyles}
            responsive
        />
    )
}

export default MyDataTable
