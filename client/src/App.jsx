import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, About, SignIn, SignUp, Profile } from './pages/PageComponents'
import { Header } from './components/Header'
import PrivateRoute from './components/PrivateRoute'

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<SignIn />} path="/sign-in" />
          <Route element={<SignUp />} path="/sign-up" />
          <Route element={<PrivateRoute />}>
            <Route element={<Profile />} path="/profile" />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
