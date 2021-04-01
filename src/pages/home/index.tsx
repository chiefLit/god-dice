import React from 'react';
import styles from './index.module.less';
import { Flex, Button, NavBar, Modal, Toast } from 'antd-mobile';
import * as storage from '../../common/storage';
import { useHistory } from "react-router";

export default () => {
  const [dataList, setDataList] = React.useState([]);
  const [start, setStart] = React.useState<boolean>(false);
  const timerRef: React.MutableRefObject<any> = React.useRef();
  const history = useHistory()

  React.useEffect(() => {
    const data = storage.getItem(storage.STORAGEKEY) || [];
    setDataList(data);
  }, []);

  React.useEffect(() => {
    (window as any).TagCanvas.Start('myCanvas', 'tags', {
      textColour: '#ffffff',
      outlineColour: 'transparent',
      reverse: false,
      depth: 0.8,
      maxSpeed: 0.02,
      initial: [0.5, -0.3],
      dragControl: false,
      noMouse: true
    });
  }, [dataList]);

  React.useEffect(() => {
    clearTimeout(timerRef.current);
    if (start) {
      (window as any).TagCanvas.SetSpeed('myCanvas', [10, 1]);
      const index = Math.floor(Math.random() * dataList.length);
      timerRef.current = setTimeout(() => {
        Modal.alert('恭喜！！！', dataList[index], [
          { text: '确定' }
        ])
        setStart(false);
      }, 2000);
    } else {
      (window as any).TagCanvas.SetSpeed('myCanvas', [1, 1]);
    }
  }, [start]);

  return (
    <div className={styles.wrapper}>
      <NavBar style={{ background: '#000' }} mode='dark'>GOD DICE</NavBar>

      <div id="myCanvasContainer" className={styles.canvasContainer}>
        <canvas
          width="300"
          height="300"
          className={styles.canvas}
          id="myCanvas"
        ></canvas>
      </div>
      <div id="tags">
        <ul>
          {(dataList).map((data, index) => (
            <li key={index}>{<a href="#">{data}</a>}</li>
          ))}
        </ul>
      </div>

      <div className={styles.coverFooter} />
      <Flex className={styles.footer}>
        <Flex.Item>
          <Button
            style={{
              background: 'rgba(0, 0, 0, 0.251 )',
              color: '#fff'
            }}
            onClick={() => history.push('/set')}
          >可选项</Button>
        </Flex.Item>
        <Flex.Item>
          <Button
            type="primary"
            style={{
              background: 'rgba(0, 0, 0, 0.251 )',
              color: '#fff'
            }}
            onClick={() => {
              dataList.length ? setStart(true) : Toast.offline('请先配置可选项', 2)
            }}
          >开始</Button>
        </Flex.Item>
      </Flex>
    </div>
  );
};
