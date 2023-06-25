import { type NextPage } from "next";
import PageLayout from "@/client/components/PageLayout";
import type { EditIngredient } from "@/server/api/routers/recipe";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import TextArea from "@/client/components/TextArea";
import Button from "@/client/components/Button";
import Input from "@/client/components/Input";
import { FaPlusCircle } from "react-icons/fa";

type EditIngredientForList = EditIngredient & { index: number };

const EditRecipe: NextPage = () => {
  const router = useRouter();
  const recipeId = router.query.id as string;
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [serves, setServes] = useState("");
  const [ingredients, setIngredients] = useState<EditIngredientForList[]>([]);
  const [instructions, setInstructions] = useState("");
  const [cookbookSectionId, setCookbookSectionId] = useState("");

  const recipeRoute = api.useContext().recipe;
  const editRecipeMutation = api.recipe.editRecipe.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
    onError: (error) => {
      console.error("Failed to edit recipe: ", error);
    },
  });
  const deleteIngredientMutation = api.recipe.deleteIngredient.useMutation({
    onSuccess: async () => {
      await recipeRoute.invalidate();
    },
  });
  const sections = api.cookbook.getSections.useQuery({});
  const { data: recipe, isSuccess } = api.recipe.getById.useQuery(
    { id: recipeId },
    {
      refetchOnMount: "always",
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    if (isSuccess && recipe) {
      setAuthor(recipe.author);
      setTitle(recipe.title);
      setServes(recipe.serves !== null ? recipe.serves.toString() : "");
      setInstructions(recipe.instructions);
      setIngredients(
        recipe.ingredients.map((i, index) => {
          return { id: i.id, text: i.text, index };
        })
      );
      setCookbookSectionId(recipe.cookbookSectionId);
    }
  }, [isSuccess, recipe]);

  const handleDeleteIngredient = (ingredient: EditIngredientForList) => {
    if (ingredient.id === undefined) {
      setIngredients((list) =>
        list.filter((i) => i.index !== ingredient.index)
      );
    } else deleteIngredientMutation.mutate({ id: ingredient.id });
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
          const recipeForUpdate = {
            id: recipeId,
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

          editRecipeMutation.mutate(recipeForUpdate);
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
            minusIconCb={() => handleDeleteIngredient(i)}
            disabled={deleteIngredientMutation.isLoading}
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
          className="mb-2"
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
          <Button
            type="submit"
            fullWidth
            disabled={
              !(
                cookbookSectionId.length > 0 &&
                title.length > 0 &&
                author.length > 0 &&
                serves.length > 0
              )
            }
          >
            Submit
          </Button>
        </div>
      </form>
    </PageLayout>
  );
};

export default EditRecipe;
