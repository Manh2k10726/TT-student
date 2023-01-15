import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetUserByIdAction,UpdateUserAction,DeleteUserAction} from '../Redux/Action/ManageUserAction';
import { history } from '../App';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './EditUser.css';
import moment from 'moment';
import { Space, DatePicker, Radio,Popconfirm } from 'antd';
import {ManageUserReducer} from '../Redux/configStore'

export default function EditUser(props) {
    const dispatch = useDispatch();
    let {id}  = props.match.params;
    // console.log('check page:',id)
    useEffect(() => {
        dispatch(GetUserByIdAction(id))
    }, [])
    const {lstUserById} = useSelector(state=>state.ManageUserReducer)
    // console.log('lstUserById :',lstUserById)

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            username:lstUserById?.username,
            firstname:lstUserById?.firstname,
            lastname: lstUserById?.lastname,
            email: lstUserById?.email,
            phone:lstUserById?.phone,
            address:lstUserById?.address,
            birthday:lstUserById?.birthday,
            gender:lstUserById?.gender,
        },
        validationSchema : Yup.object({
            username: Yup.string()
            //   .max(5,'Your name must be at least 5 characters !')
            //   .matches(25,'Your name must be under 25 characters !')
              .required('You must fill in this section !!!'),
            firstname: Yup.string()
            //   .max(5,'Your firstname must be at least 5 characters !')
            //   .matches(25,'Your firstname must be under 25 characters !')
              .required('You must fill in this section !!!'),
            lastname: Yup.string()
            //   .max(5,'Your lastname must be at least 5 characters !')
            //   .matches(25,'Your lastname must be under 25 characters !')
              .required('You must fill in this section !!!'),
            email: Yup.string()
              .email('Invalid Email')
              .required('You must fill in this section !!!'),
            phone: Yup.string()
              .matches(/(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/, {
                  message: "Your phone number is not correct !!!",
                  excludeEmptyString: false,
              })
              .required('You must fill in this section !!!'),
            birthday: Yup.string()
              .required('You must fill in this section !!!'),  
            gender: Yup.string()
              .required('You must fill in this section !!!'), 
        }),
        onSubmit: values => {
          dispatch(UpdateUserAction(id,values))
        },
      });

      const onChangeDate = (date) => {
        let birthDay = moment(date);
        formik.setFieldValue('birthday', birthDay)
    };

    const [value, setValue] = useState();
    const onChangeGender = (e) => {
        formik.setFieldValue('gender', e.target.value);
        setValue(e.target.value);
    };

    const cancel = (e) => {
        console.log(e);
    };

    return (
        <div className='edit col-md-4'>
            
            <form onSubmit={formik.handleSubmit}>
                <div className='row'>
                    <h1 className='col-12 text-header'>
                        Chỉnh sửa thông tin
                    </h1>
                    <div className='col-12 form-group'>
                        <label htmlFor="username"> Tên đăng nhập (*):</label>
                            <input class="form-control"
                                id="username"
                                name="username"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.username}
                            />
                            {formik.errors.username && formik.touched.username && (
                            <p className='text-riquired'>{formik.errors.username}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="firstname">Họ (*):</label>
                            <input class="form-control"
                                id="firstname"
                                name="firstname"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.firstname}
                            />
                            {formik.errors.firstname && formik.touched.firstname && (
                            <p className='text-riquired'>{formik.errors.firstname}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="lastname">Tên (*):</label>
                            <input class="form-control"
                                id="lastname"
                                name="lastname"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.lastname}
                            />
                            {formik.errors.lastname && formik.touched.lastname && (
                            <p className='text-riquired'>{formik.errors.lastname}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="email">Email (*):</label>
                            <input class="form-control"
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            {formik.errors.email && formik.touched.email && (
                            <p className='text-riquired'>{formik.errors.email}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="phone">Phone (*):</label>
                            <input class="form-control"
                                id="phone"
                                name="phone"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.phone}
                            />
                            {formik.errors.phone && formik.touched.phone && (
                            <p className='text-riquired'>{formik.errors.phone}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="address">Địa chỉ (*):</label>
                            <input class="form-control"
                                id="address"
                                name="address"
                                type="text"
                                onChange={formik.handleChange}
                                value={formik.values.address}
                            />
                            {formik.errors.address && formik.touched.address && (
                            <p className='text-riquired'>{formik.errors.address}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="birthday">Ngày sinh (*): </label>
                        <Space direction="vertical">
                            <DatePicker name='birthday' size='large' onChange={onChangeDate} value={moment(formik.values.birthday)} />
                        </Space>
                        {formik.errors.birthday && formik.touched.birthday && (
                            <p className='text-riquired'>{formik.errors.birthday}</p>
                        )}
                    </div>
                    <div className='col-12 form-group'>
                        <label htmlFor="gender">Giới tính (*): </label>
                        <Radio.Group name='gender' onChange={onChangeGender} value={formik.values.gender}>
                            <Radio value={1}>Nam</Radio>
                            <Radio value={0}>Nữ</Radio>
                        </Radio.Group>
                        {formik.errors.gender && formik.touched.gender && (
                            <p className='text-riquired'>{formik.errors.gender}</p>
                        )}
                    </div>
                </div>
                <div >
                    <button type='button'  
                        onClick={() => {
                        history.replace(`/Home/1`)}} 
                        className='btn btn-secondary' >Đóng</button>
                    <Popconfirm
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => { dispatch(DeleteUserAction(id)) }}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No">
                        <button className='btn btn-danger'  >Xóa</button>
                    </Popconfirm>
                   
                    <button className='btn btn-primary' type="submit">Cập nhật</button>
                </div>
            </form>
        </div>
    )
}