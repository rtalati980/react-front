import React, { useState, useEffect } from 'react';
import './contact.css';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axiosInstance from '../axiousInstance'; // Corrected import statement

const fetchContacts = async () => {
  try {
    const response = await axiosInstance.get('https://ec2.radhakrishnamart.com:8443/api/contact');
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

const deleteContact = async (contactId) => {
  try {
    const response = await axiosInstance.delete(`https://ec2.radhakrishnamart.com:8443/contact/api/${contactId}/`);
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
      setContacts(fetchedContacts);
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
