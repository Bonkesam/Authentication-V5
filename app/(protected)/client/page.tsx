'use client';

import UserInfo from '@/components/userInfo';
import { useCurrentUser } from '@/hooks/use-current-user';

const ClientPage = () => {

    const user = useCurrentUser();
  return (
    <div>
      <UserInfo
        user={user}
        label='Client Component'
      />
    </div>
  )
}

export default ClientPage;
