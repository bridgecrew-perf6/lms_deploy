import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import BookForm from '../components/BookForm'
import BookUpdateForm from '../components/BookUpdateForm'
import BookItem from '../components/BookItem'
import Spinner from '../components/Spinner'
import { Link } from "react-router-dom";
import { getBooks, reset, deleteBook, updateBook,setEdit } from '../features/books/bookSlice'


function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()


  // const [openPopup, setOpenPopup]=useState(false)

  const { user } = useSelector((state) => state.auth)
  const { books, isLoading, isError, message, isEdit, editedData } = useSelector(
    (state) => state.books
  )

  useEffect(() => {
    if (isError) {
      console.log(message)

    }

    if (!user) {
      navigate('/login')
    }

    dispatch(getBooks())

    // return () => {
    //   dispatch(reset())
    // }
  }, [user, navigate, isError, message, dispatch])

  if (isLoading) {
    return <Spinner />
  }

  const startEdit=(book)=>{
    console.log("inside startEdit function")
    // dispatch(setEdit({isEdit:true,editedData:book}))

    
    

  }



  return (

    <div className="container">
      <div className="py-4">
        <div >
          <h1 className="mb-3 ">Book List</h1>
        </div>
        <button type="button" className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#createBookModal">
          Add Book
        </button>

        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">Publication</th>
              <th scope="col">Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr>
                <th scope="row">{index + 1}, {book.id}</th>
                <td>{book.title}</td>
                <td >{book.author}</td>
                <td >{book.publication}</td>
                <td>{book.category}</td>
                <td>
                  <Link
                    className="btn btn-danger btn-sm me-2"
                    onClick={() => dispatch(deleteBook(book.id))}
                    to="/"
                  >
                    Delete
                  </Link>

                  {/* <Link
                    className="btn btn-outline-primary btn-sm me-1"
                    to={`/updatebook/${book.id}`}
                  >
                    Edit
                  </Link> */}

                   <Link
                    className="btn btn-outline-primary btn-sm me-1"
                    onClick={() => startEdit(book)}
                    to="/"
                  >
                    Edit22
                  </Link>

                  <button type="button" onClick={startEdit(book)}  className="btn btn-primary mb-2" data-bs-toggle="modal" data-bs-target="#updateBookModal">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>



      {/* <!-- Modal --> */}
      <div className="modal fade" id="createBookModal" tabindex="-1" aria-labelledby="createBookModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="createBookModalLabel">Add New Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <BookForm />
            </div>

          </div>
        </div>
      </div>




      {/* <!-- Modal --> */}
      <div className="modal fade" id="updateBookModal" tabindex="-1" aria-labelledby="updateBookModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="updateBookModalLabel">Add New Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <BookUpdateForm />
            </div>

          </div>
        </div>
      </div>






    </div>

  )
}

export default Dashboard
