import { useNavigate, useParams } from 'react-router-dom';

export const withRouter = (Children) => {
  return(props)=>{
      const navigate = useNavigate()
      const match = {params: useParams()}
      return <Children {...props} match = {match} navigate={navigate}/>
  }
};