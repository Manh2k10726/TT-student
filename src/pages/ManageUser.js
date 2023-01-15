import React, { Fragment, useEffect, useState } from 'react'
import { Table, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GetListUserAction } from '../Redux/Action/ManageUserAction';
import './ManageUser.css'
import { history } from '../App';
import ModalCreate from './ModalCreate'
import { AiTwotoneEdit } from 'react-icons/ai';

export default function ManageUser(props) {
    let pages  = props.match.params;
    console.log('check page:',pages)

    const [pageId, setPageId] = useState();
    useEffect(() => {
        setPageId(pages)
    }, [pages])

    const dispatch = useDispatch();

    const {lstUser} = useSelector(state=>state.ManageUserReducer)
    console.log('lstUser:',lstUser)

    useEffect(() => {
        dispatch(GetListUserAction(pages.page - 1))
    }, [])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns = [
        {
            title: 'Tên đăng nhập',
            dataIndex: 'username',
        },
        {
            title: 'Họ tên',
            dataIndex: 'firstname',
            render: (text, item) => {
                return <Fragment>
                    {`${item.firstname} ${item.lastname}`}
                </Fragment>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
        },
        {
            title: '',
            dataIndex: 'id',
            key: 'id',
            render: (text, item) => {
                return <div className='flex'>
                    <button className='btn btn-light edit-btn' title='Sửa' onClick={() => {
                        history.push(`/User/${item.id}`)
                    }}>
                        <AiTwotoneEdit style={{ fontSize: 20 }}></AiTwotoneEdit>
                    </button>
                </div>
            },
        },
        
    ];
    const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
    return (
        <div className='my-20 mx-48'>
            <div className='header'>
            <h1 className=' text-3xl font-bold'>
                Hệ thống Quản lý sinh viên
            </h1>
            <button type="primary"
             className='create-btn' onClick={showModal}>
                Tạo mới
            </button>
            </div>
            <Modal title="Thêm Mới Người Dùng" open={isModalOpen} footer={null} >
                <ModalCreate
                    setIsModalOpen={setIsModalOpen}
                    onCancel={handleCancel}
                    onOk={handleOk}
                />
            </Modal>
            <div className='my-8'>
                <Table
                    dataSource={lstUser.data}
                    columns={columns}
                    key=''
                    pagination={{
                        defaultCurrent: pageId,
                        total: `${lstUser.total_count}`,
                        onChange: (page, pageSize) => {
                            dispatch(GetListUserAction(page - 1))
                            history.replace(`/Home/${page}`)
                        }
                    }} />;

            </div>
        </div>
    )
}