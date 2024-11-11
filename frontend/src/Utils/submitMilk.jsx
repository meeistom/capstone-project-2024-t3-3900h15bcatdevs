import axios from 'axios';
import { URL } from '../constants';

export { submitMilk };

async function submitMilk(milkInfo, setUid) {
  const url = `${URL}/add_milk_entry`;
  try {
    await axios.post(url, milkInfo).then((res) => {
      setUid(res.data.uid);
    });
  } catch (e) {
    console.log(milkInfo);
    console.error('Error posting bottle details:', e.response);
  }
}
