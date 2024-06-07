import React, { useState, useEffect } from 'react';
import './contact.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const fetchContacts = async () => {
  try {
    const response = await fetch('http://localhost:8080/api/contact', {
      method: 'GET'
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const deleteContact = async (contactId) => {
  try {
    const response = await fetch(`https://ec2.radhakrishnamart.com:8443/contact/api/${contactId}/`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete contact');
    }
  } catch (error) {
    console.error('Error deleting contact:', error);
  }
};

export default function Contact() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContactData = async () => {
      const fetchedContacts = await fetchContacts();
      if (fetchedContacts) {
        setContacts(fetchedContacts);
      }
    };

    fetchContactData();
  }, []);

  const handleDelete = async (contactId) => {
    await deleteContact(contactId);
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  return (
    <div className='main'>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No.</th>
            <th>Subject</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(contact => (
            <tr key={contact.id}>
              <td>{contact.id}</td>
              <td>{contact.firstName}</td>
              <td>{contact.email}</td>
              <td>{contact.mobileNumber}</td>
              <td>{contact.subject}</td>
              <td>
                <button onClick={() => handleDelete(contact.id)}><MdDelete /></button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
