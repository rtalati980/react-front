import React from 'react'

import './contact.css'

export default function Contact() {
  return (
   
    <div class="container">
  <form action="">
    <label for="fname">First Name</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
    <label for="fname">Email</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
    <label for="fname">Mobile No.</label>
    <input type="text" id="fname" name="firstname" placeholder="Your name.."></input>
    <label for="fname">First Name</label>
    <label for="subject">Subject</label>
    <textarea id="subject" name="subject" placeholder="Write something.."></textarea>
    </form>
 </div>

  )
}
