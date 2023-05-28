import Td from '@/components/Td';
import fetcher from '@/lib/fetcher';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const user = () => {
  const [users, setUsers] = useState([]);
  const [response, setResponse] = useState({});

  const router = useRouter();
  const pathname = router.pathname;
  const params = router.query;
  const pageParam = params.page;
  const nameParam = params.name;
  const isActiveParam = params.isActive;
  const sortOrderParam = params.sortOrder;

  const fetchUser = async () => {
    try {
      const res = await fetcher(
        `user-with-paginate?page=${pageParam ? pageParam : '1'}&name=${
          nameParam ? nameParam : ''
        }&isActive=${isActiveParam === '1' ? isActiveParam : '0'}&sortOrder=${
          sortOrderParam === 'desc' ? sortOrderParam : 'asc'
        }`
      );
      setResponse({ ...users, ...res.data });
      setUsers(res.data.data);
      // console.log(res.data);
      // @ts-ignore
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchUser();
    }
  }, [pageParam, nameParam, sortOrderParam, isActiveParam]);

  useEffect(() => {
    router.query.page = '1';
  }, [nameParam, isActiveParam]);

  return (
    <div className="container mx-auto max-h-screen overflow-y-auto flex flex-col justify-center py-8 gap-6">
      <div>
        <input
          className="border rounded-sm border-slate-200"
          type="search"
          placeholder="cari nama disini"
          defaultValue={nameParam}
          onChange={(e) => {
            router.query.name = e.target.value;
            router.push(router);
          }}
        />
      </div>

      <div className="flex gap-6">
        <button
          className={`${
            isActiveParam === '1'
              ? 'bg-pink-500 text-white p-3 rounded-full'
              : ''
          }`}
          onClick={(e) => {
            router.query.isActive = '1';
            router.push(router);
          }}
        >
          Active
        </button>
        <button
          className={`${
            isActiveParam === '0'
              ? 'bg-pink-500 text-white p-3 rounded-full'
              : ''
          }`}
          onClick={(e) => {
            router.query.isActive = '0';
            router.push(router);
          }}
        >
          Expired
        </button>
      </div>

      <div className="flex gap-6">
        <button
          className={`${
            sortOrderParam === 'asc'
              ? 'bg-pink-500 text-white p-3 rounded-full'
              : ''
          }`}
          onClick={(e) => {
            router.query.sortOrder = 'asc';
            router.push(router);
          }}
        >
          A-Z
        </button>
        <button
          className={`${
            sortOrderParam === 'desc'
              ? 'bg-pink-500 text-white p-3 rounded-full'
              : ''
          }`}
          onClick={(e) => {
            router.query.sortOrder = 'desc';
            router.push(router);
          }}
        >
          Z-A
        </button>
      </div>

      <table className="border">
        <thead>
          <tr>
            <Td>No</Td>
            <Td>name</Td>
            <Td>email</Td>
            <Td>created at</Td>
            <Td>updated at</Td>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => {
            const { id, name, email, is_active, created_at, updated_at } = user;
            return (
              <tr key={id}>
                <Td>{response.from + index}</Td>
                <Td>
                  <div className="flex flex-row justify-between items-center gap-6">
                    <p>{name}</p>
                    <span
                      className={`rounded-md p-2 text-sm ${
                        is_active == 1
                          ? 'text-green-500 bg-green-100'
                          : 'text-red-500 bg-red-100'
                      }`}
                    >
                      {is_active == 1 ? 'Active' : 'Expired'}
                    </span>
                  </div>
                </Td>
                <Td>{email}</Td>
                <Td>{created_at}</Td>
                <Td>{updated_at}</Td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <div>
        {users.length > 0 ? (
          <p>
            Menampilkan data <span>{response.from}</span>-
            <span>{response.to}</span> dari <span>{response.total}</span>
          </p>
        ) : (
          <p>Tidak ada data</p>
        )}
      </div>

      {/* pagination */}
      <nav className="flex flex-row gap-2" aria-label="pagination">
        {response?.links?.map(
          (page: {
            id: number;
            label: string;
            active: boolean;
            url: string | null;
          }) => {
            const { id, label, active, url } = page;

            return (
              <button
                key={id}
                className={`rounded-full w-8 h-8 flex justify-center items-center border transition ${
                  active
                    ? 'bg-white border-slate-900 text-slate-900 hover:bg-slate-900/25 hover:text-white'
                    : 'bg-slate-900 text-white border-transparent hover:bg-white hover:border-slate-900 hover:text-slate-900'
                } ${url === null ? 'pointer-events-none' : ''}`}
                onClick={(e) => {
                  router.query.page =
                    url === null ? '1' : new URL(url).searchParams.get('page');
                  router.push(router);
                }}
              >
                {label}
              </button>
            );
          }
        )}
      </nav>
    </div>
  );
};

export default user;
