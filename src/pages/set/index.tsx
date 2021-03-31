import React from 'react';
import styles from './index.less';
import {
  NavBar,
  List,
  SearchBar,
  Checkbox,
  Toast,
  Flex,
  Button,
  Icon,
  InputItem,
} from 'antd-mobile';
import * as storage from '../../common/storage';
import { useHistory } from "react-router";

export default () => {
  const [dataList, setDataList] = React.useState<string[]>([]);
  const [value, setValue] = React.useState<string>('');
  const [status, setStatus] = React.useState<'display' | 'editable'>('display');
  const [selectedValues, setSelectValues] = React.useState<string[]>([]);
  const history = useHistory()

  React.useEffect(() => {
    const data = storage.getItem(storage.STORAGEKEY) || [];
    setDataList(data);
  }, []);

  React.useEffect(() => {
    storage.setItem({
      key: storage.STORAGEKEY,
      value: dataList,
    });
  }, [dataList]);

  // 添加节点
  const addItem = (value: string) => {
    if (!value) return;
    const data = storage.getItem(storage.STORAGEKEY) || [];

    if (data.indexOf(value) !== -1) {
      Toast.offline('sad，你已经添加过了，看来你很想得到它 !!!', 1);
      return;
    }

    const newData = [...data, value];
    setDataList(newData);
    setValue('');
  };

  // 删除确认
  const onOk = () => {
    const data = dataList.filter((item) => !selectedValues.includes(item));
    setDataList(data);
    setStatus('display');
  };

  // 选择删除项
  const onChange = (value: string) => {
    if (selectedValues.includes(value)) {
      const values = selectedValues.filter((item) => item !== value);
      setSelectValues(values);
    } else {
      setSelectValues([...selectedValues, value]);
    }
  };

  return (
    <div className={styles.wrapper}>
      <NavBar
        className={styles.navbar}
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <a
            style={{ color: '#111' }}
            onClick={() =>
              setStatus(status === 'editable' ? 'display' : 'editable')
            }
          >
            {status === 'editable' ? '取消编辑' : '编辑'}
          </a>,
        ]}
      >
        可选项
      </NavBar>
      <SearchBar
        className={styles.addContainer}
        maxLength={20}
        cancelText={'添加'}
        showCancelButton
        onCancel={addItem}
        value={value}
        onChange={(value: string) => setValue(value)}
        onSubmit={(value: string) => setValue(value)}
      />
      <div className={styles.coverHeader}></div>
      <List>
        {dataList.map((item, index) => {
          if (status === 'display') {
            return <List.Item key={index}>{item}</List.Item>;
          } else {
            return (
              <Checkbox.CheckboxItem
                key={index}
                onChange={() => onChange(item)}
              >
                {item}
              </Checkbox.CheckboxItem>
            );
          }
        })}
        {/* <InputItem placeholder="请输入" /> */}
      </List>
      <div className={styles.coverFooter} />
      <Flex className={styles.footer}>
        {/* {status === 'display' && (
          <Flex.Item>
            <Button onClick={() => history.goBack()}>完成</Button>
          </Flex.Item>
        )} */}
        {status === 'editable' && (
          <Flex.Item>
            <Button type="primary" onClick={() => onOk()}>
              确认删除
            </Button>
          </Flex.Item>
        )}
      </Flex>
    </div>
  );
};
