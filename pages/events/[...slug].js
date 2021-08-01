import { useEffect, useState } from 'react';
import { /* getFilteredEvents, */ URL } from '../../utils/api-util';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import Head from 'next/head';

import EventList from '../../components/events/EventList';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/Button';
import ErrorAlert from '../../components/ui/error-alert';

const FilteredEvents = (props) => {
  const [events, setEvents] = useState(props.events);

  const { query } = useRouter();
  const filteredData = query.slug;

  const { data, error } = useSWR(URL);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setEvents(events);
    }
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filtered Events</title>
      <meta name='description' content={`A list of filtered events`} />
    </Head>
  );

  if (!events) {
    return (
      <>
        {pageHeadData}
        <p className='center'>Loading...</p>;
      </>
    );
  }

  const year = filteredData[0];
  const month = filteredData[1];
  const numYear = +year;
  const numMonth = +month;

  pageHeadData = (
    <Head>
      <title>
        Events for {month}/{year}
      </title>
      <meta
        name='description'
        content={`Search results for events of ${month}/${year}`}
      />
    </Head>
  );

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>Invalid filters, please adjust your values.</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        {pageHeadData}
        <ErrorAlert>
          <p className='center'>
            No events found for your filters. Please try again.
          </p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      {pageHeadData}
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filteredData = params.slug;

//   const year = filteredData[0];
//   const month = filteredData[1];
//   const numYear = +year;
//   const numMonth = +month;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: { year: numYear, month: numMonth },
//     },
//   };
// }

export default FilteredEvents;
