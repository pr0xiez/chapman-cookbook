import { useState } from "react";
import { api } from "@/utils/api";
import Button from "@cmp/Button";
import Modal from "@cmp/Modal";

type Props = {
  onClose: () => void;
};

const AddCookbookSectionModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");

  const addSectionMutation = api.cookbook.addSection.useMutation();

  return (
    <Modal headerText="Add Cookbook Section" onClose={onClose}>
      <form
        className="flex flex-col gap-4 p-2"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await addSectionMutation.mutateAsync({
              title,
            });
            onClose();
          } catch (e) {
            console.error("Failed to create section: ", e);
          }
        }}
      >
        <label className="flex justify-between">
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <Button type="submit">Submit</Button>
      </form>
    </Modal>
  );
};

export default AddCookbookSectionModal;
