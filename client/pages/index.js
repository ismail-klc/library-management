import Head from "next/head"
import ContentHeader from "../components/content-header"
import DashboardCart from "../components/dashboard-cart"
import withAuth from "../hocs/withAuth"

function Home({ user }) {
  return (
    <>
      <ContentHeader />
      <section className="content">
        <div className="container-fluid">
          <DashboardCart />
        </div>
      </section>
    </>
  )
}

export default withAuth(Home)