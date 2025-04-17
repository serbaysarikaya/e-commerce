import { useAppSelector } from '../store/store'
import { Navigate, Outlet, useLocation } from 'react-router';

export default function AuthGuard() {
  const {user} =useAppSelector(state=>state.account);
  const location =useLocation();

  if(!user)
{
    return <Navigate to="login" state={{from:location}}/>
}

    return (
    <Outlet/>
  )
}
