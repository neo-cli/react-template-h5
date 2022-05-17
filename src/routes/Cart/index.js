import React from "react";
import { connect } from "react-redux";
import actions from "@/store/actions/cart";
import { Table, InputNumber, Popconfirm, Button, Row, Col, Badge } from "antd";
import "./index.less";
import Nav from '@/components/Nav';

function Cart(props) {
  const columns = [
    {
      title: "商品",
      dataIndex: "lesson",
      render: (val, row) => {
        console.log(val, '0..')
        return (
          <>
            <p>{val.title}</p>
            <p>单价: ¥{val.price}元</p>
          </>
        )
      }
    },
    {
      title: "数量",
      dataIndex: "count",
      render: (val, row) => {
        return (
          <InputNumber
            min={1}
            max={10}
            value={val}
            onChange={(value) =>
              props.changeCartItemCount(row.lesson.id, value)
            }
          />
        )
      }
    },
    {
      title: "操作",
      render: (val, row) => {
        console.log(row, '..')
        return (
          <Popconfirm
            title="是否要删除商品"
            onConfirm={() => props.removeCartItem(row.lesson.id)}
            okText="是"
            cancelText="否"
          >
            <Button size="small" type="primary">
              删除
            </Button>
          </Popconfirm>
        )
      }
    }
  ];
  const rowSelection = {
    selectedRowKeys: (props.cart)
      .filter((item) => item.checked)
      .map((item) => item.lesson.id),
    onChange: (selectedRowKeys) => {
      console.log(selectedRowKeys, './//')
      //selectedRowKeys其实是一个由商品的ID组成的数组
      props.changeCheckedCartItems(selectedRowKeys);
    }
  };
  let totalCount = props.cart
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.count, 0);
  let totalPrice = props.cart
    .filter((item) => item.checked)
    .reduce((total, item) => total + item.count * item.lesson.price, 0);
  return (
    <div className="cart">
      <Nav history={props.history}>购物车</Nav>
      <Table
        columns={columns}
        dataSource={props.cart}
        pagination={false}
        rowSelection={rowSelection}
        scroll={{ y: 320 }}
        rowKey={(row) => row.lesson.id}
      />
      <Row style={{ padding: "5px" }}>
        <Col span={4}>
          <Button type="danger" size="small" onClick={props.clearCartItems}>
            清空
          </Button>
        </Col>
        <Col span={8}>
          已选择了{totalCount > 0 ? <Badge count={totalCount} /> : 0}件商品
        </Col>
        <Col span={8}>总价 ¥{totalPrice}元</Col>
        <Col span={4}>
          <Button type="primary" size="small" onClick={props.settle}>
            结算
          </Button>
        </Col>
      </Row>
    </div>
  );
}
let mapStateToProps = (state) => ({ cart: state.cart });
export default connect(mapStateToProps, actions)(Cart);
