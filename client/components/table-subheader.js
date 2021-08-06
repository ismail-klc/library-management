import { Button, Form } from 'react-bootstrap'

export const SubHeader = ({
    onClick, filterText, onFilter, filteredBoxLabel
}) => {
    return (
        <div>
            {
                onClick &&
                <Button
                    onClick={onClick}
                    className="btn-sm mb-3" variant="outline-dark">Add New</Button>
            }
            {
                filteredBoxLabel &&
                <Form.Group className="mb-3" >
                    <Form.Control
                        value={filterText}
                        onChange={onFilter}
                        type="text" placeholder={filteredBoxLabel} />
                </Form.Group>
            }
        </div>
    )
}