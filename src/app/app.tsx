import GlobalStyles from './globalStyles'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import NotFound from './notFound'
import Intro from './intro/intro'

const App = () => (
  <div>
    <GlobalStyles />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />}></Route>
        <Route path="/intro/*" element={<Intro />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </BrowserRouter>
  </div>
)

export default App
