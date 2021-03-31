import React from 'react';
import styles from './index.module.less';
import { Flex, Button, NavBar, Modal, Toast } from 'antd-mobile';
import * as storage from '../../common/storage';
import { useHistory } from "react-router";

export default () => {
  const [dataList, setDataList] = React.useState([]);
  const [start, setStart] = React.useState<boolean>(false);
  const [visible, setVisiable] = React.useState(false);
  const timerRef: React.MutableRefObject<any> = React.useRef();
  const [luckyDog, setLuckyDog] = React.useState('');
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
      setLuckyDog(dataList[index]);
      timerRef.current = setTimeout(() => {
        setVisiable(true);
        setStart(false);
      }, 2000);
    } else {
      (window as any).TagCanvas.SetSpeed('myCanvas', [1, 1]);
    }
  }, [start]);

  return (
    <div className={styles.wrapper}>
      <NavBar style={{background: '#000'}} mode='dark'>GOD DICE</NavBar>

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
          <Button onClick={() => history.push('/set')}>可选项</Button>
        </Flex.Item>
        <Flex.Item>
          <Button
            type="primary"
            onClick={() => {
              if (dataList.length) {
                setStart(true);
              } else {
                Toast.offline('请先配置');
              }
            }}
          >
            开始
          </Button>
        </Flex.Item>
      </Flex>

      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        title="恭喜 ！！！"
        footer={[
          {
            text: 'Ok',
            onPress: () => setVisiable(false),
          },
        ]}
      >
        {luckyDog}
      </Modal>
    </div>
  );
};
