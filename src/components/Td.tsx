import { ReactNode } from 'react';

const Td = ({ children }: { children: ReactNode }) => {
  return <td className="border">{children}</td>;
};

export default Td;
