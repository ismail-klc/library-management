import { Button } from 'react-bootstrap'

export const SubHeader = ({ onClick }) => {
    return (
        <Button
            onClick={onClick}
            className="btn-sm mb-3" variant="outline-dark">Add New</Button>
    )
}