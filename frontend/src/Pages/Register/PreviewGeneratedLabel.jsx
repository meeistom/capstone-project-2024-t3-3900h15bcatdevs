import { React, useEffect, useState } from 'react';
import { URL } from '../../constants';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../index.css';

export { PreviewGeneratedLabel };

function PreviewGeneratedLabel({ milkInfo, milkChecked, setLabelPrint }) {
  const [label, setLabel] = useState('');

  useEffect(() => {
    const setupLabel = async () => {
      if (milkChecked) await generateLabel();
    };
    setupLabel();
  }, []);

  const generateLabel = async () => {
    const url = `${URL}/preview_milk_label`;
    try {
      const response = await axios.get(url, {
        params: {
          milk: JSON.stringify(milkInfo)
        }
      });
      setLabel(`data:image/png;base64,${response.data}`);
      setLabelPrint(response.data);
    } catch (e) {
      console.error('Error generating label', e);
    }
  };

  return (
    <>
      <div className="register-details-container preview-label min-vh-50 d-flex flex-column">
        <div className="title align-self-center mb-3">
          {milkChecked && <h2>Preview Label</h2>}
          {!milkChecked && <h2>Register Complete</h2>}
        </div>
        <div className="body d-flex flex-column justify-content-between fs-5">
          {milkChecked && (
            <>
              <img src={label} />
            </>
          )}
          {!milkChecked && (
            <p>
              Registration has been successfully completed. You may return to the home page now.
            </p>
          )}
        </div>
      </div>
    </>
  );
}
