import * as XLSX from 'xlsx';
import { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


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

  // Cột và hàm của table API cung cấp
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
    },
    {
      title: 'Name',
      dataIndex: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
    },
  ];

  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Jim Green',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Joe Black',
  //     age: 32,
  //     address: 'Sydney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  // Hàm Component Upload cung cấp
  const propsUpload = {
    name: 'file',
    multiple: false,
    showUploadList: false,
    customRequest: ({ file, onSuccess, onError }) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const data = e.target.result;
        const workbook = XLSX.read(data, { type: 'binary' });
        const jsonDataAbc = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        setJsonData(jsonDataAbc);
        onSuccess();
        message.success('Upload thành công!');
      };

      reader.readAsBinaryString(file);
    },
    beforeUpload: (file) => {
      if (!file) {
        message.error('Please select a file.');
        return false;
      }

      const isExcel = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || file.type === 'application/vnd.ms-excel';

      if (!isExcel) {
        message.error('Only Excel files are allowed.');
      }

      return isExcel;
    },
  };


  return (
    <>
      <Button type="primary" onClick={() => setIsModalOpen(true)}>
        Open Modal
      </Button>
      <Modal title="Upload user" open={isModalOpen} onOk={() => handelCreateModal()} onCancel={() => handelCancelModal()} width={600}>
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
        <Table
          columns={columns}
          dataSource={jsonData}
          onChange={onChange}
          pagination={{
            pageSize: 3,
            total: jsonData.length,
            showSizeChanger: false
          }} />
      </Modal>
    </>
  );
};
export default App;