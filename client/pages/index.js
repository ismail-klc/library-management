import Head from "next/head"
import ContentHeader from "../components/content-header"
import DashboardCart from "../components/dashboard-cart"
import withAuth from "../hocs/withAuth"
import buildClient from '../helpers/build-client'
import { Row } from 'react-bootstrap'
import BookCard from "../components/book-card"

function Home({ data, books }) {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <ContentHeader title="Dashboard">
      </ContentHeader>
      <section className="content">
        <div className="container-fluid">
          <DashboardCart data={data} />
          <h3>Latest Books</h3>
          <Row>
            {
              books.map(b => (
                <BookCard key={b.id} book={b} />
              ))
            }
          </Row>
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
    const bookCount = res.data.bookCount
    const authorCount = res.data.authorCount

    res = await client.get('/api/books/latests');
    const books = res.data

    const data = {
      studentCount, borrowCount, bookCount, authorCount
    }

    return { props: { data, books } };

  } catch (error) {
    return { props: {} };
  }
}

export default withAuth(Home)