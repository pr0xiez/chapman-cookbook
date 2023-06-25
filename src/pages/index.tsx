import { type NextPage } from "next";
import { api } from "@/utils/api";
import { useState } from "react";
import Input from "@cmp/Input";
import cx from "classnames";
import PageLayout from "@/client/components/PageLayout";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState("");
  const [expandedSections, setExpandedSections] = useState<string[]>([]);
  const sections = api.cookbook.getSections.useQuery({
    title: searchText.length > 0 ? searchText : undefined,
  });

  return (
    <PageLayout
      headTitle="Chapman Cookbook"
      headContent="Home page of the Chapman cookbook"
    >
      <>
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
                className={cx(
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
                        router.push(`/recipe/edit/${r.id}`);
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
        {/* {isAddCookbookSectionOpen && (
        <AddCookbookSectionModal
          onClose={async () => {
            setIsAddCookbookSectionOpen(false);
            await sections.refetch();
          }}
        />
      )} */}
      </>
    </PageLayout>
  );
};

export default Home;
