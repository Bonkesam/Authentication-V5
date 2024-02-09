"use client";

import { useCurrentRole } from '@/hooks/use-current-role';
import React from 'react'

const AdminPage = () => {

    const role = useCurrentRole();
  return (
    <div>
      Current Role: {role}
    </div>
  )
}

export default AdminPage;
