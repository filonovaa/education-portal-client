import React from 'react';
import './group.css';

type Registration = {
  email: string;
}

export type GroupData = {
  id: number;
  startAt: string;
  registrations: Array<Registration>;
}

type Props = {
  data: GroupData;
}

export class Group extends React.Component<Props, {}> {
  email : String = ''

  updateEmail = (e: any): void => {
    this.email = e.target.value
  }

  registerInGroup = async (e: any): Promise<any> => {
    e.preventDefault();

    const data = {
      registration: {
        group_id: this.props.data.id,
        email: this.email
      }
    }

    const response = await fetch(`/api/v1/registrations`,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    if (response.ok) {
      alert('Вы успешно зарегистрированы')
    } else {
      const data = await response.json()
      alert(data.error.message)
    }
  }

  render(): any {
    const group = this.props.data;
    const groupRegistrations = group.registrations.map((r) => ` ${r.email}`)
    return(
      <div className="CourseGroup">
        <div className="GroupInfo">
          <p>{`Начало занятий: ${group.startAt}`}</p>
        </div>
        <div className="GroupInfo">
          <p>{`Студенты: ${groupRegistrations}`}</p>
        </div>
        <form onSubmit={this.registerInGroup}>
          <p>Оставьте email для записи</p>
          <input type="email" onChange={this.updateEmail}/>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
