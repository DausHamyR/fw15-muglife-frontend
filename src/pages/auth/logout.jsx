import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { withIronSessionSsr } from 'iron-session/next';
import { useRouter } from 'next/router';
import cookieConfig from '@/helpers/cookieConfig';

function Logout() {
  const router = useRouter();
  const doLogout = useCallback(async()=> {
    await axios.get('/api/logout');
    router.replace('/auth/login');
  }, [router]);
  useEffect(()=> {
    doLogout();
  }, [doLogout]);
  return (
    <div>Logout</div>
  );
}

export default Logout;