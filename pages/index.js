import Head from 'next/head';

import EventList from '../components/events/EventList';
import NewsletterRegistration from '../components/input/newsletter-registration';
import { getFeaturedEvents } from '../utils/api-util';

const Home = (props) => {
  return (
    <div>
      <Head>
        <title>Featured Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
};

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();
  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default Home;
