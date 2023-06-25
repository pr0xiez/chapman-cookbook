import { type NextPage } from "next";
import PageLayout from "@/client/components/PageLayout";
import { useState } from "react";
import type { AddIngredient } from "@/server/api/routers/recipe";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import Input from "@/client/components/Input";
import { FaPlusCircle } from "react-icons/fa";
import TextArea from "@/client/components/TextArea";
import Button from "@/client/components/Button";

type AddIngredientForList = AddIngredient & { index: number };

const AddRecipe: NextPage = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serves, setServes] = useState("");
  const [ingredients, setIngredients] = useState<AddIngredientForList[]>([]);
  const [instructions, setInstructions] = useState("");
  const [cookbookSectionId, setCookbookSectionId] = useState("");

  const addRecipeMutation = api.recipe.addRecipe.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
    onError: (error) => {
      console.error("Failed to create recipe: ", error);
    },
  });
  const sections = api.cookbook.getSections.useQuery({});

  const handleDeleteIngredient = (index: number) => {
    setIngredients((list) => list.filter((i) => i.index !== index));
  };

  return (
    <PageLayout
      headTitle="Add Recipe"
      headContent="Add Recipe page of the Chapman cookboox"
    >
      <form
        className="flex flex-col gap-2"
        onSubmit={(e) => {
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

          addRecipeMutation.mutate(recipe);
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

        <div className="mb-1 flex items-center justify-between font-medium">
          <p>Ingredients:</p>
          <div
            className="py-1 pl-1 text-lg text-green-500"
            onClick={() => {
              setIngredients((x) => {
                const lastIndex = x[x.length - 1]?.index ?? 0;
                return [...x, { text: "", index: lastIndex + 1 }];
              });
            }}
          >
            <FaPlusCircle />
          </div>
        </div>

        {ingredients.map((i) => (
          <Input
            value={i.text}
            key={i.index}
            type="text"
            labelText={`Ingredient`}
            name={`ingredient-${i.index + 1}`}
            id={`ingredient-${i.index + 1}`}
            minusIconCb={() => handleDeleteIngredient(i.index)}
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
    </PageLayout>
  );
};

export default AddRecipe;
