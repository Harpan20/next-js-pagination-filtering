import axios from 'axios';
import React from 'react';

const dashboard = () => {
  const [data, setdata] = useState({})

  const fetchData =async () => {
    try {
      const response = axios.get('http://103.250.11.4:8080/api/eksekutif/dashboard', {
        Token:
      })



    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
  }, [third])
  


  return <div></div>;
};

export default dashboard;
