import { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { HubConnectionBuilder } from '@microsoft/signalr';

function App() {
  const [newName, setNewName] = useState('');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetch('https://js-meetup-azure-employees.azurewebsites.net/api/employees')
      .then(result => result.json())
      .then(setEmployees);
  }, []);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://js-meetup-azure-employees.azurewebsites.net/api/employees')
      .build();

    connection.on('updated', updated => {
      setEmployees(es => {
        const existing = es.find(e => e.id === updated.id);
        if (existing) {
          existing.name = updated.name;
          existing.role = updated.role;
          return [...es];
        } else {
          return [...es, updated];
        }
      });
    });

    connection.start();

    return () => connection.stop();
  }, []);

  function hire() {
    if (newName) {
      fetch('https://js-meetup-azure-employees.azurewebsites.net/api/employees', {
        method: 'POST',
        body: JSON.stringify({ name: newName }),
      })
        .then(result => result.json())
        .then(e => {
          setEmployees(es => [...es, e]);
          setNewName('');
        });
    }
  }

  function promote(employee) {
    fetch('https://js-meetup-azure-employees.azurewebsites.net/api/employees/' + employee.id + '/promote', {
      method: 'PUT',
    })
      .then(result => result.json())
      .then(updated => {
        setEmployees(es => {
          const existing = es.find(e => e.id === updated.id);
          existing.role = updated.role;
          return [...es];
        });
      });
  }

  return (
    <div className="">
      <header>
        <div>
          <ul>
            {employees.map(e => (
              <li key={e.id}>
                {e.name} &nbsp;
                {e.role} &nbsp;
                <button onClick={() => promote(e)}>Promote</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <input value={newName} onChange={e => setNewName(e.target.value)} />
          <button onClick={hire}>Hire</button>
        </div>
      </header>
    </div>
  );
}

export default App;
