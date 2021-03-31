const storage = window.localStorage;

const STORAGEKEY = '__TO_YEMENGTING';

const getItem = (key: string) => {
  try {
    const data = storage.getItem(key)
    return data ? JSON.parse(data) : null
  } catch (error) {
    console.error(error)
    return null
  }
}

const setItem = ({ key, value }: { key: string, value: any }) => {
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

const removeItem = (key: string) => {
  try {
    storage.getItem(key)
  } catch (error) {
    console.error(error)
  }
}

export { STORAGEKEY, getItem, setItem, removeItem }