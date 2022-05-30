import { useState ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createBook,reset,updateBook,setEdit } from '../features/books/bookSlice'

function BookUpdateForm() {

  const dispatch = useDispatch()

  const { books, isLoading, isError, message, isEdit, editedData } = useSelector(
    (state) => state.books
  )

  console.log({editedData})
  const t={editedData}
  console.log(editedData.author)


  const [formData, setFormData] = useState({
    id: editedData.id,
    title: editedData.title.slice(),
    author: editedData.author.slice(),
    publication: editedData.publication.slice(),
    category: editedData.category.slice()
  });
  console.log({formData})
  // setFormData({
  //       title: editedData.title,
  //       author: editedData.author,
  //       publication: editedData.publication,
  //       category: editedData.category
  
  //     })

  const { title, author, publication, category } = formData;
  console.log(publication)



  useEffect(() => {
    //  title=editedData.title
    //  author=editedData.author 
    //  publication=editedData.publication 
    //  category = editedData.category

    // ed={...editedData}
    // title=ed.title
    //  author=ed.author 
    //  publication=ed.publication 
    //  category = ed.category

    setFormData({
            id: editedData.id,
            title: editedData.title,
            author: editedData.author,
            publication: editedData.publication,
            category: editedData.category
      
          })
    

  }, [editedData])







  const onChange = e => {setFormData({ ...formData, [e.target.name]: e.target.value }); console.log("in changee")}

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(updateBook({ ...formData }))

    dispatch(setEdit({isEdit:false,editedData:{
      title: '',
      author: '',
      publication:'',
      category:''
  }}))
    setFormData({
      title: '',
      author: '',
      publication: '',
      category: ''

    })

    
  }

  return (
    <section className='form black'>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='text'>Title</label>
          <input
            type='text'
            name='title'
            id='title'
            value={title}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Author</label>
          <input
            type='text'
            name='author'
            id='author'
            value={author}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Publication</label>
          <input
            type='text'
            name='publication'
            id='publication'
            value={publication}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <label htmlFor='text'>Category</label>
          <input
            type='text'
            name='category'
            id='category'
            value={category}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <button className='black btn btn-block' type='submit' data-bs-dismiss="modal">
            Update Book
          </button>
        </div>
      </form>
    </section>
  )
}

export default BookUpdateForm
