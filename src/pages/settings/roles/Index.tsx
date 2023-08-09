import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import withAxios from "../../../HOC/withAxios";
import type { RolesIndexProps } from "../../../types/pages";
import { useAppSelector } from "../../../store/hooks";
import { log } from "../../../funcs/helpers";
import TableSkeleton from "../../../components/skeletons/TableSkeleton";
import Breadcrumb from "../../../components/utilities/Breadcrumb";
import Heading from "../../../components/utilities/Heading";
import IndexListing from "./components/IndexListing";
import menu from "../../../objects/menu";
import { roles } from "../../../objects/apiResponses";

const createActionHref = menu[3].children![1].otherHrefs!.create.href;

const Index = (props: RolesIndexProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<Record<string, any>[]>([]);

  const breadCrumb = menu[3].children![1].breadCrumb;

  const buttonInfo = {
    value: "Add New",
    component: Link,
    to: createActionHref,
  };

  useEffect(() => {
    const requestController = new AbortController();

    setIsLoading(true);

    /*
     * As API server is shut down, we won't call API
     */
    /*
    props.authAxios({...props.apiEndPoints.roles.list, signal: requestController.signal
    }).then((res) => {

        props.setShowSnackBar(false);
        
        const successResponse = res.data;
        log(successResponse);
        
        setData(successResponse.records);
        setIsLoading(false);
        
    }).catch((error) => {
        props.processAxiosError(error, props);
    })
    */

    props.setShowSnackBar(false);

    const successResponse = roles;
    log(successResponse);

    setData(successResponse);
    setIsLoading(false);

    return () => {
      requestController.abort("Request aborted to clean up useEffect.");
    };
  }, []);

  log("Roles listing rendered");

  return (
    <Box>
      {isLoading ? (
        <TableSkeleton />
      ) : (
        <>
          <Breadcrumb path={breadCrumb} />
          <Heading title="Roles" button={buttonInfo} />
          <IndexListing data={data} />
        </>
      )}
    </Box>
  );
};

export default withAxios<RolesIndexProps>(Index);
