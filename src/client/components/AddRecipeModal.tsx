import type { AddIngredient } from "@/server/api/routers/recipe";
import { useState } from "react";
import { api } from "@/utils/api";
import Button from "@cmp/Button";
import Modal from "@cmp/Modal";
import Input from "@cmp/Input";
import TextArea from "@cmp/TextArea";

type Props = {
  onClose: () => void;
};

type AddIngredientForList = AddIngredient & { index: number };

const AddRecipeModal: React.FC<Props> = ({ onClose }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serves, setServes] = useState("");
  const [ingredients, setIngredients] = useState<AddIngredientForList[]>([]);
  const [instructions, setInstructions] = useState("");
  const [cookbookSectionId, setCookbookSectionId] = useState("");

  const addRecipeMutation = api.recipe.addRecipe.useMutation();
  const sections = api.cookbook.getSections.useQuery({});

  return (
    <Modal headerText="Add Recipe" onClose={onClose}>
      <form
        className="flex flex-col gap-2"
        onSubmit={async (e) => {
          e.preventDefault();
          const recipe = {
            title,
            author,
            serves:
              Number(serves) !== 0 && !isNaN(Number(serves))
                ? Number(serves)
                : undefined,
            instructions,
            ingredients,
            cookbookSectionId,
          };

          try {
            await addRecipeMutation.mutateAsync(recipe);
            onClose();
          } catch (e) {
            console.error("Failed to create recipe: ", e);
          }
        }}
      >
        <Input
          labelText="Title"
          value={title}
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />

        <Input
          labelText="Author"
          value={author}
          type="text"
          onChange={(e) => setAuthor(e.target.value)}
        />

        <Input
          labelText="Serves"
          value={serves}
          type="text"
          onChange={(e) => setServes(e.target.value)}
        />

        <div className="flex items-center justify-between font-medium">
          <p>Ingredients:</p>
          <p
            className="rounded border border-slate-600 p-1 hover:cursor-pointer hover:border-slate-500 hover:bg-slate-700"
            onClick={() => {
              setIngredients((x) => {
                const lastIndex = x[x.length - 1]?.index ?? 0;
                return [...x, { text: "", index: lastIndex + 1 }];
              });
            }}
          >
            Add +
          </p>
        </div>

        {ingredients.map((i) => (
          <Input
            value={i.text}
            key={i.index}
            type="text"
            labelText={`Ingredient ${i.index + 1}`}
            name={`ingredient-${i.index + 1}`}
            id={`ingredient-${i.index + 1}`}
            placeholder={`ingredient-${i.index + 1}`}
            onChange={(e) =>
              setIngredients((ingredients) =>
                ingredients.map((x) =>
                  x.index === i.index ? { ...x, text: e.target.value } : x
                )
              )
            }
          />
        ))}

        <label htmlFor="section-select" className="-mb-1 font-medium">
          Cookbook Section:
        </label>
        <select
          name="sections"
          id="section-select"
          value={cookbookSectionId}
          onChange={(e) => {
            setCookbookSectionId(e.target.value);
          }}
        >
          <option value="">Please choose a section</option>
          {sections.data?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title}
            </option>
          ))}
        </select>

        <TextArea
          labelText="Cooking Instructions.."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <div className="mt-2 w-full">
          <Button type="submit" fullWidth>
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRecipeModal;