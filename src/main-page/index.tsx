import React from 'react';
import './index.css';

import Row from './row';

interface Course {
  id: number;
  name: string;
  nearestGroup: {
    startAt: string;
    studentsCount: number;
  } 
}

enum Direction { Up, Down, None }
class SortDirection {
  value : Direction

  constructor(value: Direction) {
    this.value = value
  }

  changeDirection() : SortDirection {
    if ((this.value === Direction.None) || (this.value === Direction.Up)) {
      return new SortDirection(Direction.Down)
    } else {
      return new SortDirection(Direction.Up)
    }
  }
}

interface IState {
  courses: Array<Course>;
  sortDirection: SortDirection;
}

class MainPage extends React.Component<{}, IState> {
  constructor(props: any) {
    super(props)
    this.state = {
      courses: [],
      sortDirection: new SortDirection(Direction.None)
    }
  }

  componentDidMount() {
    this.getCourses()
  }

  async getCourses(): Promise<void> {
    const response = await fetch('/api/v1/courses/')
    const data = await response.json()
    const courses : Array<Course> = data.courses.map((element: any) => { 
      return {
        id: element.id,
        name: element.name,
        nearestGroup: {
          startAt: element.nearest_group.start_at,
          studentsCount: element.nearest_group.students_count
        }
      }
    })
    this.setState({ courses: courses })
  }

  sortByDate = (): void => {
    const direction : SortDirection = this.state.sortDirection.changeDirection()
    const courses : Array<Course> = JSON.parse(JSON.stringify(this.state.courses))

    courses.sort((value1: Course, value2: Course) => {
      const value1Seconds : number = Date.parse(value1.nearestGroup.startAt)
      const value2Seconds : number = Date.parse(value2.nearestGroup.startAt)
      if (direction.value === Direction.Down) {
        return value1Seconds - value2Seconds
      } else {
        return value2Seconds - value1Seconds
      }
    })

    this.setState({
      courses: courses,
      sortDirection: direction
    })
  }

  render(): any {
    console.log('render main')
    return (
      <div className="MainPage">
        <div className="MainPageRow">
          <p>Название курса</p>
          <p onClick={this.sortByDate}>Дата начала курса</p>
          <p>Количество студентов</p>
        </div>
        {this.state.courses.map((c) => {
          return <Row 
            name={c.name}
            nearestDate={c.nearestGroup.startAt}
            studentsCount={c.nearestGroup.studentsCount}
          />
        })}
      </div>
    )
  }
}

export default MainPage;
