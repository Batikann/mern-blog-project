import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, About, SignIn, SignUp, Profile } from './pages/PageComponents'
import { Header } from './components/Header'

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
          <Route element={<Profile />} path="/profile" />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
