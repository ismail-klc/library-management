import Head from "next/head"
import ContentHeader from "../components/content-header"
import DashboardCart from "../components/dashboard-cart"
import withAuth from "../hocs/withAuth"

function Home({ user }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ContentHeader title="Dashboard">
        <li className="breadcrumb-item"><a href="#">Home</a></li>
      </ContentHeader>
      <section className="content">
        <div className="container-fluid">
          <DashboardCart />
        </div>
      </section>
    </>
  )
}

export default withAuth(Home)