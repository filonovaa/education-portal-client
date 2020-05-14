import React from 'react';
import './row.css';
import {
  Link,
} from 'react-router-dom';

interface Row {
  name: string;
  nearestDate: string;
  studentsCount: number;
}

export default function(props: Row): any {
  return (
    <Link className="MainPageRow" to={{pathname: "/courses"}}>
      <p>{props.name}</p>
      <p>{props.nearestDate}</p>
      <p>{props.studentsCount}</p>
    </Link>
  )
}
