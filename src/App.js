import { useState } from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import DeleteUser from './components/DeleteUser';
import ModalExcelImporter from './components/ModalExcelImporter';

const App = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [jsonData, setJsonData] = useState([]);

  const handelCancelModal = () => {
    setIsModalOpen(false);
    setJsonData([]);
  }

  const handelCreateModal = () => {
    console.log(jsonData);
    handelCancelModal();
    message.success('Tạo mới người dùng thành công!');
  }

  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>

      <ModalExcelImporter
        isModalOpen={isModalOpen}
        handelCancelModal={handelCancelModal}
        handelCreateModal={handelCreateModal}
        jsonData={jsonData}
        setJsonData={setJsonData}
      />

      <DeleteUser />
    </>
  );
};
export default App;