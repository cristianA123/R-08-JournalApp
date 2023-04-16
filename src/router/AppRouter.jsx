import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthRoutes } from '../Modules/auth/routes/AuthRoutes'
import { JournalRoutes } from '../Modules/journal/routes/JournalRoutes'
import { CheckingAuth } from '../ui/components/CheckingAuth'
import { useCheckAuth } from '../hooks'

export const AppRouter = () => {

  const { status } = useCheckAuth()

  if ( status == 'checking' ) {

    return <CheckingAuth /> 

  }

  return (
    <Routes>

        {
          status === 'authenticated'
          ? <Route path='/*' element={ <JournalRoutes /> } ></Route>
          : <Route path='/auth/*' element={ <AuthRoutes /> } ></Route>
        }

        <Route path='/*'  element={ <Navigate to={'/auth/login'} /> } />

        {/* Login y Register */}
        {/* <Route path='/auth/*' element={ <AuthRoutes /> } ></Route> */}
        {/* Journal */}
        {/* <Route path='/*' element={ <JournalRoutes /> } ></Route> */}

    </Routes>
    
  )
}
