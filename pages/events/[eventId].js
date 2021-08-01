import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from '../../utils/api-util';
import Head from 'next/head';
import EventSummary from '../../components/event-detail/event-summary';
import EventLogistics from '../../components/event-detail/event-logistics';
import EventContent from '../../components/event-detail/event-content';
import ErrorAlert from '../../components/ui/error-alert';
import Button from '../../components/ui/Button';

const SingleEvent = (props) => {
  const event = props.singleEvent;

  if (!event) {
    return (
      <div className='center'>
        <p className='center'>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  );
};

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);

  return {
    props: {
      singleEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const featuredEvents = await getFeaturedEvents();
  const paths = featuredEvents.map((event) => ({
    params: { eventId: event.id },
  }));

  return {
    paths: paths,
    fallback: 'blocking',
  };
}

export default SingleEvent;
