import * as XLSX from 'xlsx';
import React, { useRef, useState } from 'react';
import { Button, Modal, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;


const App = (props) => {

  const columns = [
    {
      title: 'Key',
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

  // 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const propsUpload = {
    name: 'file',
    multiple: true,
    action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
    onChange(info) {
      const { status } = info.file;
      if (status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (status === 'done') {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };
  // Tesst
  const inputRef = useRef(null);
  const [jsonData, setJsonData] = useState([]);
  const [file, setFile] = useState(null);

  const handleFileUpload = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      // Nếu không có file, đặt cả file và jsonData về rỗng
      setFile(null);
      setJsonData([]);
      return;
    }

    const file = files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const jsonDataAbc = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
      setFile(file);
      setJsonData(jsonDataAbc);
      console.log(jsonDataAbc);
    };

    reader.readAsBinaryString(file);
  };



  const handleClearFile = () => {
    // Đặt cả file và jsonData về rỗng
    setFile(null);
    setJsonData([]);

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  const pageSize = 3;

  const paginationConfig = {
    pageSize: pageSize,
    total: jsonData.length,
    showSizeChanger: false,
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} width={600}>
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
        {/* Table */}
        <Table columns={columns} dataSource={jsonData} onChange={onChange} pagination={paginationConfig} />
        <input ref={inputRef} type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        <button onClick={handleClearFile}>Clear File</button>
      </Modal>
    </>
  );
};
export default App;