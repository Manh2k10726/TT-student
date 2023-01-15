import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { AddUserAction } from '../Redux/Action/ManageUserAction';
import './ModalCreate.css'
import { Space, DatePicker, Radio } from 'antd';

export default function ModalCreate(props) {
    const formik = useFormik({
        initialValues: {
            username:'',
            firstname: '',
            lastname: '',
            email: '',
            phone:'',
            address:'',
            birthday:'',
            gender:'',
        },
        validationSchema : Yup.object({
            username: Yup.string()
              .required('You must fill in this section !!!'),
            firstname: Yup.string()
              .required('You must fill in this section !!!'),
            lastname: Yup.string()
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
        //   alert(JSON.stringify(values, null, 2));
          dispatch(AddUserAction(values))
        },
      });
    const [] = useState();
    useEffect(() => {
    }, [])

    const dispatch = useDispatch();

    const onChangeDate = (date, dateString) => {
        formik.setFieldValue('birthday', dateString)
    };

    const [value, setValue] = useState();
    const onChangeGender = (e) => {
        formik.setFieldValue('gender', e.target.value);
        setValue(e.target.value);
    };
    

    return (
        <form onSubmit={formik.handleSubmit}>
            <div className='row'>
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
                        <DatePicker name='birthday' size='large' onChange={onChangeDate} />
                    </Space>
                    {formik.errors.birthday && formik.touched.birthday && (
                        <p className='text-riquired'>{formik.errors.birthday}</p>
                    )}
                </div>
                <div className='col-12 form-group'>
                    <label htmlFor="gender">Giới tính (*): </label>
                    <Radio.Group name='gender' onChange={onChangeGender} value={value}>
                        <Radio value={1}>Nam</Radio>
                        <Radio value={0}>Nữ</Radio>
                    </Radio.Group>
                    {formik.errors.gender && formik.touched.gender && (
                        <p className='text-riquired'>{formik.errors.gender}</p>
                    )}
                </div>
            </div>
            <div >
                <button type='button' onClick={props.onCancel} className='btn btn-secondary' >Đóng</button>
                <button className='btn btn-primary' onClick={props.onOk} type="submit">Tạo</button>
            </div>
     </form>
    )
}