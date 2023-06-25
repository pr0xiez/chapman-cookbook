import { type NextPage } from "next";
import Head from "next/head";
import { api } from "@/utils/api";
import { useState } from "react";
import AddRecipeModal from "@/client/components/AddRecipeModal";
import Button from "@cmp/Button";
import Input from "@cmp/Input";
import classNames from "classnames";
import EditRecipeModal from "@cmp/EditRecipeModal";
import { FaHome, FaPlus } from "react-icons/fa";

const isFooterEnabled = false;

const Home: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isAddRecipeModalOpen, setIsAddRecipeModalOpen] = useState(false);
  const [isEditRecipeModalOpen, setIsEditRecipeModalOpen] = useState(false);
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
        <div className="fixed top-0 w-full border-b-2 border-purple-400 bg-slate-900 pb-1">
          <h1 className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-center text-3xl font-extrabold text-transparent">
            Chapman Cookbook
          </h1>
        </div>
        <div
          className={classNames("container mt-[48px] px-2", {
            "mb-[48px]": isFooterEnabled,
          })}
        >
          <div className="space-between mb-2 flex gap-2">
            <Button
              fullWidth
              onClick={() => setIsAddRecipeModalOpen((x) => !x)}
            >
              Add Recipe
            </Button>
            {/* <Button
              fullWidth
              onClick={() => setIsAddCookbookSectionOpen((x) => !x)}
            >
              Add Cookbook Section
            </Button> */}
          </div>
          <div className="mb-2">
            <Input
              labelText="Search"
              onChange={(e) => setSearchText(e.target.value)}
            ></Input>
          </div>
          <div className="flex w-full flex-col flex-wrap">
            {sections.data?.map((s) => (
              <div key={s.id} className="border-b-2 border-slate-600 py-1">
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
                    "flex items-center justify-between p-2 font-bold text-pink-300"
                  )}
                >
                  <h4>{s.title}</h4>
                  <p>{expandedSections.includes(s.id) ? "-" : "+"}</p>
                </div>
                {(expandedSections.includes(s.id) || searchText.length > 0) && (
                  <ul className="">
                    {s.recipes.map((r) => (
                      <li
                        key={r.id}
                        className="mb-1 flex items-center justify-between rounded-lg border border-slate-700 px-2 py-1.5"
                        onClick={() => {
                          setRecipeIdForEdit(r.id);
                          setIsEditRecipeModalOpen(true);
                        }}
                      >
                        <span>{r.title}</span>
                        <span className="text-xs italic">By: {r.author}</span>
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
        {/* {isAddCookbookSectionOpen && (
          <AddCookbookSectionModal
            onClose={async () => {
              setIsAddCookbookSectionOpen(false);
              await sections.refetch();
            }}
          />
        )} */}
      </main>
      {isFooterEnabled && (
        <footer className="fixed bottom-0 flex w-full justify-center gap-8 bg-slate-800 py-1 text-center text-lg">
          <FooterIcon
            icon={(props: any) => <FaHome {...props} />}
            text="Home"
          />
          <FooterIcon icon={(props: any) => <FaPlus {...props} />} text="Add" />
        </footer>
      )}
    </>
  );
};

function FooterIcon({
  icon,
  text,
}: {
  icon: (props: any) => JSX.Element;
  text: string;
}) {
  const getIcon = () => icon({ className: "h-5 w-5" });
  return (
    <div className="flex flex-col items-center">
      {getIcon()}
      <span className="text-xs">{text}</span>
    </div>
  );
}

export default Home;
