import React, { useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { changeFilter } from '../../features/handleDataSlice';
const filterList = ['all','mine','development','design','marketing','sales'];


const ProjectFilter = () => {
const currentFilter = useSelector(state => state.handleData.filter);
const kk = useSelector(state => state.handleData.projectDocuments)


const dispatch = useDispatch();

    const handleClick = (newFilter) => {
        dispatch(changeFilter(newFilter));
    };

    useEffect(() => {
        dispatch(changeFilter('all'));
    },[kk])


  return (
    <div className='project-filter'>
        <nav>
            {filterList.map((f) => (
                <button onClick={() => handleClick(f)} key={f} className={f === currentFilter ? 'active' : ''}>{f}</button>
            ))}
        </nav>
    </div>
  )
}

export default ProjectFilter;