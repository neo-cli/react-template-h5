import { useState, useEffect } from 'react';
function useRequest() {
  let [options, setOptions] = useState({
    currentPage: 1,
    pageSize: 5
  });
  let [data, setData] = useState({
    totalPage: 0,
    list: []
  })
  function getData() {
    let [ currentPage, pageSize ] = options;
    fetch(`${url}?currentPage=${currentPage}&pageSize=${pageSize}`)
      .then(res => res.json())
      .then(result => {
        setData({...result})
      })
  }
  useEffect(getData, [options, url])
  return [data, options, setOptions]
}

export default useRequest