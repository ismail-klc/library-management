import Head from "next/head"
import ContentHeader from "../components/content-header"
import DashboardCart from "../components/dashboard-cart"
import withAuth from "../hocs/withAuth"
import buildClient from '../helpers/build-client'

function Home({ data }) {
  console.log(data);
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
          <DashboardCart data={data} />
        </div>
      </section>
    </>
  )
}

export async function getServerSideProps(context) {
  const client = buildClient(context);

  try {
    let res = await client.get('/api/students/count');
    const studentCount = res.data

    res = await client.get('/api/borrows/count');
    const borrowCount = res.data

    res = await client.get('/api/books/count');
    console.log(res.data);
    const bookCount = res.data.bookCount
    const authorCount = res.data.authorCount
    const typeCount = res.data.typeCount

    const data = {
      studentCount, borrowCount, bookCount, authorCount, typeCount
    }
    return { props: { data } };

  } catch (error) {
    return { props: {} };
  }
}

export default withAuth(Home)