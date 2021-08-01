import { useRouter } from 'next/router';
import { getAllEvents } from '../../utils/api-util';
import Head from 'next/head';
import EventList from '../../components/events/EventList';
import EventsSearch from '../../components/events/EventsSearch';

const Events = (props) => {
  const events = props.events;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
};

export async function getStaticProps() {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

export default Events;
