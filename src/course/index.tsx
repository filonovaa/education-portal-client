import React from 'react';
import './index.css';

import { GroupData, Group } from './group' 

type Course = {
  name: string;
  description: string;
  futureGroups: Array<GroupData>;
}

type State = {
  course: Course;
}

export default class extends React.Component<any, State> {
  componentDidMount() {
    this.getCourse()
  }

  async getCourse(): Promise<void> {
    const name : String = this.props.match.params.name
    const response = await fetch(`/api/v1/courses/${name}`)
    const dataJson = await response.json()
    const courseJson = dataJson.course

    const futureGroups : Array<GroupData> = courseJson.future_groups.map((g: any) => {return {
      id: g.id,
      startAt: g.start_at,
      registrations: g.registrations
    }})

    const course : Course = {
      name: courseJson.name,
      description: courseJson.description,
      futureGroups: futureGroups
    }

    this.setState({ course: course })
  }

  render(): any {
    console.log('Render course')

    if (this.state === null) {
      return null
    }

    const course : Course = this.state.course

    return(
      <div className="Course">
        <div className="CourseHeader">
          <h1>{this.state.course.name}</h1>
          <h3>{this.state.course.description}</h3>
        </div>
        {
          course.futureGroups.map((g: GroupData) => {
            return <Group data={g} />
          })
        }
      </div>
    )
  }
}
