import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component'
import { customStyles } from '../styles/customStyles'
import { SubHeader } from './table-subheader'

function MyDataTable({
    columns, data, onClick, btnClick
}) {
    return (
        <DataTable
            columns={columns}
            data={data}
            title={` `}
            highlightOnHover
            dense
            subHeader
            onRowClicked={onClick}
            subHeaderAlign={Alignment.Left}
            subHeaderComponent={<SubHeader onClick={btnClick} />}
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
