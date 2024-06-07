import React from 'react';
import { Outlet } from 'react-router-dom';
import Menu from './admin/menu/Menu';
import '../component/admin/adminhome.css'

export default function AdminHome() {
  return (
    <div className='app-admin'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-3'>
          <Menu />
          </div>
          <div className='col-md-9'>
          <Outlet/>
          </div>
        </div>
        
      </div>
    </div>
  );
}
