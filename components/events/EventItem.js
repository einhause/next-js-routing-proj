import React from 'react';
import Button from '../ui/Button';
import { humanReadableDate } from '../../utils/dateFormatting';
import { formattedAddress } from '../../utils/addressFormatting';

import classes from './EventItem.module.css';
import DateIcon from '../icons/date-icon';
import AddressIcon from '../icons/address-icon';
import ArrowRightIcon from '../icons/arrow-right-icon';

const EventItem = ({ id, title, location, date, image }) => {
  const humanReadableDateString = humanReadableDate(date);
  const formattedAddressString = formattedAddress(location);
  const exploreLink = `/events/${id}`;

  return (
    <li className={classes.item}>
      <img src={`/${image}`} alt={title} />
      <div className={classes.content}>
        <div className={classes.summary}>
          <h2>{title}</h2>
          <div className={classes.date}>
            <DateIcon />
            <time>{humanReadableDateString}</time>
          </div>
          <div className={classes.address}>
            <AddressIcon />
            <address>{formattedAddressString}</address>
          </div>
        </div>
        <div className={classes.actions}>
          <Button link={exploreLink}>
            <span>Explore Event</span>
            <span className={classes.icon}>
              <ArrowRightIcon />
            </span>
          </Button>
        </div>
      </div>
    </li>
  );
};

export default EventItem;
