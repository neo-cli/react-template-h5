import React, { useState, useEffect } from 'react';
import './index.less';
import { connect } from 'react-redux';
import mapDispatchToProps from '@/store/actions/profile';
import Nav from '@/components/Nav';
import { Descriptions, Button, Alert, message, Upload, Icon } from 'antd';
import {
  PlusOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
function Profile(props) {
  console.log(props, '0...')
  let [uploading, setUploading] = useState(false);
  useEffect(() => {
      props.validate();
  }, []);
  let content;
  if (props.loginState === 'UN_VALIDATE') {
    content = null;
  } else if (props.loginState === 'LOGINED') {
    const uploadButton = (
      <div>
        {uploading && <LoadingOutlined />}
        {!uploading && <PlusOutlined />}
        <div className="ant-upload-text">上传</div>
      </div>
    )
    const handleChange = (info) => {
      if (info.file.status === 'uploading') {
          setUploading(true);
      } else if (info.file.status === 'done') {
          //response就是上传接口返回的响应体 data服务器端返回图片路径
          let { success, data } = info.file.response;
          if (success) {
              setUploading(false);
              props.setAvatar(data);
          } else {
              message.error('上传头像失败');
          }
      }
    }
    content = (
      <div className="user-info">
          <Descriptions title="当前用户">
              <Descriptions.Item label="用户名">{props.user.username}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{props.user.email}</Descriptions.Item>
              <Descriptions.Item label="头像">
                  <Upload
                      name="avatar"//往服务器端上传头像的时候应该用哪个字段名上传
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="http://localhost:8001/user/uploadAvatar"
                      beforeUpload={beforeUpload}
                      data={{ userId: props.user.id }}
                      onChange={handleChange}
                  >
                      {
                          props.user.avatar ? <img src={props.user.avatar} style={{ width: '100%' }} /> : uploadButton
                      }
                  </Upload>
              </Descriptions.Item>
          </Descriptions>
          <Button type="danger" onClick={props.logout}>退出</Button>
      </div>
    )
  } else {
    content = (
      <>
          <Alert type="warning" message="未登录" description="亲爱的用户你好，你尚未登录，请你注册或者登录" />
          <div style={{ textAlign: 'center', padding: '.5rem' }}>
              <Button type="dashed" onClick={() => props.history.push('/login')}>登录</Button>
              <Button type="dashed" onClick={() => props.history.push('/register')}>注册</Button>
          </div>
      </>
    )
  }

  return (
    <section>
      <Nav history={props.history}>个人中心</Nav>
      {content}
    </section>
  )
}
function beforeUpload(file) {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('你只能上传JPG/PNG文件');
    }
    const isLessThan2M = file.size / 1024 / 1024 < 2;
    if (!isLessThan2M) {
        message.error('图片必须小于2M');
    }
    return isJpgOrPng && isLessThan2M;
}
const mapStateToProps = (state) => state.profile;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
