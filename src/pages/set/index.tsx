import React from 'react';
import styles from './index.module.less';
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
  const deleteItems = () => {
    const data = dataList.filter((item) => !selectedValues.includes(item));
    setDataList(data);
    setStatus('display');
    Toast.success('删除成功', 2, () => { }, false)
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
            key={'link-edit'}
            style={{ color: '#111' }}
            onClick={() =>
              setStatus(status === 'editable' ? 'display' : 'editable')
            }
          >
            {status === 'editable' ? '完成操作' : '批量操作'}
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
      </List>
      <div className={styles.coverFooter} />
      <Flex className={styles.footer}>
        {status === 'editable' && (
          <Flex.Item>
            <Button type="primary" onClick={() => deleteItems()}>
              批量删除
            </Button>
          </Flex.Item>
        )}
      </Flex>
    </div>
  );
};
