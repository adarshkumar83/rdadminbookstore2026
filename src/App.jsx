import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import WelcomePage from './pages/WelcomePage/WelcomePage'
import BookList from './pages/books/BookList'
import AddBook from './pages/books/AddBook'
import BookDetail from './pages/books/BookDetail'
import BookPageForEdit from './pages/books/BookPageForEdit'
import AdminLogin from './pages/LoginSignupPages/AdminLogin'
import CreateDiscount from './pages/Discount/CreateDiscount'
import DiscountList from './pages/Discount/DiscountList'
import DiscountForEdit from './pages/Discount/DiscountForEdit'
import UserList from './pages/users/UserList'
import ProductAvailability from './pages/ProductAvailability/ProductAvailability'
function App() {
  return (
    <BrowserRouter>

      {/* <NavBar /> */}
      <Routes>
        <Route path='/' element={<AdminLogin />} />
      </Routes>


      <div className="d-flex">
        <Sidebar />
        <main style={{ flexGrow: 1, padding: '20px' }}>
          <Routes>

            <Route path="/admin/dashboard" element={<WelcomePage />} />

            {/* Welcome Page */}
            <Route path="/" element={<WelcomePage />} />
            <Route path="/books" element={<BookList> </BookList>}></Route>
            <Route path='/add/book' element={<AddBook></AddBook>}></Route>
            <Route path='/book/:id' element={<BookDetail></BookDetail>} />
            <Route path='/edit/book/:id' element={<BookPageForEdit></BookPageForEdit>}></Route>
            <Route path='/discounts' element={<DiscountList />}></Route>
            <Route path='/add/discount' element={<CreateDiscount></CreateDiscount>} />
            <Route path='/edit/discount/:id' element={<DiscountForEdit></DiscountForEdit>}/>
            <Route path='/users' element={<UserList></UserList>} />

            <Route path='/availability' element={<ProductAvailability></ProductAvailability>}></Route>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App