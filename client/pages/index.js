import withAuth from "../hocs/withAuth"

function Home({ user }) {
  return (
    <div className="mt-5">
      <div className="row">
        <div className="col-md-3">
          <div className="card-counter primary">
            <i className="fa fa-code-fork"></i>
            <span className="count-numbers text-center">35</span>
            <span className="count-name text-center">Users</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter danger">
            <i className="fa fa-ticket"></i>
            <span className="count-numbers text-center">35</span>
            <span className="count-name text-center">Users</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter success">
            <i className="fa fa-database"></i>
            <span className="count-numbers text-center">35</span>
            <span className="count-name text-center">Users</span>
          </div>
        </div>

        <div className="col-md-3">
          <div className="card-counter info">
            <i className="fa fa-users"></i>
            <span className="count-numbers text-center">35</span>
            <span className="count-name text-center">Users</span>
          </div>
        </div>
      </div>
    </div>

  )
}

export default withAuth(Home)