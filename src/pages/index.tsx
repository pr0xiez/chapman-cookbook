import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { useState } from "react";
import AddRecipeModal from "@/client/components/AddRecipeModal";
import AddCookbookSectionModal from "@cmp/AddCookbookSectionModal";
import Button from "@cmp/Button";
import Input from "@cmp/Input";
import classNames from "classnames";
import EditRecipeModal from "@cmp/EditRecipeModal";

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState(false);
  const [isAddCookbookSectionOpen, setIsAddCookbookSectionOpen] =
    useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const sections = api.cookbook.getSections.useQuery({
    title: searchText.length > 0 ? searchText : undefined,
  });
  const [recipeIdForEdit, setRecipeIdForEdit] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Chapman Cookbook</title>
        <meta name="description" content="Chapman Cookbook" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center bg-slate-900 text-slate-400">
        <div className="container px-2">
          <h1 className="mb-2 border-b-2 border-purple-400 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-3xl font-extrabold text-transparent">
            Chapman Cookbook
          </h1>
          <div className="space-between mb-2 flex gap-2">
            <Button
              fullWidth
              onClick={() => setIsAddRecipeModalOpen((x) => !x)}
            >
              Add Recipe
            </Button>
            <Button
              fullWidth
              onClick={() => setIsAddCookbookSectionOpen((x) => !x)}
            >
              Add Cookbook Section
            </Button>
          </div>
          <div className="mb-2">
            <Input
              labelText="Search"
              onChange={(e) => setSearchText(e.target.value)}
            ></Input>
          </div>
          <div className="flex w-full flex-col flex-wrap">
            {sections.data?.map((s) => (
              <div key={s.id} className="border-b-2 border-slate-600">
                <div
                  onClick={() => {
                    if (expandedSections.includes(s.id)) {
                      setExpandedSections((sIds) =>
                        sIds.filter((id) => id !== s.id)
                      );
                    } else {
                      setExpandedSections((sIds) => [...sIds, s.id]);
                    }
                  }}
                  className={classNames(
                    "flex items-center justify-between font-bold text-pink-300",
                    expandedSections.includes(s.id) && s.recipes.length > 0
                      ? "px-2 pt-2"
                      : "p-2"
                  )}
                >
                  <h4>{s.title}</h4>
                  <p>{expandedSections.includes(s.id) ? "-" : "+"}</p>
                </div>
                {expandedSections.includes(s.id) && (
                  <ul className="mx-7 italic">
                    {s.recipes.map((r) => (
                      <li
                        key={r.id}
                        className="flex justify-between py-3"
                        onClick={() => {
                          setRecipeIdForEdit(r.id);
                          setIsEditRecipeModalOpen(true);
                        }}
                      >
                        <span>{r.title}</span>
                        {r.serves !== null && <span>Serves: {r.serves}</span>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
        {isAddRecipeModalOpen && (
          <AddRecipeModal
            onClose={async () => {
              setIsAddRecipeModalOpen(false);
              await sections.refetch();
            }}
          />
        )}
        {isEditRecipeModalOpen ? (
          <EditRecipeModal
            recipeId={recipeIdForEdit as string}
            onClose={async () => {
              setIsEditRecipeModalOpen(false);
              await sections.refetch();
            }}
          />
        ) : null}
        {isAddCookbookSectionOpen && (
          <AddCookbookSectionModal
            onClose={async () => {
              setIsAddCookbookSectionOpen(false);
              await sections.refetch();
            }}
          />
        )}
      </main>
    </>
  );
};

export default Home;
