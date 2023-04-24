import { Breadcrumb } from "antd";
import useSearch from "./../../redux/issuesSlice/useSearch";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectError } from "../../redux/issuesSlice/issuesSelectors";
import { getOwnerAndRepo } from "../../utils/getOwnerAndRepo";

const BreadCrumb = () => {
  const [search] = useSearch();
  const error = useSelector(selectError);
  const [breadCrumbParams, setBreadCrumbParams] = useState({
    "owner": { label: "", link: "" },
    "repo": { label: "", link: "" },
  });

  useEffect(() => {
    const { owner, repo } = getOwnerAndRepo(search);

    if (search) {
      setBreadCrumbParams({
        "owner": {
          label: owner,
          link: search.split("/").slice(0, -1).join("/"),
        },
        "repo": {
          label: repo,
          link: search,
        },
      });
    }
  }, [search]);

  if (error) return null;

  return (
    <div data-testid="breadCrumb">
      <Breadcrumb
        items={[
          {
            title: (
              <a
                href={breadCrumbParams.owner.link}
                target="_blank"
                rel="noreferrer"
              >
                {breadCrumbParams.owner.label}
              </a>
            ),
          },
          {
            title: (
              <a
                href={breadCrumbParams.repo.link}
                target="_blank"
                rel="noreferrer"
              >
                {breadCrumbParams.repo.label}
              </a>
            ),
          },
        ]}
        style={{ margin: "30px" }}
      />
    </div>
  );
};

export default BreadCrumb;
