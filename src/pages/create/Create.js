import React,{useState,useEffect} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import Select from 'react-select';
import { Timestamp } from 'firebase/firestore';
import { addDocument,setSuccess } from '../../features/handleDataSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getdataslicer = useSelector(state => state.handleData)
  const userauth = useSelector(state => state.auth)

  const [name,setName] = useState('');
  const [details,setDetails] = useState('');
  const [dueDate,setDueDate] = useState('');
  const [category,setCategory] = useState('');
  const [assignedUsers,setAssignedUsers] = useState([]);
  const [formError,setFormError] = useState(null);



  const categories = [
    {value : 'development', label : 'Development'},
    {value : 'design', label : 'Design'},
    {value : 'sales', label : 'Sales'},
    {value : 'marketing', label : 'Marketing'},
  ]


  const [users,setUsers]   = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault();


    setFormError(null);

    if(!category){
      setFormError('please select category');
      return;
    }

    if(assignedUsers.length < 1){
      setFormError('Please assign the project to at least 1 user');
      return;
    }

    const createdBy = {
      displayName : userauth.user.displayName,
      photoURL : userauth.user.photoURL,
      id : userauth.user.uid,

    }

    const assignedUsersList = assignedUsers.map((user) => {
      return {
        displayName : user.value.displayName,
        photoURL : user.value.photoURL,
        id : user.value.id
      }
    })

    const project  = {
      name,
      details,
      category : category.value,
      dueDate : Timestamp.fromDate(new Date(dueDate)),
      comments : [],
      createdBy,
      assignedUsersList,

    }

    dispatch(addDocument({name :'projects',data :project}));

  }


  useEffect(() => {

    if(getdataslicer.success){
        dispatch(setSuccess());
        navigate('/')
    }

  },[getdataslicer.success])

  useEffect(() => {
    if(getdataslicer.documents){
      const options = getdataslicer.documents.map(user => {
        return {value : user , label : user.displayName}
      })

      setUsers(options)
    }


  },[getdataslicer.documents])



  return (
    <div className='create-form'>
    <h2 className='page-title'>Create a new project</h2>
    <form onSubmit={handleSubmit}>

      <label>
        <span>Project name:</span>
        <input
        type='text'
        onChange={(e) => setName(e.target.value)}
        value={name}
        required />
      </label>

      <label>
        <span>Project details:</span>
        <textarea
        type='text'
        onChange={(e) => setDetails(e.target.value)}
        value={details}
        required ></textarea>
      </label>

      <label>
        <span>Due date:</span>
        <input
        type='date'
        onChange={(e) => setDueDate(e.target.value)}
        value={dueDate}
        required ></input>
      </label>

      <label>
        <span>Project category:</span>
        <Select
          options={categories}
          onChange={option => setCategory(option)}

        />
     
      </label>

      <label>
        <span>Assigned to:</span>
        <Select
          options={users}
          onChange={(option) => setAssignedUsers(option)}
          isMulti
        />
     
      </label>

     {!getdataslicer.isPending && <button className='btn'>Add Project</button>}
     {getdataslicer.isPending && <button disabled className='btn'>Submitting...</button> } 
    {formError && <p className='error'>{formError}</p>}
    {getdataslicer.error && <p className='error'>{getdataslicer.error}</p>}
    </form>

    </div>
  )
}

export default Create