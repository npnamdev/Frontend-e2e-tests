import * as XLSX from 'xlsx';
import { Modal, Table } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const ModalExcelImporter = (props) => {
    const { isModalOpen, handelCancelModal, handelCreateModal, jsonData, setJsonData } = props;

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

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

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
    );
}

export default ModalExcelImporter;
