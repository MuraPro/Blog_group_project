import { UploadFile } from 'antd/es/upload/interface';
import { UploadChangeParam } from 'antd/es/upload';

import { UPLOADS_URL } from '../shared/constants';

import type { TUploadFile } from '../types/ApiTypes';

const convertUploads = (uploads: UploadFile[]): UploadFile[] | TUploadFile[] => {
  if (uploads) {
    return uploads.map((uploadFile: UploadFile) =>
      uploadFile.url
        ? uploadFile
        : {
            uid: uploadFile.uid,
            name: uploadFile.response.name,
            url: uploadFile.response.url,
            type: uploadFile.type,
            status: uploadFile.status
          }
    );
  }
  return uploads;
};

const deleteUploadFile = (uploadFile: UploadFile) =>
  fetch(`${UPLOADS_URL}/${uploadFile.response.name ?? uploadFile.name}`, {
    method: 'DELETE'
  })
    .then(() => true)
    .catch(() => {
      if (uploadFile.status === 'done') {
        return false;
      }
      return true;
    });

const getValueFromEvent = (event: UploadChangeParam): UploadFile[] => {
  const { fileList } = event;
  return [...fileList];
};

export { convertUploads, getValueFromEvent, deleteUploadFile };
