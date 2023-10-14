import React, { FC, cloneElement, Children, ReactElement, useState } from 'react';
import { Button, Modal } from 'antd';
import type { ModalGeneralType } from './ModalGeneral.type';

const ModalGeneral: FC<ModalGeneralType> = ({ titleModal, textButton, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const changeVisibilityModal = () => setIsModalOpen(!isModalOpen);

  return (
    <>
      <Button type="primary" onClick={changeVisibilityModal}>
        {textButton}
      </Button>
      <Modal title={titleModal} open={isModalOpen} onCancel={changeVisibilityModal} footer={null} width={1000}>
        {Children.map<React.ReactNode, React.ReactNode>(children, (child) => {
          return cloneElement(child as ReactElement, { changeVisibilityModal });
        })}
      </Modal>
    </>
  );
};

export { ModalGeneral };
