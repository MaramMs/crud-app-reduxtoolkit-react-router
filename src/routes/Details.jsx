import {React } from 'react';
import Loading from '../components/Loading';
import usePostDetails from '../hooks/use-post-details';

const Details = () => {
  const {loading, error ,record} = usePostDetails();

  return (
    <div>
      <Loading loading={loading} error ={error}>
      <p>Title:{record.title}</p>
      <p>Description:{record?.desc}</p>

      </Loading>
    </div>
  )
}

export default Details