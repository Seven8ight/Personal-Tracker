import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

export type currentmodal = "Account" | "Music" | "Settings" | "None";

type modal = {
  currentModal: currentmodal;
  setter2: Dispatch<SetStateAction<currentmodal>>;
};

const Modal = createContext<modal>({
  currentModal: "None",
  setter2: () => {},
});

export const useModalOpener = () => {
  const { currentModal, setter2 } = useContext(Modal);
  return { currentModal, setter2 };
};

const ModalHandler = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => {
  const [modal, setModal] = useState<currentmodal>("None");
  return (
    <Modal value={{ currentModal: modal, setter2: setModal }}>{children}</Modal>
  );
};

export default ModalHandler;
